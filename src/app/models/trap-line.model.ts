import { QuantityType } from "./quantity-type.model";

export class TrapLine {
    constructor(
        public blackDie: number[],
        public negativeText: string,
        public positiveText: string,
        public negativeEffect: QuantityType[],
        public positiveEffect: QuantityType[]
    ){}
}