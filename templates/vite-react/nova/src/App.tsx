import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import HeroSection from './components/sections/HeroSection';
import FeaturesSection from './components/sections/FeaturesSection';

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <HeroSection />
        <FeaturesSection />
      </Layout>
    </ThemeProvider>
  );
}

export default App;