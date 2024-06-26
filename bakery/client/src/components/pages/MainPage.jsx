import React from 'react';

import MainSection from './mainPage/MainSection';
import ProductSection from './mainPage/ProductSection';
import PastrychefSection from './mainPage/PastrychefSection';
import ReviewsSection from './mainPage/ReviewsSection';
import InstSection from './mainPage/InstSection';
import AISection from './mainPage/AISection';
import Footer from './mainPage/Footer';
// Импортируйте остальные компоненты, которые вы хотите использовать

const MainPage = () => {
  return (
    <div>
      <MainSection />
      <ProductSection />
      <AISection />
      <PastrychefSection />
      <ReviewsSection />
      <InstSection />
      <Footer />
    </div>
  );
};

export default MainPage;