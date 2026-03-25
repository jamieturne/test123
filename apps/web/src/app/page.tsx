import { LandingNav } from '@/components/landing/LandingNav';
import { Hero } from '@/components/landing/Hero';
import { Scenarios } from '@/components/landing/Scenarios';
import { Demo } from '@/components/landing/Demo';
import { Roadmap } from '@/components/landing/Roadmap';
import { Contacts } from '@/components/landing/Contacts';
import { Benefits } from '@/components/landing/Benefits';
import { CTA } from '@/components/landing/CTA';

export default function HomePage() {
  return (
    <>
      <LandingNav />
      <Hero />
      <Benefits />
      <Scenarios />
      <Demo />
      <Roadmap />
      <Contacts />
      <CTA />
    </>
  );
}
