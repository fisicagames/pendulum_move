import {
    Scene,
    Mesh,
    MeshBuilder,
    StandardMaterial,
    Vector3,
    PhysicsAggregate,
    PhysicsShapeType,
    PhysicsMotionType,
    TransformNode,
} from "@babylonjs/core";

export class Road {
    public blocks: Mesh[];
    public physicsAggregates: PhysicsAggregate[];
    private scene: Scene;

    constructor(scene: Scene, positionX: number, materials: { light: StandardMaterial; dark: StandardMaterial }) {
        this.scene = scene;
        this.blocks = [];
        this.physicsAggregates = [];
        this.createRoadBlock(positionX, materials);
    }

    private createRoadBlock(positionX: number, materials: { light: StandardMaterial; dark: StandardMaterial }): void {
        const blockWidth = 8;
        const blockDepth = 17;
        const blockHeight = 0.3;

        // Cria o bloco central
        const block = MeshBuilder.CreateBox(
            "roadBlock",
            { height: blockHeight, width: blockWidth, depth: blockDepth },
            this.scene
        );
        block.position = new Vector3(positionX, -3, 0);
        block.material = positionX % 2 === 0 ? materials.light : materials.dark;

        // Cria o bloco lateral esquerdo
        const blockL = MeshBuilder.CreateBox(
            "roadBlockL",
            { height: blockHeight * 6, width: blockWidth, depth: 2 },
            this.scene
        );
        blockL.position = new Vector3(positionX, -3.9, 9.5);
        blockL.material = block.material;

        // Cria o bloco lateral direito
        const blockR = MeshBuilder.CreateBox(
            "roadBlockR",
            { height: blockHeight * 6, width: blockWidth, depth: 2 },
            this.scene
        );
        blockR.position = new Vector3(positionX, -3.9, -9.5);
        blockR.material = block.material;

        // Configura física
        const physicsBlock = new PhysicsAggregate(block, PhysicsShapeType.BOX, { mass: 1, friction: 1.0 }, this.scene);
        const physicsBlockL = new PhysicsAggregate(blockL, PhysicsShapeType.BOX, { mass: 1, friction: 1.0 }, this.scene);
        const physicsBlockR = new PhysicsAggregate(blockR, PhysicsShapeType.BOX, { mass: 1, friction: 1.0 }, this.scene);

        physicsBlock.body.setMotionType(PhysicsMotionType.ANIMATED);
        physicsBlockL.body.setMotionType(PhysicsMotionType.ANIMATED);
        physicsBlockR.body.setMotionType(PhysicsMotionType.ANIMATED);

        // Armazena os blocos e as físicas
        this.blocks.push(block, blockL, blockR);
        this.physicsAggregates.push(physicsBlock, physicsBlockL, physicsBlockR);
    }
}
