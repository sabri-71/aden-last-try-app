import React, { useEffect } from 'react';
import { AdMob } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

interface AdMobInterstitialProps {
  adId?: string;
  show?: boolean;
  onClose?: () => void;
}

const AdMobInterstitial: React.FC<AdMobInterstitialProps> = ({ adId, show, onClose }) => {
  useEffect(() => {
    if (!show || !Capacitor.isNativePlatform()) return;
    const showAd = async () => {
      try {
        await AdMob.initialize();
        await AdMob.prepareInterstitial({
          adId: adId || 'ca-app-pub-3940256099942544/1033173712', // معرف اختبار رسمي من Google
          isTesting: true // اجعلها false عند الإنتاج
        });
        await AdMob.showInterstitial();
        if (onClose) onClose();
      } catch (err) {
        console.error('خطأ في عرض إعلان Interstitial:', err);
      }
    };
    showAd();
  }, [show, adId, onClose]);
  return null;
};

export default AdMobInterstitial;
