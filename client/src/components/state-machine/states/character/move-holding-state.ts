import { CHARACTER_STATES } from './../character-states';
import { CharacterGameObject } from '../../../../game-objects/common/character-game-object';
import { BaseMoveState } from './base-move-state';
import { HeldGameObjectComponent } from '../../../game-object/held-game-object-component';
import { DIRECTION } from '../../../../common/common';

export class MoveHoldingState extends BaseMoveState {
  constructor(gameObject: CharacterGameObject) {
    super(CHARACTER_STATES.MOVE_HOLDING_STATE, gameObject, 'WALK_HOLD');
  }

  public onUpdate(): void {
      const controls = this._gameObject.controls;

      if(controls.isActionKeyJustDown){
        this._stateMachine.setState(CHARACTER_STATES.THROW_STATE);
    }

      if(this.isNoInputMovement(controls)){
        this._stateMachine.setState(CHARACTER_STATES.IDLE_HOLDING_STATE);
      }
    
      this.handleCharacterMovement();

      const heldComponent = HeldGameObjectComponent.getComponent<HeldGameObjectComponent>(this._gameObject);
      if(heldComponent === undefined || heldComponent.object === undefined){
        this._stateMachine.setState(CHARACTER_STATES.IDLE_STATE);
         return;
      }

      heldComponent.object.setPosition(this._gameObject.x, this._gameObject.y);
      if (this._gameObject.direction === DIRECTION.DOWN){
        heldComponent.object.setPosition(this._gameObject.x +1, this._gameObject.y - 2);
      } else if (this._gameObject.direction === DIRECTION.UP){
        heldComponent.object.setPosition(this._gameObject.x +1, this._gameObject.y - 6);
      } else{
        heldComponent.object.setPosition(this._gameObject.x, this._gameObject.y - 8);
      }
      if(this._gameObject.flipX){
        heldComponent.object.setX(this._gameObject.x);
      }
    }

  }