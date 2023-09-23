export class Player {
    constructor(
        public life: number,
        public experience: number,
        public gold: number,
        public food: number,
        public armor: number,
        public bonus: string[],
        public penalty: string[],
        public die: number,
        public status: string,
        public currentEncounter: number,
        public maxEncounter: number,
        public currentFloor: number,
        public maxFloor: number,
        public currentZone: number,
        public bossFloor: number[]
    ){}
}