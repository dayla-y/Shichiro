import { GameObject } from "../../common/types";
import { BaseGameObjetctComponet } from "./base-game-objects-component";

export class CollidingObjectsComponent extends BaseGameObjetctComponet {
  #objects: GameObject[];

  constructor(gameObject: GameObject) {
    super(gameObject);
    this.#objects = [];
  }

  get objects(): GameObject[] {
    return this.#objects;
  }

  public add(gameObject: GameObject): void {
    this.#objects.push(gameObject);
  }

  public reset(): void {
    this.#objects = [];
  }
}

