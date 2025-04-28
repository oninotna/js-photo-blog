// SALVATAGGIO API IN UNA COSTANTE
const apiUri = 'https://lanciweb.github.io/demo/api/pictures/';

// RICHIAMO ELEMENTO DOM IN CUI INSERIRE SUCCESSIVAMENTE LE CARD 
const cardsContainer = document.querySelector(".cards-row");

// VARIABILE CHE CI SERVIRA' SUCCESSIVAMENTE PER LA CREAZIONE DEI CODICE HTML
let listCard = "";

// CHIAMATA AJAX ALL'API SOPRA MENZIONATA
axios.get(apiUri)
.then(response => {

    // COSTANTE A CUI ASSEGNAMO LA CHIAVE DATA DELL'OGGETTO
    const imgDataList = response.data;

    // CICLO CHE CI PERMETTE DI INSERIRE IL CODICE HTML PER OGNI OGGETTO ALL'INTERNO DI UNA STRINGA 
    imgDataList.forEach(element => {

        // DESTRUTTURAZIONE DELL'OGGETTO
        const {date, title, id, url} = element;

        // CREAZIONE STRUTTURA HTML PER OGNI CARD UTILIZZANDO I DATI DELL'API
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

    // INSERIMENTO DELLE CARD ALL'INTERNO DEL CONTENITORE NEL DOM
    cardsContainer.innerHTML = listCard;

    // SELEZIONE DI TUTTI GLI ELEMENTI CON CLASSE "my-card" APPENA CREATA
    const cards = cardsContainer.querySelectorAll(".my-card");
    
    // CICLO PER AGGIUNGERE EVENTI AD OGNI SINGOLA CARD
    cards.forEach(card => {

       // SELEZIONIAMO L'ELEMENTO OVERLAY DOVE VERRANNO INGRANDITE LE CARD
       const overlay = document.querySelector(".overlay");

       // SELEZIONIAMO L'IMMAGINE DEL PIN CHE DOVRA' SPARIRE IN MODALITA' ZOOM
       const pinCard = card.querySelector(".pin-card");

       // SALVIAMO IL CONTENITORE ORIGINALE DELLA CARD (serve per riposizionarla successivamente)
       const cardPosition = card.parentElement;

       // VARIABILE DI CONTROLLO PER GESTIRE LO STATO DI ZOOM
       let isZoomed = false;
   
       // EVENTO CLICK SULLA CARD PER INGRANDIRLA
       card.addEventListener("click", (event) => {
           if (isZoomed) {
            // BLOCCO LA PROPAGAZIONE DELL'EVENTO SE LA CARD E' GIA' INGRANDITA
            event.stopPropagation()
            return;
           }

           // SPOSTO LA CARD DENTRO L'OVERLAY
           overlay.append(card);

           // NASCONDO IL PIN
           pinCard.style.display = "none";

           // MODIFICO LO STILE PER INGRANDIRE LA CARD
           card.style = "top: 50%";
           card.style.transform = "translate(0, -50%) scale(1.5)";
           card.style.transition = "1s";

           // RENDO VISIBILE L'OVERLAY
           overlay.style.display = "block";

           // IMPOSTO LA VARIABILE A TRUE
           isZoomed = true;
       });

       // EVENTO MOUSEENTER PER AUMENTARE LO ZOOM
       card.addEventListener("mouseenter", () => {
           if (isZoomed) {
            card.style = "top: 50%";
            card.style.transform = "translate(0, -50%) scale(1.7)";
           };
       });

       // EVENTO MOUSELEAVE PER RIPORTARE LO ZOOM ALLA DIMENSIONE PRECEDENTE
       card.addEventListener("mouseleave", () => {
        if (isZoomed) {
            card.style = "top: 50%";
            card.style.transform = "translate(0, -50%) scale(1.5)";
        };
    });

       // EVENTO CLICK FUORI DALLA CARD PER CHIUDERE L'OVERLAY
       overlay.addEventListener("click", () => {

           // NASCONDIAMO L'OVERLAY
           overlay.style.display = "none";

           // RIPORTIAMO LA CARD AL SUO CONTENITORE ORIGINALE
           cardPosition.append(card);

           // RESETTIAMO GLI STILI APPLICATI
           card.style = "";
           pinCard.style = "";

           // RESETTIAMO LA VARIABILE DI STATO
           isZoomed = false;
       });
    });
});