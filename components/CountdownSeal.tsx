"use client";

import { useEffect, useState } from "react";
import { wedding } from "@/lib/wedding-data";

function getTimeLeft() {
    const diff = Math.max(+new Date(wedding.date) - +new Date(), 0);
    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
    };
}

export default function CountdownSeal() {
    // Start null so server and first client render match, then fill in after mount.
    const [time, setTime] = useState<ReturnType<typeof getTimeLeft> | null>(null);

    useEffect(() => {
        const initialUpdate = window.setTimeout(() => setTime(getTimeLeft()), 0);
        const id = setInterval(() => setTime(getTimeLeft()), 1000 * 30);
        return () => {
            window.clearTimeout(initialUpdate);
            clearInterval(id);
        };
    }, []);

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-2 border-gold/70 sm:h-48 sm:w-48">
                <div className="absolute inset-2 rounded-full border border-gold/40" />
                <div className="flex flex-col items-center">
                    <span className="font-display text-4xl font-semibold text-ink- text-amber-50 sm:text-5xl">
                        {time ? time.days : "--"}
                    </span>
                    <span className="mt-1 text-[11px] uppercase tracking-[0.25em] text-ink-soft- text-amber-100">days to go</span>
                </div>
            </div>
            {time && (
                <p className="font-body text-xs uppercase tracking-[0.15em] text-ink-soft- text-gray-200">
                    {time.hours}h {time.minutes}m
                </p>
            )}
        </div>
    );
}