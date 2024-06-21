import { Scene, VirtualJoystick } from "@babylonjs/core";
import "@babylonjs/inspector";

export class InspectorDebugModel {
    private static toggleCameraCallback: (ev: KeyboardEvent) => void;
    private static toggleDebugCallback: (ev: KeyboardEvent) => void;
    private static toggleJoystickCallback: (ev: KeyboardEvent) => void;

    private static setupEventListeners(scene: Scene): void {
        this.toggleDebugCallback = (ev: KeyboardEvent) => {
            if (ev.shiftKey && (ev.key === "d" || ev.key === "D")) {
                this.toggleInspectorVisibility(scene);
            }
        };

        this.toggleCameraCallback = (ev: KeyboardEvent) => {
            if (ev.shiftKey && (ev.key === "c" || ev.key === "C")) {
                this.toggleCamera(scene);
            }
        };

        this.toggleJoystickCallback = (ev: KeyboardEvent) => {
            if (ev.shiftKey && (ev.key === "j" || ev.key === "J")) {
                this.toggleJoystick();
            }
        };

        window.addEventListener("keydown", this.toggleDebugCallback);
        window.addEventListener("keydown", this.toggleCameraCallback);
        window.addEventListener("keydown", this.toggleJoystickCallback);
    }

    private static toggleCamera(scene: Scene): void {
        if (scene.activeCamera === scene.getCameraByName("UniversalCamera")) {
            scene.setActiveCameraByName("FollowCam");
        } else {
            scene.setActiveCameraByName("UniversalCamera");
        }
    }

    private static toggleInspectorVisibility(scene: Scene): void {
        if (scene.debugLayer.isVisible()) {
            scene.debugLayer.hide();            
        } else {
            scene.debugLayer.show();            
        }
    }

    private static toggleJoystick(): void {
        const joystickZIndex = VirtualJoystick.Canvas.style.zIndex;
        if (joystickZIndex === "4") {
            VirtualJoystick.Canvas.style.zIndex = "-1";
        } else {
            VirtualJoystick.Canvas.style.zIndex = "4";
        }
    }

    public static disable(): void {
        window.removeEventListener("keydown", this.toggleDebugCallback);
        window.removeEventListener("keydown", this.toggleCameraCallback);
        window.removeEventListener("keydown", this.toggleJoystickCallback);
    }

    public static enable(scene: Scene): void {
        this.setupEventListeners(scene);
        console.log("Inspector mode enable: SHIFT+d for debug, SHIFT+c for camera, and SHIFT+j for joystick");
    }
}