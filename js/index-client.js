const searchBar = document.getElementById("bar")
const by = document.getElementById("by")
const search_btn = document.getElementById("search-btn")
const results = document.querySelector(".results")

let userData = ""
let searchBy = "song"
let selectedSong = {}
let records = []
let id = 0
searchBar.addEventListener("change", (e) => {
    userData = e.target.value
})

by.addEventListener("change", (e) => searchBy = e.target.value)

const displayResult = (arr) => {
    results.innerHTML = ""
    arr.forEach(item => {
        const div = document.createElement("div")
        div.className = "divTableRow";

        const innerhtml = `
                <div class="divTableCell">${item.SONG.toLowerCase().replace(/\b(\w)/g,(s) => s.toUpperCase())}</div>
                <div class="divTableCell">${item.ARTIST.toLowerCase().replace(/\b(\w)/g,(s) => s.toUpperCase())}</div>
                `;
        div.innerHTML = innerhtml
        results.appendChild(div)
    })
}

function resetFormFields(){
    document.querySelector("#name_inp").value="";
    searchBar.value = "";
}

search_btn.addEventListener("click", () => {
    loader.style.display = "flex"
    fetchData().then(data => {
        console.log(data)
        loader.style.display = "none"
        let filteredArr = []

        if (searchBy === "song") {
            filteredArr = data.filter(item => item.SONG.toLowerCase().includes(userData.toLowerCase()))

        } else {
            filteredArr = data.filter(item => item.ARTIST.toLowerCase().includes(userData.toLowerCase()))
        }
        displayResult(filteredArr)
        records = [] 

        selectedSong = {}
        const all_cbs = document.querySelectorAll(".btn-sel")
        all_cbs.forEach(cb => cb.addEventListener("change", (e) => {
            selectedSong.SONG = e.target.parentElement.parentElement.firstElementChild.innerText
            selectedSong.ARTIST = e.target.parentElement.parentElement.firstElementChild.nextElementSibling.innerText
            selectedSong.id = cb.id

            if (cb.checked) {
                records = [...records, selectedSong]

            } else {
                records.splice(records.findIndex(el => el.id === cb.id), 1)
            }
            selectedSong = {}
        }))

        console.log(records)
        const add_btn = document.querySelector("#add_data")



        add_btn.addEventListener("click", () => {
            loader.style.display = "flex"
            const nameInp = document.querySelector("#name_inp").value
            if (nameInp) {
                addToAirtable(nameInp, records).then(res => res.json().then(data => loader.style.display = "none"))
            } else {
                loader.style.display = "none"
                alert("Name cannot be blank")
            }
            resetFormFields()
        })


    })
})