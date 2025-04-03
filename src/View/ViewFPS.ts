// src\View\View.ts
import { Scene, Vector3, Mesh } from "@babylonjs/core";
import { AdvancedDynamicTexture, Button, Rectangle, TextBlock } from "@babylonjs/gui";
import { IView } from "./IView";
import { ViewLanguageSwitcher } from "./ViewLanguageSwitcher";
import { ViewBallOutPhrase } from "./ViewBallOutPhrase";
import { ViewPendulumPhrase } from "./ViewPendulumPhrase";
import { LanguageManager } from "./LanguageDetector";

export class View implements IView {
    private scene: Scene;
    public advancedTexture: AdvancedDynamicTexture;
    private rectangleMenu: Rectangle;
    private buttonMenuStart: Button;
    private buttonMenuMoon: Button;
    private buttonMenuJupiter: Button;
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
    private textblockCenterPhrase: TextBlock;
    private textblockSecond: TextBlock;

    private nFrames: number = -240;
    private sumFrames: number = 0;
    private sumDropFrames: number = 0;

    constructor(scene: Scene, advancedTexture: AdvancedDynamicTexture) {
        this.scene = scene;
        this.advancedTexture = advancedTexture;
        this.languageSwitcher = new ViewLanguageSwitcher();
        this.initializeGUI();
        //Feature added on 2024-12-14: Automatically set the language based on the browser's settings.
        LanguageManager.detectAndSetLanguage(() => this.changeLanguage());
        this.scene.onBeforeRenderObservable.add(() => {
            this.nFrames += 1;
            let fpsRate = this.scene.getEngine().getFps();
            if (this.nFrames > 0 && this.nFrames <= 1000) {
                this.sumFrames += fpsRate;
                if (fpsRate < 30) this.sumDropFrames++;
                this.textblockSecond.text = `FPS médio: ${(this.sumFrames/this.nFrames).toFixed(1).replace('.', ',')}  FPS drop: ${(this.sumDropFrames).toFixed(0).replace('.', ',')}/${this.nFrames}`;
            }

        });
    }

    public changeLanguage(): void {
        this.languageSwitcher.changeLanguage(this.advancedTexture);
    }

    private initializeGUI() {
        this.buttonMenuStart = this.advancedTexture.getControlByName("ButtonMenuStart") as Button;
        this.buttonMenuMoon = this.advancedTexture.getControlByName("ButtonMenuStartMoon") as Button;
        this.buttonMenuJupiter = this.advancedTexture.getControlByName("ButtonMenuStartJupiter") as Button;
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
        this.textblockCenterPhrase = this.advancedTexture.getControlByName("TextblockCenterPhrase") as TextBlock;
        this.textblockCenterPhrase.isVisible = false;
        this.textblockSecond = this.advancedTexture.getControlByName("TextblockSecond") as TextBlock;
    }

    public updateMainMenuVisibility(isVisible: boolean) {
        this.rectangleMenu.isVisible = isVisible;        
        this.buttonMenu.isVisible = !isVisible;
        this.textblockLevel.isVisible = !isVisible;
        this.rectangleTouch.isVisible = !isVisible;
        this.rectangleTop.isVisible = !isVisible;
        this.rectangleGame.isVisible = !isVisible;
        this.textblockCenterPhrase.isVisible = !isVisible;
    }

    public onButtonMenuStart(callback: () => void): void {
        this.buttonMenuStart.onPointerUpObservable.add(callback);
    }
    public onButtonMenuMoon(callback: () => void): void {
        this.buttonMenuMoon.onPointerUpObservable.add(callback);
    }
    public onButtonMenuJupiter(callback: () => void): void {
        this.buttonMenuJupiter.onPointerUpObservable.add(callback);
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
        //TODO: Remove next two lines for run only when endGame event. Send to show end game?
        this.textblockTotalScore.text = `Goals: ` + this.getScoreDisplay(newScore) + ` 🏆`;
        this.textblockScoreGame.text = ViewBallOutPhrase.getRandomBallOutPhrase(this.languageSwitcher.languageOption);
        if(this.topScore < newScore && !this.rectangleMenu.isVisible) {
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
        if(isVisible && !this.textblockCenterPhrase.isVisible) {
            this.textblockCenterPhrase.isVisible = isVisible;    
            this.textblockCenterPhrase.text = ViewPendulumPhrase.getRandomPendulumPhrase(this.languageSwitcher.languageOption);
        }
        else{
            this.textblockCenterPhrase.isVisible = isVisible;
        }        
    }
}
