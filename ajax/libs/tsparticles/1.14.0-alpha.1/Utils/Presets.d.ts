import type { RecursivePartial } from "../Types/RecursivePartial";
import type { IOptions } from "../Options/Interfaces/IOptions";
export declare class Presets {
    private static presets;
    static getPreset(preset: string): RecursivePartial<IOptions> | undefined;
    static addPreset(presetKey: string, options: RecursivePartial<IOptions>): void;
}
