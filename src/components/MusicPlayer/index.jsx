import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './MusicPlayer.css';

// Helper: Convert Spotify URL to URI format
const toSpotifyUri = (input) => {
    if (!input) return null;

    if (input.startsWith('spotify:')) {
        return input;
    }

    const match = input.match(/open\.spotify\.com\/(track|album|playlist|episode|show)\/([a-zA-Z0-9]+)/);
    if (match) {
        return `spotify:${match[1]}:${match[2]}`;
    }

    return input;
};

// Check if source is Spotify
const isSpotifySource = (src) => {
    return src?.includes('spotify.com') || src?.startsWith('spotify:');
};

const musicTracks = [
    { src: "https://files.catbox.moe/cyukhx.mp3", name: "Haru" },
    { src: "https://open.spotify.com/track/1Ipu7wzbc2qM7muqszyiZD", name: "Puppy Playlist" },
];

/* -------- Components -------- */

const TrackInfo = memo(({ title, currentTime, duration, isSpotify, isPlaying }) => {

    const formatTime = (time) => {
        if (!time || isNaN(time)) return "0:00";

        const min = Math.floor(time / 60);
        const sec = Math.floor(time % 60);

        return `${min}:${sec < 10 ? '0' + sec : sec}`;
    };

    return (
        <div className="mp-info-container">

            <div className={`mp-track-icon ${isPlaying ? 'spinning' : ''}`}>
                <i className={`fa-solid ${isSpotify ? 'fa-brands fa-spotify spotify-green' : 'fa-compact-disc'}`}></i>
            </div>

            <div className="mp-info-text">
                <div className="mp-title">{title || "Select Track"}</div>
                <div className="mp-status">
                    {formatTime(currentTime)} / {formatTime(duration)}
                </div>
            </div>

        </div>
    );
});

const ProgressBar = memo(({ currentTime, duration, onSeek }) => {

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div className="mp-progress-container">

            <div className="mp-progress-bg">
                <div
                    className="mp-progress-bar"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                step="0.1"
                className="mp-seek-slider"
                onChange={onSeek}
            />

        </div>
    );
});

const Controls = memo(({ isPlaying, onTogglePlay, onNext, onPrev }) => {

    return (
        <div className="mp-controls">

            <button className="mp-btn" onClick={onPrev}>
                <i className="fa-solid fa-backward-step"></i>
            </button>

            <button className="mp-btn main-c" onClick={onTogglePlay}>
                {isPlaying
                    ? <i className="fa-solid fa-pause"></i>
                    : <i className="fa-solid fa-play"></i>}
            </button>

            <button className="mp-btn" onClick={onNext}>
                <i className="fa-solid fa-forward-step"></i>
            </button>

        </div>
    );
});

/* -------- Main Component -------- */

export default function MusicPlayer() {

    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const [showPlaylist, setShowPlaylist] = useState(false);

    const audioRef = useRef(null);

    const currentTrack = musicTracks[currentTrackIndex];
    const isSpotify = isSpotifySource(currentTrack?.src);

    const handleTimeUpdate = () => {

        const audio = audioRef.current;

        if (!audio) return;

        setCurrentTime(audio.currentTime);
        setDuration(audio.duration || 0);
    };

    const togglePlay = async () => {

        const audio = audioRef.current;

        if (!audio) return;

        if (audio.paused) {

            try {
                await audio.play();
                setIsPlaying(true);
            } catch (err) {
                console.warn("Playback blocked");
            }

        } else {

            audio.pause();
            setIsPlaying(false);

        }
    };

    const handleNext = () => {

        setCurrentTrackIndex((prev) =>
            (prev + 1) % musicTracks.length
        );
    };

    const handlePrev = () => {

        setCurrentTrackIndex((prev) =>
            prev === 0 ? musicTracks.length - 1 : prev - 1
        );
    };

    useEffect(() => {

        const audio = audioRef.current;

        if (!audio) return;

        audio.pause();
        audio.load();

        setCurrentTime(0);
        setIsPlaying(false);

    }, [currentTrackIndex]);

    return (

        <div id="music-player">

            <audio
                ref={audioRef}
                src={!isSpotify ? currentTrack?.src : undefined}
                onTimeUpdate={handleTimeUpdate}
            />

            <div className="mp-main">

                <TrackInfo
                    title={currentTrack?.name}
                    currentTime={currentTime}
                    duration={duration}
                    isSpotify={isSpotify}
                    isPlaying={isPlaying}
                />

                {!isSpotify && (
                    <>
                        <ProgressBar
                            currentTime={currentTime}
                            duration={duration}
                            onSeek={(e) => {
                                const audio = audioRef.current;
                                audio.currentTime = e.target.value;
                            }}
                        />

                        <Controls
                            isPlaying={isPlaying}
                            onTogglePlay={togglePlay}
                            onNext={handleNext}
                            onPrev={handlePrev}
                        />
                    </>
                )}

                {isSpotify && (

                    <iframe
                        title="spotify-player"
                        src={`https://open.spotify.com/embed/track/${currentTrack.src.split("/track/")[1]}`}
                        width="100%"
                        height="80"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen"
                    />

                )}

            </div>

        </div>
    );
}
