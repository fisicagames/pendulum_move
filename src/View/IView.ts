import {  Button, TextBlock } from "@babylonjs/gui";

export interface IView {
    onButtonMenuStart(callback: () => void): void;
    onButtonMenu(callback: () => void): void;
    onToggleMusic(callback: () => void): void;
    updateMainMenuVisibility(isVisible: boolean): void;
}
