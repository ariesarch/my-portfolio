'use client'
import { Center, Environment, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense } from "react";
import { useGLTF, Html, ContactShadows } from "@react-three/drei";
import { Material } from "three";
import React, { useRef } from "react";
import type { Group } from "three";
import * as THREE from 'three'
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/variants";
import Image from "next/image";
interface Object3D {
    isMesh?: any,
    geometry?: any,
    material?: any
}
interface GLTFResult {
    nodes: Record<string, Object3D>,
    materials: Record<string, Material>
}
const Model = () => {
    const { nodes, materials } = useGLTF("/3dModels/MacDraco.glb") as GLTFResult;
    const groupRef = useRef<Group>(null);
    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        // groupRef.current!.rotation.x = THREE.MathUtils.lerp(groupRef.current!.rotation.x, Math.cos(t / 2) / 20 + 0.25, 0.1)
        // groupRef.current!.rotation.y = THREE.MathUtils.lerp(groupRef.current!.rotation.y, Math.sin(t / 4) / 20, 0.1)
        // groupRef.current!.rotation.z = THREE.MathUtils.lerp(groupRef.current!.rotation.z, Math.sin(t / 8) / 20, 0.1)
        // groupRef.current!.position.y = THREE.MathUtils.lerp(groupRef.current!.position.y, (-2 + Math.sin(t / 2)) / 2, 0.1)
    })
    return (
        // <group ref={groupRef} dispose={null} rotation={[0.28, 0.34, -0.1]}>
        <group ref={groupRef} dispose={null} rotation={[0.28, 0.34, -0.1]}>
            {/* <group position={[0.002, -0.038, 0.414]} rotation={[0.014, 0, 0]}> */}
            {/* <group rotation-x={-0.425} position={[0, -0.04, 0.41]}> */}
            <group rotation-x={-0.425} position={[0, -0.01, 0.41]} scale={1}>

                <group position={[0, 2.965, -0.001]} rotation={[Math.PI / 2, 0, 0]}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Cube008.geometry}
                        material={materials.aluminium}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Cube008_1.geometry}
                        material={materials["matte.001"]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Cube008_2.geometry}
                        material={materials["screen.001"]}
                    />
                    <mesh geometry={nodes['Cube008_2'].geometry}>
                        {/* Drei's HTML component can "hide behind" canvas geometry */}
                        {/* <Html className="content" rotation-x={-Math.PI / 2} position={[0, 0.05, -0.09]} transform occlude> */}
                        <Html className="w-full h-full" rotation-x={-Math.PI / 2} position={[0, 0.09, 0]} transform occlude scale={1.04}>
                            <iframe src="/Kyn-(SFSSE).pdf" style={{
                                margin: '0', width: '334px',
                                height: '216px' }} />
                        </Html>
                            {/* <motion.div
                                variants={fadeIn("down", 0.2)}
                                initial="hidden"
                                animate="show"
                                exit="hidden"
                                style={{ width: '100%', height: '100%' }}
                            >
                                <iframe src="/Kyn-(SFSSE).pdf" className="w-full h-full"/>
                            </motion.div> */}
                        {/* </Html> */}
                    </mesh>
                </group>
            </group>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.keyboard.geometry}
                material={materials.keys}
                position={[1.793, 0, 3.451]}
            />
            <group position={[0, -0.1, 3.394]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube002.geometry}
                    material={materials.aluminium}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube002_1.geometry}
                    material={materials.trackpad}
                />
            </group>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.touchbar.geometry}
                material={materials.touchbar}
                position={[0, -0.027, 1.201]}
            />
        </group>
    )
}
export const Intro = () => {
    return (
        <Canvas camera={{ position: [-5, -30, -15], fov: 55 }}>
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            <Suspense fallback={null}>
                <group rotation={[0, Math.PI, 0]} position={[0, -0.8, 0]} scale={2}>
                    <Model />
                </group>
                <Environment preset="city" />
            </Suspense>
            <ContactShadows position={[0, -4.5, 0]} scale={20} blur={2} far={4.5} />
            {/* <OrbitControls enablePan={false} enableZoom={true} minPolarAngle={Math.PI / 2.2} maxPolarAngle={Math.PI / 2.2} /> */}
            {/* <OrbitControls enablePan={false} enableZoom={true} minDistance={13} /> */}
            <OrbitControls minPolarAngle={Math.PI / 2.2} maxPolarAngle={Math.PI / 2}  minDistance={18.09} maxDistance={35} />
        </Canvas>
    )
}
useGLTF.preload("/3dModels/MacDraco.glb");
