import { AdvancedDynamicTexture, TextBlock, Button } from "@babylonjs/gui";

export class ViewLanguageSwitcher {
    public languageOption: number;
    private strings: Record<string, string[]>;

    constructor() {
        //TODO: Implement language option: Portugues and English.
        this.languageOption = 0;
        this.strings = {
            ButtonLang: ["ENGLISH", "PORTUGUÊS"],
            TextblockMeta: ["Objetivo: chute a bola e marque gols desviando dos pêndulos.", "Kick the ball and score goals while avoiding the pendulums."],
            TextblockTitle: ["Pendulum Goal", "Pendulum Goal"], 
            ButtonMenuStart: ["Terra: g = 9,8 m/s²", "Earth: g = 9.8 m/s²"],
            ButtonMenuStartMoon: ["Lua: g = 1,6 m/s²", "Moon: g = 1.6 m/s²"],
            ButtonMenuStartJupiter: ["Júpiter: g = 24,8 m/s²", "Jupiter: g = 24.8 m/s²"],
            TextblockMenuScore: ["Maior pontuação:", "High Score:"],
            TextblockSecond: ["O pêndulo maior tem 22 m e o menor 6 m.", "Larger pendulum is 22 m, smaller is 6 m." ],
            TextBlockThird: ["T: período (s), L: comprimento (m).","T: period (s), L: length (m)."],
            TextBlockQuarter: ["g: aceleração da gravidade (m/s²).","g: gravitational acceleration (m/s²)."],
            ButtonMenuContinuar: ["Reiniciar","Restart"],
            TextblockScoreGame: ["Pontos:  000","Points: 000"],
            TextblockMusic: ["Música:","Music:"]
        };
    }

    public changeLanguage(advancedTexture: AdvancedDynamicTexture): void {
        this.languageOption = this.languageOption === 0 ? 1 : 0;
        this.updateText(advancedTexture);
    }

    public updateText(advancedTexture: AdvancedDynamicTexture): void {
        for (const key in this.strings) {
            if (this.strings.hasOwnProperty(key)) {
                const translations = this.strings[key];
                const control = advancedTexture.getControlByName(key);

                if (control instanceof TextBlock) {
                    control.text = translations[this.languageOption];
                } else if (control instanceof Button) {
                    control.textBlock.text = translations[this.languageOption];
                }
            }
        }
    }

    public getCurrentLanguage(): number {
        return this.languageOption;
    }

    public getTranslation(key: string): string {
        return this.strings[key][this.languageOption];
    }
}
