const root = document.getElementById('root');

const button = document.createElement('button');
button.classList.add('btn');
button.classList.add('btn-primary');
button.textContent = "Click me!";

const createCocktailCardContent = (image, name, subtitle, description) => {
    return `
    <div class="card" style="width: 18rem;">
        <img src="${image}" class="card-img-top" alt="${name}">
        <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${subtitle}</h6>
            <p>${description}</p>
        </div>
    </div>`;
}

const getRadomCocktailInfo = async () => {
    try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
        const data = await response.json();
        randomCocktail = data.drinks[0];
        return randomCocktail;
    } catch (error) {
        throw new Error("An error occured while fetching the cocktail data");
    }
}

const createRandomCocktailCard = async () => {
    try {
        randomCocktail = await getRadomCocktailInfo();
        cardContent = createCocktailCardContent(
            randomCocktail.strDrinkThumb,
            randomCocktail.strDrink,
            randomCocktail.strCategory,
            randomCocktail.strInstructions);
        if (document.querySelector('.cocktailDiv')) {
            card = document.querySelector('.cocktailDiv');
            card.innerHTML = cardContent;
            return;
        }
        div = document.createElement('div');
        div.classList.add('cocktailDiv');
        div.innerHTML = cardContent;
        root.appendChild(div);
    } catch (error) {
        alert(error);
    }
}

button.addEventListener('click', createRandomCocktailCard);

root.appendChild(button);
