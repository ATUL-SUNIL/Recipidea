const searchForm= document.querySelector('form');
const SearchResultDiv = document.querySelector('.searchResult');
const container = document.querySelector('.container');
let searchQuery='';
const APPID='514503e1';
const APPKEY='2025a33a7d12c05d354a2776e264a26d'
let BASEURL = `https://api.edamam.com/search?q=pizza&app_id=${APPID}&app_key=${APPKEY}`;
let from =0;
let to = 16;
            //event listener for searching 
searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    searchQuery=e.target.querySelector('input').value;
    BASEURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APPID}&app_key=${APPKEY}&from=${from}&to=${to}`;

    fetchApi();
    // console.log(searchQuery);
});

            //fetching data

async function fetchApi(){

    const response =await fetch(BASEURL);
    // console.log(response);
    const data = await response.json();
    generateHtml(data.hits);
    console.log(data);
}

function generateHtml(results){
    let generatedHtml = ``;
    results.map(result => {
        let calories=result.recipe.calories.toFixed(1);
        generatedHtml += `
        <div class="item">
                <img src="${result.recipe.image}" alt="food image">
                <div class="flexContainer">
                    <h1 class="title">${result.recipe.label}</h1>
                    <a class="viewButton" href="${result.recipe.url}">view recipe</a>                 
                </div>
                <p class="itemData">calories: ${calories}</p>
                <p class="itemData">Diet Label: ${result.recipe.dietLabels.length>0 ?result.recipe.dietLabels : 'none' }</p>

            </div>
        `
    });
    generatedHtml += `
    <footer >
        <button>next <i class="fa-solid fa-arrow-right"></i></button>
    </footer>`
    SearchResultDiv.innerHTML=generatedHtml;
    const nextButton=document.querySelector('button');
    nextButton.addEventListener('click', () => {
        from += 10;
        to += 10;
        BASEURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APPID}&app_key=${APPKEY}&from=${from}&to=${to}`;
        console.log(BASEURL);
        fetchApi();

        window.scrollTo({ top: 0, behavior:'smooth' });
    });
}




