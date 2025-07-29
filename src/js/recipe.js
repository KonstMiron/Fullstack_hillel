const APP_ID = '6762c63c';
const APP_KEY = 'e5a2835d42c43a365566fc5eb59e6d07';
const API_BASE_URL = 'https://api.edamam.com/api/recipes/v2';
const detailsTitle = document.querySelector('.recipe__details-title');
const detailsList = document.querySelector('.recipe__details-list');
const details = document.querySelector('.recipe__details');

 const fetchRecipes = query => {
    const queryParams = `?type=public&app_id=${APP_ID}&app_key=${APP_KEY}&q=${query}`;
    
    return fetch(API_BASE_URL + queryParams, {
        headers: {
            'Edamam-Account-User': 'Miron06',
        },
    }).then(res => res.json())
        .then(data => data.hits)
        .catch(err => {
            alert(err);
            console.error(err)}
        );
};

const renderRecipes = (recipes, parent) => {
    console.log(recipes);
    recipes.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'recipe';

    const img = document.createElement('img');
    img.className = 'recipe__img';
    img.src = item.recipe.images.REGULAR.url;
    img.alt = item.recipe.label;
    card.appendChild(img);

    const title = document.createElement('h2');
    title.className = 'recipe__title';
    title.textContent = item.recipe.label;
    card.appendChild(title);

    const info = document.createElement('div');
    info.className = 'recipe__info';

    const time = document.createElement('p');
    time.className = 'recipe__ingridients';
    time.textContent = item.recipe.ingredientLines.length + ' ingridients';
    info.appendChild(time);

    const energy = document.createElement('p');
    energy.className = 'recipe__energy';
    energy.textContent = Math.round(item.recipe.calories)+ ' kcal';
    info.appendChild(energy);

    card.appendChild(info);

    const link = document.createElement('button');
    link.className = 'recipe__link';
    link.textContent = 'How to cook >';
    link.addEventListener('click', () => 
        openDetails(item.recipe));
    card.appendChild(link);

    parent.appendChild(card);
    });
};

const openDetails = (recipe) => {
    detailsTitle.innerText = recipe.label;

    recipe.ingredients.forEach((ingridient) => {
        const li = document.createElement('li');
        li.innerText = ingridient.text;
        detailsList.appendChild(li);
    });
    details.classList.add('--open');
};
const closeDetails = () => {
    details.classList.remove('--open');
    detailsTitle.innerText = '';
    detailsList.innerText = '';
};
document.querySelector("#close").onclick = closeDetails;

export const findRicipes = async (query, tergetSelector) => {
    const targetElement = document.querySelector(tergetSelector);
    renderRecipes( await fetchRecipes(query), targetElement);
};