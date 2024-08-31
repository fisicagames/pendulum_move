// src\Controller\Controller.ts
import { Scene, Vector3, Mesh, FollowCamera } from "@babylonjs/core";
import { IModel } from "../Model/IModel";
import { IView } from "../View/IView";

export class Controller {
    private scene: Scene;
    private model: IModel;
    private view: IView;
    private followCamera: FollowCamera;
    private followCameraTarget: Mesh | null = null;

    constructor(scene: Scene, model: IModel, view: IView) {
        this.scene = scene;
        this.model = model;
        this.view = view;
        this.followCamera = this.scene.activeCamera as FollowCamera;

        // Exemplo de chamada para configurar a câmera quando necessário
        this.setupCamera();

        // Registrar eventos e callbacks relacionados ao View e Model
        this.view.onButtonMenuStart(() => this.startGame());
        this.view.onButtonMenu(() => this.showMenu());
        this.view.onToggleMusic(() => this.toggleMusic());
        this.view.onButtonLang(() => this.changeLanguage());

        // Se houver atualizações de posição na câmera, gerencie aqui
        scene.onBeforeRenderObservable.add(() => {
            this.updateCameraPosition();
        });
    }

    private setupCamera(): void {
        this.setCameraTarget(this.model.spherePlayer);
    }

    public setCameraTarget(target: Vector3 | Mesh): void {
        if (target instanceof Mesh) {
            this.followCameraTarget = target;
        } else if (target instanceof Vector3) {
            this.followCamera.lockedTarget = null; // Remover qualquer target fixo
            this.followCamera.setTarget(target);   // Definir a nova posição
        }
    }

    private updateCameraPosition(): void {
        if (this.followCameraTarget && this.followCamera) {
            const offset = new Vector3(-15, 6, 0); 
            const targetPosition = this.followCameraTarget.position.add(offset);
            targetPosition.y = 6;
            targetPosition.z = 0;
            this.followCamera.position = Vector3.Lerp(this.followCamera.position, targetPosition, 0.1); 
            const targetOffset = this.followCameraTarget.position.subtract(new Vector3(0, -3, 0));
            this.followCamera.setTarget(targetOffset); 
        }
    }

    private startGame(): void {
        this.view.updateMainMenuVisibility(false);
    }

    private showMenu(): void {
        this.view.updateMainMenuVisibility(true);
    }

    private toggleMusic(): void {
        this.model.toggleMusicPlayback();
    }

    private changeLanguage(): void {
        this.view.changeLanguage();
    }
}
