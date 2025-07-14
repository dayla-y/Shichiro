import * as Phaser from 'phaser';
import { Direction, Position } from '../../common/types';
import { InputComponent } from '../../components/input/input-component';
import { AnimationConfig } from '../../components/game-object/animation-component';
import { ASSET_KEYS, SPIDER_ANIMATION_KEYS, WISP_ANIMATION_KEYS } from '../../common/assets';
import { CharacterGameObject } from '../common/character-game-object';
import { IdleState } from '../../components/state-machine/states/idle-state';
import { MoveState } from '../../components/state-machine/states/move-state';
import { CHARACTER_STATES } from '../../components/state-machine/states/character-states';
import { ENEMY_WISP_PULSE_DURATION, ENEMY_WISP_PULSE_SCALE_X, ENEMY_WISP_PULSE_SCALE_Y, ENEMY_WISP_SPEED } from '../../common/config';
import { DIRECTION } from '../../common/common';
import { exhaustiveGuard } from '../../common/utils';
import { BounceMoveState } from '../../components/state-machine/states/bounce-character-state';

export type WispConfig = {
  scene: Phaser.Scene;
  position: Position;
};

export class Wisp extends CharacterGameObject {
  constructor(config: WispConfig) {
    // create animation config for component
    const animConfig = { key: WISP_ANIMATION_KEYS.IDLE, repeat: -1, ignoreIfPlaying: true };
    const animationConfig: AnimationConfig = {
      IDLE_DOWN: animConfig,
      IDLE_UP: animConfig,
      IDLE_LEFT: animConfig,
      IDLE_RIGHT: animConfig,
    };

    super({
      scene: config.scene,
      position: config.position,
      assetKey: ASSET_KEYS.WISP,
      frame: 0,
      id: `wisp-${Phaser.Math.RND.uuid()}`,
      isPlayer: false,
      animationConfig,
      speed: ENEMY_WISP_SPEED,
      inputComponent: new InputComponent(),
      isInvulnerable: true,
    });

    // add state machine
    this._stateMachine.addState(new BounceMoveState(this));
    this._stateMachine.setState(CHARACTER_STATES.BOUNCE_MOVE_STATE);

    this.scene.tweens.add({
      targets: this,
      scaleX: ENEMY_WISP_PULSE_SCALE_X,
      scaleY: ENEMY_WISP_PULSE_SCALE_Y,
      yoyo: true,
      repeat: -1,
      duration: ENEMY_WISP_PULSE_DURATION,
    })
  }

}
