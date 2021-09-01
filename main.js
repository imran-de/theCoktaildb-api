const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('search-btn');
const cocktailDetails = document.getElementById('cocktail-details');
const cocktailContainer = document.getElementById('cocktail-container');
const error = document.getElementById('error');
const spinner = document.getElementById('spinner');

searchBtn.addEventListener('click', function () {
    //add loader
    spinner.classList.remove('d-none');
    const search = searchInput.value;

    //clear the dom 
    cocktailContainer.textContent = '';
    cocktailDetails.textContent = '';
    if (search.length < 1) {
        error.innerText = "please type your cocktail";
        spinner.classList.add('d-none');
        return;
    } else {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;
        fetchData(url, search)
        /* fetch(url)
            .then(res => res.json())
            .then(data => fetchData(url, search))
            .finally(() => {
                searchInput.value = "";
            }); */
    }
})
const fetchData = async (url, search) => {
    const res = await fetch(url);
    const data = await res.json();
    showCocktails(data.drinks, search);
    searchInput.value = "";
}

function showCocktails(cocktails, search) {
    if (cocktails === null) {
        error.innerHTML = `did not found related to <b class='text-danger'>${search}</b>`;
        spinner.classList.add('d-none');
        return;
    } else {
        error.textContent = '';
    }
    cocktails.forEach(cocktail => {
        const { idDrink, strDrinkThumb, strDrink } = cocktail;
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="col">
        <div class="card">
          <img src="${strDrinkThumb}" class="card-img-top" alt="${strDrink}">
          <div class="card-body">
            <h5 class="card-title">${strDrink}</h5>
            <button onclick='singleItem(${idDrink})' class="btn btn-dark">See More</button>
          </div>
        </div>
        `;
        cocktailContainer.appendChild(div);


    });
    spinner.classList.add('d-none');
}

function singleItem(id) {
    // for smooth scrool up on clicks
    window.scrollTo(0, 40)
    cocktailDetails.textContent = '';
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => seeDetails(data.drinks[0]))
}


function seeDetails(datas) {
    const div = document.createElement('div');
    div.classList.add('row');
    div.innerHTML = `
        <div class='col-md-3 mx-auto'>
            <img src="${datas.strDrinkThumb}" class="card-img-top" alt="${datas.strDrink}">
        </div>
    `;
    const ul = document.createElement('ul');

    // console.log(datas)
    for (element in datas) {
        const value = datas[element];
        // console.log(value)
        if (value === null || element === "idDrink" || element === "strDrinkThumb" || element === "dateModified") {
            // console.log(element);
            // console.log('null value')
        } else {
            const li = document.createElement('li');
            li.innerHTML = `<b>${element.slice(3, 20)} :</b> ${datas[element]}`;
            ul.appendChild(li);
        }
    }
    div.appendChild(ul);
    cocktailDetails.appendChild(div);
}
