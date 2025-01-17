export class ViewBallOutPhrase {
    public static getRandomBallOutPhrase(languageOption: number): string {
        const phrasesPt = [
            "⚽ Bola Fora!",
            "⚽❌ Fora!",
            "🥅➡️ Bola Fora!",
            "🚩⚽ Bola Fora!",
            "⚽🙀 Oops! Bola Fora!",
            "⚽❌ Fora!",
            "🛑⚽ Fora de campo!",
            "⚽🤦‍♂️ Bola Fora!",
        ];

        const phrasesEn = [
            "⚽ Ball Out!",
            "⚽❌ Out!",
            "🥅➡️ Ball Out!",
            "🚩⚽ Ball Out!",
            "⚽🙀 Oops! Ball Out!",
            "⚽❌ Out!",
            "🛑⚽ Out of the field!",
            "⚽🤦‍♂️ Ball Out!",
        ];

        if (languageOption === 1) {
            return phrasesEn[Math.floor(Math.random() * phrasesEn.length)];
        } else {
            return phrasesPt[Math.floor(Math.random() * phrasesPt.length)];
        }
    }
}
