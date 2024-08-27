import { Scene } from "@babylonjs/core";
import { View } from "../View/View";
import { Model } from "../Model/Model";

export class Controller {
    private model: Model;
    private view: View;
    private scene: Scene;

    constructor(scene: Scene, model: Model, view: View) {
        this.scene = scene;
        this.model = model;
        this.view = view;

        this.setupEventHandlers();
    }

    // Configura os event handlers para a GUI
    private setupEventHandlers() {
        this.view.buttonMenuStart.onPointerUpObservable.add(() => {
            this.handleStartButton();
        });
    }

    // Lógica a ser executada quando o botão de iniciar é pressionado
    private handleStartButton() {
        console.log("Button start pressed");
        // Aqui você poderia iniciar a lógica do jogo, como inicializar a cena do jogo
        this.view.updateMenuVisibility(false); // Exemplo de ocultar o menu
    }
}
