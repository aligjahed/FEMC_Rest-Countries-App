const color_mode = document.querySelector(".mode_btn");
const header = document.querySelector(".header");
const container = document.querySelector(".container");
const dataTab = document.querySelector(".data");
const modeText = document.querySelector(".mode-text");
const modeIcon = document.querySelector(".mode-icon");
const searchBar = document.querySelector(".search-bar");

let apiUrl = "https://restcountries.com/v3.1/all";
let data = "";
let currentMode = "Light Mode";

// Dark / Light Mode Toggle
color_mode.addEventListener("click", () => {
  if (modeText.innerHTML == "Dark Mode") {
    darkMode();
  } else {
    lightMode();
  }
});

// Set Dark Mode
const darkMode = () => {
  header.classList.add("header-dark");
  container.classList.add("container-dark");

  let box = document.querySelectorAll(".box").forEach((el) => {
    el.classList.add("box__dark");
  });

  modeText.innerHTML = "Light Mode";
  modeIcon.src = "../images/13676827261543238933.svg";

  searchBar.classList.add("search-bar__dark");

  currentMode = "Dark Mode";
};

// Set Light Mode
const lightMode = () => {
  header.classList.remove("header-dark");
  container.classList.remove("container-dark");

  let box = document.querySelectorAll(".box").forEach((el) => {
    el.classList.remove("box__dark");
  });

  modeText.innerHTML = "Dark Mode";
  modeIcon.src = "../images/18266103411574330931.svg";

  searchBar.classList.remove("search-bar__dark");

  currentMode = "Light Mode";
};

// Search Bar
searchBar.addEventListener("keyup", (e) => {
  const searchValue = e.target.value.toLowerCase();

  const filterCountries = data.filter((e) => {
    return (
      e.name.official.toLowerCase().includes(searchValue) ||
      e.name.common.toLowerCase().includes(searchValue)
    );
  });

  showData(filterCountries);
  console.log(filterCountries);

  if (currentMode == "Dark Mode") {
    darkMode();
  } else {
    lightMode();
  }
});

// Get Data From API
const getData = async () => {
  const res = await fetch(apiUrl);
  data = await res.json();
  showData(data);
  if (currentMode == "Dark Mode") {
    darkMode();
  } else {
    lightMode();
  }
};

// Show Data On Page
const showData = (countries) => {
  const htmlString = countries
    .map((countries) => {
      return `
        <div class="box">
            <img src="${countries.flags.png}" class="box__img"></img>
            <div class="box__data flex flex-column flex-ai-fs">
                <h2 class="box__title">${countries.name.common}</h2>
                <h3 class="box__text">Population: <p> ${countries.population.toLocaleString()}</p></h3>
                <h3 class="box__text">Region: <p> ${countries.region}</p></h3>
                <h3 class="box__text">Capital: <p> ${countries.capital}</p></h3>
            </div>    
        </div>     
        `;
    })
    .join("");
  dataTab.innerHTML = htmlString;
};

getData();
