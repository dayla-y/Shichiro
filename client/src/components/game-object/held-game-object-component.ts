import { GameObject } from "../../common/types";
import { BaseGameObjetctComponet } from "./base-game-objects-component";

export class HeldGameObjectComponent extends BaseGameObjetctComponet{
    #object: GameObject | undefined;

    constructor(gameObject: GameObject){
        super(gameObject);
    }

    get object(): GameObject | undefined{
        return this.#object;
    }

    set object(object: GameObject){
        this.#object = object;
    }

    public drop(): void{
        this.#object = undefined;
    }
}