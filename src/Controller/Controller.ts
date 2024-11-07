// src/Controller/Controller.ts
import { Scene, Vector3, Mesh, FollowCamera } from "@babylonjs/core";
import { IModel } from "../Model/IModel";
import { IView } from "../View/IView";
import { CameraController } from "./CameraController";

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

        this.setupCamera();

        this.view.onButtonMenuStart(() => this.startGame());
        this.view.onButtonMenu(() => this.showMenu());
        this.view.onToggleMusic(() => this.toggleMusic());
        this.view.onButtonLang(() => this.changeLanguage());

        scene.onBeforeRenderObservable.add(() => {
            this.updateCameraPosition();
        });

        // Inicializa o monitor de performance
    }

    private setupCamera(): void {
        this.setCameraTarget(this.model.spherePlayer.mesh);
    }

    public setCameraTarget(target: Vector3 | Mesh): void {
        if (target instanceof Mesh) {
            this.followCameraTarget = target;
        } else if (target instanceof Vector3) {
            this.followCamera.lockedTarget = null; 
            this.followCamera.setTarget(target);   
        }
    }

    private updateCameraPosition(): void {
        if (this.followCameraTarget && this.followCamera) {
            CameraController.updatePosition(this.followCamera, this.followCameraTarget);
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
