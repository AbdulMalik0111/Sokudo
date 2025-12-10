import { useRef, useState, useEffect } from 'react';

const Video = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCover, setShowCover] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const handleError = () => setVideoError(true);
    const handleCanPlay = () => setIsReady(true);
    const handleEnded = () => {
      setIsPlaying(false);
      setShowCover(false);
    };

    v.addEventListener('error', handleError);
    v.addEventListener('canplay', handleCanPlay);
    v.addEventListener('ended', handleEnded);

    return () => {
      v.removeEventListener('error', handleError);
      v.removeEventListener('canplay', handleCanPlay);
      v.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v || videoError) return;
    if (v.paused) {
      v.play()
        .then(() => {
          setIsPlaying(true);
          setShowCover(false);
        })
        .catch(() => setVideoError(true));
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      togglePlay();
    }
  };

  return (
    <section
      className="px-4 sm:px-6 py-4 mx-auto"
      aria-labelledby="video-section-heading"
    >
      {/* Visually hidden heading for SEO */}
      <h2 id="video-section-heading" className="sr-only">
        Sokudo Electric Scooter Product Video
      </h2>

      <div
        className="relative w-full mx-auto rounded-xl overflow-hidden shadow-md bg-black"
        aria-label="Product demonstration video"
      >
        <div className="relative aspect-[16/9] md:aspect-auto md:h-[480px] lg:h-[560px]">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover md:object-cover"
            preload="metadata"
            poster="/videoimage.jpg"
            playsInline
            aria-describedby="video-status"
          >
            <source src="/acutevid.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Cover image */}
          {showCover && !videoError && (
            <img
              src="/videoimage.jpg"
              alt="Sokudo electric scooter video cover"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              draggable="false"
            />
          )}

          {/* Dim overlay */}
          {!isPlaying && !videoError && (
            <div
              className="absolute inset-0 bg-black/25 md:bg-black/20 pointer-events-none"
              aria-hidden="true"
            />
          )}

          {/* Error */}
          {videoError && (
            <div
              id="video-status"
              className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-sm sm:text-base px-4 text-center"
              aria-live="polite"
              role="alert"
            >
              Video could not be loaded.
            </div>
          )}

          {/* Loading */}
          {!isReady && !videoError && (
            <div
              id="video-status"
              className="absolute inset-0 flex items-center justify-center"
              aria-live="polite"
            >
              <div
                className="w-10 h-10 border-2 border-white/40 border-t-white rounded-full animate-spin"
                aria-hidden="true"
              />
            </div>
          )}

          {/* Play / Pause */}
          {!videoError && (
            <button
              type="button"
              onClick={togglePlay}
              onKeyDown={handleKey}
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
              aria-pressed={isPlaying}
              className="absolute inset-0 flex items-center justify-center focus:outline-none group"
            >
              <span
                className={`
                  flex items-center justify-center
                  rounded-full shadow-lg backdrop-blur
                  transition transform
                  ${
                    isPlaying
                      ? 'bg-white/25 hover:scale-105'
                      : 'bg-orange-500 hover:scale-110'
                  }
                  w-16 h-16 sm:w-20 sm:h-20
                `}
              >
                <span
                  className="text-white text-2xl sm:text-3xl font-semibold leading-none"
                  aria-hidden="true"
                >
                  {isPlaying ? '❚❚' : '▶'}
                </span>
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Video;
