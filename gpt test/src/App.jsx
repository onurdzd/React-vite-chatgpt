import { useState } from "react";
import "./App.css";
import axios from "axios";
// import { PORT } from "../config/config";
import { TiWeatherNight } from "react-icons/ti";
import { BsSun } from "react-icons/bs";

function App() {
  const [data, setData] = useState();
  const [inputData, setInputData] = useState();
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  const [loading, setLoading] = useState(false);

  const localTheme = () => {
    localStorage.setItem("theme", JSON.stringify(!darkMode));
  };

  const onChangeHandler = (e) => {
    setInputData(e.target.value);
  };

  const request = async () => {
    //localhost dan axios:
    // await axios
    //   .post(
    //     `http://localhost:${PORT}/gpt`,
    //     { icerik: `${inputData}` },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     setLoading(false)
    //     setData(res.data.message);
    //   })
    //   .catch((err) =>{setLoading(false);setData("Kullanım hakkın doldu.Admin ile iletişime geç"); console.log(err)});

    //vercel için axios:

    // let options = {
    //   method: 'POST',
    //   url: import.meta.env.VITE_URL,
    //   headers: {
    //     'content-type': 'application/json',
    //     'X-RapidAPI-Key': import.meta.env.VITE_OPENAI_API_KEY,
    //     'X-RapidAPI-Host': import.meta.env.VITE_HOST
    //   },
    //   data: {
    //     model: 'gpt-3.5-turbo',
    //     messages: [
    //       {
    //         role: 'user',
    //         content: inputData
    //       }
    //     ]
    //   }
    // };

    // const response = await axios.request(options);
    // console.log("akış içinde",response);
    // if (response) {
    //   setLoading(false);
    //   setData(response);
    // } else {
    //   setLoading(false);
    //   setData("Kullanım hakkın doldu.Admin ile iletişime geç");
    // }

    //vercel req 2:

    await axios
      .post(
        `${import.meta.env.VITE_URL}`,
        {
          headers: {
            "content-type": "application/json",
            "X-RapidAPI-Key": import.meta.env.VITE_OPENAI_API_KEY,
            "X-RapidAPI-Host": import.meta.env.VITE_HOST,
          },
          data: {
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: inputData,
              },
            ],
          },
        }
      )
      .then((res) => {
        setLoading(false);
        setData(res.data.message);
      })
      .catch((err) => {
        setLoading(false);
        setData("Kullanım hakkın doldu.Admin ile iletişime geç");
        console.log(err);
      });
  };

  return (
    <>
      <div className="">
        <div
          className={`bg-white-100 ${
            darkMode == true ? "dark" : ""
          } flex-col p-2 text-xl text-right pr-5`}
        >
          <button
            onClick={() => {
              setDarkMode(!darkMode);
              localTheme();
            }}
          >
            {darkMode == true ? (
              <TiWeatherNight></TiWeatherNight>
            ) : (
              <BsSun></BsSun>
            )}
          </button>
        </div>
        <div
          className={`h-screen w-full flex justify-center text-center bg-white-100 ${
            darkMode == true ? "dark" : ""
          } flex-col`}
        >
          <div className="w-full ">
            <h1 className="text-orange-400 font-bold text-xl mb-2">
              Chat GPT Test
            </h1>
            <h3 className="mb-3 font-medium">
              Chat GPT Api test için hazırlandı
            </h3>
            <div className="flex gap-2 justify-center">
              <input
                className="rounded-md p-2 border-gray-950 border-2  font-medium text-sky-500"
                onChange={(e) => onChangeHandler(e)}
              ></input>
              <button
                className="bg-slate-600 text-orange-400 rounded-md pl-3 pr-3 font-bold text-lg"
                onClick={() => {
                  setLoading(true);
                  request();
                }}
              >
                Sor
              </button>
            </div>
            <div className="mt-5 p-5 w-1/2 text-xl m-auto text-center font-medium">
              {loading == true ? "Sorunu araştırıyorum..." : data}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
