import Image from "next/image";
import { gallery } from "@/lib/wedding-data";
import SectionHeading from "./SectionHeading";

export default function Gallery() {
    return (
        <section id="gallery" className="mx-auto max-w-5xl px-6 py-24">
            <SectionHeading eyebrow="Before the Big Day" title="Pre-wedding photos" />
            <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {gallery.map((photo, i) => (
                    <div
                        key={photo.src}
                        className={`relative overflow-hidden rounded-md bg-paper-dim ${i % 5 === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-3/4"
                            }`}
                    >
                        <Image
                            src={photo.src}
                            alt={photo.alt}
                            fill
                            sizes="(min-width: 640px) 33vw, 50vw"
                            className="object-cover transition-transform duration-500 hover:scale-105"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}