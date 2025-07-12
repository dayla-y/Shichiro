import { DIRECTION } from "../../common/common";
import { Direction, GameObject } from "../../common/types";
import { BaseGameObjetctComponet } from "./base-game-objects-component";

export class DirectionComponent extends BaseGameObjetctComponet {
    #direction: Direction;
    #callback: (direction: Direction) => void;

    constructor(gameObject: GameObject, onDirectionCallback = () => undefined) {
        super(gameObject);
        this.#direction = DIRECTION.DOWN;
        this.#callback = onDirectionCallback;
    }

    get direction(): Direction{
        return this.#direction;
    }

    set direction(direction: Direction){
        this.#direction = direction;
        this.#callback(this.#direction);
    }
}