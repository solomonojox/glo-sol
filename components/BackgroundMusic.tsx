"use client";

import { useEffect, useRef } from "react";

export default function BackgroundMusic() {
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const audio = audioRef.current;

        if (!audio) return;

        audio.volume = 0.5;

        const playMusic = () => {
            audio.play().catch(() => { });
            document.removeEventListener("click", playMusic);
        };

        // Try autoplay
        audio.play().catch(() => {
            // Browser blocked autoplay, so start after first interaction
            document.addEventListener("click", playMusic);
        });

        return () => {
            document.removeEventListener("click", playMusic);
        };
    }, []);

    return (
        <audio
            ref={audioRef}
            src="/moses_Bliss_For_Life.mp3"
            loop
            preload="auto"
        />
    );
}