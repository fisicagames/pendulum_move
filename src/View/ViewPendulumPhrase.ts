export class ViewPendulumPhrase {
    public static getRandomPendulumPhrase(languageOption: number): string {
        const phrasesPt = [
            "O período de oscilação de um pêndulo simples depende do comprimento do fio e da aceleração da gravidade.",
            "Quanto maior o comprimento do fio (L), maior será o período do pêndulo (T), conforme T = 2π√(L/g).",
            "A aceleração da gravidade (g) afeta diretamente o período de oscilação: em planetas com menor gravidade, o período é maior.",
            "A fórmula do período de um pêndulo simples é T = 2π√(L/g), onde L é o comprimento do fio e g é a aceleração da gravidade.",
            "O movimento do pêndulo é harmônico simples quando o ângulo de oscilação é pequeno, geralmente inferior a 15 graus.",
            "A resistência do ar pode reduzir a amplitude do pêndulo ao longo do tempo, mas não altera significativamente o período para oscilações pequenas.",
            "O período de oscilação de um pêndulo não depende da amplitude, desde que o ângulo de oscilação seja pequeno.",
            "O movimento do pêndulo exemplifica a conversão entre energia potencial gravitacional e energia cinética.",
            "Em um pêndulo simples, a aceleração da gravidade (g) determina a frequência das oscilações, resultando em períodos menores em planetas com maior gravidade.",
            "O comprimento do fio e o período do pêndulo são proporcionais à raiz quadrada, de modo que, ao dobrar o comprimento, o período aumenta por um fator de √2.",
            "A amplitude inicial de um pêndulo simples, para pequenos ângulos, não influencia o período, mas determina o deslocamento angular.",
            "A energia potencial máxima do pêndulo ocorre na posição de altura máxima e é completamente convertida em energia cinética na posição mais baixa."
        ];

        const phrasesEn = [
            "The oscillation period of a simple pendulum depends on the string length and the acceleration due to gravity.",
            "The longer the string (L), the longer the pendulum's period (T), as given by T = 2π√(L/g).",
            "The acceleration due to gravity (g) directly influences the period: on planets with lower gravity, the period increases.",
            "The formula for the period of a simple pendulum is T = 2π√(L/g), where L is the string length and g is the acceleration due to gravity.",
            "The motion of a pendulum is simple harmonic when the oscillation angle is small, typically less than 15 degrees.",
            "Air resistance can reduce the pendulum's amplitude over time but does not significantly affect the period for small oscillations.",
            "The oscillation period of a pendulum does not depend on its amplitude, provided the oscillation angle remains small.",
            "The motion of a pendulum is a classic example of energy conversion between gravitational potential energy and kinetic energy.",
            "In a simple pendulum, the acceleration due to gravity (g) determines the oscillation frequency, resulting in shorter periods on planets with higher gravity.",
            "The string length and period of a pendulum are proportional to the square root, so doubling the length increases the period by a factor of √2.",
            "The initial amplitude of a simple pendulum, for small angles, does not affect the period but determines the angular displacement.",
            "The maximum potential energy of the pendulum is at its highest point and is fully converted to kinetic energy at its lowest point."
        ];

        if (languageOption === 1) {
            return phrasesEn[Math.floor(Math.random() * phrasesEn.length)];
        } else {
            return phrasesPt[Math.floor(Math.random() * phrasesPt.length)];
        }
    }
}
