import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom';
import './App.css';

function App() {
  const [lastAudio, setLastAudio] = useState('');
  const [soundLevel, setSoundLevel] = useState(100);

  useEffect(() => {
    const drumPads = document.querySelectorAll('.drum-pad');
    drumPads.forEach((drumPad) => {
      const listener = async (event) => {
        const button = event.target;
        const audio = button.querySelector('audio');
        await playAudio(audio);
      };
      drumPad.addEventListener('click', listener);
    });

    document.addEventListener('keydown', async (event) => {
      const key = event.key.toUpperCase();
      const audio = document.getElementById(key);
      if (audio instanceof HTMLAudioElement) {
        await playAudio(audio);
      }
    });
  }, []);

  const handleSoundLevelChange = (e) => {
    const level = parseInt(e.target.value);
    setSoundLevel(level);
  };

  const playAudio = async (audio) => {
    try {
      if (soundLevel === 0) {
        // Set volume to 0 if sound level is 0
        audio.volume = 0;
      } else {
        audio.volume = soundLevel / 100; // Adjust volume based on sound level
      }

      await audio.play();
      const button = audio.parentElement;
      setLastAudio(button.id);
    } catch (error) {
      console.error('Audio playback error:', error);
    }
  };

  return (
    <div className="jumbotron jumbotron-fluid h-100 m-0">
      <div className="h-100 d-flex flex-column align-items-stretch">
        <div className="flex-grow-1 d-flex align-items-center justify-content-center">
          <div id="drum-machine">
            <div id="display" className="text-center">
              {lastAudio}
            </div>
            <div className="container">
              <div className="row">
                <button
                  type="button"
                  id="Heater-1"
                  className="col drum-pad btn btn-outline-info"
                >
                  <audio
                    className="clip"
                    id="Q"
                    src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
                  />
                  Q
                </button>
                <button
                  type="button"
                  id="Heater-2"
                  className="col drum-pad btn btn-outline-info"
                >
                  <audio
                    className="clip"
                    id="W"
                    src="https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
                  />
                  W
                </button>
                <button
                  type="button"
                  id="Heater-3"
                  className="col drum-pad btn btn-outline-info"
                >
                  <audio
                    className="clip"
                    id="E"
                    src="https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
                  />
                  E
                </button>
              </div>
              <div className="row">
                <button
                  type="button"
                  id="Heater-4"
                  className="col drum-pad btn btn-outline-info"
                >
                  <audio
                    className="clip"
                    id="A"
                    src="https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
                  />
                  A
                </button>
                <button
                  type="button"
                  id="Clap"
                  className="col drum-pad btn btn-outline-info"
                >
                  <audio
                    className="clip"
                    id="S"
                    src="https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
                  />
                  S
                </button>
                <button
                  type="button"
                  id="Open-HH"
                  className="col drum-pad btn btn-outline-info"
                >
                  <audio
                    className="clip"
                    id="D"
                    src="https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
                  />
                  D
                </button>
              </div>
              <div className="row">
                <button
                  id="Kick-n'-Hat"
                  type="button"
                  className="col drum-pad btn btn-outline-info"
                >
                  <audio
                    className="clip"
                    id="Z"
                    src="https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
                  />
                  Z
                </button>
                <button
                  id="Kick"
                  type="button"
                  className="col drum-pad btn btn-outline-info"
                >
                  <audio
                    className="clip"
                    id="X"
                    src="https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
                  />
                  X
                </button>
                <button
                  id="Closed-HH"
                  type="button"
                  className="col drum-pad btn btn-outline-info"
                >
                  <audio
                    className="clip"
                    id="C"
                    src="https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
                  />
                  C
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="sound-level">Sound Level: {soundLevel}</div>
        <input
          type="range"
          min="0"
          max="100"
          value={soundLevel}
          onChange={handleSoundLevelChange}
        />
      </div>
    </div>
  );
}

const root = document.getElementById('root');
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
createRoot(root).render(app);

export default App;