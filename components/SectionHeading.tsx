export default function SectionHeading({
    eyebrow,
    title,
    tone = "light",
}: {
    eyebrow: string;
    title: string;
    tone?: "light" | "dark";
}) {
    const eyebrowColor = tone === "dark" ? "text-gold-soft" : "text-sage";
    const titleColor = tone === "dark" ? "text-paper" : "text-ink";

    return (
        <div className="text-center">
            <p className={`font-body text-xs uppercase tracking-[0.3em] ${eyebrowColor}`}>{eyebrow}</p>
            <h2 className={`mt-3 font-display text-3xl sm:text-4xl ${titleColor}`}>{title}</h2>
        </div>
    );
}