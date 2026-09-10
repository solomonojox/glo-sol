import { timeline } from "@/lib/wedding-data";
import SectionHeading from "./SectionHeading";

export default function OurStory() {
    return (
        <section id="story" className="mx-auto max-w-3xl px-6 py-24">
            <SectionHeading eyebrow="Our Story" title="The Journey Down Here" />
            <ol className="relative mt-16 border-l border-gold/40 pl-8">
                {timeline.map((item, idx) => (
                    <li key={idx} className="relative mb-12 last:mb-0">
                        <span className="absolute -left-10.25 top-1 h-5 w-5 rounded-full border-2 border-gold bg-paper" />
                        <p className="font-display text-lg italic text-gold">{item.year}</p>
                        <h3 className="mt-1 font-display text-2xl text-ink">{item.title}</h3>
                        <span className="mt-2 font-body text-sm leading-relaxed text-ink-soft">
                            {/* {item.description} */}
                            {item.description.map((para, i) => (
                                <p key={i} className="mb-4 text-gray-600 leading-relaxed">
                                    {para}
                                </p>
                            ))}
                        </span>
                    </li>
                ))}
            </ol>
        </section>
    );
}