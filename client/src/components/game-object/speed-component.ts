import { GameObject } from "../../common/types";
import { BaseGameObjetctComponet } from "./base-game-objects-component";

export class SpeedComponent extends BaseGameObjetctComponet {
    #speed: number

    constructor(gameObject: GameObject, speed: number) {
        super(gameObject);
        this.#speed = speed;
    }

    get speed(): number{
        return this.#speed;
    }
}