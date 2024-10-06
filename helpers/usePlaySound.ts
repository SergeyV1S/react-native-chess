import { Audio } from "expo-av";
import { useRef } from "react";

export const usePlaySound = () => {
    const sound = useRef<Audio.Sound | null>(null);

    const playKillSound = async () => {
        const { sound: soundObject } = await Audio.Sound.createAsync(
            require('@/assets/sounds/kill.mp3')
        );
        sound.current = soundObject;
        await soundObject.playAsync();
    };

    const moveSound = async () => {
        const { sound: soundObject } = await Audio.Sound.createAsync(
            require('@/assets/sounds/move.mp3')
        );
        sound.current = soundObject;
        await soundObject.playAsync();
    };

    const resetSound = async () => {
        const { sound: soundObject } = await Audio.Sound.createAsync(
            require('@/assets/sounds/arrangement.mp3')
        );
        sound.current = soundObject;
        await soundObject.playAsync();
    };

    const winSound = async () => {
        const { sound: soundObject } = await Audio.Sound.createAsync(
            require('@/assets/sounds/win.mp3')
        );
        sound.current = soundObject;
        await soundObject.playAsync();  
    }

    const stopSound = async () => {
        if (sound.current) {
            await sound.current.stopAsync();
            await sound.current.unloadAsync();
        }
    };

    return { playKillSound, moveSound, resetSound, winSound, stopSound }
}