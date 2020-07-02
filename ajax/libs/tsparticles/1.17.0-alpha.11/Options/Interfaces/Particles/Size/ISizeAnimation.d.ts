import type { DestroyType, StartValueType } from "../../../../Enums";
export interface ISizeAnimation {
    enable: boolean;
    size_min: number;
    minimumValue: number;
    speed: number;
    sync: boolean;
    startValue: StartValueType;
    destroy: DestroyType;
}
