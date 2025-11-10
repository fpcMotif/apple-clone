import gsap from "gsap";
import type { FunctionComponent } from "preact";
import { useEffect, useLayoutEffect, useRef, useState } from "preact/hooks";

import { pauseImg, playImg, replayImg } from "../assets";
import { hightlightsSlides } from "../constants";

type VideoState = {
  isEnd: boolean;
  startPlay: boolean;
  videoId: number;
  isLastVideo: boolean;
  isPlaying: boolean;
};

const VideoCarousel: FunctionComponent = () => {
  const videoRef = useRef<(HTMLVideoElement | null)[]>([]);
  const videoSpanRef = useRef<(HTMLSpanElement | null)[]>([]);
  const videoDivRef = useRef<(HTMLSpanElement | null)[]>([]);

  const [video, setVideo] = useState<VideoState>({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });
  const [loadedData, setLoadedData] = useState<Event[]>([]);

  const { isLastVideo, startPlay, videoId, isPlaying } = video;

  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) {
      return;
    }
    const ctx = gsap.context(() => {
      gsap.to("#slider", {
        transform: `translateX(${-100 * videoId}%)`,
        duration: 2,
        ease: "power2.inOut",
      });
      gsap.to("#video", {
        scrollTrigger: {
          trigger: "#video",
          toggleActions: "restart none none none",
        },
        onComplete: () => {
          setVideo((pre) => ({
            ...pre,
            startPlay: true,
            isPlaying: true,
          }));
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, [videoId]);

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying && videoRef.current[videoId]) {
        videoRef.current[videoId]?.pause();
      } else if (startPlay && videoRef.current[videoId]) {
        videoRef.current[videoId]?.play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  const handleLoadedMetadata = (_i: number, e: Event) => {
    setLoadedData((pre) => [...pre, e]);
  };

  useEffect(() => {
    let currentProgress = 0;
    const span = videoSpanRef.current;

    if (span[videoId]) {
      const anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);
          if (progress !== currentProgress) {
            currentProgress = progress;
          }
        },
        onComplete: () => {
          setVideo((pre) => ({
            ...pre,
            isEnd: true,
          }));
        },
      });
    }

    const el = videoDivRef.current[videoId];
    if (el) {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          toggleActions: "restart none none none",
          start: "top center",
          end: "bottom center",
        },
        onComplete: () => {
          setVideo((pre) => ({
            ...pre,
            isLastVideo: true,
          }));
        },
      });
    }
  }, [videoId]);

  const handleProcess = (type: string): void => {
    switch (type) {
      case "video-end":
        setVideo((pre) => ({ ...pre, isEnd: false, videoId: pre.videoId + 1 }));
        break;
      case "video-last":
        setVideo((pre) => ({ ...pre, isLastVideo: true }));
        break;
      case "video-reset":
        setVideo((pre) => ({ ...pre, isLastVideo: false, videoId: 0 }));
        break;
      case "play":
        setVideo((pre) => ({ ...pre, isPlaying: true }));
        break;
      case "pause":
        setVideo((pre) => ({ ...pre, isPlaying: false }));
        break;
      default:
        break;
    }
  };

  const getButtonText = (): string => {
    if (isLastVideo) {
      return "Replay";
    }
    if (isPlaying) {
      return "Pause";
    }
    return "Play";
  };

  const getButtonImage = (): string => {
    if (isLastVideo) {
      return replayImg;
    }
    if (isPlaying) {
      return pauseImg;
    }
    return playImg;
  };

  const setVideoRef = (
    element: HTMLVideoElement | null,
    index: number
  ): void => {
    videoRef.current[index] = element;
  };

  const setVideoDivRef = (
    element: HTMLSpanElement | null,
    index: number
  ): void => {
    videoDivRef.current[index] = element;
  };

  const setVideoSpanRef = (
    element: HTMLSpanElement | null,
    index: number
  ): void => {
    videoSpanRef.current[index] = element;
  };

  return (
    <div ref={containerRef}>
      <div className="flex-center">
        <h1 className="special-head">iPhone 15 Pro</h1>
      </div>

      <div className="mt-5 h-[50vh] w-screen overflow-hidden rounded-3xl bg-zinc md:h-[70vh]">
        <div className="relative h-full w-full" id="video">
          <div
            className="mt-5 flex h-full items-center whitespace-nowrap"
            id="slider"
          >
            {hightlightsSlides.map((list, i) => (
              <div
                className="mr-4 h-full w-full flex-1 overflow-hidden rounded-3xl bg-zinc pr-4"
                key={list.id}
              >
                <div className="h-[60vh] w-full overflow-hidden rounded-3xl bg-zinc md:h-[75vh]">
                  <video
                    className="size-full object-cover"
                    onEnded={() => handleProcess("video-end")}
                    onLoadedMetadata={(e) => handleLoadedMetadata(i, e)}
                    onPlay={() => handleProcess("play")}
                    playsInline
                    preload="auto"
                    ref={(el) => setVideoRef(el, i)}
                  >
                    <track
                      default
                      kind="captions"
                      label="English"
                      src=""
                      srcLang="en"
                    />
                    <source src={list.video} type="video/mp4" />
                  </video>
                </div>

                <div className="absolute top-12 left-[5%] z-10">
                  {list.textLists.map((text) => (
                    <p className="font-medium text-xl md:text-2xl" key={text}>
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mt-10 flex-center">
        <div className="flex-center rounded-full bg-gray-300 px-7 py-5 backdrop-blur">
          {hightlightsSlides.map((list, i) => (
            <span
              className="relative mx-2 size-3 cursor-pointer rounded-full bg-gray-200"
              key={list.id}
              ref={(el) => setVideoDivRef(el, i)}
            >
              <span
                className="absolute size-full rounded-full"
                ref={(el) => setVideoSpanRef(el, i)}
                title="video progress bar"
              />
            </span>
          ))}
        </div>
      </div>

      <div className="mt-10 flex-center">
        <button
          className="control-btn"
          onClick={() => {
            if (isLastVideo) {
              handleProcess("video-reset");
            } else if (isPlaying) {
              handleProcess("pause");
            } else {
              handleProcess("play");
            }
          }}
          type="button"
        >
          <img
            alt={getButtonText()}
            height={24}
            src={getButtonImage()}
            width={24}
          />
        </button>
      </div>
    </div>
  );
};

export default VideoCarousel;
