export class QuantityType {
    constructor(
        public quantity: number,
        public type: "life" | "experience" | "gold" | "food" | "armor"
    ){}
}