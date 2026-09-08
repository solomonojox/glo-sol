"use client"

import { Gift, CreditCard, Building2, X, Sparkles, Check } from "lucide-react";
import { wedding } from "@/lib/wedding-data";
import { useState } from "react";

export default function GiftSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState<"card" | "bank" | null>(null);
    const [showCopyNotification, setShowCopyNotification] = useState(false);

    const bankDetails = {
        accountName: "Solomon Akpa",
        bankName: "Moniepoint",
        accountNumber: "8102809730",
        routingNumber: "021000021",
        swiftCode: "FNBOUS33"
    };

    const bankDetails2 = {
        accountName: "Glory Ene Oklenyi",
        bankName: "Opay",
        accountNumber: "8142927276",
        routingNumber: "021000021",
        swiftCode: "FNBOUS33"
    };

    const handleCopyAccount = async () => {
        try {
            await navigator.clipboard.writeText(bankDetails.accountNumber);
            setShowCopyNotification(true);
            setTimeout(() => setShowCopyNotification(false), 3000);
        } catch (err) {
            console.error("Failed to copy:", err);
            // Fallback for older browsers
            const textArea = document.createElement("textarea");
            textArea.value = bankDetails.accountNumber;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand("copy");
                setShowCopyNotification(true);
                setTimeout(() => setShowCopyNotification(false), 3000);
            } catch (e) {
                console.error("Fallback copy failed:", e);
            }
            document.body.removeChild(textArea);
        }
    };

    const handleCopyAccount2 = async () => {
        try {
            await navigator.clipboard.writeText(bankDetails2.accountNumber);
            setShowCopyNotification(true);
            setTimeout(() => setShowCopyNotification(false), 3000);
        } catch (err) {
            console.error("Failed to copy:", err);
            // Fallback for older browsers
            const textArea = document.createElement("textarea");
            textArea.value = bankDetails2.accountNumber;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand("copy");
                setShowCopyNotification(true);
                setTimeout(() => setShowCopyNotification(false), 3000);
            } catch (e) {
                console.error("Fallback copy failed:", e);
            }
            document.body.removeChild(textArea);
        }
    };

    return (
        <>
            <section id="gift" className="relative overflow-hidden bg-linear-to-br from-rose-50 via-amber-50/50 to-sage/20 px-6 py-24 text-center">
                {/* Decorative elements */}
                <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-rose-200/20 blur-3xl" />
                <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-amber-200/20 blur-3xl" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-sage/5 blur-2xl" />

                <div className="relative z-10">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-rose-100/80 px-4 py-2 backdrop-blur-sm">
                        <Sparkles size={16} className="text-[#800020]" />
                        <p className="font-body text-xs uppercase tracking-[0.3em] text-rose-600">A Small Ask</p>
                    </div>

                    <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
                        Help us start <span className="bg-linear-to-r from-[#800020] to-[#C68965] bg-clip-text text-transparent">our journey</span>
                    </h2>

                    <p className="mx-auto mt-4 max-w-md font-body text-sm leading-relaxed text-ink-soft">
                        Your presence is truly the only gift we need. If you&apos;d still like to bless us, a
                        contribution would mean the world.
                    </p>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="group mt-8 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-[#800020] to-[#C68965] px-8 py-3 font-body text-sm uppercase tracking-wide text-white shadow-lg shadow-rose-200/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-amber-200/50"
                    >
                        <Gift size={16} className="transition-transform group-hover:rotate-12" />
                        Send a gift
                    </button>
                </div>
            </section>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={() => {
                            setIsModalOpen(false);
                            setSelectedMethod(null);
                        }}
                    />

                    {/* Modal content */}
                    <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
                        <button
                            onClick={() => {
                                setIsModalOpen(false);
                                setSelectedMethod(null);
                            }}
                            className="absolute right-4 top-4 rounded-full p-1 text-ink-soft/60 transition-colors hover:bg-gray-100 hover:text-ink"
                        >
                            <X size={20} />
                        </button>

                        <div className="mb-6 flex items-center gap-3">
                            <div className="rounded-full bg-linear-to-r from-[#800020] to-[#C68965] p-2">
                                <Gift size={20} className="text-white" />
                            </div>
                            <div>
                                <h3 className="font-display text-xl text-ink">Send a Gift</h3>
                                <p className="font-body text-sm text-ink-soft">Choose your preferred method</p>
                            </div>
                        </div>

                        {!selectedMethod ? (
                            <div className="space-y-3">
                                <button
                                    onClick={() => setSelectedMethod("card")}
                                    className="flex w-full items-center gap-4 rounded-xl border-2 border-transparent bg-linear-to-r from-rose-50 to-amber-50 p-4 transition-all hover:border-rose-200 hover:shadow-md"
                                >
                                    <div className="rounded-full bg-rose-100 p-2">
                                        <CreditCard size={20} className="text-rose-500" />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <p className="font-body font-medium text-ink">Pay with Card</p>
                                        <p className="font-body text-xs text-ink-soft">Secure payment via Stripe</p>
                                    </div>
                                    <div className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-600">
                                        Popular
                                    </div>
                                </button>

                                <button
                                    onClick={() => setSelectedMethod("bank")}
                                    className="flex w-full items-center gap-4 rounded-xl border-2 border-transparent bg-linear-to-r from-sage/10 to-teal-50/50 p-4 transition-all hover:border-sage/30 hover:shadow-md"
                                >
                                    <div className="rounded-full bg-sage/20 p-2">
                                        <Building2 size={20} className="text-sage" />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <p className="font-body font-medium text-ink">Bank Transfer</p>
                                        <p className="font-body text-xs text-ink-soft">Direct deposit to our account</p>
                                    </div>
                                </button>
                            </div>
                        ) : selectedMethod === "card" ? (
                            <div className="space-y-4">
                                <a
                                    href={wedding.giftLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#800020] to-[#C68965] px-6 py-3 font-body text-sm uppercase tracking-wide text-white shadow-lg shadow-rose-200/50 transition-all hover:scale-[1.02] hover:shadow-xl"
                                >
                                    <CreditCard size={18} />
                                    Continue to Payment
                                </a>
                                <button
                                    onClick={() => setSelectedMethod(null)}
                                    className="w-full text-center font-body text-sm text-ink-soft/60 transition-colors hover:text-ink-soft"
                                >
                                    ← Go back
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="space-y-4">
                                    <div className="rounded-xl border border-sage/20 bg-sage/5 p-4">
                                        <div className="space-y-3">
                                            <div>
                                                <p className="font-body text-xs uppercase tracking-wider text-ink-soft/60">Account Name</p>
                                                <p className="font-body text-sm font-medium text-ink">{bankDetails.accountName}</p>
                                            </div>
                                            <div>
                                                <p className="font-body text-xs uppercase tracking-wider text-ink-soft/60">Bank</p>
                                                <p className="font-body text-sm font-medium text-ink">{bankDetails.bankName}</p>
                                            </div>
                                            <div>
                                                <p className="font-body text-xs uppercase tracking-wider text-ink-soft/60">Account Number</p>
                                                <p className="font-body text-sm font-medium text-ink">{bankDetails.accountNumber}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleCopyAccount}
                                        className="relative flex w-full items-center justify-center gap-2 rounded-xl border-2 border-sage/30 bg-white px-6 py-2 font-body text-sm text-sage transition-all hover:bg-sage/5"
                                    >
                                        <span>Copy Account Number</span>
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div className="rounded-xl border border-sage/20 bg-sage/5 p-4">
                                        <div className="space-y-3">
                                            <div>
                                                <p className="font-body text-xs uppercase tracking-wider text-ink-soft/60">Account Name</p>
                                                <p className="font-body text-sm font-medium text-ink">{bankDetails2.accountName}</p>
                                            </div>
                                            <div>
                                                <p className="font-body text-xs uppercase tracking-wider text-ink-soft/60">Bank</p>
                                                <p className="font-body text-sm font-medium text-ink">{bankDetails2.bankName}</p>
                                            </div>
                                            <div>
                                                <p className="font-body text-xs uppercase tracking-wider text-ink-soft/60">Account Number</p>
                                                <p className="font-body text-sm font-medium text-ink">{bankDetails2.accountNumber}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleCopyAccount2}
                                        className="relative flex w-full items-center justify-center gap-2 rounded-xl border-2 border-sage/30 bg-white px-6 py-2 font-body text-sm text-sage transition-all hover:bg-sage/5"
                                    >
                                        <span>Copy Account Number</span>
                                    </button>
                                    <button
                                        onClick={() => setSelectedMethod(null)}
                                        className="w-full text-center font-body text-sm text-ink-soft/60 transition-colors hover:text-ink-soft"
                                    >
                                        ← Go back
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Copy Notification Toast */}
            {showCopyNotification && (
                <div className="fixed bottom-6 left-1/2 z-60 -translate-x-1/2 animate-in slide-in-from-bottom-4 fade-in duration-300">
                    <div className="flex items-center gap-3 rounded-xl bg-[#800020] px-6 py-3 text-white shadow-xl">
                        <Check size={18} className="text-green-300" />
                        <p className="font-body text-sm">Account number copied to clipboard!</p>
                    </div>
                </div>
            )}
        </>
    );
}