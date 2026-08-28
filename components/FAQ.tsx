"use client";

import { useState } from "react";
import { faqs } from "@/lib/wedding-data";
import SectionHeading from "./SectionHeading";

export default function FAQ() {
    const [open, setOpen] = useState<number | null>(0);

    return (
        <section id="faq" className="mx-auto max-w-2xl px-6 py-24">
            <SectionHeading eyebrow="Good to Know" title="Frequently asked questions" />
            <div className="mt-12 divide-y divide-ink/10 border-y border-ink/10">
                {faqs.map((item, i) => {
                    const isOpen = open === i;
                    return (
                        <div key={item.q}>
                            <button
                                onClick={() => setOpen(isOpen ? null : i)}
                                aria-expanded={isOpen}
                                className="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-lg text-ink"
                            >
                                {item.q}
                                <span
                                    className={`shrink-0 font-body text-xl text-gold transition-transform ${isOpen ? "rotate-45" : ""
                                        }`}
                                >
                                    +
                                </span>
                            </button>
                            {isOpen && (
                                <p className="pb-5 font-body text-sm leading-relaxed text-ink-soft">{item.a}</p>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}