"use client";

import { useEffect, useState } from "react";
import { Gift } from "lucide-react";

export default function FloatingGiftButton() {
    // Visible by default; hides once the in-page gift section scrolls into view
    // so guests never see two "send a gift" prompts stacked on each other.
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const target = document.getElementById("gift");
        if (!target) return;

        const observer = new IntersectionObserver(
            ([entry]) => setVisible(!entry.isIntersecting),
            { threshold: 0.3 }
        );
        observer.observe(target);
        return () => observer.disconnect();
    }, []);

    return (
        <a
            href="#gift"
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-gold px-5 py-3 font-body text-sm uppercase tracking-wide text-paper shadow-lg shadow-ink/20 transition-all duration-300 hover:bg-rust ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
                }`}
        >
            <Gift size={16} />
            Send a gift
        </a>
    );
}