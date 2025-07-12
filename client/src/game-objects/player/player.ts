import * as Phaser from 'phaser';
import { PLAYER_ANIMATION_KEYS } from "../../common/assets";
import { Direction, Position } from "../../common/types";
import { InputComponent } from '../../components/input/input-component';
import { ControlsComponent } from '../../components/game-object/controls-component';
import { isArcadePhysicsBody } from '../../common/utils';
import { StateMachine } from '../../components/state-machine/state-machine';
import { IddleState } from '../../components/state-machine/states/idle-state';
import { CHARACTER_STATES } from '../../components/state-machine/states/character-states';
import { MoveState } from '../../components/state-machine/states/move-state';
import { SpeedComponent } from '../../components/game-object/speed-component';
import { PLAYER_SPEED } from '../../common/config';
import { DirectionComponent } from '../../components/game-object/direction-component';
import { AnimationComponent, animationConfig } from '../../components/game-object/animation-component';

export type PlayerConfig = {
    scene: Phaser.Scene;
    position: Position;
    assetKey: string;
    frame?: number;
    controls: InputComponent;
}

export class Player extends Phaser.Physics.Arcade.Sprite {
    #controlsComponent: ControlsComponent;
    #speedComponent: SpeedComponent;
    #directionComponent: DirectionComponent;
    #animationComponent: AnimationComponent;
    #stateMachine: StateMachine;

    constructor(config: PlayerConfig){
        const {scene, position, assetKey, frame} = config;
        const { x, y } = position;
        super(scene, x, y, assetKey, frame || 0);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        const animationConfig: animationConfig = {
            WALK_DOWN: {key: PLAYER_ANIMATION_KEYS.WALK_DOWN, repeat: -1, ignoreIfPlaying: true},
            WALK_UP: {key: PLAYER_ANIMATION_KEYS.WALK_UP, repeat: -1, ignoreIfPlaying: true},
            WALK_LEFT: {key: PLAYER_ANIMATION_KEYS.WALK_SIDE, repeat: -1, ignoreIfPlaying: true},
            WALK_RIGHT: {key: PLAYER_ANIMATION_KEYS.WALK_SIDE, repeat: -1, ignoreIfPlaying: true},
            IDLE_DOWN: {key: PLAYER_ANIMATION_KEYS.IDLE_DOWN, repeat: -1, ignoreIfPlaying: true},
            IDLE_UP: {key: PLAYER_ANIMATION_KEYS.IDLE_UP, repeat: -1, ignoreIfPlaying: true},
            IDLE_LEFT: {key: PLAYER_ANIMATION_KEYS.IDLE_SIDE, repeat: -1, ignoreIfPlaying: true},
            IDLE_RIGHT: {key: PLAYER_ANIMATION_KEYS.IDLE_SIDE, repeat: -1, ignoreIfPlaying: true},
        }

        this.#controlsComponent = new ControlsComponent(this, config.controls);
        this.#speedComponent = new SpeedComponent(this, PLAYER_SPEED);
        this.#directionComponent = new DirectionComponent(this)
        this.#animationComponent = new AnimationComponent(this, animationConfig)

        this.#stateMachine = new StateMachine('player');
        this.#stateMachine.addState(new IddleState(this));
        this.#stateMachine.addState(new MoveState(this));
        this.#stateMachine.setState(CHARACTER_STATES.IDLE_STATE);

        config.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
        config.scene.events.once(Phaser.Scenes.Events.SHUTDOWN, ()=> {
            config.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
        });
    }
    
    get controls(): InputComponent {
        return this.#controlsComponent.controls
    }

    get speed(): number {
        return this.#speedComponent.speed;
    }

    get direction(): Direction {
        return this.#directionComponent.direction;
    }

    set direction(value: Direction) {
        this.#directionComponent.direction = value;
    }

    get animationComponent(): AnimationComponent{
        return this.#animationComponent;
    }

    update(): void{

        this.#stateMachine.update();
    }


}