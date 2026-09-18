import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import OurStory from "@/components/OurStory";
import Schedule from "@/components/Schedule";
import Attire from "@/components/Attire";
import Gallery from "@/components/Gallery";
import FAQ from "@/components/FAQ";
import GiftSection from "@/components/GiftSection";
import FloatingGiftButton from "@/components/FloatingGiftButton";
import Footer from "@/components/Footer";
// import BackgroundMusic from "@/components/BackgroundMusic";
import Attending from "@/components/Attending";

export default function Home() {
  return (
    <>
      {/* <BackgroundMusic /> */}
      <Nav />
      <main>
        <Hero />
        <OurStory />
        <Attending />
        <Schedule />
        <Attire />
        <Gallery />
        <FAQ />
        <GiftSection />
      </main>
      <Footer />
      <FloatingGiftButton />

    </>
  );
}