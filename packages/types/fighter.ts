export interface IFighter {
    name: string;
    damage: number;
    health: number;
}

export interface StartMatchOptions {
    logMatch?: boolean;
    maxRounds?: number;
    roundDelay?: number;
}