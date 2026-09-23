import Link from 'next/link';
import { playfair } from '@/lib/wedding/fonts';

const Attending = () => {
    return (
        <section className="mx-auto max-w-3xl px-6 py-10 text-center border-t border-dashed border-[#E0DCD4] bg-red-50">
            <p className="text-[11px] tracking-[0.2em] font-semibold text-[#B8860B] mb-4">RSVP</p>

            <h2
                className={`${playfair.className} text-4xl sm:text-2xl font-bold text-[#2B2118] leading-tight mb-2`}
            >
                Will you be there to celebrate with us?
            </h2>

            <p className="text-[#6B6B6B] text-sm leading-relaxed max-w-md mx-auto mb-4">
                We’d love to know you’re coming! It takes less than a minute, and it helps us plan for the number of guests we’ll be celebrating with. We’ll have your seat, and your dance moves, accounted for.
            </p>

            <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-lg bg-linear-to-r from-[#D4A017] to-[#B8860B] px-8 py-3.5 text-sm font-semibold tracking-wide text-white transition-opacity hover:opacity-90"
            >
                Register to get a ticket
            </Link>
        </section>
    );
};

export default Attending;