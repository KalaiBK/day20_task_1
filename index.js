let selectedCountry = "";
let selectedYear = "";

async function getCountries() {
    try {
        let response = await fetch("https://restcountries.com/v3.1/all");
        let countryList = await response.json();
        // console.log(countryList);
        populateDropdown(countryList);
    }
    catch (err) {
        alert(err.message);
    }

}
getCountries();

function populateDropdown(countries) {
    let dropCountry = document.getElementById("selectCountry");
    let dropYear = document.getElementById("selectYear");

    for (i = 0; i < countries.length; i++) {
        let menuList = document.createElement("li");
        menuList.onclick = function () {
            let button = document.getElementById("countryButton");
            button.innerHTML = span.innerHTML;
            selectedCountry = this.id;
        }
        menuList.className = "dropdown-item";
        menuList.id = countries[i].cca2;

        let flags = document.createElement("img");
        flags.className = "me-3";
        flags.style = "height: 2em; width: 4em;";
        flags.src = countries[i].flags.png;

        let span = document.createElement("span");
        span.innerHTML = countries[i].name.common;

        menuList.appendChild(flags);
        menuList.appendChild(span);
        dropCountry.appendChild(menuList);
    }

    const date = new Date();
    const year = date.getFullYear();

    for (i = year; i >= 1950; i--) {
        let menuList = document.createElement("li");
        menuList.className = "dropdown-item";
        menuList.innerHTML = i;

        menuList.onclick = function () {
            let button = document.getElementById("yearButton");
            button.innerHTML = this.innerHTML;
            selectedYear = this.innerHTML;
        }

        dropYear.appendChild(menuList);
    }
}

async function getHolidays() {
    try {
        let response = await fetch("https://calendarific.com/api/v2/holidays?&api_key=2pREahouboin00C9qpTYM2kmIOLHi60z&country=" + selectedCountry + "&year=" + selectedYear);
        console.log(response);
        let result = await response.json();

        let holidays = result.response.holidays;
        let nationalHoliday = [];
        for (i = 0; i < holidays.length; i++) {
            let type = holidays[i].type;
            for (j = 0; j < type.length; j++) {
                if (type[j] == "National holiday") {
                    nationalHoliday.push(holidays[i]);
                }
            }
        }
        for(i=0;i<nationalHoliday.length;i++){
            populateHolidays(nationalHoliday[i].name,nationalHoliday[i].description,i);
        }
        
    }
    catch (err) {
        alert(err.message);
    }
}

function populateHolidays(name,description,i) {
    let holidays = document.getElementById("holidays");

    let collapse = document.createElement("div");
    collapse.setAttribute("class", "accordion-collapse collapse");
    collapse.id = "collapse"+i;

    collapse.setAttribute("data-bs-parent", "#accordionExample");

    let accordionBody = document.createElement("div");
    accordionBody.setAttribute("class","accordion-body");
    accordionBody.innerHTML = description;

    collapse.appendChild(accordionBody);

    let heading = document.createElement("h2");
    heading.setAttribute("class", "accordion-header");

    let button = document.createElement("button");
    button.setAttribute("class", "accordion-button collapsed");
    button.setAttribute("type", "button");
    button.setAttribute("data-bs-toggle", "collapse");
    button.setAttribute("data-bs-target", "#collapse"+i);
    button.setAttribute("aria-expanded", "false");
    // button.setAttribute("aria-controls", "collapseOne");
    button.innerHTML = name;

    heading.appendChild(button);

    let mainAccordion = document.createElement("div");
    mainAccordion.setAttribute("class", "accordion mt-5");
    mainAccordion.setAttribute("id", "accordion");

    let accordionItem = document.createElement("div");
    accordionItem.setAttribute("class", "accordion-item");

    accordionItem.appendChild(heading);
    accordionItem.appendChild(collapse);
    mainAccordion.appendChild(accordionItem);
    holidays.appendChild(mainAccordion);

}




