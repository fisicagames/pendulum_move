// src\View\View.ts
import { Scene, Vector3, Mesh } from "@babylonjs/core";
import { AdvancedDynamicTexture, Button, Rectangle, TextBlock } from "@babylonjs/gui";
import { IView } from "./IView";
import { ViewLanguageSwitcher } from "./ViewLanguageSwitcher";
//TODO: Display pendulum variables in the GUI for the physics simulation.
export class View implements IView {
    private scene: Scene;
    public advancedTexture: AdvancedDynamicTexture;
    private rectangleMenu: Rectangle;
    private buttonMenuStart: Button;
    private buttonMenuContinuar: Button;
    private buttonMenu: Button;
    private textblockLevel: TextBlock;
    private rectangleTouch: Rectangle;
    private rectangleTop: Rectangle;
    public textblockMenuMusic: TextBlock;
    private isMusicOn: boolean = true;
    private buttonLang: Button;
    private languageSwitcher: ViewLanguageSwitcher;
    private buttonUp: Button;
    private buttonDown: Button;
    private buttonRight: Button;
    private buttonLeft: Button;

    private rectangleGame: Rectangle;
    private textblockMenuBest: TextBlock;
    private textblockTotalScore: TextBlock;

    private topScore: number = 0;

    private textblockScoreGame: TextBlock;

    constructor(scene: Scene, advancedTexture: AdvancedDynamicTexture) {
        this.scene = scene;
        this.advancedTexture = advancedTexture;
        this.languageSwitcher = new ViewLanguageSwitcher();
        this.initializeGUI();
    }

    public changeLanguage(): void {
        this.languageSwitcher.changeLanguage(this.advancedTexture);
    }

    private initializeGUI() {
        this.buttonMenuStart = this.advancedTexture.getControlByName("ButtonMenuStart") as Button;
        this.buttonMenu = this.advancedTexture.getControlByName("ButtonMenu") as Button;
        this.buttonMenu.isVisible = false;
        this.buttonMenuContinuar = this.advancedTexture.getControlByName("ButtonMenuContinuar") as Button;        
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

        this.buttonUp = this.advancedTexture.getControlByName("ButtonUp") as Button;
        this.buttonDown = this.advancedTexture.getControlByName("ButtonDown") as Button;
        this.buttonLeft = this.advancedTexture.getControlByName("ButtonRight") as Button;
        this.buttonRight = this.advancedTexture.getControlByName("ButtonLeft") as Button;

        this.buttonDown.isVisible = false;
        this.buttonRight.isVisible = false;
        this.buttonLeft.isVisible = false;

        this.rectangleGame = this.advancedTexture.getControlByName("RectangleGame") as Rectangle;
        this.rectangleGame.isVisible = false;

        this.textblockMenuBest = this.advancedTexture.getControlByName("TextblockMenuBest") as TextBlock;
        this.textblockTotalScore = this.advancedTexture.getControlByName("TextblockTotalScore") as TextBlock;
        this.textblockScoreGame = this.advancedTexture.getControlByName("TextblockScoreGame") as TextBlock;
        
    }

    public updateMainMenuVisibility(isVisible: boolean) {
        this.rectangleMenu.isVisible = isVisible;        
        this.buttonMenu.isVisible = !isVisible;
        this.textblockLevel.isVisible = !isVisible;
        this.rectangleTouch.isVisible = !isVisible;
        this.rectangleTop.isVisible = !isVisible;
        this.rectangleGame.isVisible = !isVisible;
    }

    public onButtonMenuStart(callback: () => void): void {
        this.buttonMenuStart.onPointerUpObservable.add(callback);
    }
    public onButtonMenuContinuar(callback: () => void): void {
        this.buttonMenuContinuar.onPointerUpObservable.add(callback);
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

    public onButtonLang(callback: () => void): void {
        this.buttonLang.onPointerUpObservable.add(callback);
    }
    
    public toggleMusicIcon(): void {
        this.isMusicOn = !this.isMusicOn; 
        this.textblockMenuMusic.text = this.isMusicOn ? "🔊" : "🔈";
    }

    public buttonUpUp(callback: () => void): void {
        this.buttonUp.onPointerUpObservable.add(callback);
    }
    public buttonDownUp(callback: () => void): void {
        this.buttonDown.onPointerUpObservable.add(callback);
    }
    public buttonRightUp(callback: () => void): void {
        this.buttonRight.onPointerUpObservable.add(callback);
    }
    public buttonLeftUp(callback: () => void): void {
        this.buttonLeft.onPointerUpObservable.add(callback);
    }
    public buttonUpDown(callback: () => void): void {
        this.buttonUp.onPointerDownObservable.add(callback);
    }
    public buttonDownDown(callback: () => void): void {
        this.buttonDown.onPointerDownObservable.add(callback);
    }
    public buttonRightDown(callback: () => void): void {
        this.buttonRight.onPointerDownObservable.add(callback);
    }
    public buttonLeftDown(callback: () => void): void {
        this.buttonLeft.onPointerDownObservable.add(callback);
    }

    public updateScoreText(newScore: number): void {
        this.textblockLevel.text = `Goals: ` + this.getScoreDisplay(newScore);
        //TODO: Remove next two lines for run only when endGame event.
        this.textblockTotalScore.text = `Goals: ` + this.getScoreDisplay(newScore) + ` 🏆`;
        this.textblockScoreGame.text = this.getRandomBolaFora();
        if(this.topScore < newScore) {
            this.topScore = newScore;
            this.textblockMenuBest.text = this.getScoreDisplay(newScore) + ` 🏆`;
        }
    }

    private getScoreDisplay(score: number): string {
        if (score < 10) {
            return `${score}`;
        } else if (score < 30) {
            return `${score} 🥉`; 
        } else if (score < 60) {
            return `${score} 🥈`; 
        } else {
            return `${score} 🥇`; 
        }
    }

    public showEndGamePanel(isVisible: boolean): void {
        this.rectangleGame.isVisible = isVisible;
    }

    private getRandomBolaFora(): string {
        const phrases = [
            "⚽ Bola Fora! 🚫",
            "⚽❌ Fora!",
            "🥅 ➡️ Bola Fora!",
            "⚽⬅️ Fora do Jogo!",
            "🚩⚽ Bola Fora!",
            "⚽🙀 Oops! Bola Fora!",
            "⚽💨❌ Fora!",
            "🛑⚽ Fora de campo!",
            "😬⚽ Saiu!",
            "⚽🤦‍♂️ Bola Fora!",
            "🏃‍♂️⚽💥 Bola bem fora!",
            "💢⚽ Fora da Área!",
            "🎯❌ Errou! Bola Fora!",
            "⚽✨ Fora de Controle!",
            "🚫⚽🌀 Desastre! Bola Fora!"
        ];
    
        // Retorna uma string aleatória da lista
        return phrases[Math.floor(Math.random() * phrases.length)];
    }
}
