import { Vector3, Mesh } from "@babylonjs/core";

export interface IView {
    onButtonMenuStart(callback: () => void): void;
    onButtonMenu(callback: () => void): void;
    onToggleMusic(callback: () => void): void;
    onButtonLang(callback: () => void): void;
    buttonUpUp(callback: () => void): void;
    buttonDownUp(callback: () => void): void;
    buttonRightUp(callback: () => void): void;
    buttonLeftUp(callback: () => void): void;
    updateMainMenuVisibility(isVisible: boolean): void;
    changeLanguage(): void;
}
