import { Scene, Vector3, Mesh, FollowCamera } from "@babylonjs/core";
import { IModel } from "../Model/IModel";
import { IView } from "../View/IView";
import { CameraController } from "./CameraController";
import { GravityType } from "./GravityType";


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

        this.model.setScoreUpdateCallback((newScore) => {
            this.view.updateScoreText(newScore);
        });

        this.model.setEndGameCallback((isVisible: boolean) => this.showEndGamePanel(isVisible));

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

        this.view.onButtonMenuMoon(() => this.startGame(GravityType.Moon));
        this.view.onButtonMenuJupiter(() => this.startGame(GravityType.Jupiter));
        this.view.onButtonMenuStart(() => this.startGame(GravityType.Earth));
        this.view.onButtonMenuContinuar(() => this.continueGame());
        this.view.onButtonMenu(() => this.showMenu());
        this.view.onToggleMusic(() => this.toggleMusic());
        this.view.onButtonLang(() => this.changeLanguage());

        this.view.buttonUpDown(() => { this.isUpPressed = true; });
        this.view.buttonUpUp(() => { this.isUpPressed = false; });

    }

    private setupCamera(): void {
        this.followCamera = this.scene.activeCamera as FollowCamera;
        this.model.onSpherePlayerMeshReady((mesh) => {
            this.setCameraTarget(mesh);
        });
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

    private startGame(gravity: GravityType): void {
        this.model.setGravity(gravity);
        this.model.backgroundMusic.play();
        this.continueGame();
    }
    private continueGame(){
        this.model.restartModels();
        this.view.updateMainMenuVisibility(false);        
        this.view.showEndGamePanel(false);
        this.view.updateScoreText(0);        
    }

    private showMenu(): void {
        this.model.backgroundMusic.pause();
           // Verifica se o SDK está disponível e exibe o banner
           if (typeof sdk !== 'undefined' && typeof sdk.showBanner === 'function') {
            sdk.showBanner();
        } else {
            console.warn("SDK não disponível ou não inicializado corretamente.");
        }
        this.view.updateMainMenuVisibility(true);
        this.model.restartModels();
    }

    private toggleMusic(): void {
        this.model.toggleMusicPlayback();
    }

    private changeLanguage(): void {
        this.view.changeLanguage();
    }

    private showEndGamePanel(isVisible: boolean): void {
        this.view.showEndGamePanel(isVisible);
    }
}
