import * as Phaser from 'phaser'
import { ChestState, Position } from '../../common/types';
import { ASSET_KEYS, CHEST_FRAME_KEYS } from '../../common/assets';
import { CHEST_STATE, INTERACTIVE_OBJECT_TYPE } from '../../common/common';
import { InteractiveObjectsComponent } from '../../components/game-object/interactive-object-component';

type Chestconfig = {
    scene: Phaser.Scene;
    position: Position;
    requiresKey: boolean;
    chestState?: ChestState;
    
};

//TODO: Config for new assets
export class Chest extends Phaser.Physics.Arcade.Image {
    #state: ChestState;
    #isKeyChest: boolean;
    
    constructor(config: Chestconfig){
        const {scene, position} = config;
        const frameKey = config.requiresKey ? CHEST_FRAME_KEYS.BIG_CHEST_CLOSED : CHEST_FRAME_KEYS.SMALL_CHEST_CLOSED;
        super(scene, position.x, position.y, ASSET_KEYS.DUNGEON_OBJECTS, frameKey);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOrigin(0, 1).setImmovable(true);

        this.#state = config.chestState || CHEST_STATE.HIDDEN;
        this.#isKeyChest = config.requiresKey;

        if(this.#isKeyChest){
            (this.body as Phaser.Physics.Arcade.Body).setSize(32, 24).setOffset(0,8);
        }
        
        //add components
        new InteractiveObjectsComponent(this, INTERACTIVE_OBJECT_TYPE.OPEN);
    }

    public open(): void {
        if(this.#state !== CHEST_STATE.REVELEADED){
            return;
        }

        this.#state = CHEST_STATE.OPEN;
        const frameKey = this.#isKeyChest ? CHEST_FRAME_KEYS.BIG_CHEST_OPEN : CHEST_FRAME_KEYS.SMALL_CHEST_OPEN;
        this.setFrame(frameKey);
    }
}