// Central place to edit all wedding content — swap these values for your own.
export const wedding = {
    coupleNames: { partnerOne: "Glory", partnerTwo: "Solo" },
    date: "2026-11-14T11:00:00", // ISO string used by the countdown
    displayDate: "Saturday, 14 November 2026",
    venue: {
        ceremony: "St. Augustine's Chapel, Ikoyi",
        reception: "The Balmoral Hall, Victoria Island, Lagos",
    },
    hashtag: "#GloryOfSolomon",
    contactEmail: "solomonakpas@gmail.com",
    giftLink: "https://your-payment-link.example.com", // Paystack/Flutterwave/PayPal link
};

export const timeline = [
    {
        year: "2024",
        title: "We met",
        description:
            "Our sisters introduces us to each other when she was looking for a job, then we got talking till we became familiar.",
    },
    {
        year: "2025",
        title: "We met for the first time",
        description: "It was new year, we met.",
    },
    {
        year: "2026",
        title: "The proposal",
        description: "On a quiet Sunday walk, with absolutely no cameras ready. Femi still regrets that part.",
    },
    {
        year: "2026",
        title: "We're getting married",
        description: "And we'd love for you to be there.",
    },
];

export const schedule = [
    { time: "10:30 AM", title: "Guests arrive", description: "Please be seated by 10:45." },
    { time: "11:00 AM", title: "Ceremony", description: wedding.venue.ceremony },
    { time: "1:00 PM", title: "Cocktail hour", description: "Drinks and small chops on the terrace." },
    { time: "3:00 PM", title: "Reception & dinner", description: `${wedding.venue.reception} — speeches, dinner, dancing.` },
];

export const attire = {
    formality: "Semi-formal · Aso-ebi optional",
    notes:
        "We'd love to see our colours out there with us. Please avoid white and ivory — that's reserved for the bride.",
    palette: [
        { name: "Burgundy", hex: "#800020" },
        { name: "Caramel brown", hex: "#C68965" },
        { name: "White", hex: "#fff" },
    ],
};

export const faqs = [
    { q: "Can I bring a plus-one?", a: "Your invitation will note if a plus-one is included. If you're unsure, just reach out to us directly." },
    { q: "Are kids welcome?", a: "We love your little ones, but we've decided to keep this an adults-only celebration so everyone can relax." },
    { q: "What time should I arrive?", a: "Please aim to be seated by 10:45 AM — the ceremony starts promptly at 11:00." },
    { q: "Is there parking at the venue?", a: "Yes, there's a guarded parking area at both the ceremony and reception venues." },
];

export const gallery = [
    { src: "https://www.bellanaijaweddings.com/wp-content/uploads/2023/03/Nada-Kayode-Prewedding-BellaNaija-Weddings-21-1080x1350.jpg", alt: "Ada and Femi walking along the beach" },
    { src: "https://www.bellanaijaweddings.com/wp-content/uploads/2024/01/Anite-Uche-Prewedding-Shoot-BellaNaija-Weddings08.jpg", alt: "Close up portrait of the couple laughing" },
    { src: "https://www.bellanaijaweddings.com/wp-content/uploads/2024/01/Anite-Uche-Prewedding-Shoot-BellaNaija-Weddings06-1025x1536.jpg", alt: "Ada and Femi holding hands" },
    { src: "https://www.bellanaijaweddings.com/wp-content/uploads/2024/09/Kristen-Darlington-Prewedding-Shoot-BellaNaija-Wedding27-scaled.jpg", alt: "Sunset silhouette of the couple" },
    { src: "https://www.bellanaijaweddings.com/wp-content/uploads/2024/09/Kristen-Darlington-Prewedding-Shoot-BellaNaija-Wedding26-1080x1350.jpg", alt: "Candid moment between the couple" },
];