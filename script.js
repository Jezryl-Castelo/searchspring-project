//Initialize Variables
const searchForm = document.querySelector('form');
const input = document.querySelector('#search-input');
const searchButton = document.querySelector('.searchButton');
const cardResults = document.querySelector('#cards');
const pageButtons = document.querySelectorAll('.pageButtons');
const currentPageNumberSpan = document.querySelectorAll('.currentPage'); 
const pageNumbersSpan = document.querySelector('.pageNumbers');
const nextPageButton = document.querySelectorAll('.nextPageButton');
const prevPageButton = document.querySelectorAll('.prevPageButton');
const featuredItemDisplay = document.querySelector('.feature');

let pageState = {};
let currentPage = 1;

//Setup Event Listeners
searchForm.addEventListener('submit', search);
searchButton.addEventListener('submit', search);

pageButtons.forEach((button) =>{
  button.addEventListener('click', handlePageButtonClick)}
);

//JS Methods

//Performs our main search submit event
function search(e) {
  e.preventDefault();
  currentPage = 1;
  fetchAPI(currentPage);
}

//Fetches Data from the API and sets our data to be used in other functions
async function fetchAPI(currentPage) {

  let searchInput = document.getElementById('search-input').value;
  const searchURL = `https://api.searchspring.net/api/search/search.json?siteId=scmq7n&q=${searchInput}&resultsFormat=native&page=${currentPage}`;
  const data = await fetch(searchURL)
    .then((response) => {

        return response.json()})
    .catch((err) => console.log(`Error ${err}`));

  generateHTML(data.results);

  //set Our pagination data to var called pageState
  pageState = data.pagination;

  //set current page number to display in between page forward/back buttons
  currentPageNumberSpan.forEach((spanArea) => {
    spanArea.innerHTML = currentPage;
  });
  createPageNumbers();

}

//inject cards into page after results have been returned
function generateHTML(searchResults) {
  let generatedHTML = '';

  searchResults.map((singleResult) => {
    const { thumbnailImageUrl, title, msrp, price } = singleResult;
    let msrpPrice = +msrp;
    let salePrice = +price;

    generatedHTML += `<div class="card">
        <div class="image-container">
            <img  class="card-image" src="${thumbnailImageUrl}" alt="result image">
                <div class="quick-shop-btn"
              <a href="#" class="card-btn">Quick Shop</a>
                </div>
        </div>
        <div class="details">
            <p class="product">${title}</p>
             ${
               msrp
                 ? `<p class=${
                     msrpPrice > salePrice ? 'msrp-strike' : 'msrp'
                   }>$${msrpPrice.toFixed(2)}</p>`
                 : ''
             }
            <p class="sale">$${salePrice.toFixed(2)}</p>
           </div>
        </div>`;
  });
  cardResults.innerHTML = generatedHTML;

  disablePageButtons();
}

const select = document.getElementsByTagName('dropdownPages');

function createPageNumbers() {
  let generatePageNumbers = '';
  for (let i = 1; i <= pageState.totalPages; i++) {
    generatePageNumbers += 
    `<a class='page-numbers' href='#'>${i}</a>`
    // `<option value="${i}">${i}</option> `;

  }
  select.innerHTML = generatePageNumbers;
  pageNumbersSpan.innerHTML = generatePageNumbers;
  pageNumbersSpan.addEventListener('click', pageNumberClick);
}

//Main page forward/back button event firing
function pageNumberClick(e) {
    currentPage = e.target.innerHTML;
    fetchAPI(currentPage);
}

function handlePageButtonClick(e) {
  if (e.target.innerHTML === 'Next') {
    pageClickForward();
  } else if(e.target.innerHTML === 'Prev'){
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

function disablePageButtons() {
  //Page button disable and show functionality
  pageButtons.forEach((button) => {
    button.classList.remove('initial');

    if (currentPage === 1) {
      prevPageButton.forEach((eachPrevButton) => {
        eachPrevButton.disabled = true;
      });
    } else {
      prevPageButton.forEach((eachPrevButton) => {
        eachPrevButton.disabled = false;
      });
    }
    if (currentPage === pageState.totalPages) {
      nextPageButton.forEach((eachNextButton) => {
        eachNextButton.disabled = true;
      });
    } else {
      nextPageButton.forEach((eachNextButton) => {
        eachNextButton.disabled = false;
      });
    }
  });
}

//Toggle Sidebar Option Menu and Selections
const collapsible = document.querySelectorAll('.plus');
collapsible.forEach((item) => {
  const { nextElementSibling } = item.parentNode;
  item.addEventListener('click', function () {
    item.classList.toggle('active');
    item.innerHTML === '+'
      ? ((item.innerHTML = '-'), (nextElementSibling.style.display = 'block'))
      : ((item.innerHTML = '+'), (nextElementSibling.style.display = 'none'));
  });
});
