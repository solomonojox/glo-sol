"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { gallery } from "@/lib/wedding-data";
import SectionHeading from "./SectionHeading";

export default function Gallery() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const closeModal = useCallback(() => setActiveIndex(null), []);

    const showPrev = useCallback(() => {
        setActiveIndex((prev) =>
            prev === null ? null : (prev - 1 + gallery.length) % gallery.length
        );
    }, []);

    const showNext = useCallback(() => {
        setActiveIndex((prev) =>
            prev === null ? null : (prev + 1) % gallery.length
        );
    }, []);

    // Keyboard navigation
    useEffect(() => {
        if (activeIndex === null) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeModal();
            if (e.key === "ArrowLeft") showPrev();
            if (e.key === "ArrowRight") showNext();
        };

        window.addEventListener("keydown", handleKeyDown);
        // Prevent background scroll while modal is open
        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [activeIndex, closeModal, showPrev, showNext]);

    const activePhoto = activeIndex !== null ? gallery[activeIndex] : null;

    return (
        <section id="gallery" className="mx-auto max-w-5xl px-6 py-12">
            <SectionHeading eyebrow="Before the Big Day" title="Pre-wedding photos" />
            <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {gallery.map((photo, i) => (
                    <button
                        key={photo.src}
                        type="button"
                        onClick={() => setActiveIndex(i)}
                        className={`relative overflow-hidden rounded-md bg-paper-dim ${i % 5 === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-3/4"
                            }`}
                    >
                        <Image
                            src={photo.src}
                            alt={photo.alt}
                            fill
                            sizes="(min-width: 640px) 33vw, 50vw"
                            className="object-cover transition-transform duration-500 hover:scale-105"
                            loading="lazy"
                        />
                    </button>
                ))}
            </div>

            {activePhoto && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4"
                    onClick={closeModal}
                >
                    {/* Close button */}
                    <button
                        type="button"
                        onClick={closeModal}
                        aria-label="Close"
                        className="absolute right-4 top-4 text-3xl leading-none text-white/80 hover:text-white"
                    >
                        &times;
                    </button>

                    {/* Prev button */}
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            showPrev();
                        }}
                        aria-label="Previous image"
                        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-3xl text-white/80 hover:text-white sm:left-6"
                    >
                        &#8249;
                    </button>

                    {/* Image container */}
                    <div
                        className="relative h-[80vh] w-full max-w-3xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={activePhoto.src}
                            alt={activePhoto.alt}
                            fill
                            sizes="100vw"
                            className="object-contain"
                            priority
                        />
                    </div>

                    {/* Next button */}
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            showNext();
                        }}
                        aria-label="Next image"
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-3xl text-white/80 hover:text-white sm:right-6"
                    >
                        &#8250;
                    </button>

                    {/* Counter */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-white/70">
                        {activeIndex! + 1} / {gallery.length}
                    </div>
                </div>
            )}
        </section>
    );
}