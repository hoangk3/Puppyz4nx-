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
        <p className='text-sm text-slate-600 mt-[2px]'>
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
          <div className='text-gray-900 '>
            <h2 className='font-semibold text-2xl'>
              Hey, I'm{" "}
              <Tippy animation='scale' content='Phan Duy Hoàng'>
                <span className='text-cyan-800'>Puppy_z4nx</span>
              </Tippy>{" "}
              👋
            </h2>
            <div className='w-full h-1 bg-cyan-500 rounded-sm my-1'></div>
            <div className='font-semibold text-justify'>
              I am Puppy_z4nx (<span className='text-cyan-800'>200x</span>), a Software Developer focused on Reverse Engineering and Security Research. 
              At the same time, I am pursuing the study of data structures and algorithms. 
              I am interested in how systems operate internally, exploiting weaknesses and turning knowledge into practical experience.
              <Link className='text-slate-600 underline' to='/skills'>
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
          <div className='cursor-text absolute z-10 translate-x-[-20px] p-2 rounded-xl bg-slate-50 border-dashed border-cyan-500 border-4'>
            <p className='font-bold'> Probably at home 🏡 or at a café ☕</p>
            {activities.map((activity) => (
              <div key={activity.type}>
                {activity.type === 0 && (
                  <p>
                    ▸ Playing 🌠: {activity.name}{" "}
                    <span className='text-sm text-slate-600'>
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
          <div className='cursor-text absolute z-10 translate-x-[-20px] p-2 rounded-xl bg-slate-100 border-dashed border-cyan-500 border-4'>
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
          <div className='cursor-text absolute z-10 translate-x-[-20px] p-2 rounded-xl bg-slate-100 border-dashed border-cyan-500 border-4'>
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
          <div className='cursor-text absolute z-10 translate-x-[-20px] p-2 rounded-xl bg-slate-100 border-dashed border-cyan-500 border-4'>
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
    <>
      <div className='md:flex gap-6 items-center'>
        <div className='md:m-0 mb-5 mx-auto rounded-full min-w-32 size-32 overflow-hidden border-4 border-cyan-500'>
          <div className='rounded-full overflow-hidden border-4 border-transparent'>
            <img src={`https://cdn.discordapp.com/avatars/${discord_user.id}/${avatar}.png`} alt='Avatar' />
          </div>
        </div>
        <div className='text-gray-900 '>
          <h2 className='font-semibold text-2xl'>
            Hey, I'm{" "}
            <Tippy animation='scale' content='Phan Duy Hoàng'>
              <span className='text-cyan-800'>Puppy-Z4nx</span>
            </Tippy>{" "}
            👋
          </h2>
          <div className='w-full h-1 bg-cyan-500 rounded-sm my-1'></div>
          <div className='font-semibold text-justify'>
            I am Puppy_z4nx (<span className='text-cyan-800'>200x</span>), a Software Developer focused on Reverse Engineering and Security Research. 
            At the same time, I am pursuing the study of data structures and algorithms. 
            I am interested in how systems operate internally, exploiting weaknesses and turning knowledge into practical experience.
            <Link className='text-slate-600 underline' to='/skills'>
              Wanna see more?
            </Link>{" "}
            ✒️
          </div>
        </div>
      </div>
      <div className='font-semibold text-gray-900 mt-4 '>
        {discord_status === "online" ? online : discord_status === "idle" ? idle : discord_status === "dnd" ? dnd : offline}
      </div>
      <div>
        <div className='flex items-center'>
          <svg className='w-5 h-5 text-gray-800  -translate-x-[4px] -translate-y-[1px]' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 24 24'>
            <path fillRule='evenodd' d='M12 2a8 8 0 0 1 6.6 12.6l-.1.1-.6.7-5.1 6.2a1 1 0 0 1-1.6 0L6 15.3l-.3-.4-.2-.2v-.2A8 8 0 0 1 11.8 2Zm3 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' clipRule='evenodd' />
          </svg>
          <div className='font-semibold text-gray-900 cursor-pointer' onMouseEnter={() => setIsWeather(true)} onMouseLeave={() => setIsWeather(false)}>
            <p>Vĩnh Phúc, Vietnam</p>
            {isWeather && (
              <div className='cursor-text absolute z-10 translate-x-[-20px] p-2 rounded-xl bg-slate-100 border-dashed border-cyan-500 border-4'>
                <p>⛺ City: {weather.name}</p>
                <p>⛅ Temperature: {weather.main.temp} ºC</p>
                <p>🚿 Humidity: {weather.main.humidity}%</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserInfo;
