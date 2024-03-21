import React, { Suspense, useRef } from "react";
import { ContactShadows, Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Material } from "three";
import type { Group } from "three";import { Canvas } from "@react-three/fiber";
 interface Object3D {
    isMesh?: any,
    geometry?: any,
    material?: any
}
interface GLTFResult {
    nodes: Record<string, Object3D>,
    materials: Record<string, Material>
}
export const Model = () => {
    const { nodes, materials } = useGLTF("/3dModels/Brain.glb") as GLTFResult;;
    const groupRef = useRef<Group>(null);
    return (
        <group
            dispose={null}
            scale={0.7}
            ref={groupRef}
            position={[-0.5, -1.5, 5.8]}
            rotation={[0, 2, 0]}
        >
            <group scale={1.081}>
                <group scale={0.01}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.centre08.geometry}
                        material={materials.white}
                        position={[0, 209.806, 0]}
                        scale={0.061}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.left08_002.geometry}
                        material={materials.black}
                        position={[0, 209.806, 0]}
                        scale={0.061}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.left08.geometry}
                        material={materials.black}
                        position={[0, 209.806, 0]}
                        scale={0.061}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.right08_.geometry}
                        material={materials.black}
                        position={[0, 209.806, 0]}
                        scale={0.061}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.right08001.geometry}
                        material={materials.black}
                        position={[0, 209.806, 0]}
                        scale={0.061}
                    />
                </group>
            </group>
        </group>
    );
};
export const Brain = () => {
    return (
        <Canvas camera={{ position: [-5, -30, -15], fov: 55 }}>
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            <Suspense fallback={null}>
                <group rotation={[0, Math.PI, 0]} position={[0, -0.8, 0]} scale={2.3}>
                    <Model />
                </group>
                <Environment preset="city" />
            </Suspense>
            <ContactShadows position={[0, -4.5, 0]} scale={20} blur={2} far={4.5} />
            {/* <OrbitControls enablePan={false} enableZoom={true} minPolarAngle={Math.PI / 2.2} maxPolarAngle={Math.PI / 2.2} /> */}
            {/* <OrbitControls enablePan={false} enableZoom={true} minDistance={13} /> */}
            <OrbitControls minPolarAngle={Math.PI / 2.2} maxPolarAngle={Math.PI / 2} minDistance={18.09} maxDistance={35} />
        </Canvas>
    )
}
useGLTF.preload("/3dModels/Brain.glb");