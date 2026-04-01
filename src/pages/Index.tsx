import { useState, useCallback } from 'react';
import { LangProvider } from '@/contexts/LangContext';
import LoadingScreen from '@/components/LoadingScreen';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import CocktailsSection from '@/components/CocktailsSection';
import ExperienceSection from '@/components/ExperienceSection';
import GallerySection from '@/components/GallerySection';
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
      {!loading && (
        <>
          <Navbar />
          <HeroSection />
          <AboutSection />
          <CocktailsSection />
          <ExperienceSection />
          <GallerySection />
          <TestimonialsSection />
          <ReservationSection />
          <LocationSection />
          <FooterSection />
        </>
      )}
    </LangProvider>
  );
};

export default Index;
