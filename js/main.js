import {data} from "./data.js"; 

let selectedCards = []
let cardsData = doubleCardsData(data)
function doubleCardsData (initialData) {
    return [...initialData, ...initialData]
    .map((item, index) => ({
        ...item,
        id: index,
    }))
}
const  populateField = (fieldSelector, cardsData) => {
    const field = document.querySelector(fieldSelector);
    field.innerHTML = '';

    cardsData.forEach(card => {
        const btn = document.createElement('button')
        btn.classList.add('card')
        btn.id = card.id;
        btn.setAttribute('data-matched', card.matched);
        if(card.matched) {
            btn.classList.add('--open');
        } else(
            btn.onclick = () => triggerCard(card)
        )

        const img = document.createElement('img')
        img.src = card.imgUrl;
        img.alt = card.label;



        btn.appendChild(img);
        field.appendChild(btn);
    })
}
populateField('.field', cardsData)

function triggerCard(cardData) {
    const cardElem = document.getElementById(cardData.id);

    cardElem.classList.add('--open');

    //setTimeout(() => {
    //    cardElem.classList.remove('--open');
    //}, 3000)

    selectCards(cardData);

  
}

function selectCards(card) {
        selectedCards.push(card);
    
     if(selectedCards[0]?.label === selectedCards[1]?.label) {
        cardsData = cardsData.map(card => {
            if (card.label === selectedCards[0].label) {
                return {
                    ...card,
                    matched: true
                }
            }else {
                return card
            }
        })
         populateField('.field', cardsData);

         selectedCards = [];
         
    } else if(selectedCards.length >= 2 ) {
       

        selectedCards = [];
    }
    setTimeout(() =>  {
            populateField('.field', cardsData);
        }, 3000)

}