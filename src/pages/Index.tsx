import { useState, useCallback } from 'react';
import { LangProvider } from '@/contexts/LangContext';
import LoadingScreen from '@/components/LoadingScreen';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import CocktailsSection from '@/components/CocktailsSection';

import TestimonialsSection from '@/components/TestimonialsSection';
import ReservationSection from '@/components/ReservationSection';
import LocationSection from '@/components/LocationSection';
import FooterSection from '@/components/FooterSection';

const Index = () => {
  const [loading, setLoading] = useState(true);
  const handleComplete = useCallback(() => setLoading(false), []);

  return (
    <LangProvider>
      {loading && <LoadingScreen onComplete={handleComplete} />}
      <div style={{ visibility: loading ? 'hidden' : 'visible' }}>
        <Navbar />
        <HeroSection ready={!loading} />
        <AboutSection />
        <CocktailsSection />
        
        <TestimonialsSection />
        <ReservationSection />
        <LocationSection />
        <FooterSection />
      </div>
    </LangProvider>
  );
};

export default Index;
