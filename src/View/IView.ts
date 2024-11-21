import { Vector3, Mesh } from "@babylonjs/core";

export interface IView {
    onButtonMenuStart(callback: () => void): void;
    onButtonMenu(callback: () => void): void;
    onButtonMenuContinuar(callback: () => void): void;
    onToggleMusic(callback: () => void): void;
    onButtonLang(callback: () => void): void;

    buttonUpUp(callback: () => void): void;
    buttonDownUp(callback: () => void): void;
    buttonRightUp(callback: () => void): void;
    buttonLeftUp(callback: () => void): void;
    
    buttonUpDown(callback: () => void): void;
    buttonDownDown(callback: () => void): void;
    buttonRightDown(callback: () => void): void;
    buttonLeftDown(callback: () => void): void;
    
    updateMainMenuVisibility(isVisible: boolean): void;
    changeLanguage(): void;

    updateScoreText(newScore: number): void;

    showEndGamePanel(isVisible: boolean): void;
}
