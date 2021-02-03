//Initialize Variables
const searchForm = document.querySelector('form');
const input = document.querySelector('#search-input');
const cardResults = document.querySelector('#cards');
// const pageForward = document.querySelectorAll('.btn-next');
// const pageBack = document.querySelectorAll('.btn-prev');
//const nextPageButton = document.querySelectorAll('.nextPageButton');
//const prevPageButton = document.querySelectorAll('.prevPageButton');
const pageButtons = document.querySelectorAll('.pageButtons');
const pageSpan = document.getElementById('page');
let pageState = {};
let currentPage = 1;

//Setup Event Listeners
searchForm.addEventListener('submit', search);

pageButtons.forEach((button) =>
  button.addEventListener('click', handlePageButtonClick),
);

//JS Methods

function search(e) {
  e.preventDefault();
  currentPage = 1;
  fetchAPI(currentPage);
}

async function fetchAPI(currentPage) {
  let searchInput = document.getElementById('search-input').value;
  const searchURL = `http://api.searchspring.net/api/search/search.json?siteId=scmq7n&q=${searchInput}&resultsFormat=native&page=${currentPage}`;
  const data = await fetch(searchURL)
    .then((response) => response.json())
    .catch((err) => console.log(`Error ${err}`));

  generateHTML(data.results);
  pageState = data.pagination;
  pageSpan.innerHTML = currentPage;
}

function generateHTML(searchResults) {
  // console.log(searchResults);
  let generatedHTML = '';

  searchResults.map((singleResult) => {
    const { thumbnailImageUrl, title, msrp, price } = singleResult;
    let msrpPrice = +msrp;
    let salePrice = +price;
    // if (singleResult.title.length > 10) {
    //   singleResult.title = `${singleResult.title.substr(0, 10)}...`;
    // }

    generatedHTML += `<div class="card">
    <button class=></button>
           <img  class="card-image" src="${thumbnailImageUrl}" alt="result image">
           <div class="details">
          <p class="product">${title}</p>
          ${
            msrp
              ? `<p class=${
                  msrpPrice > salePrice ? 'msrp-strike' : 'mspr'
                }>$${msrpPrice.toFixed(2)}</p>`
              : ''
          }
           <p class="sale">$${salePrice.toFixed(2)}</p>
           </div>
        </div>`;
  });

  cardResults.innerHTML = generatedHTML;
}

//Page Click Functionality
function buttonDisable(e) {
  if (currentPage === 1) {
    console.log(e.target);
  } else if (currentPage === pageState.totalPages) {
  }
}

function handlePageButtonClick(e) {
  if (e.target.innerHTML === 'Next') {
    pageClickForward();
  } else {
    pageClickBack();
  }
}

function pageClickForward() {
  if (currentPage < pageState.totalPages) {
    currentPage++;
    fetchAPI(currentPage);
  }
}

function pageClickBack() {
  if (currentPage !== 1) {
    currentPage--;
    fetchAPI(currentPage);
  }
}

// use classList to change text
// function onSale() {
//   const msrpText = document.querySelectorAll('.msrp');
//   const saleText = document.querySelectorAll('.sale');
//   msrpText.forEach((item) => {
//     console.log(item);
//   });
// if (saleText < msrpText) {
//   msrpText.classList.add('strike');
// }
// }
