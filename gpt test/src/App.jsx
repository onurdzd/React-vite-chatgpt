import { useState } from "react";
import "./App.css";
import axios from "axios";
import { PORT } from "../config/config";
import { TiWeatherNight } from 'react-icons/ti';
import { BsSun } from 'react-icons/bs';

// const headers = { Authorization: `Bearer ${token}` };

function App() {
  const [data, setData] = useState();
  const [inputData, setInputData] = useState();
  const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("theme")))

  const localTheme=()=>{
    localStorage.setItem("theme", JSON.stringify(!darkMode))
  }

  const onChangeHandler = (e) => {
    setInputData(e.target.value);
  };

  console.log(darkMode,JSON.parse(localStorage.getItem("theme")))

  const request = async () => {
    await axios
      .post(
        `http://localhost:${PORT}/gpt`,
        { animal: `${inputData}` },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        setData(res.data.message);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
    <div className="text-center">
    <div className={`bg-white-100 ${darkMode==true ? "dark" : ""} flex-col`}>
    <button onClick={()=>{setDarkMode(!darkMode);localTheme()}}>{darkMode==true ? <TiWeatherNight></TiWeatherNight> : <BsSun></BsSun>}</button>
    </div>
      <div className={`h-screen w-full flex items-center justify-center bg-white-100 ${darkMode==true ? "dark" : ""} flex-col`} >
        <div className="flex-col ">
          <h1 className="text-orange-400">Chat GPT test</h1>
          <input
            className="rounded-md border-gray-950 border-2 mb-1 font-medium text-sky-500"
            onChange={(e) => onChangeHandler(e)}
          ></input>
          <div className="mb-4 font-medium text-orange-300">{inputData}</div>
          <button
            className="bg-slate-600 text-orange-400 rounded-md p-2"
            onClick={request}
          >
            Gpt Ara
          </button>
          <div>{data}</div>
        </div>
      </div>
      </div>
    </>
  );
}

export default App;
