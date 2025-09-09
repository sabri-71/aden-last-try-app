import React, { useEffect, useRef, useState } from 'react';
import { AdMob } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

interface AdMobRewardedProps {
  adId?: string;
  show?: boolean;
  onClose?: () => void;
}

const AdMobRewarded: React.FC<AdMobRewardedProps> = ({ adId, show, onClose }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const hasShownRef = useRef(false);

  useEffect(() => {
    if (!show || !Capacitor.isNativePlatform()) return;
    let isMounted = true;
    const loadAd = async () => {
      try {
        await AdMob.initialize();
        await AdMob.prepareRewardVideoAd({
          adId: adId || 'ca-app-pub-3940256099942544/5224354917', // معرف اختبار مكافأة
          isTesting: true
        });
        if (isMounted) {
          setIsLoaded(true);
          console.log('✅ تم تحميل إعلان المكافأة بنجاح');
        }
      } catch (err) {
        console.error('❌ فشل تحميل إعلان المكافأة:', err);
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
          await AdMob.showRewardVideoAd();
          console.log('✅ تم عرض إعلان المكافأة');
          if (onClose) onClose();
        } catch (err) {
          console.error('❌ خطأ في عرض إعلان المكافأة:', err);
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

export default AdMobRewarded;
