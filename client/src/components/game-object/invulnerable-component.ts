import { GameObject } from "../../common/types";
import { BaseGameObjetctComponet } from "./base-game-objects-component";

export class InvulnerableComponent extends BaseGameObjetctComponet {
    #invulnerable: boolean;
    #invulnerableAfterHitAnimationDuration: number;

    constructor(gameObject: GameObject, invulnerable: boolean, invulnerableAfterHitAnimationDuration = 0) {
        super(gameObject);
        this.#invulnerable = invulnerable;
        this.#invulnerableAfterHitAnimationDuration = invulnerableAfterHitAnimationDuration;
    }

    get invulnerable(): boolean{
        return this.#invulnerable;
    }

    set invulnerable(value: boolean){
        this.#invulnerable = value;
    }

    get invulnerableAfterHitAnimationDuration(): number{
        return this.#invulnerableAfterHitAnimationDuration;
    }

}