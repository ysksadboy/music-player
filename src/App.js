
import './App.css';
import { useEffect, useState } from "react";
import useSound from "use-sound"; 
import music from './components/might help you think(1).mp3';
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";


export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState({
    min: "",
    sec: "",
  });

const [play, {pause, duration, sound}] = useSound(music);

const playingButton = () => {
    if (isPlaying) {
        pause();
        setIsPlaying(false);
    } else {
        play();
        setIsPlaying(true);
    }
};

const [currTime, setCurrTime] = useState({
  min: "",
  sec: "",
});
const [seconds, setSeconds] = useState();

useEffect(() => {
  if (duration) {
    const sec = duration / 1000;
    const min = Math.floor(sec / 60);
    const secRemain = Math.floor(sec % 60);
    setCurrTime({
      min: min,
      sec: secRemain
    });
  }
}, [duration, isPlaying]);

useEffect(() => {
  const interval = setInterval(() => {
    if (sound) {
      setSeconds(sound.seek([]));
      const min = Math.floor(sound.seek([]) / 60);
      const sec = Math.floor(sound.seek([]) % 60);
      setTime({
        min,
        sec
      });
    }
  }, 1000);
  return () => clearInterval(interval);
}, [sound]);



  return (
    <div className="App">
      <h2>Playing now</h2>
      <img alt='ysk'
      className="musicCover"
      src="https://picsum.photos/id/870/200/300?grayscale&blur=2"
      />
      <div>
        <h3 className="Title">Might Help You Think</h3>
        <p className="subTitle">YskSadBoy</p>
      </div>
      <div>
        <div className="time">
          <p>
            {currTime.min}:{currTime.sec}
          </p>
          <p>
            {time.min}:{time.sec}
          </p>
        </div>
        <input
          type="range"
          min="0"
          max={duration / 1000}
          default="0"
          value={seconds}
          className="timeline"
          onChange={(e) => {
            sound.seek([e.target.value]);
          }}
        />
      </div>
      <div>
        <button className="playButton">
          <IconContext.Provider value={{ size: "3em", color: "#4267B2" }}>
            <BiSkipPrevious />
          </IconContext.Provider>
        </button>
        {! isPlaying ? (
          <button className='playButton' onClick={playingButton}>
            <IconContext.Provider value={{ size: "3em", color: "#4267B2"}}>
              <AiFillPlayCircle />
            </IconContext.Provider>
          </button>
        ) : (
          <button className='playButton' onClick={playingButton}>
            <IconContext.Provider value={{ size: "3em", color: "#4267B2" }}>
              <AiFillPauseCircle />
            </IconContext.Provider>
          </button>
          )}
        <button className='playButton'>
          <IconContext.Provider value={{ size: "3em", color: "#4267B2"}}>
            <BiSkipNext />
          </IconContext.Provider>

        </button>
      </div>
    </div>
  );
}


