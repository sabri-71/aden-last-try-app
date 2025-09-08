import React, { useState, useEffect } from 'react';
import CurrencyTabs from '@/components/CurrencyTabs';
import LanguageToggle from '@/components/LanguageToggle';
import AdMobBanner from '@/components/AdMobBanner';
import AdMobAppOpen from '@/components/AdMobAppOpen';
import AdMobInterstitial from '@/components/AdMobInterstitial';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { t } from '@/utils/translations';
import { BannerAdPosition, BannerAdSize } from '@capacitor-community/admob';
const Index = () => {
  const [selectedCity, setSelectedCity] = useState('عدن');
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);
  const {
    language,
    changeLanguage
  } = useLanguage();
  useEffect(() => {
    // Set document direction based on language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);
  const getCityName = (city: string) => {
    if (language === 'en') {
      return city === 'صنعاء' ? 'Sanaa' : 'Aden';
    }
    return city;
  };
  // عرض إعلان Interstitial كل تحديث، فقط إذا كانت المدينة المختارة "صنعاء"
  useEffect(() => {
    if (refreshCount > 0 && selectedCity === 'صنعاء') {
      setShowInterstitial(true);
      setTimeout(() => setShowInterstitial(false), 3000); // إخفاء بعد 3 ثواني
    }
  }, [refreshCount, selectedCity]);
  return <div className="min-h-screen bg-gradient-to-br from-amber-900 via-yellow-900 to-amber-800 py-0 relative text-[12px] md:text-[15px]">
  {/* App Open Ad Component */}
  <AdMobAppOpen adId="ca-app-pub-7990450110814740/3998012142" />
  <AdMobInterstitial adId="ca-app-pub-3940256099942544/1033173712" show={showInterstitial} />
      
      {/* Background Logo */}
      <div className="fixed bottom-4 left-4 z-0 opacity-20">
        
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-0.5 md:p-1 shadow-2xl relative z-10 my-0 mx-[1px] px-2 py-0 min-h-[14px] header" style={{ height: "20vh" }}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1 rounded-full p-0.5 bg-[#eac30d]/90 min-h-[14px]">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 md:w-5 md:h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-2xl">
              <span className="text-white font-bold text-[10px] md:text-xs">₹</span>
            </div>
            <div className="text-white text-center sm:text-right">
              <h1 className="text-[10px] md:text-xs font-bold tracking-wide">
                {t('appTitle', language)}
              </h1>
              <p className="text-[7px] md:text-[10px] opacity-90">
                {t('liveUpdate', language)} • {new Date().toLocaleDateString('en-US')}
              </p>
            </div>
          </div>
          
          <div className="flex gap-1 md:gap-2 items-center flex-wrap justify-center">
            <LanguageToggle language={language} onLanguageChange={changeLanguage} />
            {/* <SarUpdateButton /> */}
            {/* <GoldUpdateButton /> */}
          </div>
        </div>
      </div>

      {/* إعلان بانر في بداية الشاشة */}
      <div className="max-w-7xl mx-auto px-2 py-2">
        <AdMobBanner 
          adId="ca-app-pub-7990450110814740/1289194571"
          position={BannerAdPosition.TOP_CENTER}
          size={BannerAdSize.BANNER}
          className="w-full h-10 bg-amber-900/20 rounded-lg border border-amber-300/30 backdrop-blur-sm"
        />
      </div>

      {/* City Selector */}
      <div className="max-w-7xl mx-auto py-2 md:py-4 px-2 relative z-10 bg-[#4d4d25]/55">
        <div className="text-center mb-2 md:mb-4">
          <h2 className="text-white text-base md:text-lg mb-2 md:mb-4 font-light tracking-wide">
            {t('selectCity', language)}
          </h2>
          <div className="flex justify-center gap-2 md:gap-4 mb-2 md:mb-4 px-2 mx-auto py-2 rounded-full backdrop-blur-sm bg-[#ffd100]/85">
            <button onClick={() => setSelectedCity('صنعاء')} className={`relative transition-all duration-500 group ${selectedCity === 'صنعاء' ? 'transform scale-105' : 'hover:transform hover:scale-100'}`}> 
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 border-gradient-to-r from-purple-400 to-pink-400 shadow-2xl group-hover:shadow-purple-500/50 transition-all duration-300">
                <img alt={getCityName('صنعاء')} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src="/lovable-uploads/51456852-7651-4526-9445-d268f033ea3c.jpg" />
              </div>
              <div className="mt-2 text-white text-base md:text-lg font-bold tracking-wide">
                {getCityName('صنعاء')}
              </div>
              {selectedCity === 'صنعاء' && <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-lg"></div>}
            </button>

            <button onClick={() => setSelectedCity('عدن')} className={`relative transition-all duration-500 group ${selectedCity === 'عدن' ? 'transform scale-105' : 'hover:transform hover:scale-100'}`}> 
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 border-gradient-to-r from-blue-400 to-cyan-400 shadow-2xl group-hover:shadow-blue-500/50 transition-all duration-300">
                <img alt={getCityName('عدن')} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src="/lovable-uploads/401073c5-56aa-4edd-b071-9494a6cc2ce0.jpg" />
              </div>
              <div className="mt-2 text-white text-base md:text-lg font-bold tracking-wide">
                {getCityName('عدن')}
                <div className="h-1 bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400 rounded-full mt-1 mx-auto w-10"></div>
              </div>
              {selectedCity === 'عدن' && <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full shadow-lg"></div>}
            </button>
          </div>
        </div>

        <CurrencyTabs selectedCity={selectedCity} language={language} />
        
        {/* إعلان بانر في منتصف الصفحة */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <AdMobBanner 
            adId="ca-app-pub-7990450110814740/1289194571"
            position={BannerAdPosition.TOP_CENTER}
            size={BannerAdSize.ADAPTIVE_BANNER}
            className="w-full h-20 bg-amber-900/20 rounded-lg border border-amber-300/30 backdrop-blur-sm"
          />
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 backdrop-blur-md border-t border-white/20 px-4 py-3 md:py-4 shadow-2xl safe-area-inset-bottom bg-amber-900/50 z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-2 md:gap-4 text-center">
            <Link to="/contact" className="flex flex-col items-center gap-1 md:gap-2 text-yellow-400 hover:text-yellow-300 transition-all duration-300 group p-2">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-lg md:text-xl">📞</span>
              </div>
              <span className="text-xs md:text-sm font-medium">
                {t('contact', language)}
              </span>
            </Link>
            
            <button className="flex flex-col items-center gap-1 md:gap-2 text-yellow-400 hover:text-yellow-300 transition-all duration-300 group p-2">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-lg md:text-xl">🏠</span>
              </div>
              <span className="text-xs md:text-sm font-medium">
                {t('home', language)}
              </span>
            </button>
            
            <div></div>
          </div>
        </div>
      </div>
    </div>;
};
export default Index;