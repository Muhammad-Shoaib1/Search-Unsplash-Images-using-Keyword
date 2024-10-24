const searchForm = document.getElementById("search");
const searchInput = document.getElementById("input");
const searchButton = document.getElementById("searchButton");
const moreResults = document.getElementById("showMoreResults");
const searchResults = document.getElementById("searchResults");

let page = 1;
let keyword = "";

import { accessKey } from './config.js';
async function fetchData() {
  keyword = searchInput.value.trim();
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&per_page=12&client_id=${accessKey}`

  if(page === 1){
    searchResults.innerHTML = ""
  }
  try {
    let response = await fetch(url);
    let data = await response.json();

    let result = data.results
    result.map((results) => {
      let image = document.createElement("img");
      image.src = results.urls.small;

      let imageLink = document.createElement("a");
      imageLink.href = results.links.html;

      imageLink.appendChild(image);
      searchResults.appendChild(imageLink);
    });
    moreResults.style.display = "block"
} catch (error) {
  console.error("Error fetching data:", error);
}
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  fetchData();
});

moreResults.addEventListener("click", ()=>{
  page++;
  fetchData()
})