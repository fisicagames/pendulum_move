export interface IView {
    onButtonMenuStart(callback: () => void): void;
    onButtonMenu(callback: () => void): void;
    onToggleMusic(callback: () => void): void;
    onButtonLang(callback: () => void): void; // Novo método para o botão de idioma
    updateMainMenuVisibility(isVisible: boolean): void;
}
