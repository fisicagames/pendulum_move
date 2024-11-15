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

    private isUpPressed: boolean = false;
    private isDownPressed: boolean = false;
    private isLeftPressed: boolean = false;
    private isRightPressed: boolean = false;

    constructor(scene: Scene, model: IModel, view: IView) {
        this.scene = scene;
        this.model = model;
        this.view = view;
        this.setupControls();
        this.setupCamera();
        this.update();
    }

    private update() {
        this.scene.onBeforeRenderObservable.add(() => {

            this.updateCameraPosition();

            let force = new Vector3(0, 0, 0);

            if (this.isUpPressed) force.addInPlace(new Vector3(25, -10, 0));
            
            if (!force.equals(Vector3.Zero())) {
                this.model.applyForce(force);
            }
        });
    }
    private setupControls() {

        this.view.onButtonMenuStart(() => this.startGame());
        this.view.onButtonMenu(() => this.showMenu());
        this.view.onToggleMusic(() => this.toggleMusic());
        this.view.onButtonLang(() => this.changeLanguage());

        this.view.buttonUpDown(() => { this.isUpPressed = true; });
        this.view.buttonUpUp(() => { this.isUpPressed = false; });

    }

    private setupCamera(): void {
        this.followCamera = this.scene.activeCamera as FollowCamera;
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
