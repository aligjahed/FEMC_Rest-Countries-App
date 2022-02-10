// Calling data from html
const color_mode = document.querySelector(".mode_btn");
const header = document.querySelector(".header");
const container = document.querySelector(".container");
const dataTab = document.querySelector(".data");
const modeText = document.querySelector(".mode-text");
const modeIcon = document.querySelector(".mode-icon");
const searchBar = document.querySelector(".search-bar");
const waitText = document.getElementById("waitText");
const regionSelector = document.querySelector(".selector");
const selectorArrow = document.querySelector(".selector__arrow");
const selectorRegion = document.querySelector(".selector__region");
const regionText = document.querySelector(".selector__text");

// Variables
const apiUrl = "https://restcountries.com/v3.1/all";
let data = "";
let currentMode = localStorage.getItem("mode");

window.onload = () => {
  if (currentMode == "Dark Mode") {
    darkMode();
  } else {
    lightMode();
  }
};

localStorage.removeItem("req");

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

// Region Selector toggle
regionSelector.addEventListener("click", () => {
  if (selectorRegion.classList.contains("close")) {
    selectorArrow.classList.add("selector__arrow-open");
    selectorRegion.classList.add("selector__region-open");

    selectorRegion.classList.add("open");
    selectorRegion.classList.remove("close");
  } else {
    selectorArrow.classList.remove("selector__arrow-open");
    selectorRegion.classList.remove("selector__region-open");

    selectorRegion.classList.remove("open");
    selectorRegion.classList.add("close");
  }
});

function selection(selection) {
  const selectedCountry = selection.querySelector(".box__title").innerHTML;
  localStorage.setItem("req", selectedCountry);
  window.location.assign("Result.html");
}

// Set Dark Mode
const darkMode = () => {
  header.classList.add("header-dark");
  container.classList.add("container-dark");

  let box = document.querySelectorAll(".box").forEach((el) => {
    el.classList.add("box__dark");
  });

  modeText.innerHTML = "Light Mode";
  modeIcon.src = "./images/13676827261543238933.svg";
  modeIcon.classList.add("mode-icon__dark");

  searchBar.classList.add("search-bar__dark");

  waitText.style.color = "white";

  regionSelector.classList.add("selector__dark");
  selectorRegion.classList.add("selector__region__dark");

  document
    .querySelector(".searchbarSection")
    .classList.add("searchbarSection-dark");

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
  modeIcon.src = "./images/18266103411574330931.svg";
  modeIcon.classList.remove("mode-icon__dark");

  searchBar.classList.remove("search-bar__dark");

  regionSelector.classList.remove("selector__dark");
  selectorRegion.classList.remove("selector__region__dark");

  waitText.style.color = "black";

  document
    .querySelector(".searchbarSection")
    .classList.remove("searchbarSection-dark");

  currentMode = "Light Mode";
};

// Filter by selected region
function filterRegion(selection) {
  regionText.innerHTML = selection.innerHTML;

  const regionFilter = data.filter((e) => {
    return e.region.includes(regionText.innerHTML);
  });

  const sortedRegionFilter = regionFilter.sort((a, b) => {
    return a.name.official.localeCompare(b.name.official);
  });

  showData(sortedRegionFilter);
  if (currentMode == "Dark Mode") {
    darkMode();
  } else {
    lightMode();
  }
}

// Search Bar
searchBar.addEventListener("keyup", (e) => {
  const searchValue = e.target.value.toLowerCase();

  const filterCountries = data.filter((e) => {
    return (
      e.name.official.toLowerCase().includes(searchValue) ||
      e.name.common.toLowerCase().includes(searchValue)
    );
  });

  const sortedFilterCountries = filterCountries.sort((a, b) => {
    return a.name.official.localeCompare(b.name.official);
  });

  showData(sortedFilterCountries);

  if (currentMode == "Dark Mode") {
    darkMode();
  } else {
    lightMode();
  }

  regionText.innerHTML = "Filter by Region";
});

// Get Data From API
const getData = async () => {
  const res = await fetch(apiUrl);
  data = await res.json();
  console.log(data);

  const sortedData = data.sort((a, b) => {
    return a.name.official.localeCompare(b.name.official);
  });

  showData(sortedData);

  if (currentMode == "Dark Mode") {
    darkMode();
  } else {
    lightMode();
  }
};

// Show Data On Page
const showData = (countries) => {
  waitText.style.display = "none";
  const htmlString = countries
    .map((countries) => {
      return `
        <div class="box" onclick="selection(this)" >
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
  localStorage.removeItem("req");
};

getData();
