"use client";

import { useEffect, useState } from "react";

const links = [
    { href: "#story", label: "Our Story" },
    { href: "#schedule", label: "Schedule" },
    { href: "#attire", label: "Attire" },
    { href: "#gallery", label: "Gallery" },
    { href: "#faq", label: "FAQ" },
];

export default function Nav() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${scrolled ? "bg-paper/90 shadow-sm backdrop-blur" : "bg-transparent"
                }`}
        >
            <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-4 px-6 py-4 sm:gap-8">
                {links.map((link) => (
                    <a

                        key={link.href}
                        href={link.href}
                        className={`font-body text-xs uppercase tracking-[0.11em] ${scrolled ? "text-ink-soft" : "text-amber-200"} transition-colors hover:text-gold`}
                    >
                        {link.label}
                    </a>
                ))}
            </nav>
        </header >
    );
}