import { GameObject } from "../../common/types";
import { InputComponent } from "../input/input-component";
import { BaseGameObjetctComponet } from "./base-game-objects-component";

export class ControlsComponent extends BaseGameObjetctComponet {
    #inputComponent: InputComponent

    constructor(gameObject: GameObject, inputComponent: InputComponent) {
        super(gameObject);
        this.#inputComponent = inputComponent;
    }

    get controls(): InputComponent{
        return this.#inputComponent;
    }
}