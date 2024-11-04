// src/CameraController/CameraController.ts
import { Vector3, FollowCamera, Mesh } from "@babylonjs/core";

export class CameraController {
    // Método estático para atualizar a posição da câmera
    public static updatePosition(followCamera: FollowCamera, followCameraTarget: Mesh): void {
        if (followCamera && followCameraTarget) {
            const offset = new Vector3(-15, 6, 0); 
            const targetPosition = followCameraTarget.position.add(offset);
            targetPosition.y = 4;
            followCamera.position = targetPosition;

            const targetOffset = followCameraTarget.position.subtract(new Vector3(0, -3, 0));
            followCamera.setTarget(targetOffset); 
        }
    }
}
