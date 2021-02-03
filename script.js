//Initialize Variables
const searchForm = document.querySelector('form');
const input = document.querySelector('#search-input');
const cardResults = document.querySelector('#cards');
// const pageForward = document.querySelectorAll('.btn-next');
// const pageBack = document.querySelectorAll('.btn-prev');
const nextPageButton = document.querySelectorAll('.nextPageButton');
//const prevPageButton = document.querySelectorAll('.prevPageButton');
const pageButtons = document.querySelectorAll('.pageButtons'); 
console.log(pageButtons)
const pageSpan = document.getElementById('page');//once changed to class, # is no show

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
  pageButtons.style.document.display = "flex";
  
  let generatedHTML = '';

  searchResults.map((singleResult) => {
    const { thumbnailImageUrl, title, msrp, price } = singleResult;
    let msrpPrice = +msrp;
    let salePrice = +price;
    // if (singleResult.title.length > 10) {
    //   singleResult.title = `${singleResult.title.substr(0, 10)}...`;
    // }

    generatedHTML += `<div class="card">
    
           <img  class="card-image" src="${thumbnailImageUrl}" alt="result image">
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
  //buttonDisable();
}

//Page Click Functionality
// function buttonDisable() {
// console.log(pageState);
// if(currentPage === 1) {
//     const document.querySelectorAll('.prevPageButton').display = 'none';

// }
// }

function handlePageButtonClick(e) {
        // const prevPageButton = document.querySelectorAll('.prevPageButton')
        // prevPageButton.forEach(first => {
        //     if (currentPage === 1) {
        //         console.log('page one');
        //         prevPageButton.style.display = "none";
        //     }
        // })
    if (e.target.innerHTML === 'Next') {
      pageClickForward();
    } else {
      pageClickBack();
    }
  }

function pageClickForward() {
   

   if (currentPage < pageState.totalPages) 
    currentPage++;
    fetchAPI(currentPage);
  }


function pageClickBack() {
  if (currentPage !== 1) {
    currentPage--;
    fetchAPI(currentPage);
  }
}

function showButtons() {
    if(pageButtons === "none") {
        pageButtons.style.display = "flex";
    } else {
        pageButtons.style.display = "none";
    }
}
//error display is undefined
// function removeClass() {
//     pageButtons.stye.display = "none";
// }

const collapsible = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < collapsible.length; i++) {
    collapsible[i].addEventListener("click", function() {
    this.classList.toggle("active");
    if(this.firstElementChild.innerHTML === "+"){
        this.firstElementChild.innerHTML = '-';
    } else{
        this.firstElementChild.innerHTML = '+'
    }
    let content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}