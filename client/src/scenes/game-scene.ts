import * as Phaser from 'phaser';
import { SCENE_KEYS } from './scene-keys';
import { ASSET_KEYS } from '../common/assets';
import { Player } from '../game-objects/player/player';
import { Spider } from '../game-objects/enemies/spider';
import { Wisp } from '../game-objects/enemies/wisp';
import { CharacterGameObject } from '../game-objects/common/character-game-object';
import { CHEST_STATE, DIRECTION } from '../common/common';
import { KeyboardComponent } from '../components/input/keybord-componet';
import { PLAYER_START_MAX_HEALTH } from '../common/config';
import { Pot } from '../game-objects/objects/pot';
import { Chest } from '../game-objects/objects/chest';
import { GameObject, LevelData } from '../common/types';
import { CUSTOM_EVENTS, EVENT_BUS } from '../common/event-bus';
import { isArcadePhysicsBody } from '../common/utils';
import { TiledRoomObject } from '../common/tiled/types';

export class GameScene extends Phaser.Scene {
  #levelData!: LevelData;
  #controls!: KeyboardComponent;
  #player!: Player;
  #enemyGroup!: Phaser.GameObjects.Group;
  #blockingGroup!: Phaser.GameObjects.Group;
  #potGameObjects!: Pot[];
  #objectsByRoomId!: {
    [key: number]: {
      chestMap: {[key: number]: Chest},
      doorMap: {[key: number]: unknown},
      doors: unknown[],
      switches: unknown[],
      pots: Pot[],
      chests: Chest[],
      enemyGroup?: Phaser.GameObjects.Group,
      room: TiledRoomObject;
    };
  };

  constructor() {
    super({
      key: SCENE_KEYS.GAME_SCENE,
    });
  }

  public init(data): void{
    this.#levelData = data;
  }

  public create(): void {
    if (!this.input.keyboard) {
      console.warn('Phaser keyboard plugin is not setup properly.');
      return;
    }
    this.#controls = new KeyboardComponent(this.input.keyboard);

    this.#createLevel();
    this.#setUpPlayer();
    this.#setUpCamera();

    this.#tempCode();
    

    this.#registerColliders();
    this.#registerCustomEvents();

    this.cameras.main.startFollow(this.#player);
  }

  #registerColliders(): void {
    // register collisions between enemies and current "room"
    this.#enemyGroup.getChildren().forEach((enemy) => {
      const enemyGameObject = enemy as CharacterGameObject;
      enemyGameObject.setCollideWorldBounds(true);
    });

    // register collisions between player and enemies
    this.physics.add.overlap(this.#player, this.#enemyGroup, (player, enemy) => {
      this.#player.hit(DIRECTION.DOWN, 1);
      const enemyGameObject = enemy as CharacterGameObject;
      enemyGameObject.hit(this.#player.direction, 1);
    });

    // register collisions between player and blocking game objects (doors, pots, chests, etc.)
    this.physics.add.collider(this.#player, this.#blockingGroup, (player, gameObject) => {
      // add game object to players collision list
      this.#player.collidedWithGameObject(gameObject as GameObject);
    });

    // register collisions between enemies and blocking game objects (doors, pots, chests, etc.)
    this.physics.add.collider(
      this.#enemyGroup,
      this.#blockingGroup,
      (enemy, gameObject) => {
        // handle when pot objects are thrown at enemies
        if (
          gameObject instanceof Pot &&
          isArcadePhysicsBody(gameObject.body) &&
          (gameObject.body.velocity.x !== 0 || gameObject.body.velocity.y !== 0)
        ) {
          const enemyGameObject = enemy as CharacterGameObject;
          if (enemyGameObject instanceof CharacterGameObject) {
            enemyGameObject.hit(this.#player.direction, 1);
            gameObject.break();
          }
        }
      },
      // handle when objects are thrown on wisps, ignore collisions and let object move through
      (enemy, gameObject) => {
        const body = (gameObject as unknown as GameObject).body;
        if (enemy instanceof Wisp && isArcadePhysicsBody(body) && (body.velocity.x !== 0 || body.velocity.y !== 0)) {
          return false;
        }
        return true;
      },
    );

    // handle collisions between thrown pots and other objects in the current room
    if (this.#potGameObjects.length > 0) {
      this.physics.add.collider(this.#potGameObjects, this.#blockingGroup, (pot) => {
        if (!(pot instanceof Pot)) {
          return;
        }
        pot.break();
      });
    }
  }

  #registerCustomEvents(): void {
    EVENT_BUS.on(CUSTOM_EVENTS.OPENED_CHEST, this.#handleOpenChest, this);

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      EVENT_BUS.off(CUSTOM_EVENTS.OPENED_CHEST, this.#handleOpenChest, this);
    });
  }

  #handleOpenChest(chest: Chest): void {
    console.log('chest opened');

    // TODO
  }

  #createLevel(): void{
    //Create main background
    this.add.image(0, 0, ASSET_KEYS[`${this.#levelData.level}_BACKGROUND`], 0).setOrigin(0);
    //Creata main foreground
    this.add.image(0, 0, ASSET_KEYS[`${this.#levelData.level}_FOREGROUND`], 0).setOrigin(0).setDepth(3);

    const map = this.make.tilemap({
      key: `${this.#levelData.level}_LEVEL`,
    });
    console.log(map);
  }

  #setUpCamera(): void{
    this.cameras.main.startFollow(this.#player);
  }

  #setUpPlayer(): void{
    this.#player = new Player({
      scene: this,
      position: { x: this.scale.width / 2, y: this.scale.height / 2 },
      controls: this.#controls,
      maxLife: PLAYER_START_MAX_HEALTH,
      currentLife: PLAYER_START_MAX_HEALTH,
    });
  }

  #tempCode(): void {
    this.add
      .text(this.scale.width / 2, this.scale.height / 2, 'Game Scene', { fontFamily: ASSET_KEYS.FONT_PRESS_START_2P })
      .setOrigin(0.5);

    this.#enemyGroup = this.add.group(
      [
        new Spider({
          scene: this,
          position: { x: this.scale.width / 2, y: this.scale.height / 2 + 50 },
        }),
        new Wisp({
          scene: this,
          position: { x: this.scale.width / 2, y: this.scale.height / 2 - 50 },
        }),
      ],
      { runChildUpdate: true },
    );

    this.#potGameObjects = [];
    const pot = new Pot({
      scene: this,
      position: { x: this.scale.width / 2 + 90, y: this.scale.height / 2 },
    });
    this.#potGameObjects.push(pot);

    this.#blockingGroup = this.add.group([
      pot,
      new Chest({
        scene: this,
        position: { x: this.scale.width / 2 - 90, y: this.scale.height / 2 },
        requiresKey: false,
      }),
      new Chest({
        scene: this,
        position: { x: this.scale.width / 2 - 90, y: this.scale.height / 2 - 80 },
        requiresKey: true,
      }),
    ]);
  }
}
