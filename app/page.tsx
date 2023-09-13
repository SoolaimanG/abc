import Contactme from "@/Components/contactme";
import Features from "@/Pages/features";
import Footer from "@/Pages/footer";
import Header from "@/Pages/header";
import HowItWorks from "@/Pages/howItWorks";
import ShortenLink from "@/Pages/shortenLink";
import WhyUs from "@/Pages/whyUs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Landing Page",
};

export default function Home() {
  return (
    <main className="w-full relative overflow-x-hidden">
      <Header />
      <WhyUs />
      <HowItWorks />
      <ShortenLink />
      <Features />
      <Footer />
      <Contactme />
    </main>
  );
}
