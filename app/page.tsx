import HeroSection from '@/components/HeroSection';
import BirthdayMessageSection from '@/components/BirthdayMessageSection';
import CuteThingsSection from '@/components/CuteThingsSection';
import SurpriseSection from '@/components/SurpriseSection';
import Nav from '@/components/Nav';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Nav />
      <HeroSection />
      <BirthdayMessageSection />
      <CuteThingsSection />
      <SurpriseSection />
    </main>
  );
}
