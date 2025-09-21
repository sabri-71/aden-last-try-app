
import React, { useEffect, useRef, useState } from 'react';
import { AdMob } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

interface AdMobInterstitialProps {
  adId?: string;
  show?: boolean;
  onClose?: () => void;
}

const AdMobInterstitial: React.FC<AdMobInterstitialProps> = ({ adId, show, onClose }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const hasShownRef = useRef(false);

  useEffect(() => {
    if (!show || !Capacitor.isNativePlatform()) return;
    let isMounted = true;
    const loadAd = async () => {
      try {
        await AdMob.initialize();
        await AdMob.prepareInterstitial({
          adId: adId || 'ca-app-pub-7990450110814740/4668240145',
          isTesting: false // إلغاء test ads
        });
        if (isMounted) {
          setIsLoaded(true);
          console.log('✅ تم تحميل الإعلان البيني بنجاح');
        }
      } catch (err) {
        console.error('❌ فشل تحميل الإعلان البيني:', err);
        setIsLoaded(false);
      }
    };
    loadAd();
    return () => { isMounted = false; };
  }, [show, adId]);

  useEffect(() => {
    if (show && isLoaded && !hasShownRef.current && Capacitor.isNativePlatform()) {
      hasShownRef.current = true;
      const showAd = async () => {
        try {
          await AdMob.showInterstitial();
          console.log('✅ تم عرض الإعلان البيني');
          if (onClose) onClose();
        } catch (err) {
          console.error('❌ خطأ في عرض إعلان Interstitial:', err);
          if (onClose) onClose();
        }
      };
      showAd();
    }
    if (!show) {
      hasShownRef.current = false;
      setIsLoaded(false);
    }
  }, [show, isLoaded, onClose]);

  return null;
};

export default AdMobInterstitial;
