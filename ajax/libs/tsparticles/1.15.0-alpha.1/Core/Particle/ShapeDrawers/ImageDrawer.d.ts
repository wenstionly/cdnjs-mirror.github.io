import type { IShapeDrawer } from "../../Interfaces/IShapeDrawer";
import type { IParticle } from "../../Interfaces/IParticle";
import type { IImage } from "../../Interfaces/IImage";
import type { Container } from "../../Container";
interface ContainerImage {
    id: string;
    images: IImage[];
}
export declare class ImageDrawer implements IShapeDrawer {
    images: ContainerImage[];
    constructor();
    getImages(container: Container): ContainerImage;
    addImage(container: Container, image: IImage): void;
    init(container: Container): Promise<void>;
    destroy(): void;
    private loadImageShape;
    draw(context: CanvasRenderingContext2D, particle: IParticle, radius: number, opacity: number): void;
}
export {};
