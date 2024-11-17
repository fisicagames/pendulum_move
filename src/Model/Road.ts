import {
    Scene,
    MeshBuilder,
    StandardMaterial,
    Vector3,
    PhysicsAggregate,
    PhysicsShapeType,
    PhysicsMotionType,
    TransformNode,
    Mesh,
} from "@babylonjs/core";

export class Road {
    private physicsAggBlock: PhysicsAggregate;
    private physicsAggBlockL: PhysicsAggregate;
    private physicsAggBlocR: PhysicsAggregate;    
    private block: Mesh;
    private blockR: Mesh;
    private blockL: Mesh;
    private scene: Scene;
    public positionX: number;

    constructor(scene: Scene, positionX: number, material: StandardMaterial, roadBlocksNode: TransformNode) {
        this.scene = scene;
        this.positionX = positionX;
        this.createRoadBlock(positionX, material, roadBlocksNode);
    }

    private createRoadBlock(positionX: number, material, roadBlocksNode): void {
        const blockWidth = 8;
        const blockDepth = 17;
        const blockHeight = 0.3;

        // Cria o bloco central
        this.block = MeshBuilder.CreateBox(
            "roadBlock",
            { height: blockHeight, width: blockWidth, depth: blockDepth },
            this.scene
        );
        this.block.position = new Vector3(positionX, -3, 0);
        this.block.material = material;
        this.block.setParent(roadBlocksNode);

        this.blockL = MeshBuilder.CreateBox(
            "roadBlockL",
            { height: blockHeight * 6, width: blockWidth, depth: 2 },
            this.scene
        );
        this.blockL.position = new Vector3(positionX, -3.9, 9.5);
        this.blockL.material = this.block.material;
        this.blockL.setParent(roadBlocksNode);


        this.blockR = MeshBuilder.CreateBox(
            "roadBlockR",
            { height: blockHeight * 6, width: blockWidth, depth: 2 },
            this.scene
        );
        this.blockR.position = new Vector3(positionX, -3.9, -9.5);
        this.blockR.material = this.block.material;
        this.blockR.setParent(roadBlocksNode);


        this.physicsAggBlock = new PhysicsAggregate(this.block, PhysicsShapeType.BOX, { mass: 1, friction: 1.0 }, this.scene);
        this.physicsAggBlockL = new PhysicsAggregate(this.blockL, PhysicsShapeType.BOX, { mass: 1, friction: 1.0 }, this.scene);
        this.physicsAggBlocR = new PhysicsAggregate(this.blockR, PhysicsShapeType.BOX, { mass: 1, friction: 1.0 }, this.scene);

        this.physicsAggBlock.body.setMotionType(PhysicsMotionType.ANIMATED);
        this.physicsAggBlockL.body.setMotionType(PhysicsMotionType.ANIMATED);
        this.physicsAggBlocR.body.setMotionType(PhysicsMotionType.ANIMATED);
    }

    public removeBlock(): void {
        if (this.block) {
            this.block.dispose();
            this.block = null;
        }
        if (this.blockL) {
            this.blockL.dispose();
            this.blockL = null;
        }
        if (this.blockR) {
            this.blockR.dispose();
            this.blockR = null;
        }
        if (this.physicsAggBlock) {
            this.physicsAggBlock.shape.dispose();
            this.physicsAggBlock.dispose();
            this.physicsAggBlock = null;
        }
    
        if (this.physicsAggBlockL) {
            if (this.physicsAggBlockL.transformNode) {
                this.physicsAggBlockL.transformNode.dispose();
            }
            this.physicsAggBlockL.shape.dispose();
            this.physicsAggBlockL.dispose();
            this.physicsAggBlockL = null;
        }
    
        if (this.physicsAggBlocR) {
            if (this.physicsAggBlocR.transformNode) {
                this.physicsAggBlocR.transformNode.dispose();
            }
            this.physicsAggBlocR.shape.dispose();
            this.physicsAggBlocR.dispose();
            this.physicsAggBlocR = null;
        }
        this.scene = null;
    }
}
