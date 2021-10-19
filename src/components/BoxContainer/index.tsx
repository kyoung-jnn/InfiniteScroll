import React, { useEffect, useRef, useState, useCallback } from 'react';
import './index.scss';

const getPhotos = async () => {
  await fetch('https://api.unsplash.com/random?count=9').then((data) => {
    console.log(data);
  });
};

const BoxContainer = () => {
  let observer: IntersectionObserver;
  const loader = useRef<any>(null);

  // Viewport에 존재하면 실행할 Callback
  const handleInfiniteScroll = useCallback(([entry]) => {
    console.log('Callback 실행');
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0.8,
    };
    getPhotos();

    if (loader.current) {
      observer = new IntersectionObserver(handleInfiniteScroll, option);
      observer.observe(loader.current);
    }
    return () => observer.disconnect();
  }, [handleInfiniteScroll]);

  return (
    <section className="boxWrapper">
      <article className="infiniteContainer">
        <img
          className="image"
          alt="random"
          src="https://source.unsplash.com/random/300x400"
        />
        <img
          className="image"
          alt="random"
          src="https://source.unsplash.com/random/300x400"
        />
        <img
          className="image"
          alt="random"
          src="https://source.unsplash.com/random/300x400"
        />
        <img
          className="image"
          alt="random"
          src="https://source.unsplash.com/random/300x400"
        />
        <img
          className="image"
          alt="random"
          src="https://source.unsplash.com/random/300x400"
        />
        <img
          className="image"
          alt="random"
          src="https://source.unsplash.com/random/300x400"
        />
      </article>
      <div ref={loader}>loader</div>
    </section>
  );
};

export default BoxContainer;
