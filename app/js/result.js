// Calls fro Html
const color_mode = document.querySelector(".mode_btn");
const header = document.querySelector(".header");
const modeText = document.querySelector(".mode-text");
const modeIcon = document.querySelector(".mode-icon");
const container = document.querySelector(".container");
const dataTab = document.querySelector(".data");
const backBtn = document.querySelector(".backBtn");
const waitText = document.querySelector(".waitText");
let dataText = "";

// Variables
const url = "https://restcountries.com/v3.1/all/";
const borderUrl = "https://restcountries.com/v3.1/alpha/";
let currentMode = localStorage.getItem("mode");
let data = "";
let currencyArr = "";
let nativeNameArr = "";
let languagesArr = "";
let bordersArr = "";

// Back button
backBtn.addEventListener("click", () => {
  localStorage.removeItem("req");

  window.location.assign("index.html");
});

// Get Data From API
const getData = async () => {
  const res = await fetch(url);
  data = await res.json();

  const dataSelect = data.filter((el) => {
    return el.name.official.includes(localStorage.getItem("req"));
  });

  try {
    currencyArr = Object.values(dataSelect[0].currencies);
  } catch (err) {
    console.log(err);
    currencyArr = [{ name: "undefined" }];
  }
  try {
    nativeNameArr = Object.values(dataSelect[0].name.nativeName);
  } catch (err) {
    console.log(err);
    nativeNameArr = [{ common: "undefined" }];
  }

  try {
    languagesArr = Object.values(dataSelect[0].languages);
  } catch (err) {
    console.log(err);
    languagesArr = ["undefined"];
  }

  try {
    bordersArr = dataSelect[0].borders.map((el) => {
      return el;
    });
  } catch (err) {
    console.log(err);
    bordersArr = ["undefined"];
  }

  if (dataSelect.length != 0) {
    showData(dataSelect, currencyArr, nativeNameArr, languagesArr, bordersArr);
    waitText.style.display = "none";

    if (currentMode == "Dark Mode") {
      darkMode();
    } else {
      lightMode();
    }
  } else {
    waitText.innerHTML = "an error occurred. Try again  later";
  }
};

// Redirect to selected border page
async function borderRoute(border) {
  waitText.style.display = "";
  const borderReq = border.innerHTML;

  const res = await fetch(borderUrl + borderReq);
  const borderData = await res.json();
  localStorage.removeItem("req");
  localStorage.setItem("req", borderData[0].name.official);
  window.location.assign("Result.html");
}

// Set theme to userselection
window.onload = () => {
  if (currentMode == "Dark Mode") {
    darkMode();
  } else {
    lightMode();
  }
};

// Dark / Light Mode Toggle
color_mode.addEventListener("click", () => {
  if (modeText.innerHTML == "Dark Mode") {
    darkMode();
    localStorage.setItem("mode", "Dark Mode");
  } else {
    lightMode();

    localStorage.setItem("mode", "Light Mode");
  }
});

// Set Dark Mode
const darkMode = () => {
  header.classList.add("header-dark");
  container.classList.add("container-dark");

  modeText.innerHTML = "Light Mode";
  modeIcon.src = "./images/13676827261543238933.svg";
  modeIcon.classList.add("mode-icon__dark");

  backBtn.classList.add("backBtn-dark");

  waitText.style.color = "white";

  document.querySelector(".data__text").classList.add("data__text-dark");
  document.querySelectorAll(".title").forEach((el) => {
    el.classList.add("title-dark");
  });
  document.querySelector(".border").classList.add("border-dark");
  document.querySelector(".border__box").classList.add("border__box-dark");
};

// Set Light Mode
const lightMode = () => {
  header.classList.remove("header-dark");
  container.classList.remove("container-dark");

  modeText.innerHTML = "Dark Mode";
  modeIcon.src = "./images/18266103411574330931.svg";
  modeIcon.classList.remove("mode-icon__dark");

  backBtn.classList.remove("backBtn-dark");

  waitText.style.color = "black";

  document.querySelector(".data__text").classList.remove("data__text-dark");
  document.querySelectorAll(".title").forEach((el) => {
    el.classList.remove("title-dark");
  });
  document.querySelector(".border").classList.remove("border-dark");
  document.querySelector(".border__box").classList.remove("border__box-dark");
};

// Show data in page
const showData = (req, currencies, nativeName, languages, borders) => {
  const htmlString = req
    .map((req) => {
      return `
        <img class="data__img" src="${req.flags.png}"></img>
        <div class="data__text">
          <h2>${req.name.common}</h2>
          <div class="text flex flex-jc-sb ">
            <div class="text-left flex flex-column ">
              <div class="title">
                <h3>Native Name:</h3>
                <p>${nativeName[0].common}</p>
              </div>
              <div class="title">
                <h3>Population:</h3>
                <p>${req.population.toLocaleString()}</p>
              </div>
              <div class="title">
                <h3>Region:</h3>
                <p>${req.region}</p>
              </div>
              <div class="title">
                <h3>Sub Region:</h3>
                <p>${req.subregion}</p>
              </div>
              <div class="title">
                <h3>Capital:</h3>
                <p>${req.capital}</p>
              </div>
            </div>
            <div class="text-right flex flex-column ">
              <div class="title">
                <h3>Top Level Domin:</h3>
                <p>${req.tld[0]}</p>
              </div>
              <div class="title">
                <h3>Currencies:</h3>
                <p>${currencies[0].name}</p>
              </div>
              <div class="title">
                <h3>Languages:</h3>
                <p>${languages[0]}</p>
              </div>
            </div>
          </div>
          <div class="border">
            <h3 class="title">Border Countries: </h3>
            <div class="border__box">
              ${borders
                .map((el) => {
                  return `
                  <p onclick="borderRoute(this)">${el}</p>
                `;
                })
                .join("")}
            </div>
          </div>
      `;
    })
    .join("");
  dataTab.innerHTML = htmlString;
};

getData();
