import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import PainPoints from "@/components/PainPoints";
import HowItWorks from "@/components/HowItWorks";
import TestimonialsSection from "@/components/TestimonialsSection";
import RentalQuiz from "@/components/RentalQuiz";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TrustBar />
        <RentalQuiz />
        <PainPoints />
        <HowItWorks />
        <TestimonialsSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
