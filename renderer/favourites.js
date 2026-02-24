// File system for JSON storage
const fs = require("fs")
const path = require("path")

// Path to favourite data file
const filePath = path.join(__dirname, "../data/favouritefruit.json")

// Load favourite fruits from file
function loadFavourites() {

    var favourites = []

    // Read file if exists
    if (fs.existsSync(filePath)) {
        var data = fs.readFileSync(filePath)
        favourites = JSON.parse(data)
    }

    displayTable(favourites)
    calculateTotal(favourites)
    calculateAverage(favourites)
}

// Display favourites in table
function displayTable(favourites) {

    var table = document.getElementById("favTable")
    table.innerHTML = ""

    for (var i = 0; i < favourites.length; i++) {

        var fruit = favourites[i]

        var row = document.createElement("tr")

        row.innerHTML =
            "<td>" + fruit.name + "</td>" +
            "<td>" + fruit.calories + "</td>" +
            "<td>" + fruit.sugar + "</td>" +
            "<td>" + (fruit.notes || "") + "</td>" + // Show notes
            "<td>" +
            "<button onclick='editFruit(" + i + ")'>Update</button> " +
            "<button onclick='deleteFruit(" + i + ")'>Delete</button>" +
            "</td>"

        table.appendChild(row)
    }
}

// Add new fruit manually
function addNewFruit() {

    var name = document.getElementById("newName").value
    var calories = parseInt(document.getElementById("newCalories").value)
    var sugar = parseInt(document.getElementById("newSugar").value)
    var notes = document.getElementById("newNotes").value

    // Validate input
    if (name === "" || isNaN(calories) || isNaN(sugar)) {
        alert("Please fill all fields")
        return
    }

    var favourites = []

    if (fs.existsSync(filePath)) {
        var data = fs.readFileSync(filePath)
        favourites = JSON.parse(data)
    }

    // Prevent duplicate
    for (var i = 0; i < favourites.length; i++) {
        if (favourites[i].name.toLowerCase() === name.toLowerCase()) {
            alert("Fruit already exists")
            return
        }
    }

    var fruit = {
        name: name,
        calories: calories,
        sugar: sugar,
        notes: notes // Save notes
    }

    favourites.push(fruit)

    fs.writeFileSync(filePath, JSON.stringify(favourites, null, 2))

    alert("Fruit added successfully")

    // Clear form
    document.getElementById("newName").value = ""
    document.getElementById("newCalories").value = ""
    document.getElementById("newSugar").value = ""
    document.getElementById("newNotes").value = ""

    loadFavourites()
}

// Load selected fruit for editing
function editFruit(index) {

    var data = fs.readFileSync(filePath)
    var favourites = JSON.parse(data)

    document.getElementById("editIndex").value = index
    document.getElementById("editCalories").value = favourites[index].calories
    document.getElementById("editSugar").value = favourites[index].sugar
    document.getElementById("editNotes").value = favourites[index].notes || ""
}

// Save updated fruit
function saveUpdate() {

    var index = document.getElementById("editIndex").value

    // Check selection
    if (index === "" || index === null) {
        alert("Please select a fruit to update first")
        return
    }

    var calories = parseInt(document.getElementById("editCalories").value)
    var sugar = parseInt(document.getElementById("editSugar").value)
    var notes = document.getElementById("editNotes").value

    var data = fs.readFileSync(filePath)
    var favourites = JSON.parse(data)

    favourites[index].calories = calories
    favourites[index].sugar = sugar
    favourites[index].notes = notes // Update notes

    fs.writeFileSync(filePath, JSON.stringify(favourites, null, 2))

    alert("Fruit updated successfully")

    // Clear form
    document.getElementById("editIndex").value = ""
    document.getElementById("editCalories").value = ""
    document.getElementById("editSugar").value = ""
    document.getElementById("editNotes").value = ""

    loadFavourites()
}

// Delete fruit
function deleteFruit(index) {

    var confirmDelete = confirm("Are you sure you want to delete this fruit?")

    if (!confirmDelete) return

    var data = fs.readFileSync(filePath)
    var favourites = JSON.parse(data)

    favourites.splice(index, 1)

    fs.writeFileSync(filePath, JSON.stringify(favourites, null, 2))

    alert("Fruit deleted")

    loadFavourites()
}

// Calculate total calories
function calculateTotal(favourites) {

    var total = 0

    for (var i = 0; i < favourites.length; i++) {
        total += favourites[i].calories
    }

    document.getElementById("totalCalories").innerText =
        "Total Calories: " + total
}

// Calculate average calories
function calculateAverage(favourites) {

    if (favourites.length === 0) {
        document.getElementById("averageFav").innerText =
            "Average Calories: 0"
        return
    }

    var total = 0

    for (var i = 0; i < favourites.length; i++) {
        total += favourites[i].calories
    }

    var avg = total / favourites.length

    document.getElementById("averageFav").innerText =
        "Average Calories: " + avg.toFixed(2)
}

// Run when page loads
loadFavourites()