const searchForm = document.querySelector('form');
const input = document.querySelector('#search-input');
const cardResults = document.querySelector('#cards');
console.log(results);
searchForm.addEventListener('submit', search);
//what happens on submit

function search(e) {
    e.preventDefault();
    searchInput = searchForm.elements.search.value;
    console.log(searchInput)
    
    fetchAPI();
};

async function fetchAPI() {
    const searchURL = `http://api.searchspring.net/api/search/search.json?siteId=scmq7n&q=${searchInput}&resultsFormat=native&page`;
    const response = await fetch(searchURL);
    const data = await response.json();
    generateHTML(data.results);
    console.log(data);
}

function generateHTML(results) {
    let generatedHTML = '';
    results.map((result) => {
        generatedHTML +=
        `<div class="cards">
           <img  image" src="${result.thumbnailImageUrl}" alt="result">
           <div class="details">
           <p class="product">${result.title}</p>
           <p class="sale">$${result.price}.00</p>
           <p class="msrp">$${result.msrp}.00</p>
           </div>
        </div>`
    })
    cardResults.innerHTML = generatedHTML;
}




//---dropdown for filters ---
const showMoreBtn = document.querySelectorAll('.dropdown-btn');
const dropdownDetails = document.querySelectorAll('dropdown-details');

for(let i = 0; i < showMoreBtn.length; i++) {
    showMoreBtn[i].addEventListener('click', function() {

    })
}
// const searchURL = 'http://api.searchspring.net/api/search/search.json?siteId=scmq7n&q=jeans&resultsFormat=native&page=2';
