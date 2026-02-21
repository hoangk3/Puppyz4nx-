import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/animations/scale.css";
import "tippy.js/dist/tippy.css";

function CustomStatus({ customStatus }) {
  return (
    <>
      {customStatus && (
        <p className='text-sm text-slate-300 mt-[2px]'>
          ▸ {customStatus.emoji && <span className='mr-1'>{customStatus.emoji.name}</span>}
          {customStatus.state}
        </p>
      )}
    </>
  );
}

function replaceCharacters(inputString) {
  return inputString.replace(/;/g, ",").replace(/'/g, ",");
}

function UserInfo() {
  const [userData, setUserData] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isWeather, setIsWeather] = useState(false);
  const [weather, setWeather] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://api.lanyard.rest/v1/users/789428736868876298");
      const userData = response.data.data;
      setUserData(userData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchWeather = () => {
    axios
      .get("https://api.openweathermap.org/data/2.5/weather?lat=21.360882&lon=105.547440&appid=3de3f35caaaecb082b76fd440b7b5a91&units=metric")
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetchData();
    fetchWeather();

    const intervalId = setInterval(() => {
      fetchData();
      fetchWeather();
    }, 1 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (userData) {
      const startTimestamp = userData.activities.find((activity) => activity.type === 0)?.timestamps.start;
      const intervalId = setInterval(() => {
        const currentTimestamp = Date.now();
        const elapsed = currentTimestamp - startTimestamp;
        setElapsedTime(elapsed);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [userData]);

  const formatElapsedTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}d ${hours % 24}h ${minutes % 60}m ${seconds % 60}s`;
    } else if (hours > 0) {
      return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  };

  if (!userData || !weather) {
    return (
      <>
        <div className='md:flex gap-6 items-center'>
          <div className='md:m-0 mb-5 mx-auto rounded-full min-w-32 size-32 overflow-hidden border-4 border-cyan-500'>
            <div className='rounded-full overflow-hidden border-4 border-transparent'>
              <div className='size-[112px] bg-slate-300 animate-pulse'></div>
            </div>
          </div>
          <div className='text-slate-100 '>
            <h2 className='font-semibold text-2xl'>
              Hey, I'm{" "}
              <Tippy animation='scale' content='Phan Duy Hoàng'>
                <span className='text-cyan-300'>Puppy_z4nx</span>
              </Tippy>{" "}
              👋
            </h2>
            <div className='w-full h-1 bg-cyan-500 rounded-sm my-1'></div>
            <div className='font-semibold text-justify'>
              I am Puppy_z4nx (<span className='text-cyan-300'>200x</span>), a Software Developer focused on Reverse Engineering and Security Research.
              At the same time, I am pursuing the study of data structures and algorithms.
              I am interested in how systems operate internally, exploiting weaknesses and turning knowledge into practical experience.
              <Link className='text-slate-300 underline' to='/skills'>
                Wanna see more?
              </Link>{" "}
              ✒️
            </div>
          </div>
        </div>
        <div className='w-56 rounded-full bg-slate-300 animate-pulse h-4 mt-4'></div>
        <div className='w-52 rounded-full bg-slate-300 animate-pulse h-4 mt-3'></div>
      </>
    );
  }

  const { discord_user, activities, discord_status } = userData;
  const { avatar } = discord_user;
  const customStatus = activities.find((activity) => activity.type === 4);
  const listeningToSpotify = activities.find((activity) => activity.type === 2);

  const online = (
    <div className='flex items-center'>
      <div className='translate-y-[-1px] size-3 rounded-full bg-cyan-500'>
        <div className='size-3 rounded-full bg-cyan-500 animate-ping'></div>
      </div>
      <div className='ml-2 cursor-pointer' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <p>It seems like he's online</p>
        {isHovered && (
          <div className='cursor-text absolute z-10 translate-x-[-20px] p-2 rounded-xl bg-slate-900/90 border border-cyan-300/40'>
            <p className='font-bold'> Probably at home 🏡 or at a café ☕</p>
            {activities.map((activity) => (
              <div key={activity.type}>
                {activity.type === 0 && (
                  <p>
                    ▸ Playing 🌠: {activity.name}{" "}
                    <span className='text-sm text-slate-300'>
                      ({formatElapsedTime(elapsedTime)} elapsed)
                    </span>
                  </p>
                )}
              </div>
            ))}
            {listeningToSpotify && (
              <p>
                ▸ Spotify 🎶: {listeningToSpotify.details} - {replaceCharacters(listeningToSpotify.state)}
              </p>
            )}
            <CustomStatus customStatus={customStatus} />
          </div>
        )}
      </div>
    </div>
  );

  const idle = (
    <div className='flex items-center'>
      <div className='translate-y-[-1px] size-3 rounded-full bg-yellow-500'>
        <div className='size-3 rounded-full bg-yellow-500 animate-ping'></div>
      </div>
      <div className='ml-2 cursor-pointer' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <p>Idle</p>
        {isHovered && (
          <div className='cursor-text absolute z-10 translate-x-[-20px] p-2 rounded-xl bg-slate-900/90 border border-cyan-300/40'>
            <p>Seems to be doing something else 🧩</p>
            {listeningToSpotify && (
              <p>
                ▸ Spotify 🎶: {listeningToSpotify.details} - {replaceCharacters(listeningToSpotify.state)}
              </p>
            )}
            <CustomStatus customStatus={customStatus} />
          </div>
        )}
      </div>
    </div>
  );

  const offline = (
    <div className='flex items-center'>
      <div className='translate-y-[-1px] size-3 rounded-full bg-red-600'>
        <div className='size-3 rounded-full bg-red-600 animate-ping'></div>
      </div>
      <div className='ml-2 cursor-pointer' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <p>Offline</p>
        {isHovered && (
          <div className='cursor-text absolute z-10 translate-x-[-20px] p-2 rounded-xl bg-slate-900/90 border border-cyan-300/40'>
            <p>Outside 🚪 or sleeping 💤</p>
            <CustomStatus customStatus={customStatus} />
          </div>
        )}
      </div>
    </div>
  );

  const dnd = (
    <div className='flex items-center'>
      <div className='translate-y-[-1px] size-3 rounded-full bg-red-900'>
        <div className='size-3 rounded-full bg-red-900 animate-ping'></div>
      </div>
      <div className='ml-2 cursor-pointer' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <p>Do Not Disturb</p>
        {isHovered && (
          <div className='cursor-text absolute z-10 translate-x-[-20px] p-2 rounded-xl bg-slate-900/90 border border-cyan-300/40'>
            <p>Does not want to be disturbed 🚫</p>
            {listeningToSpotify && (
              <p>
                ▸ Spotify 🎶: {listeningToSpotify.details} - {replaceCharacters(listeningToSpotify.state)}
              </p>
            )}
            <CustomStatus customStatus={customStatus} />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="animate-fadeIn">
      <div className='md:flex gap-8 items-center'>
        <div className='md:m-0 mb-6 mx-auto rounded-full min-w-32 size-32 overflow-hidden border-4 border-cyan-400 shadow-lg shadow-cyan-200/50 animate-float'>
          <div className='rounded-full overflow-hidden border-4 border-white/50'>
            <img src={`https://cdn.discordapp.com/avatars/${discord_user.id}/${avatar}.png`} alt='Avatar' className="w-full h-full object-cover" />
          </div>
        </div>
        <div className='text-slate-100 animate-fadeInUp' style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
          <h2 className='font-bold text-3xl mb-2'>
            Hey, I'm{" "}
            <Tippy animation='scale' content='Phan Duy Hoàng'>
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600'>Puppy-Z4nx</span>
            </Tippy>{" "}
            👋
          </h2>
          <div className='w-24 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mb-4'></div>
          <div className='font-medium text-slate-200 leading-relaxed text-left md:text-justify'>
            I am <span className="text-cyan-200 font-bold">Puppy_z4nx</span> (200x), a <span className="italic">Software Developer</span> focused on Reverse Engineering and Security Research.
            At the same time, I am pursuing the study of data structures and algorithms.
            I am interested in how systems operate internally, exploiting weaknesses and turning knowledge into practical experience.
            <div className="mt-2">
              <Link className='text-pink-300 hover:text-pink-200 font-bold flex items-center gap-1 transition-colors' to='/skills'>
                Wanna see more? ✒️
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className='space-y-3 mt-6 animate-fadeInUp' style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
        <div className='font-semibold text-slate-100 flex items-center h-8'>
          {discord_status === "online" ? online : discord_status === "idle" ? idle : discord_status === "dnd" ? dnd : offline}
        </div>

        <div className='flex items-center gap-2 group'>
          <div className="bg-cyan-400/15 text-cyan-200 p-1.5 rounded-lg group-hover:bg-cyan-500 group-hover:text-white transition-all duration-300">
            <svg className='w-4 h-4' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 24 24'>
              <path fillRule='evenodd' d='M12 2a8 8 0 0 1 6.6 12.6l-.1.1-.6.7-5.1 6.2a1 1 0 0 1-1.6 0L6 15.3l-.3-.4-.2-.2v-.2A8 8 0 0 1 11.8 2Zm3 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' clipRule='evenodd' />
            </svg>
          </div>
          <div className='font-bold text-slate-200 cursor-pointer relative' onMouseEnter={() => setIsWeather(true)} onMouseLeave={() => setIsWeather(false)}>
            <p className="hover:text-cyan-200 transition-colors">Vĩnh Phúc, Vietnam</p>
            {isWeather && (
              <div className='absolute z-50 left-0 bottom-full mb-2 p-4 rounded-2xl glass-card shadow-xl border border-white/40 min-w-48 animate-fadeInUp'>
                <div className="space-y-2 text-sm">
                  <p className="flex justify-between"><span>City:</span> <span className="text-cyan-200 font-bold">{weather.name}</span></p>
                  <p className="flex justify-between"><span>Temp:</span> <span className="text-pink-300 font-bold">{weather.main.temp} ºC</span></p>
                  <p className="flex justify-between"><span>Humidity:</span> <span className="text-blue-200 font-bold">{weather.main.humidity}%</span></p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;

