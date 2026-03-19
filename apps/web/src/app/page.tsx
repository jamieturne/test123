import { LandingNav } from '@/components/landing/LandingNav';
import { Hero } from '@/components/landing/Hero';
import { Metrics } from '@/components/landing/Metrics';
import { Scenarios } from '@/components/landing/Scenarios';
import { Demo } from '@/components/landing/Demo';
import { Roadmap } from '@/components/landing/Roadmap';
import { Contacts } from '@/components/landing/Contacts';
import { Benefits } from '@/components/landing/Benefits';
import { CTA } from '@/components/landing/CTA';
import { Footer } from '@/components/landing/Footer';

export default function HomePage() {
  return (
    <>
      <LandingNav />
      <Hero />
      <Metrics />
      <Scenarios />
      <Demo />
      <Roadmap />
      <Contacts />
      <Benefits />
      <CTA />
      <Footer />
    </>
  );
}
