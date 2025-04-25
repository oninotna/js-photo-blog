// CHIAMATA AJAX
apiUri = 'https://lanciweb.github.io/demo/api/pictures/';

// DOM ELEMENT
const cardsContainer = document.querySelector(".cards-row");

// VARIABLES
let listCard = "";


axios.get(apiUri)
.then(response => {
    imgDataList = response.data;

    imgDataList.forEach(element => {
        const {date, title, id, url} = element;
        listCard += 
        `<div class="col-12 col-md-6 col-lg-4 mb-4 card-col">
            <div class="my-card">
                <img class="pin-card" src="./img/pin.svg">
                <div class="img-my-card" style="background-image: url(${url});"></div>
                <div class="date">${date}</div>
                <div class="description-img-my-card edu-tas-beginner">${title}</div>
            </div>
        </div>`;
    });

    cardsContainer.innerHTML = listCard;

    const cards = cardsContainer.querySelectorAll(".my-card");
    
    cards.forEach(card => {
       const overlay = document.querySelector(".overlay");
       const pinCard = card.querySelector(".pin-card");

       const cardPosition = card.parentElement;

       let isZoomed = false;
   
       card.addEventListener("click", () => {
           overlay.append(card);
           pinCard.style.display = "none";
           card.style = "top: 50%";
           card.style.transform = "translate(0, -50%) scale(1.5)";
           overlay.style.display = "block";

           isZoomed = true;
       });

       card.addEventListener("mouseenter", () => {
           if (isZoomed) {
            card.style = "top: 50%";
            card.style.transform = "translate(0, -50%) scale(1.7)";
           };
       });

       card.addEventListener("mouseleave", () => {
        if (isZoomed) {
            card.style = "top: 50%";
            card.style.transform = "translate(0, -50%) scale(1.5)";
        };
    });

       overlay.addEventListener("click", () => {
           overlay.style.display = "none";

           cardPosition.append(card);
           card.style = "";
           pinCard.style = "";

           isZoomed = false;
       });
    });
});