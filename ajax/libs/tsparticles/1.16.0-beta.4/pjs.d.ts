import type { Container } from "./Core/Container";
import type { MainSlim } from "./main.slim";
declare const initPjs: (main: MainSlim) => {
    particlesJS: any;
    pJSDom: Container[];
};
export { initPjs };
