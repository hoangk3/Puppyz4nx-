import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./MusicPlayer.css";

/* Convert Spotify URL -> URI */
const toSpotifyUri = (input) => {
  if (!input) return null;

  if (input.startsWith("spotify:")) return input;

  const match = input.match(
    /open\.spotify\.com\/(track|album|playlist|episode|show)\/([a-zA-Z0-9]+)/
  );

  if (match) {
    return `spotify:${match[1]}:${match[2]}`;
  }

  return input;
};

/* Check spotify source */
const isSpotifySource = (src) => {
  return src?.includes("spotify.com") || src?.startsWith("spotify:");
};

/* Playlist */
const musicTracks = [
  {
    src: "https://open.spotify.com/track/1Ipu7wzbc2qM7muqszyiZD",
    name: "Puppy Playlist",
  },
];

/* ---------------- COMPONENTS ---------------- */

const TrackInfo = memo(({ title }) => {
  return (
    <div className="mp-info-container">
      <div className="mp-track-icon">
        <i className="fa-brands fa-spotify spotify-green"></i>
      </div>

      <div className="mp-info-text">
        <div className="mp-title">{title}</div>
        <div className="mp-status">0:00 / 0:00</div>
      </div>
    </div>
  );
});

const Playlist = memo(({ tracks, onSelect }) => {
  return (
    <motion.div
      className="mp-playlist"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
    >
      {tracks.map((track, idx) => (
        <div
          key={idx}
          className="mp-track-item"
          onClick={() => onSelect(idx)}
        >
          <i className="fa-brands fa-spotify"></i>
          {track.name}
        </div>
      ))}
    </motion.div>
  );
});

/* ---------------- MAIN PLAYER ---------------- */

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [minimized, setMinimized] = useState(false);

  const [isSpotifyApiReady, setIsSpotifyApiReady] = useState(false);

  const spotifyEmbedRef = useRef(null);
  const spotifyControllerRef = useRef(null);
  const iframeApiRef = useRef(null);

  const currentTrack = musicTracks[currentTrackIndex];
  const isSpotify = isSpotifySource(currentTrack?.src);

  /* Load Spotify API */

  useEffect(() => {
    const existing = document.querySelector(
      'script[src="https://open.spotify.com/embed/iframe-api/v1"]'
    );

    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://open.spotify.com/embed/iframe-api/v1";
      script.async = true;
      document.body.appendChild(script);
    }

    window.onSpotifyIframeApiReady = (IFrameAPI) => {
      iframeApiRef.current = IFrameAPI;
      setIsSpotifyApiReady(true);
    };
  }, []);

  /* Create embed */

  useEffect(() => {
    if (!isSpotify || !isSpotifyApiReady || !spotifyEmbedRef.current) return;

    const element = spotifyEmbedRef.current;
    const IFrameAPI = iframeApiRef.current;

    element.innerHTML = "";

    const options = {
      width: "100%",
      height: "80",
      uri: toSpotifyUri(currentTrack.src),
      theme: 0,
    };

    const callback = (EmbedController) => {
      spotifyControllerRef.current = EmbedController;
    };

    IFrameAPI.createController(element, options, callback);
  }, [isSpotify, isSpotifyApiReady, currentTrackIndex]);

  const loadTrack = useCallback((index) => {
    setCurrentTrackIndex(index);
  }, []);

  /* No autoplay */

  useEffect(() => {
    setCurrentTrackIndex(0);
  }, []);

  return (
    <div
      id="music-player"
      className={minimized ? "minimized" : ""}
      onClick={minimized ? () => setMinimized(false) : undefined}
    >
      {minimized && (
        <div className="mp-mini-icon">
          <i className="fa-brands fa-spotify"></i>
        </div>
      )}

      <div style={{ display: minimized ? "none" : "contents" }}>
        <div className="mp-main">
          <div className="mp-info">
            <TrackInfo title={currentTrack?.name} />
          </div>

          <div className="mp-actions">
            <button
              className="mp-btn"
              onClick={() => setShowPlaylist(!showPlaylist)}
            >
              <i className="fa-solid fa-list-ul"></i>
            </button>

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
        </div>

        <div className="mp-spotify-container">
          {!isSpotifyApiReady && (
            <div className="mp-loading">
              <i className="fa-brands fa-spotify fa-spin"></i>
              <span>Loading Spotify...</span>
            </div>
          )}

          <div
            ref={spotifyEmbedRef}
            className="mp-embed"
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              minHeight: "80px",
              marginBottom: "8px",
            }}
          ></div>

          <div className="mp-spotify-badge">
            <i className="fa-brands fa-spotify"></i>
            <span>Spotify</span>
          </div>
        </div>

        <AnimatePresence>
          {showPlaylist && (
            <Playlist tracks={musicTracks} onSelect={loadTrack} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
