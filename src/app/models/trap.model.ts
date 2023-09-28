import { TrapLine } from "./trap-line.model";

export class Trap {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public linesOfEffect: TrapLine[]
    ){}
}