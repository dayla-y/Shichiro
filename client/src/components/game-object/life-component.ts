import { GameObject } from "../../common/types";
import { BaseGameObjetctComponet } from './base-game-objects-component'

export class LifeComponent extends BaseGameObjetctComponet {
    #maxLife: number;
    #currentLife: number;

    constructor(gameObject: GameObject, maxLife: number, currentLife = maxLife){
        super(gameObject);
        this.#maxLife = maxLife;
        this.#currentLife = currentLife;
    }

    get life(): number{
        return this.#currentLife;
    }

    get maxLfie(): number{
        return this.#maxLife;
    }

    public takeDamage(damage: number): void{
        if(this.#currentLife === 0){
            return;
        }

        this.#currentLife -= damage;
        if(this.#currentLife < 0){
            this.#currentLife = 0;
        }
    }
}