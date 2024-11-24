export class ViewPendulumPhrase {
    public static getRandomPendulumPhrase(): string {
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
            "⚖️ A energia potencial máxima do pêndulo ocorre na sua altura máxima e é convertida completamente em energia cinética no ponto mais baixo."
        ];

        return phrases[Math.floor(Math.random() * phrases.length)];
    }
}
