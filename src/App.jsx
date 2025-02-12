import { useState, useEffect, useRef } from "react";

function App() {
  const [showProposal, setShowProposal] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio("/path-to-romantic-song.mp3"));
  const memories = [
    { text: "Our First Date", date: "I can never forget" },
    
    { text: "Our Special Moment", date: "Everyday I spend time with you" },
  ];

  useEffect(() => {
    // Add confetti script to document
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (showProposal) {
      const interval = setInterval(() => {
        setHearts((prev) => [
          ...prev.slice(-15),
          {
            id: Date.now(),
            left: Math.random() * 100,
          },
        ]);
      }, 500);

      return () => clearInterval(interval);
    }
  }, [showProposal]);

  const handleYes = () => {
    // Using window.confetti since it's loaded from CDN
    if (window.confetti) {
      window.confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <div className="love-bg" />
      <div className="valentine-container romantic-border">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="heart"
            style={{ left: `${heart.left}%` }}>
            ❤️
          </div>
        ))}

        {!showProposal ? (
          <div className="initial-view">
            <div className="love-quote">
              In all the world, there is no heart for me like yours.
            </div>
            <div
              className="beating-heart"
              onClick={() => setShowProposal(true)}>
              ❤️
            </div>
            <p className="click-me">
              Touch my heart to see how it beats for you...
            </p>
            <div
              className="memories-container"
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
              }}>
              {memories.map((memory, index) => (
                <div
                  key={index}
                  className="memory-polaroid"
                  style={{ "--rotation": `${Math.random() * 20 - 10}deg` }}>
                  <div className="memory-text">{memory.text}</div>
                  <div className="memory-date">{memory.date}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="proposal-view">
            <div className="love-quote">
              Every love story is beautiful, but I want ours to be my
              favorite...
            </div>
            {/* <h2 className="sliding-text" style={{ animationDelay: "0.3s" }}>
              Benita
            </h2> */}
            <h2 className="sliding-text" style={{ animationDelay: "0.3s" }}>
              Will
            </h2>
            <h2 className="sliding-text" style={{ animationDelay: "0.6s" }}>
              You Be
            </h2>
            <h2 className="sliding-text" style={{ animationDelay: "0.9s" }}>
              My Valentine?
            </h2>

            <div className="choice-buttons">
              <button className="choice-button yes-button" onClick={handleYes}>
                Yes! 💝
              </button>
              <button
                className="choice-button maybe-button"
                onMouseOver={(e) =>
                  (e.target.textContent = "You can only Say Yes!")
                }
                onClick={handleYes}>
                Let me think... 🤔
              </button>
              <button
                className="choice-button no-button"
                onMouseOver={(e) => (e.target.textContent = "You Can't Say No")}
                onClick={handleYes}>
                No 💔
              </button>
            </div>
          </div>
        )}
      </div>
      <button className="music-toggle" onClick={toggleMusic}>
        {isPlaying ? "🎵" : "🔇"}
      </button>
    </>
  );
}

export default App;
