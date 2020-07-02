import type { IAttract } from "./IAttract";
import type { MoveDirection, OutMode } from "../../../Enums";
import type { ITrail } from "./ITrail";
import type { INoise } from "./Noise/INoise";
export interface IMove {
    angle: number;
    attract: IAttract;
    bounce: boolean;
    collisions: boolean;
    direction: MoveDirection;
    enable: boolean;
    noise: INoise;
    out_mode: OutMode;
    outMode: OutMode;
    warp: boolean;
    random: boolean;
    speed: number;
    straight: boolean;
    trail: ITrail;
    vibrate: boolean;
}
