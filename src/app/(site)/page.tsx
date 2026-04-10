import { Hero } from "@/components/home/Hero";
import { LinesGrid } from "@/components/home/LinesGrid";
import { AboutBlock } from "@/components/home/AboutBlock";
import { InstagramCTA } from "@/components/home/InstagramCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <LinesGrid />
      <AboutBlock />
      <InstagramCTA />
    </>
  );
}
