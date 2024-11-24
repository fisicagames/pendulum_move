export class ViewBallOutPhrase {
    public static getRandomBallOutPhrase(): string {
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

        return phrases[Math.floor(Math.random() * phrases.length)];
    }
}
