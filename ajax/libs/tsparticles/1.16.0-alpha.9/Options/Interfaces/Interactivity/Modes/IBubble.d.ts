import type { IOptionLoader } from "../../IOptionLoader";
import type { IColor } from "../../../../Core/Interfaces/IColor";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
import type { IBubbleDiv } from "./IBubbleDiv";
export interface IBubble extends IOptionLoader<IBubble> {
    distance: number;
    duration: number;
    opacity?: number;
    size?: number;
    color?: SingleOrMultiple<IColor | string>;
    divs?: SingleOrMultiple<IBubbleDiv>;
}
