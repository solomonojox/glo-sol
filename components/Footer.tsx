import { wedding } from "@/lib/wedding-data";

export default function Footer() {
    return (
        <footer className="border-t border-ink/10 bg-paper px-6 py-12 text-center">
            <p className="font-display text-2xl italic text-ink">
                {wedding.coupleNames.partnerOne} & {wedding.coupleNames.partnerTwo}
            </p>
            <p className="mt-2 font-body text-xs uppercase tracking-[0.2em] text-ink-soft">{wedding.hashtag}</p>
            <p className="mt-6 font-body text-xs text-ink-soft/70">
                Questions? Reach us at {wedding.contactEmail}
            </p>
        </footer>
    );
}