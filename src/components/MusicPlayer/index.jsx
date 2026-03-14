import React, { useRef, useState } from "react";
import "./MusicPlayer.css";

export default function MusicPlayer() {

const audioRef = useRef(null);

const [isPlaying,setIsPlaying] = useState(false);
const [currentTime,setCurrentTime] = useState(0);
const [duration,setDuration] = useState(0);

const musicSrc="https://files.catbox.moe/cyukhx.mp3";

function togglePlay(e){
e.stopPropagation()

const audio=audioRef.current

if(audio.paused){
audio.play()
setIsPlaying(true)
}else{
audio.pause()
setIsPlaying(false)
}
}

function handleTime(){
const audio=audioRef.current
setCurrentTime(audio.currentTime)
setDuration(audio.duration||0)
}

function seek(e){
audioRef.current.currentTime=e.target.value
}

function format(t){
if(!t)return"0:00"
const m=Math.floor(t/60)
const s=Math.floor(t%60)
return m+":"+(s<10?"0"+s:s)
}

return(

<div id="music-player">

<audio
ref={audioRef}
src={musicSrc}
onTimeUpdate={handleTime}
/>

<div className="mp-main">

<div className="mp-info-container">

<div className={`mp-track-icon ${isPlaying?"spinning":""}`}>
<i className="fa-solid fa-music"></i>
</div>

<div className="mp-info-text">
<div className="mp-title">Music Player</div>
<div className="mp-status">
{format(currentTime)} / {format(duration)}
</div>
</div>

</div>

</div>

{/* progress */}

<div className="mp-progress-container">

<div className="mp-progress-bg">
<div
className="mp-progress-bar"
style={{
width:duration?`${currentTime/duration*100}%`:"0%"
}}
></div>
</div>

<input
type="range"
min="0"
max={duration||0}
value={currentTime}
step="0.1"
className="mp-seek-slider"
onChange={seek}
/>

</div>

{/* controls */}

<div className="mp-controls">

<button
className="mp-btn main-c"
onClick={togglePlay}
>

{isPlaying
?<i className="fa-solid fa-pause"></i>
:<i className="fa-solid fa-play"></i>
}

</button>

</div>

</div>
)
}
