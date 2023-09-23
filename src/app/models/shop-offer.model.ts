export class ShopOffer {
    constructor(
        public quantityWanted: number,
        public typeWanted: "life" | "experience" | "gold" | "food" | "armor",
        public quantityGiven: number,
        public typeGiven: "life" | "experience" | "gold" | "food" | "armor"
    ){}
}