import { QuantityType } from "./quantity-type.model";

export class CampChoice {
    constructor(
        public name: string,
        public description: string[],
        public reward: QuantityType
    ){}
}