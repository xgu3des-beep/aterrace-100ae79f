import { useState, useCallback, useEffect, useRef } from 'react';
import { LangProvider } from '@/contexts/LangContext';
import LoadingScreen from '@/components/LoadingScreen';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import CocktailsSection from '@/components/CocktailsSection';

import TestimonialsSection from '@/components/TestimonialsSection';
import LocationSection from '@/components/LocationSection';
import FooterSection from '@/components/FooterSection';

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const handleIntroDone = useCallback(() => setIntroDone(true), []);

  // Only finish loading when both intro animation AND video are ready
  useEffect(() => {
    if (introDone && videoReady) {
      setLoading(false);
    }
  }, [introDone, videoReady]);

  // Preload the video
  useEffect(() => {
    const video = document.createElement('video');
    video.src = '/videos/hero-bg.mp4';
    video.preload = 'auto';
    const onReady = () => setVideoReady(true);
    video.addEventListener('canplaythrough', onReady);
    video.load();
    // Fallback timeout so we don't wait forever
    const timeout = setTimeout(() => setVideoReady(true), 8000);
    return () => {
      video.removeEventListener('canplaythrough', onReady);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <LangProvider>
      {loading && <LoadingScreen onComplete={handleIntroDone} />}
      <div style={{ visibility: loading ? 'hidden' : 'visible' }}>
        <Navbar />
        <HeroSection ready={!loading} />
        <AboutSection />
        <CocktailsSection />
        
        <TestimonialsSection />
        <LocationSection />
        <FooterSection />
      </div>
    </LangProvider>
  );
};

export default Index;
