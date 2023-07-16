const tbody = document.getElementById("tbody")
const pagination = document.getElementById("pagination")
let perPage = 5
let totalPageCount = 0
let countries = []
let activePage = 1
fetch("https://restcountries.com/v3.1/all").then(a => a.json())
    .then(a => {
        countries = a
        // console.log(countries)
        showCountries()
        totalPageCount = Math.ceil(countries.length / perPage) //50
        console.log(totalPageCount)
        makePagination()
    })


const showCountries = () => {
    tbody.innerHTML = ""
    let s = (activePage - 1) * perPage
    let e = s + perPage
    countries.slice(s, e).map((country, index) => {
        const tr = document.createElement("tr")
        // const idTd = document.createElement("td")
        // idTd.textContent = index + 1
        const nameTd = document.createElement("td")
        nameTd.textContent = country.name.common
        const capitalTd = document.createElement("td")
        capitalTd.textContent = country.capital
        const regionTd = document.createElement("td")
        regionTd.textContent = country.region
        const areaTd = document.createElement("td")
        areaTd.textContent = country.area
        const flagTd = document.createElement("td")
        const flagImg = document.createElement("img")
        flagImg.setAttribute("src", country.flags.svg)
        flagTd.append(flagImg)
        tr.append(nameTd, capitalTd, regionTd, areaTd, flagTd)
        tbody.append(tr)
    })
}

const makePagination = () => {
    pagination.innerHTML = ""
    const start = activePage - 3 > 0 ? activePage - 3 : 1;
    const end = activePage + 3 > totalPageCount ? totalPageCount : activePage + 3
    const firsPage = document.createElement("li")
    firsPage.innerHTML = "&larr;"
    firsPage.addEventListener("click", () => {
        activePage = 1
        makePagination()
        showCountries()
    })
    pagination.append(firsPage)
    for (let i = start; i <= end; i++) {
        const page = document.createElement("li")
        page.textContent = i
        page.addEventListener("click", () => {
            activePage = i
            makePagination()
            showCountries()
        })
        if (i === activePage) {
            page.classList.add("active")
        }
        pagination.append(page)
    }
    const lastPage = document.createElement("li")
    lastPage.innerHTML = "&rarr;"
    lastPage.addEventListener("click", () => {
        activePage = totalPageCount
        makePagination()
        showCountries()
    })
    pagination.append(lastPage)
}