import React, { useEffect, useRef, useState } from "react";
import "./MusicPlayer.css";

export default function MusicPlayer() {

  const spotifyRef = useRef(null);
  const apiRef = useRef(null);

  const [apiReady, setApiReady] = useState(false);
  const [minimized, setMinimized] = useState(false);

  const trackUrl =
    "https://open.spotify.com/track/1Ipu7wzbc2qM7muqszyiZD";

  const toSpotifyUri = (url) => {
    const match = url.match(/track\/([a-zA-Z0-9]+)/);
    return match ? `spotify:track:${match[1]}` : url;
  };

  /* load spotify api */

  useEffect(() => {

    const script = document.createElement("script");
    script.src = "https://open.spotify.com/embed/iframe-api/v1";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyIframeApiReady = (api) => {
      apiRef.current = api;
      setApiReady(true);
    };

  }, []);

  /* create player */

  useEffect(() => {

    if (!apiReady || !spotifyRef.current) return;

    spotifyRef.current.innerHTML = "";

    apiRef.current.createController(
      spotifyRef.current,
      {
        uri: toSpotifyUri(trackUrl),
        width: "100%",
        height: "80",
        theme: 0
      },
      () => {}
    );

  }, [apiReady]);

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

      {!minimized && (
        <>
          <div className="mp-main">

            <div className="mp-info-container">

              <div className="mp-track-icon">
                <i className="fa-brands fa-spotify spotify-green"></i>
              </div>

              <div className="mp-info-text">
                <div className="mp-title">Tâm sự</div>
                <div className="mp-status">Spotify Track</div>
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

          <div className="mp-embed" ref={spotifyRef}></div>

          <div className="mp-spotify-badge">
            <i className="fa-brands fa-spotify"></i>
            Spotify
          </div>
        </>
      )}

    </div>
  );
}
