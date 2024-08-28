// src\View\View.ts
import { Scene } from "@babylonjs/core";
import { AdvancedDynamicTexture, Button, Rectangle, TextBlock } from "@babylonjs/gui";
import { IView } from "./IView";

export class View implements IView {
    private scene: Scene;
    private advancedTexture: AdvancedDynamicTexture;
    private rectangleMenu: Rectangle;
    public buttonMenuStart: Button;
    public buttonMenu: Button;
    private textblockLevel: TextBlock;
    private rectangleTouch: Rectangle;
    private rectangleTop: Rectangle;
    public textblockMenuMusic: TextBlock;
    private isMusicOn: boolean = true;
    private buttonLang: Button;

    constructor(scene: Scene, advancedTexture: AdvancedDynamicTexture) {
        this.scene = scene;
        this.advancedTexture = advancedTexture;
        this.initializeGUI();
    }

    private initializeGUI() {
        this.buttonMenuStart = this.advancedTexture.getControlByName("ButtonMenuStart") as Button;
        this.buttonMenu = this.advancedTexture.getControlByName("ButtonMenu") as Button;
        this.rectangleMenu = this.advancedTexture.getControlByName("RectangleMenu") as Rectangle;
        this.rectangleMenu.isVisible = true;
        this.textblockLevel = this.advancedTexture.getControlByName("TextblockLevel") as TextBlock;
        this.textblockLevel.isVisible = false;
        this.rectangleTouch = this.advancedTexture.getControlByName("RectangleTouch") as Rectangle;
        this.rectangleTouch.isVisible = false;
        this.rectangleTop = this.advancedTexture.getControlByName("RectangleTop") as Rectangle;
        this.rectangleTop.isVisible = false;
        this.textblockMenuMusic = this.advancedTexture.getControlByName("TextblockMenuMusic") as TextBlock;
        this.buttonLang = this.advancedTexture.getControlByName("ButtonLang") as Button;
    }

    public updateMainMenuVisibility(isVisible: boolean) {
        this.rectangleMenu.isVisible = isVisible;
        this.buttonMenu.isVisible = !isVisible;
        this.textblockLevel.isVisible = !isVisible;
        this.rectangleTouch.isVisible = !isVisible;
        this.rectangleTop.isVisible = !isVisible;
    }

    public onButtonMenuStart(callback: () => void): void {
        this.buttonMenuStart.onPointerUpObservable.add(callback);
    }

    public onButtonMenu(callback: () => void): void {
        this.buttonMenu.onPointerUpObservable.add(callback);
    }

    public onToggleMusic(callback: () => void): void {
        this.textblockMenuMusic.onPointerUpObservable.add(() => {
            callback(); // Chama o callback passado
            this.toggleMusicIcon(); // Atualiza o ícone da música
        });
    }

    public onButtonLang(callback: () => void): void { // Método para botão de idioma
        this.buttonLang.onPointerUpObservable.add(callback);
    }
    
    public toggleMusicIcon(): void {
        this.isMusicOn = !this.isMusicOn; 
        this.textblockMenuMusic.text = this.isMusicOn ? "🔊" : "🔈";
    }
}
