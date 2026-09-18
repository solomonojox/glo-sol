import { attire } from "@/lib/wedding-data";
import SectionHeading from "./SectionHeading";

export default function Attire() {
    return (
        <section id="attire" className="mx-auto max-w-3xl px-6 py-12 text-center">
            <SectionHeading eyebrow="What to Wear" title={attire.formality} />
            <p className="mx-auto mt-6 max-w-xl font-body text-sm leading-relaxed text-ink-soft">
                {attire.notes}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
                {attire.palette.map((color) => (
                    <div key={color.name} className="flex flex-col items-center gap-2">
                        <span
                            className="h-14 w-14 rounded-full border border-ink/10 shadow-sm"
                            style={{ backgroundColor: color.hex }}
                        />
                        <span className="font-body text-xs uppercase tracking-wide text-ink-soft">
                            {color.name}
                            {/* {color.avoid ? " (avoid)" : ""} */}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}