import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import loading from '@src/assets/lottie/loading.json';

import './index.scss';

const Loader: React.FC = () => {
  const loadingElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loadingElement.current) {
      lottie.loadAnimation({
        container: loadingElement.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: loading,
      });
    }
  }, []);

  return <div className="loading" ref={loadingElement} />;
};

export default Loader;
