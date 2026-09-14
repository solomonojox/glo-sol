import Image from "next/image";
import CountdownSeal from "./CountdownSeal";
import { wedding } from "@/lib/wedding-data";

export default function Hero() {
    return (
        <section
            id="home"
            className="relative isolate flex min-h-svh items-center justify-center overflow-hidden px-6 text-center"
        >
            {/* Background photo — swap this src for your real pre-wedding shot */}
            {/* <div className="absolute inset-0 -z-20 hidden md:block">
                <Image
                    src="/2_cropped2.jpg"
                    alt="Ada and Femi on their pre-wedding shoot"
                    fill
                    priority
                    sizes="100vw"
                    className="animate-kenburns object-cover object-center"
                />
            </div> */}

            <div className="absolute inset-0 -z-20 md:hidden">
                <Image
                    src="/2_cropped.jpg"
                    alt="Ada and Femi on their pre-wedding shoot"
                    fill
                    priority
                    sizes="100vw"
                    className="animate-kenburns object-cover object-center"
                />
            </div>

            {/* Ink gradient overlay so the text stays legible over any photo */}
            <div className="absolute inset-0 -z-10 bg-linear-to-b from-ink/70 via-ink/50 to-ink/85" />

            <div className="relative">
                <p className="font-body text-xs uppercase tracking-[0.3em] text-gold-soft">
                    Together with our families
                </p>
                <h1 className="mt-6 font-display text-5xl italic text-paper sm:text-7xl">
                    {wedding.coupleNames.partnerOne} <span className="not-italic text-gold">&</span>{" "}
                    {wedding.coupleNames.partnerTwo}
                </h1>
                <p className="mt-4 font-body text-sm uppercase tracking-[0.2em] text-paper/80 sm:text-base">
                    {wedding.displayDate} · Abuja
                </p>

                <div className="mt-12">
                    <CountdownSeal />
                </div>

                <a
                    href="#story"
                    className="mt-16 inline-flex flex-col items-center gap-2 text-paper/70 transition-colors hover:text-gold-soft"
                >
                    <span className="font-body text-[10px] uppercase tracking-[0.3em]">Our story</span>
                    <span className="h-8 w-px animate-pulse bg-current" />
                </a>
            </div>
        </section>
    );
}