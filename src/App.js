import { useRef, useState } from 'react';
import './App.css';

function App() {

  const [currentMusicDetails, setCurrentMusicDetails] = useState({
    songName: 'الصحو بدا',
    songArtist: 'Syed Areeba Fatima',
    songSrc: './Assets/songs/Assubhu Bada.mp3',
    songAvatar: './Assets/Images/areeba.jpg'
  });

  const [audioProgress, setAudioProgress] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [musicIndex, setMusicIndex] = useState(0);
  const [musicTotalLength, setMusicTotalLength] = useState('00 : 00');
  const [musicCurrentTime, setMusicCurrentTime] = useState('00 : 00');
  const [videoIndex, setVideoIndex] = useState(0);

  const currentAudio = useRef();

  const handleMusicProgressBar = (e) => {
    setAudioProgress(e.target.value);
    currentAudio.current.currentTime = e.target.value * currentAudio.current.duration / 100;
  };

  let avatarClass = ['objectFitCover', 'objectFitContain', 'none'];
  const [avatarClassIndex, setAvatarClassIndex] = useState(0);

  const handleAvatar = () => {
    setAvatarClassIndex((avatarClassIndex + 1) % avatarClass.length);
  };

  const handleAudioPlay = () => {
    if (currentAudio.current.paused) {
      currentAudio.current.play();
      setIsAudioPlaying(true);
    } else {
      currentAudio.current.pause();
      setIsAudioPlaying(false);
    }
  };

  const musicAPI = [
    {
      songName: 'الصحو بدا',
      songArtist: ' Syed Areeba Fatima',
      songSrc: './Assets/songs/Assubhu Bada.mp3',
      songAvatar: './Assets/Images/areeba.jpg'
    },
    {
      songName: 'جمال الوجود',
      songArtist: 'Hamoud Al Qahtani',
      songSrc: './Assets/songs/jama al wuzu.mp3',
      songAvatar: './Assets/Images/Nasheed.jpg'
    },
    {
      songName: 'تسبيح',
      songArtist: 'Ayisha Abdul Basith',
      songSrc: './Assets/songs/Tasbih.mp3',
      songAvatar: './Assets/Images/basith.jpg'
    },
    {
      songName: 'بصراحة',
      songArtist: 'Abeer Nehme',
      songSrc: './Assets/songs/BiSarah.mp3',
      songAvatar: './Assets/Images/Abeer Nehme.jpg'
    },
    {
      songName: ' عروسة النور',
      songArtist: 'Muhammad Al Muqit',
      songSrc: './Assets/songs/Wedding Nasheed.mp3',
      songAvatar: './Assets/Images/Muhammad Al Muqit.jpg'
    },
    
    {
      songName: 'يا نبي سلام عليك',
      songArtist: 'Maher zain',
      songSrc: './Assets/songs/Maher zain-ya nabi.mp3',
      songAvatar: './Assets/Images/maher zain.jpg'
    }
  ];

  const handleNextSong = () => {
    let nextIndex = (musicIndex + 1) % musicAPI.length;
    setMusicIndex(nextIndex);
    updateCurrentMusicDetails(nextIndex);
  };

  const handlePrevSong = () => {
    let prevIndex = (musicIndex - 1 + musicAPI.length) % musicAPI.length;
    setMusicIndex(prevIndex);
    updateCurrentMusicDetails(prevIndex);
  };

  const updateCurrentMusicDetails = (index) => {
    const music = musicAPI[index];
    setCurrentMusicDetails({
      songName: music.songName,
      songArtist: music.songArtist,
      songSrc: music.songSrc,
      songAvatar: music.songAvatar
    });

    const audio = currentAudio.current;
    audio.src = music.songSrc;
    audio.load();
    audio.onloadedmetadata = () => {
      audio.play();
      setIsAudioPlaying(true);
    };
  };

  const handleAudioUpdate = () => {
    const audio = currentAudio.current;
    if (audio.duration) {
      const minutes = Math.floor(audio.duration / 60);
      const seconds = Math.floor(audio.duration % 60);
      setMusicTotalLength(`${minutes < 10 ? '0' + minutes : minutes} : ${seconds < 10 ? '0' + seconds : seconds}`);
    }

    if (!isNaN(audio.currentTime)) {
      const currentMin = Math.floor(audio.currentTime / 60);
      const currentSec = Math.floor(audio.currentTime % 60);
      setMusicCurrentTime(`${currentMin < 10 ? '0' + currentMin : currentMin} : ${currentSec < 10 ? '0' + currentSec : currentSec}`);
    }

    const progress = parseInt((audio.currentTime / audio.duration) * 100);
    setAudioProgress(isNaN(progress) ? 0 : progress);
  };

  const vidArray = [
    './Assets/Videos/video1.mp4',
    './Assets/Videos/video2.mp4',
    './Assets/Videos/video3.mp4',
    './Assets/Videos/video4.mp4',
    './Assets/Videos/video5.mp4',
    './Assets/Videos/video6.mp4'
  ];

  const handleChangeBackground = () => {
    setVideoIndex((videoIndex + 1) % vidArray.length);
  };

  return (
    <div className="container">
      <audio
        ref={currentAudio}
        onEnded={handleNextSong}
        onTimeUpdate={handleAudioUpdate}
        onLoadedMetadata={handleAudioUpdate}
      />
      <video
        src={vidArray[videoIndex]}
        loop
        muted
        autoPlay
        className='backgroundVideo'
      ></video>
      <div className="blackScreen"></div>
      <div className="music-Container">
        <p className='music-Head-Name'>{currentMusicDetails.songName}</p>
        <p className='music-Artist-Name'>{currentMusicDetails.songArtist}</p>
        <img
          src={currentMusicDetails.songAvatar}
          className={avatarClass[avatarClassIndex]}
          onClick={handleAvatar}
          alt="song Avatar"
          id='songAvatar'
        />
        <div className="musicTimerDiv">
          <p className='musicCurrentTime'>{musicCurrentTime}</p>
          <p className='musicTotalLenght'>{musicTotalLength}</p>
        </div>
        <input
          type="range"
          name="musicProgressBar"
          className='musicProgressBar'
          value={audioProgress}
          onChange={handleMusicProgressBar}
        />
        <div className="musicControlers">
          <i className='fa-solid fa-backward musicControler' onClick={handlePrevSong}></i>
          <i className={`fa-solid ${isAudioPlaying ? 'fa-pause-circle' : 'fa-circle-play'} playBtn`} onClick={handleAudioPlay}></i>
          <i className='fa-solid fa-forward musicControler' onClick={handleNextSong}></i>
        </div>
      </div>
    </div>
  );
}

export default App;
