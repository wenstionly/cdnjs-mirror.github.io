import type { IContainerPlugin } from "../Core/Interfaces/IContainerPlugin";
import type { IPlugin } from "../Core/Interfaces/IPlugin";
import type { Container } from "../Core/Container";
import type { RecursivePartial } from "../Types/RecursivePartial";
import type { IOptions } from "../Options/Interfaces/IOptions";
import type { IShapeDrawer } from "../Core/Interfaces/IShapeDrawer";
export declare class Plugins {
    private static plugins;
    static getPlugin(plugin: string): IPlugin | undefined;
    static addPlugin(plugin: IPlugin): void;
    static getAvailablePlugins(container: Container): {
        [id: string]: IContainerPlugin;
    };
    private static presets;
    static getPreset(preset: string): RecursivePartial<IOptions> | undefined;
    static addPreset(presetKey: string, options: RecursivePartial<IOptions>): void;
    private static readonly drawers;
    static addShapeDrawer(type: string, drawer: IShapeDrawer): void;
    static getShapeDrawer(type: string): IShapeDrawer;
    static getSupportedShapes(): string[];
}
