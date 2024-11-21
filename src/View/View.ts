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
    private textblockCenterPhrase: TextBlock;

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
        this.textblockCenterPhrase = this.advancedTexture.getControlByName("TextblockCenterPhrase") as TextBlock;
        this.textblockCenterPhrase.isVisible = false;
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
        if(isVisible && !this.textblockCenterPhrase.isVisible) {
            this.textblockCenterPhrase.isVisible = isVisible;    
            this.textblockCenterPhrase.text = this.getRandomPendulumPhrase();
        }
        else{
            this.textblockCenterPhrase.isVisible = isVisible;
        }        
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
    private getRandomPendulumPhrase(): string {
        const phrases = [
            "⏱️ O período de oscilação de um pêndulo simples depende unicamente do comprimento do fio e da aceleração da gravidade.",
            "⚖️ Quanto maior o comprimento do fio (L), maior será o período do pêndulo (T), pois T = 2π√(L/g).",
            "🌍 A aceleração da gravidade (g) afeta diretamente o tempo de oscilação: em planetas com menor gravidade, o período aumenta.",
            "📏 A equação do período de um pêndulo simples é T = 2π√(L/g), onde L é o comprimento do fio e g é a aceleração da gravidade.",
            "⚙️ O movimento do pêndulo é considerado harmônico simples quando o ângulo de oscilação é pequeno (menor que 15°).",
            "💨 A resistência do ar pode diminuir a amplitude do pêndulo ao longo do tempo, mas não altera o período em grandezas pequenas.",
            "🪝 O período de oscilação de um pêndulo não depende da sua amplitude, desde que o ângulo de oscilação seja pequeno.",
            "🔄 O movimento do pêndulo é um exemplo clássico de conversão de energia potencial gravitacional em energia cinética e vice-versa.",
            "🌐 Em um pêndulo simples, a aceleração da gravidade (g) determina a rapidez com que o pêndulo oscila, fazendo com que em Júpiter o período seja menor que na Terra.",
            "🔬 A relação entre o comprimento do fio e o período é diretamente proporcional à raiz quadrada, ou seja, dobrando o comprimento, o período aumenta por √2.",
            "📊 A amplitude inicial de um pêndulo simples (para pequenos ângulos) não influencia o tempo de oscilação, apenas o deslocamento angular.",
            "⚖️ A energia potencial máxima do pêndulo ocorre quando ele atinge o ponto mais alto de sua oscilação, enquanto a energia cinética é máxima no ponto de menor altura.",
            "🎯 Em um pêndulo simples, o período de oscilação é independente da massa do corpo, desde que o fio seja inelástico e sem massa.",
            "⏳ O tempo necessário para o pêndulo realizar uma oscilação completa não depende da sua velocidade inicial, mas sim das propriedades do sistema (comprimento e gravidade).",
            "🪐 O efeito gravitacional em planetas com maior massa (como Júpiter) faz com que o período do pêndulo seja mais curto que na Terra.",
            "🔋 A energia total do pêndulo simples é constante, sendo trocada entre energia potencial (no ponto mais alto) e energia cinética (no ponto mais baixo).",
            "⚙️ A velocidade máxima do pêndulo ocorre quando ele passa pelo ponto de equilíbrio (ponto mais baixo da oscilação).",
            "📏 O comprimento do fio é o principal fator que determina o período de oscilação, não sendo influenciado pela massa do objeto que está suspenso.",
            "🕰️ Em um pêndulo simples, o período de oscilação é diretamente proporcional à raiz quadrada do comprimento do fio e inversamente proporcional à raiz quadrada da aceleração da gravidade.",
            "⚖️ O ângulo de oscilação de um pêndulo simples deve ser pequeno (menos de 15°) para que o movimento seja considerado harmônico simples."
        ];
    
        // Retorna uma string aleatória da lista
        return phrases[Math.floor(Math.random() * phrases.length)];
    }
    
}
