import { GameObject, InteractiveObjectType } from "../../common/types";
import { BaseGameObjetctComponet } from "./base-game-objects-component";

export class InteractiveObjectsComponent extends BaseGameObjetctComponet {
  #objectType: InteractiveObjectType;
  #callback: () => void;
  #canInteractCheck: () => boolean;

  constructor(
    gameObject: GameObject,
    objectType: InteractiveObjectType,
    canInteractCheck = () => true,
    callback = () => undefined,
  ) {
    super(gameObject);
    this.#objectType = objectType;
    this.#callback = callback;
    this.#canInteractCheck = canInteractCheck;
  }

  get objectType(): InteractiveObjectType {
    return this.#objectType;
  }

  public interact(): void {
    this.#callback();
  }

  public canInteractWith(): boolean {
    return this.#canInteractCheck();
  }
}
