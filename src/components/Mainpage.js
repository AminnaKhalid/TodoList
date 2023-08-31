import React, { useState, useEffect } from "react";
// import Iconpath from "./Iconpath";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

const getLocalData = () => {
  const lists = localStorage.getItem("Mylist");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

// seeting up a default white mode
function Mainpage() {
  const [isHovered, setIsHovered] = useState(false);
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData);
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const addItems = () => {
    if (!inputData) {
      alert("Fill out the field");
    } else if (inputData && toggleButton) {
      setItems(
        items.map((curelem) => {
          if (curelem.id === isEditItem) {
            return { ...curelem, name: inputData };
          }
          return curelem;
        })
      );
      setInputData("");
      setToggleButton(false); // Reset toggleButton state after edit
      setIsEditItem(null);
    } else {
      const newInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, newInputData]);
      setInputData("");
    }
  };

  const deleteItem = (id) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== id;
    });
    setItems(updatedItems);
  };

  const removeAllItems = () => {
    setItems([]);
  };

  useEffect(() => {
    localStorage.setItem("Mylist", JSON.stringify(items));
  }, [items]);

  const editItem = (index) => {
    const item_todo_edited = items.find((curelem) => {
      return curelem.id === index;
    });
    setInputData(item_todo_edited.name); // Set input data to the current item name
    setIsEditItem(index);
    setToggleButton(true); // Set toggleButton to true for edit mode
  };

  //   adding dark mode

  const [theme, setTheme] = useState(null);
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  //   calling the func for dark modechange

  useEffect(() => {
    if (window.matchMedia("(prefers.color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);
  const handleChangeClick = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <div className="main h-screen w-full  bg-gray-200 dark:bg-cyan-800 ">
      {/* dark mode icons div */}
      <div className="flex items-end justify-end">
        <div className="p-4">
          <SunIcon
            className={`h-12 w-10 text-yellow-600 ${
              theme === "dark" ? "" : "hidden"
            }`}
            onClick={handleChangeClick}
          />
        </div>
        <div className="p-4">
          <MoonIcon
            className={`h-12 w-10 text-gray-800 ${
              theme === "light" ? "" : "hidden"
            }`}
            onClick={handleChangeClick}
          />
        </div>
      </div>
      {/* whole div area placed in center */}
      <div className="flex items-center justify-center flex-col py-10 md:pt-16">
        <figure className="bg-gray-200 dark:bg-cyan-800">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4697/4697260.png"
            alt=""
            className="w-18 h-20 bg-gray-200 dark:bg-cyan-800"
          />
        </figure>

        <div className="py-4 font-bold text-2xl dark:text-white">
          <span className="text-teal-900 dark:text-gray-100">
            Add Your List Here
          </span>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="✍ Add Items"
            className="py-1 px-4 w-64 pr-10"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />
          {toggleButton && (
            <i
              className="far fa-pen-to-square text-black px-1 absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={addItems}
            ></i>
          )}
          {!toggleButton && (
            <i
              className="fas fa-plus absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={addItems}
            ></i>
          )}
        </div>
        <div className="my-2 text-center">
          {items.map((curelem) => (
            <div
              className="bg-gray-500 rounded text-white text-base font-semibold break-words w-64 py-1 flex items-center justify-between hover:bg-white hover:text-black my-1 dark:bg-cyan-500 dark:text-black dark:hover:bg-gray-100"
              key={curelem.id}
            >
              <h2 className="px-2 mb-1">{curelem.name}</h2>
              <div>
                <i
                  className="far fa-pen-to-square text-black px-1 hover:text-blue-600"
                  onClick={() => editItem(curelem.id)}
                ></i>
                <i
                  className="far fa-trash-can text-black px-1 hover:text-red-500 "
                  onClick={() => deleteItem(curelem.id)}
                ></i>
              </div>
            </div>
          ))}
        </div>
        <div className="my-4">
          <button
            onMouseEnter={handleHover}
            onMouseLeave={handleMouseLeave}
            onClick={removeAllItems}
            className="border-2 border-gray-300 bg-blue-800 py-2 px-4 text-white font-lg hover:bg-slate-500 rounded-md transition duration-300 ease-in-out"
            data-sm-link-text="Remove All"
          >
            {isHovered ? "Remove All" : "Check List"}
          </button>
        </div>
      </div>
    </div>
  );
}
export default Mainpage;
