import { BaseCharacterState } from './../base-character-state';
import { CHARACTER_STATES } from './../character-states';
import { isArcadePhysicsBody } from '../../../../common/utils';
import { CharacterGameObject } from '../../../../game-objects/common/character-game-object';

export class IdleHoldingState extends BaseCharacterState {
  constructor(gameObject: CharacterGameObject) {
    super(CHARACTER_STATES.IDLE_HOLDING_STATE, gameObject);
  }

  public onEnter(): void {
    // play idle animation based on game object direction
    this._gameObject.animationComponent.playAnimation(`IDLE_HOLD_${this._gameObject.direction}`);

    // reset game object velocity
    if (isArcadePhysicsBody(this._gameObject.body)) {
      this._gameObject.body.velocity.x = 0;
      this._gameObject.body.velocity.y = 0;
    }
  }

  public onUpdate(): void {
    const controls = this._gameObject.controls;

    if(controls.isActionKeyJustDown){
        this._stateMachine.setState(CHARACTER_STATES.THROW_STATE);
    }

    // if no other input is provided, do nothing
    if (!controls.isDownDown && !controls.isUpDown && !controls.isLeftDown && !controls.isRightDown) {
      return;
    }

    this._stateMachine.setState(CHARACTER_STATES.MOVE_HOLDING_STATE);
  }
}
