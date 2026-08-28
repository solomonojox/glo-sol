import { schedule } from "@/lib/wedding-data";
import SectionHeading from "./SectionHeading";

export default function Schedule() {
    return (
        <section id="schedule" className="bg-ink px-6 py-24 text-paper">
            <SectionHeading eyebrow="The Day" title="Order of events" tone="dark" />
            <ol className="relative mx-auto mt-16 max-w-2xl border-l border-gold/40 pl-8">
                {schedule.map((item) => (
                    <li key={item.time} className="relative mb-10 last:mb-0">
                        <span className="absolute -left-10.25 top-1 h-5 w-5 rounded-full border-2 border-gold bg-ink" />
                        <p className="font-body text-xs uppercase tracking-[0.2em] text-gold">{item.time}</p>
                        <h3 className="mt-1 font-display text-xl">{item.title}</h3>
                        <p className="mt-1 font-body text-sm text-paper/70">{item.description}</p>
                    </li>
                ))}
            </ol>
        </section>
    );
}