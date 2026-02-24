// Fruit class
class Fruit {
    constructor(name, calories, sugar, protein, fat, carbs) {
        this.name = name
        this.calories = calories
        this.sugar = sugar
        this.protein = protein
        this.fat = fat
        this.carbs = carbs
    }
}

// File system for saving favourites
const fs = require("fs")
const path = require("path")

// Path to favourite JSON file
const filePath = path.join(__dirname, "../data/favouritefruit.json")

// Store all API data for search use
var allFruits = []

// Load fruit data from API
function loadFruits() {

    fetch("https://www.fruityvice.com/api/fruit/all")
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {

        allFruits = data   // Save API data

        displayFruits(data)
        calculateNutrition(data)
        showTotalFruits(data)
    })
}

// Display fruits in card format
function displayFruits(data) {

    var container = document.getElementById("fruitContainer")
    container.innerHTML = ""

    for (var i = 0; i < data.length; i++) {

        var item = data[i]

        var fruit = new Fruit(
            item.name,
            item.nutritions.calories,
            item.nutritions.sugar,
            item.nutritions.protein,
            item.nutritions.fat,
            item.nutritions.carbohydrates
        )

        var card = document.createElement("div")
        card.className = "card"

        card.innerHTML =
            "<h3>" + fruit.name + "</h3>" +
            "Calories: " + fruit.calories + "<br>" +
            "Sugar: " + fruit.sugar + "<br>" +
            "Protein: " + fruit.protein + "<br>" +
            "Fat: " + fruit.fat + "<br>" +
            "Carbs: " + fruit.carbs + "<br>" +
            "<button onclick=\"addToFavourite('" + fruit.name + "'," + fruit.calories + "," + fruit.sugar + ")\">Add to Favourite</button>"

        container.appendChild(card)
    }
}

// Calculate average calories and highest sugar
function calculateNutrition(data) {

    var totalCalories = 0
    var highestSugar = 0
    var highestSugarFruit = ""

    for (var i = 0; i < data.length; i++) {

        totalCalories += data[i].nutritions.calories

        if (data[i].nutritions.sugar > highestSugar) {
            highestSugar = data[i].nutritions.sugar
            highestSugarFruit = data[i].name
        }
    }

    var average = totalCalories / data.length

    document.getElementById("averageCalories").innerText =
        "Average Calories: " + average.toFixed(2)

    document.getElementById("highestSugar").innerText =
        "Highest Sugar Fruit: " + highestSugarFruit + " (" + highestSugar + ")"
}

// Show total number of fruits from API
function showTotalFruits(data) {

    document.getElementById("totalFruits").innerText =
        "Total Fruits Available: " + data.length
}

// Search fruit by name
function searchFruit() {

    var keyword = document.getElementById("searchInput").value.toLowerCase()

    // Show all fruits if search empty
    if (keyword === "") {
        displayFruits(allFruits)
        return
    }

    var filtered = []

    for (var i = 0; i < allFruits.length; i++) {

        if (allFruits[i].name.toLowerCase().includes(keyword)) {
            filtered.push(allFruits[i])
        }
    }

    displayFruits(filtered)

    // Show message if not found
    if (filtered.length === 0) {
        alert("Fruit not found")
    }
}

// Add fruit from API to favourite list
function addToFavourite(name, calories, sugar) {

    // Validate data
    if (!name || isNaN(calories) || isNaN(sugar)) {
        alert("Invalid fruit data")
        return
    }

    var favourites = []

    // Read existing data
    if (fs.existsSync(filePath)) {
        var data = fs.readFileSync(filePath)
        favourites = JSON.parse(data)
    }

    // Prevent duplicate fruit
    for (var i = 0; i < favourites.length; i++) {
        if (favourites[i].name.toLowerCase() === name.toLowerCase()) {
            alert(name + " is already in Favourite")
            return
        }
    }

    var fruit = {
        name: name,
        calories: calories,
        sugar: sugar
    }

    favourites.push(fruit)

    fs.writeFileSync(filePath, JSON.stringify(favourites, null, 2))

    alert(name + " added to Favourite")
}

// Load data when page starts
loadFruits()