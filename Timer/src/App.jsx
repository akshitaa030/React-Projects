import { useRef, useState } from "react";

const App = () => {
  const [timer, setTimer] = useState("5:00"); //to store the time
  const [isRunning, setIsRunning] = useState(false); //to note if the timer is running
  const currentTime = useRef(null); //using useref because it retains its value even during re-renders
  const [bgStyle, setBgStyle] = useState({});

  //helper function to convert time(MM:SS) into seconds
  const timeInSeconds = (x) => {
    const [minutes, seconds] = x.split(":").map(Number); //using Array destructuring to take minutes and seconds
    const totalSeconds = minutes * 60 + seconds; //split returns an array which is separated by colon(:) and .map iterates through
    return totalSeconds; //the array ["5","00"] and convert them from string to number using Number();
  };

  //helper function to convert seconds into time(MM:SS)
  const timeInMinutes = (x) => {
    const minutes = Math.floor(x / 60);
    const seconds = x % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`; //if seconds has a single digit then put 0 ahead it and after minutes
  };

  const handleStart = () => {
    if (isRunning) return; //preventing multiple intervals
    setIsRunning(true);
    let totalSeconds = timeInSeconds(timer); //MM:SS string to seconds in number
    currentTime.current = setInterval(() => {
      totalSeconds--;
      if (totalSeconds <= 0) {
        //if timer has reached the end then stop the timer
        clearInterval(currentTime.current); //useRef has .current property where the value is  stored
        setIsRunning(false);
      }
      setTimer(timeInMinutes(totalSeconds)); //timer has a value in MM:SS format
    }, 1000); //for each 1 sec decrease the totalSeconds by 1
  };

  const handleStop = () => {
    clearInterval(currentTime.current);
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    clearInterval(currentTime.current);
    setTimer("5:00");
  };

  //handleMouseMove and handleMouseLeave are just for some engaging designing
  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left; // Mouse X position relative to the div
    const y = event.clientY - rect.top; // Mouse Y position relative to the div

    setBgStyle({
      background: `radial-gradient(circle at ${x}px ${y}px, #C8A2C8, transparent)`, //using radial-gradient at x & y pixels of circular shape for background-color
    });
  };

  const handleMouseLeave = () => {
    setBgStyle({});
  };

  return (
    <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xlpx-32 flex flex-col  ">
      <div
        className="flex justify-center items-center  border border-spacing-4 border-black rounded-md  mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32 2xl:mx-40  py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 2xl:py-32  text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl   mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-14 2xl:mt-16 "
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={bgStyle}
      >
        {timer}
      </div>

      <div className=" mt-4 sm:mt-6 md:mt-10 flex flex-wrap justify-center gap-4">
        <button
          className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 border border-spacing-4 border-black rounded-md font-bold  hover:bg-black hover:text-white  transition-transform duration-200 "
          onClick={handleStart}
        >
          Start
        </button>
        <button
          className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 border  border-spacing-4 border-black rounded-md font-bold  hover:bg-black hover:text-white transition-transform duration-200 "
          onClick={handleStop}
        >
          Stop
        </button>
        <button
          className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 border border-spacing-4 border-black  rounded-md font-bold  hover:bg-black hover:text-white transition-transform duration-200"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default App;
