import React, { useEffect, useRef, useState, useCallback } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Card, Loader } from '@src/components';

import './index.scss';

const InfiniteContainer: React.FC = () => {
  const loader = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getPhotos = async () => {
    setIsLoading(true);
    const response: AxiosResponse<any> = await axios.get(
      'https://api.unsplash.com/photos/random',
      {
        params: {
          client_id: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
          count: 4,
        },
      },
    );

    setImages((state: string[]) => [
      ...state,
      ...response.data.map((image: any) => image.urls.small),
    ]);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleInfiniteScroll = useCallback(async ([entry], observer) => {
    if (entry.isIntersecting) {
      console.log(entry.target);
      console.log('IntersectionObserver Callback 실행');
      // observer.unobserve(entry.target);
      // await getPhotos();
      // observer.observe(entry.target);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      threshold: 0.7,
    };
    let observer: IntersectionObserver;

    if (loader.current) {
      observer = new IntersectionObserver(handleInfiniteScroll, option);
      observer.observe(loader.current);
    }
    return () => observer && observer.disconnect();
  }, []);

  return (
    <>
      <section className="infiniteContainer">
        {images.map((url: string) => (
          <Card key={url} url={url} />
        ))}
        <div className="loadingContainer" ref={loader}>
          {isLoading && <Loader />}
        </div>
      </section>
    </>
  );
};

export default InfiniteContainer;
