// @ts-nocheck

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
const corresponding = {
    A: "viseme_PP",
    B: "viseme_kk",
    C: "viseme_I",
    D: "viseme_AA",
    E: "viseme_O",
    F: "viseme_U",
    G: "viseme_FF",
    H: "viseme_TH",
    X: "viseme_PP",
};

export default function Avatar1(props) {
    const { nodes, materials } = useGLTF("/assets/models/avatar2.glb");
    const { animations: idleAnimation } = useFBX("/assets/animations/idle2.fbx");
    const { animations: greetingAnimation } = useFBX(
        "/assets/animations/greeting.fbx"
    );
    const { animations: talkingAnimation } = useFBX(
        "/assets/animations/talking.fbx"
    );
    idleAnimation[0].name = "Idle";
    talkingAnimation[0].name = "Speech";
    greetingAnimation[0].name = "Greeting";
    const [animation, setAnimation] = useState("Idle");

    const group = useRef();
    const { actions } = useAnimations(
        [idleAnimation[0], talkingAnimation[0], greetingAnimation[0]],
        group
    );
    useEffect(() => {
        if (!actions[animation]) return;
        actions[animation].reset().fadeIn(0.5).play();
        return () => actions[animation]?.fadeOut(0.5);
    }, [animation]);
    useEffect(() => {
        console.log(nodes.Wolf3D_Head.morphTargetDictionary);
    }, [nodes]);
    const [playAudio, setPlayAudio] = useState(false);
    useEffect(() => {
        if (props.currentMessage?.audio && !props.currentMessage.audio.ended) {
            setPlayAudio(true);
        } else {
            setPlayAudio(false);
        }
    }, [props.currentMessage]);
    const { script, headFollow, smoothMorphTarget, morphTargetSmoothing } = {
        playAudio: true,
        headFollow: true,
        smoothMorphTarget: true,
        morphTargetSmoothing: 0.5,
        script: {
            value: "speech",
            options: ["speech", "Idle", "Greeting"],
        },
    };
    console.log(props.currentMessage);
    const audio = props.currentMessage?.audio;
    const lipsync = props.currentMessage?.lipSync;
    useFrame(() => {
        if (!audio || !lipsync) {
            setAnimation("Idle");
            return;
        }
        const currentAudioTime = audio.currentTime;
        if (audio.paused || audio.ended) {
            setAnimation("Idle");
            return;
        }

        Object.values(corresponding).forEach((value) => {
            if (!smoothMorphTarget) {
                nodes.Wolf3D_Head.morphTargetInfluences[
                    nodes.Wolf3D_Head.morphTargetDictionary[value]
                ] = 0;
                nodes.Wolf3D_Teeth.morphTargetInfluences[
                    nodes.Wolf3D_Teeth.morphTargetDictionary[value]
                ] = 0;
            } else {
                nodes.Wolf3D_Head.morphTargetInfluences[
                    nodes.Wolf3D_Head.morphTargetDictionary[value]
                ] = THREE.MathUtils.lerp(
                    nodes.Wolf3D_Head.morphTargetInfluences[
                    nodes.Wolf3D_Head.morphTargetDictionary[value]
                    ],
                    0,
                    morphTargetSmoothing
                );

                nodes.Wolf3D_Teeth.morphTargetInfluences[
                    nodes.Wolf3D_Teeth.morphTargetDictionary[value]
                ] = THREE.MathUtils.lerp(
                    nodes.Wolf3D_Teeth.morphTargetInfluences[
                    nodes.Wolf3D_Teeth.morphTargetDictionary[value]
                    ],
                    0,
                    morphTargetSmoothing
                );
            }
        });

        for (let i = 0; i < lipsync.mouthCues.length; i++) {
            const mouthCue = lipsync.mouthCues[i];
            if (
                currentAudioTime >= mouthCue.start &&
                currentAudioTime <= mouthCue.end
            ) {
                if (!smoothMorphTarget) {
                    nodes.Wolf3D_Head.morphTargetInfluences[
                        nodes.Wolf3D_Head.morphTargetDictionary[
                        corresponding[mouthCue.value]
                        ]
                    ] = 1;
                    nodes.Wolf3D_Teeth.morphTargetInfluences[
                        nodes.Wolf3D_Teeth.morphTargetDictionary[
                        corresponding[mouthCue.value]
                        ]
                    ] = 1;
                } else {
                    nodes.Wolf3D_Head.morphTargetInfluences[
                        nodes.Wolf3D_Head.morphTargetDictionary[
                        corresponding[mouthCue.value]
                        ]
                    ] = THREE.MathUtils.lerp(
                        nodes.Wolf3D_Head.morphTargetInfluences[
                        nodes.Wolf3D_Head.morphTargetDictionary[
                        corresponding[mouthCue.value]
                        ]
                        ],
                        1,
                        morphTargetSmoothing
                    );
                    nodes.Wolf3D_Teeth.morphTargetInfluences[
                        nodes.Wolf3D_Teeth.morphTargetDictionary[
                        corresponding[mouthCue.value]
                        ]
                    ] = THREE.MathUtils.lerp(
                        nodes.Wolf3D_Teeth.morphTargetInfluences[
                        nodes.Wolf3D_Teeth.morphTargetDictionary[
                        corresponding[mouthCue.value]
                        ]
                        ],
                        1,
                        morphTargetSmoothing
                    );
                }

                break;
            }
        }
    });

    useEffect(() => {
        nodes.Wolf3D_Head.morphTargetInfluences[
            nodes.Wolf3D_Head.morphTargetDictionary["viseme_I"]
        ] = 1;
        nodes.Wolf3D_Teeth.morphTargetInfluences[
            nodes.Wolf3D_Teeth.morphTargetDictionary["viseme_I"]
        ] = 1;
        if (audio) {
            audio.play();
            if (script === "welcome") {
                setAnimation("Greeting");
            } else {
                setAnimation("Speech");
            }
        } else {
            setAnimation("Idle");
            if (audio) {
                audio.pause();
            }
        }
    }, [playAudio, script]);

    useFrame((state) => {
        if (headFollow) {
            group.current.getObjectByName("Head").lookAt(state.camera.position);
        }
    });

    return (
        <group {...props.groupConfig} dispose={null} ref={group}>
            <primitive object={nodes.Hips} />
            <skinnedMesh
                name="EyeLeft"
                geometry={nodes.EyeLeft.geometry}
                material={materials.Wolf3D_Eye}
                skeleton={nodes.EyeLeft.skeleton}
                morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
                morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
            />
            <skinnedMesh
                name="EyeRight"
                geometry={nodes.EyeRight.geometry}
                material={materials.Wolf3D_Eye}
                skeleton={nodes.EyeRight.skeleton}
                morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
                morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
            />
            <skinnedMesh
                name="Wolf3D_Head"
                geometry={nodes.Wolf3D_Head.geometry}
                material={materials.Wolf3D_Skin}
                skeleton={nodes.Wolf3D_Head.skeleton}
                morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
                morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
            />
            <skinnedMesh
                name="Wolf3D_Teeth"
                geometry={nodes.Wolf3D_Teeth.geometry}
                material={materials.Wolf3D_Teeth}
                skeleton={nodes.Wolf3D_Teeth.skeleton}
                morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
                morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
            />
            <skinnedMesh
                geometry={nodes.Wolf3D_Body.geometry}
                material={materials.Wolf3D_Body}
                skeleton={nodes.Wolf3D_Body.skeleton}
            />
            <skinnedMesh
                geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
                material={materials.Wolf3D_Outfit_Bottom}
                skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
            />
            <skinnedMesh
                geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
                material={materials.Wolf3D_Outfit_Footwear}
                skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
            />
            <skinnedMesh
                geometry={nodes.Wolf3D_Outfit_Top.geometry}
                material={materials.Wolf3D_Outfit_Top}
                skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
            />
            <skinnedMesh
                geometry={nodes.Wolf3D_Hair.geometry}
                material={materials.Wolf3D_Hair}
                skeleton={nodes.Wolf3D_Hair.skeleton}
            />
        </group>
    );
}

useGLTF.preload("/assets/models/avatar2.glb");
