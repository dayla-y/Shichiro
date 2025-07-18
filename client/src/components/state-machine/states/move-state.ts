import { BaseCharacterState } from './base-character-state';
import { CHARACTER_STATES } from './character-states';
import { exhaustiveGuard, isArcadePhysicsBody } from '../../../common/utils';
import { Direction } from '../../../common/types';
import { DIRECTION, INTERACTIVE_OBJECT_TYPE } from '../../../common/common';
import { CharacterGameObject } from '../../../game-objects/common/character-game-object';
import { InputComponent } from '../../input/input-component';
import { CollidingObjectsComponent } from '../../game-object/coliding-objects-component';
import { InteractiveObjectsComponent } from '../../game-object/interactive-object-component';

export class MoveState extends BaseCharacterState {
  constructor(gameObject: CharacterGameObject) {
    super(CHARACTER_STATES.MOVE_STATE, gameObject);
  }

  public onUpdate(): void {
    const controls = this._gameObject.controls;

    // if no input is provided transition back to idle state
    if (!controls.isDownDown && !controls.isUpDown && !controls.isLeftDown && !controls.isRightDown) {
      this._stateMachine.setState(CHARACTER_STATES.IDLE_STATE);
      return;
    }

    if(this.#checkIfObjectWasInteractedWith(controls)){
      return;
    }

    // vertical movement
    if (controls.isUpDown) {
      this.#updateVelocity(false, -1);
      this.#updateDirection(DIRECTION.UP);
    } else if (controls.isDownDown) {
      this.#updateVelocity(false, 1);
      this.#updateDirection(DIRECTION.DOWN);
    } else {
      this.#updateVelocity(false, 0);
    }

    const isMovingVertically = controls.isDownDown || controls.isUpDown;
    // horizontal movement
    if (controls.isLeftDown) {
      this.#flip(true);
      this.#updateVelocity(true, -1);
      if (!isMovingVertically) {
        this.#updateDirection(DIRECTION.LEFT);
      }
    } else if (controls.isRightDown) {
      this.#flip(false);
      this.#updateVelocity(true, 1);
      if (!isMovingVertically) {
        this.#updateDirection(DIRECTION.RIGHT);
      }
    } else {
      this.#updateVelocity(true, 0);
    }

    this.#normalizeVelocity();
  }

  #flip(value: boolean): void {
    this._gameObject.setFlipX(value);
  }

  #updateVelocity(isX: boolean, value: number): void {
    if (!isArcadePhysicsBody(this._gameObject.body)) {
      return;
    }
    if (isX) {
      this._gameObject.body.velocity.x = value;
      return;
    }
    this._gameObject.body.velocity.y = value;
  }

  #normalizeVelocity(): void {
    // if the player is moving diagonally, the resultant vector will have a magnitude greater than the defined speed.
    // if we normalize the vector, this will make sure the magnitude matches defined speed
    if (!isArcadePhysicsBody(this._gameObject.body)) {
      return;
    }
    this._gameObject.body.velocity.normalize().scale(this._gameObject.speed);
  }

  #updateDirection(direction: Direction): void {
    this._gameObject.direction = direction;
    this._gameObject.animationComponent.playAnimation(`WALK_${this._gameObject.direction}`);
  }

  #checkIfObjectWasInteractedWith(controls: InputComponent): boolean {
    const collideComponent = CollidingObjectsComponent.getComponent<CollidingObjectsComponent>(this._gameObject);
    if (collideComponent === undefined || collideComponent.objects.length === 0) {
      return false;
    }

    const collisionObject = collideComponent.objects[0];
    const interactiveObjectComponent =
      InteractiveObjectsComponent.getComponent<InteractiveObjectsComponent>(collisionObject);
    if (interactiveObjectComponent === undefined) {
      return false;
    }

    if (!controls.isActionKeyJustDown) {
      return false;
    }

    // we can carry this item
    if (interactiveObjectComponent.objectType === INTERACTIVE_OBJECT_TYPE.PICKUP) {
      this._stateMachine.setState(CHARACTER_STATES.LIFT_STATE);
      return true;
    }

    // we can open this item
    if (interactiveObjectComponent.objectType === INTERACTIVE_OBJECT_TYPE.OPEN) {
      this._stateMachine.setState(CHARACTER_STATES.OPEN_CHEST_STATE);
      return true;
    }

    if (interactiveObjectComponent.objectType === INTERACTIVE_OBJECT_TYPE.AUTO) {
      return false;
    }

    // we should never hit this code block
    exhaustiveGuard(interactiveObjectComponent.objectType);
  }
}
