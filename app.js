const menu = document.querySelector("#main")
const meals = document.querySelector("#meals")
let selectedCategory = []

function fetchCategories() {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then(res => res.json())
    .then(data => {
        console.log(data)
        rederCategories(data.categories)
    })
    .catch(err => {
        console.log(err)
    })
}

function rederCategories(array) {
    menu.innerHTML = ""
    array.map(item => {
        menu.innerHTML += `
        <li 
            onclick="fetchMeals(this)"
            data-category="${item.strCategory}"
            class="bg-slate-200 flex gap-4 p-4 shadow-md rounded-md items-center cursor-pointer border-2 justify-center ${selectedCategory === item.strCategory ? "border-blue-500" : ""}">
            <img class="rounded-md object-cover" width="70" hieght="70" src=${item.strCategoryThumb}>
            <span class="text-2xl text-slate-700 w-full">${item.strCategory}</span>
        </li>
        `
    })
}

function fetchMeals(categoryName) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName?.dataset?.category}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        rednerMeals(data.meals)
    })

    .catch(err => {
        console.log(err)
    })
}


function rednerMeals(array) {
    meals.innerHTML = ""
    array.map(item => {
        meals.innerHTML += `
            <div class="meals_container transition duration-300 hover:scale-105 hover:border-slate-600 border-2 transform rounded-md shadow-md p-4 flex flex-col gap-2 cursor-pointer justify-center">
                <img class="mx-auto rounded-md object-cover" width="250" hieght="250" src=${item.strMealThumb}>
                <h1 class="font-semibold text-slate-700">${item.strMeal}</h1>
            </div>
            
        `
    })
}
fetchMeals("Beef")

fetchCategories()

