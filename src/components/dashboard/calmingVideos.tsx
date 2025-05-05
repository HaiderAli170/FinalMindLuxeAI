import React, { useState, useEffect } from 'react';
import VideoSlider from './videoslider';

const CalmingVideosSlider = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const apiKey = 'AIzaSyApVeK3cmd63M7u-bh1MCKm-UwXRHfoQec'; 
        const playlistId = 'PLQ_PIlf6OzqKdBTuABBCzazB4i732pNTa';
        const maxResults = 20;

        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=${maxResults}&key=${apiKey}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }

        const data = await response.json();
        const videoItems = data?.items.map((item:any) => ({
          id: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.default.url,
        }));

        setVideos(videoItems);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-light tracking-tight text-gray-900 sm:text-5xl md:text-6xl mb-4">
            <span className="block">Find Your </span>
            <span className="block font-medium text-blue-500">Inner Peace</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Discover a collection of calming videos that help you relax, focus, and find tranquility in your daily life.
          </p>
        </header>

        <VideoSlider videos={videos} />
      </div>
    </div>
  );
};

export default CalmingVideosSlider;
