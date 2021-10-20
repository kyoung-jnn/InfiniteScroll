import React, { useEffect, useRef, useState, useCallback } from 'react';
import axios from 'axios';
import { Card } from '..';

import './index.scss';

const InfiniteContainer = () => {
  let observer: IntersectionObserver;
  const loader = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<any>([]);

  const getPhotos = async () => {
    await axios
      .get('https://api.unsplash.com/photos/random?count=9', {
        params: {
          client_id: '2ebZBspF3MpEDtPNYzNsPekVOuRxzlZi1zs5Wl2YjFA',
          count: 10,
        },
      })
      .then((res: any) => {
        setImages([
          ...images,
          ...res.data.map((image: any) => image.urls.small),
        ]);
      });
  };

  // Viewport에 존재하면 실행할 Callback
  const handleInfiniteScroll = useCallback(([entry]) => {
    // console.log(entry);
    console.log('Callback 실행');
  }, []);

  useEffect(() => {
    getPhotos();
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0.8,
    };
    /*     const lastDivElement = document.querySelector('.infiniteContainer');
    console.log(lastDivElement?.lastChild); */

    const lastDivElement =
      document.querySelectorAll('.card')[images.length - 1];

    if (lastDivElement) {
      observer = new IntersectionObserver(handleInfiniteScroll, option);
      observer.observe(lastDivElement);
    }

    return () => observer.disconnect();
  }, [images]);

  return (
    <section className="infiniteContainer">
      {images.map((url: string) => (
        <Card key={url} url={url} />
      ))}
    </section>
  );
};

export default InfiniteContainer;
