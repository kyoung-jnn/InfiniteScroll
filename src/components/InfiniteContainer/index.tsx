import React, { useEffect, useRef, useState, useCallback } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Card, Loader } from '@src/components';

import './index.scss';

const InfiniteContainer: React.FC = () => {
  const loader = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getPhotos = useCallback(async () => {
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

    setTimeout(() => {
      setImages((state: string[]) => [
        ...state,
        ...response.data.map((image: any) => image.urls.small),
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleInfiniteScroll = useCallback(async ([entry]) => {
    if (entry.isIntersecting && !isLoading) {
      console.log('IntersectionObserver Callback 실행');
      await getPhotos();
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      threshold: 0.5,
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
        <div className="loadingWrapper" ref={loader}>
          {isLoading && <Loader />}
        </div>
      </section>
    </>
  );
};

export default InfiniteContainer;
