// Central place to edit all wedding content — swap these values for your own.
export const wedding = {
    coupleNames: { partnerOne: "Glory", partnerTwo: "Solomon" },
    date: "2026-11-14T10:00:00", // ISO string used by the countdown
    displayDate: "Saturday, 14 November 2026",
    venue: {
        ceremony: "Vluxe Event Center",
        reception: "Plot 51, Road 3, Phase 4, Beside Pan Raf hospital, Nyanya Abuja",
    },
    hashtag: "#GloryOfSolomon",
    contactEmail: "solomonakpas@gmail.com",
    giftLink: "https://your-payment-link.example.com", // Paystack/Flutterwave/PayPal link
};

export const timeline = [
    {
        year: "2023",
        title: "We got to know each other",
        description:
            [
                `It was March 2023. Our sisters were close friends, and through that friendship, Glory got Solomon’s contact while looking for a job. Solomon eventually connected Glory with an organisation that had a vacancy. On the day she was to visit, she called him for the first time.`,

                `Glory: “Hello, good morning sir. Am I speaking with Mr Solomon?”`,

                `Solomon: “Yes, you are. Good morning.”`,

                `Glory: “My name is Glory. Your sister gave me your number concerning the job opportunity.”`,

                `Solomon: “Oh yes. Are you already on your way?”`,

                `And that was it.`,
                `The job did not work out, but Glory kept in touch with Solomon about other opportunities. At the time, it was simply a job search and a willingness to help. Then, one day, Solomon went to visit his sister, who lived in the same area as Glory. After speaking only over the phone, they were finally going to meet in person. Neither of us knew it then, but that meeting was about to become the beginning of something more. What would it be like to finally meet?`
            ]
    },
    {
        year: "2024",
        title: "We met for the first time",
        description: [
            `On the 1st of January 2024, the conversation about finally meeting came up. Solomon mentioned that he would be visiting his sister, who lived in the same area as Glory, so they decided to meet at her house. Then came the 2nd of January, the day we finally met.`,

            `After knowing each other only through phone calls, we were finally sitting together, talking face to face. Surprisingly, everything felt natural. There was no awkwardness, the conversation flowed as though we had known each other for much longer.`,

            `It was a simple meeting, unaware that our conversations were about to take a completely different shape. And that was when things started getting a little more interesting.`
        ]
    },
    {
        year: "2026",
        title: "The proposal",
        description: ["On a quiet Sunday walk, with absolutely no cameras ready. Femi still regrets that part.",]
    },
    {
        year: "2026",
        title: "We're getting married",
        description: ["And we'd love for you to be there.",]
    },
];

export const schedule = [
    { time: "09:00 AM", title: "Guests arrive", description: "Please be seated by 09:30." },
    { time: "10:00 AM", title: "Church Wedding Ceremony", description: wedding.venue.ceremony },
    { time: "1:00 PM", title: "Light Refreshment", description: "Drinks and small chops on the table." },
    { time: "3:00 PM", title: "Reception", description: `Speeches, dinner, dancing.` },
];

export const attire = {
    formality: "Semi-formal · Traditional attire",
    notes:
        "We'd love to see our colours out there with us.",
    palette: [
        { name: "Wine", hex: "#8a101e" },
        { name: "Caramel brown", hex: "#C68965" },
        { name: "White", hex: "#fff" },
    ],
};

export const faqs = [
    { q: "Can I bring a plus-one?", a: "Your invitation will note if a plus-one is included. If you're unsure, just reach out to us directly." },
    { q: "Are kids welcome?", a: "We love your little ones, but we are only able to accommodate a maximum of two children for the event." },
    { q: "What time should I arrive?", a: "Please aim to be seated by 9:30 AM - the ceremony starts promptly at 10:00 AM." },
    { q: "Is there parking at the venue?", a: "Yes, there's a parking area at the ceremony venue." },
];

export const gallery = [
    // { src: "https://www.bellanaijaweddings.com/wp-content/uploads/2023/03/Nada-Kayode-Prewedding-BellaNaija-Weddings-21-1080x1350.jpg", alt: "Glory and Solo" },
    // { src: "https://www.bellanaijaweddings.com/wp-content/uploads/2024/01/Anite-Uche-Prewedding-Shoot-BellaNaija-Weddings08.jpg", alt: "Close up portrait of the couple laughing" },
    // { src: "https://www.bellanaijaweddings.com/wp-content/uploads/2024/01/Anite-Uche-Prewedding-Shoot-BellaNaija-Weddings06-1025x1536.jpg", alt: "Glory and Solo" },
    // { src: "https://www.bellanaijaweddings.com/wp-content/uploads/2024/09/Kristen-Darlington-Prewedding-Shoot-BellaNaija-Wedding27-scaled.jpg", alt: "Glory and Solo" },
    // { src: "https://www.bellanaijaweddings.com/wp-content/uploads/2024/09/Kristen-Darlington-Prewedding-Shoot-BellaNaija-Wedding26-1080x1350.jpg", alt: "Glory and Solo" },
    {src: "/1.jpg", alt: 'image1'},
    {src: "/2.jpg", alt: 'image2'},
    {src: "/3.jpg", alt: 'image3'},
    {src: "/4.jpg", alt: 'image4'},
    {src: "/5.jpg", alt: 'image5'},
];