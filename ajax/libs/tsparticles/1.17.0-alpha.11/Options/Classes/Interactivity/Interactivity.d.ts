import type { IInteractivity } from "../../Interfaces/Interactivity/IInteractivity";
import { InteractivityDetect } from "../../../Enums";
import { Events } from "./Events/Events";
import { Modes } from "./Modes/Modes";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader";
export declare class Interactivity implements IInteractivity, IOptionLoader<IInteractivity> {
    get detect_on(): InteractivityDetect;
    set detect_on(value: InteractivityDetect);
    detectsOn: InteractivityDetect;
    events: Events;
    modes: Modes;
    constructor();
    load(data?: RecursivePartial<IInteractivity>): void;
}
