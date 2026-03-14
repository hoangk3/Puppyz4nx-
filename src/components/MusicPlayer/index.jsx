import React, { useEffect, useRef, useState } from "react";
import "./MusicPlayer.css";

export default function MusicPlayer() {

  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const musicSrc = "https://files.catbox.moe/cyukhx.mp3";

  const togglePlay = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      await audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    setCurrentTime(audio.currentTime);
    setDuration(audio.duration || 0);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    audio.currentTime = e.target.value;
  };

  const formatTime = (time) => {
    if (!time) return "0:00";
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s < 10 ? "0" + s : s}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = 0.4;
  }, []);

  return (
    <div
      id="music-player"
      className={minimized ? "minimized" : ""}
      onClick={minimized ? () => setMinimized(false) : undefined}
    >

      <audio
        ref={audioRef}
        src={musicSrc}
        onTimeUpdate={handleTimeUpdate}
      />

      {minimized && (
        <div className={`mp-mini-icon ${!isPlaying ? "paused" : ""}`}>
          <i className="fa-solid fa-compact-disc"></i>
        </div>
      )}

      {!minimized && (
        <>
          <div className="mp-main">

            <div className="mp-info-container">

              <div className={`mp-track-icon ${isPlaying ? "spinning" : ""}`}>
                <i className="fa-solid fa-music"></i>
              </div>

              <div className="mp-info-text">
                <div className="mp-title">Music Player</div>
                <div className="mp-status">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>

            </div>

            <button
              className="mp-btn"
              onClick={(e) => {
                e.stopPropagation();
                setMinimized(true);
              }}
            >
              <i className="fa-solid fa-compress"></i>
            </button>

          </div>

          {/* progress bar */}

          <div className="mp-progress-container">

            <div className="mp-progress-bg">
              <div
                className="mp-progress-bar"
                style={{
                  width:
                    duration > 0
                      ? `${(currentTime / duration) * 100}%`
                      : "0%"
                }}
              />
            </div>

            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              step="0.1"
              className="mp-seek-slider"
              onChange={handleSeek}
            />

          </div>

          {/* controls */}

          <div className="mp-controls">

            <button
              className="mp-btn main-c"
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
            >
              {isPlaying
                ? <i className="fa-solid fa-pause"></i>
                : <i className="fa-solid fa-play"></i>}
            </button>

          </div>
        </>
      )}
    </div>
  );
}
