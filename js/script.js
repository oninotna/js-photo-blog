apiUri = 'https://lanciweb.github.io/demo/api/pictures/';
const cards = document.querySelector(".cards-row");

axios.get(apiUri)
.then(response => {
    imgDataList =response.data;

    imgDataList.forEach(element => {
        const {date, title, id, url} = element;
        cards.innerHTML += 
        `<div class="col-12 col-md-6 col-lg-4 mb-4 card-col">
            <div class="my-card">
                <img class="pin-card" src="./img/pin.svg">
                <div class="img-my-card" style="background-image: url(${url});"></div>
                <div class="date">${date}</div>
                <div class="description-img-my-card edu-tas-beginner">${title}</div>
            </img>
        </div>`
    });  
});
