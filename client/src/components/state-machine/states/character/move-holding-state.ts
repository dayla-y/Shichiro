import { CHARACTER_STATES } from './../character-states';
import { CharacterGameObject } from '../../../../game-objects/common/character-game-object';
import { BaseMoveState } from './base-move-state';

export class MoveHoldingState extends BaseMoveState {
  constructor(gameObject: CharacterGameObject) {
    super(CHARACTER_STATES.MOVE_HOLDING_STATE, gameObject, 'WALK_HOLD');
  }

  public onUpdate(): void {
      const controls = this._gameObject.controls;

      if(controls.isActionKeyJustDown){
        //TODO: Throw item
        this._stateMachine.setState(CHARACTER_STATES.IDLE_STATE);
    }

      if(this.isNoInputMovement(controls)){
        this._stateMachine.setState(CHARACTER_STATES.IDLE_HOLDING_STATE);
      }
    
      this.handleCharacterMovement();
    }

  }