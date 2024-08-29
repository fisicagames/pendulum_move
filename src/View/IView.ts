import { Vector3 } from "@babylonjs/core";
import { AdvancedDynamicTexture } from "@babylonjs/gui";

export interface IView {
    onButtonMenuStart(callback: () => void): void;
    onButtonMenu(callback: () => void): void;
    onToggleMusic(callback: () => void): void;
    onButtonLang(callback: () => void): void; // Novo método para o botão de idioma
    updateMainMenuVisibility(isVisible: boolean): void;
    changeLanguage(): void;
    setCameraTarget(target: Vector3): void;
}
