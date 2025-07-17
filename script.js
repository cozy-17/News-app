const API_KEY = 'e0d8bf159d004bc392b30daf4d104d64';
const url = 'https://newsapi.org/v2/everything?q=';

window.addEventListener('load',() => fetchNews('india'));

async function fetchNews(query) {
    const response = await fetch(`/news?q=${query}`);
    const data = await response.json();
    bindData(data.articles);
}


// async function fetchNews(query) {
//     if(!query) return;

//     try{
//     const resp = await fetch(`${url}${query}&apiKey=${API_KEY}`);
//     const data = await resp.json();
//     bindData(data.articles);
//     //? return bindData(data.article);
//     } catch(err){
//         console.log(err);
//     }
// }

function bindData(article){
    const cardContainer = document.getElementById('card-container');
    const cardTemplate = document.getElementById('news-card-template');

    cardContainer.innerHTML = '';

    article.forEach((article) => {
        if(!article.urlToImage) return;
        const cardClone = cardTemplate.content.cloneNode(true);

        cardUpdate(cardClone, article);
        cardContainer.appendChild(cardClone);

        addCardHoverEffects();
    });
}

function cardUpdate(cardClone, article){
    const newsCard = cardClone.getElementById('card');
    const newsBanner = cardClone.getElementById('news-img');
    const newsTitle = cardClone.getElementById('card-title');
    const newsDesc = cardClone.getElementById('card-desc');
    const newsSource = cardClone.getElementById('card-source');


    newsBanner.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString('en-US',{
        timeZone: "Asia/Kolkata"
    });

    newsSource.innerHTML = (`${article.source.name} • ${date}`);

    newsCard.addEventListener('click', () => {
        window.open(article.url, '_blank');
    })

}

let selectedNav = null;
function onNavClick(id){
    fetchNews(id);
    inputData.value = '';
    const navLink = document.getElementById(id);
    selectedNav?.classList.remove('nav-active');
    // selectedNav = navLink; //! Not Require
    navLink.classList.add('nav-active');
    selectedNav = navLink;
    
    navLinkState(navLink);

    // ! OR 

    // fetchNews(id);

    // const navLink = document.getElementById(id);
    // if(selectedNav){
    //     selectedNav.classList.remove('nav-active');
    // } 
    // navLink.classList.add('nav-active');
    // selectedNav = navLink;

}



// ! Seach Btn and Input Box

    const inputData = document.getElementById('search-data');
    const searchBtn = document.getElementById('search-btn');

    searchBtn.addEventListener('click',() => {
        selectedNav?.classList.remove('nav-active');
        if(!inputData.value) return fetchNews('india');
        fetchNews(inputData.value);
    });

    inputData.addEventListener('keydown',(data) => {
        if(data.key == 'Enter'){
           if(!inputData.value) return fetchNews('india');
             fetchNews(inputData.value);
            selectedNav?.classList.remove('nav-active');
        }
    });

    window.addEventListener('beforeunload', () => {
        inputData.value = '';
    });



// ! Card Hover

function addCardHoverEffects() {
const cards = document.querySelectorAll('.card');

cards.forEach((card) => {
    card.addEventListener('mouseenter',() => {
    const fullHeight = card.scrollHeight;
    card.style.maxHeight = fullHeight + 'px';
    card.style.transition = 'max-height 0.3s ease';

    card.addEventListener('mouseleave',() => {
    card.style.maxHeight = '400px';
    card.style.transition = 'max-height 0.3s ease';
         });
    });
 });
}


// ! Side Nav

const sideNav = document.getElementById('nav-icon');
const slideNav = document.getElementById('slide-nav');


sideNav.addEventListener('click', () => {
    slideNav.classList.toggle('active');
});
