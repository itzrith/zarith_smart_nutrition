# Smart Nutrition – Fruit Advisor

**Folder Name:** zarith_smart_nutrition  

Smart Nutrition – Fruit Advisor is a desktop application developed using **Electron, HTML, CSS, and JavaScript**. This application helps users view fruit nutrition information and manage their favourite fruits easily.

---

## Application Overview

The system retrieves fruit data from the **Fruityvice API** and displays nutrition information such as:
- Calories
- Sugar
- Protein
- Fat
- Carbohydrates

Users can analyse fruit nutrition, search for fruits, and add them to their favourite list. All favourite data is stored locally in a **JSON file**, so the data will remain saved even after the application is closed.

---

## API Information

API used:  
https://www.fruityvice.com/api/fruit/all  

The system retrieves:
- Fruit name  
- Family, genus, and order  
- Nutrition details (calories, sugar, fat, protein, carbohydrates)

The total number of fruits available is displayed automatically based on the API data.

---

## CRUD Operations

The application implements full CRUD functionality for managing favourite fruits.

**Create**
- Add fruit from API to favourite
- Add new fruit manually with notes

**Read**
- Display all favourite fruits in a table

**Update**
- Edit calories, sugar, and notes

**Delete**
- Remove fruit from favourite list with confirmation

All changes are saved in:
data/favouritefruit.json

---

## System Features

- View fruit nutrition from API
- Search fruit by name
- Display total fruits from API
- Show average calories
- Show highest sugar fruit
- Add to favourite
- Add custom fruit
- Update and delete favourite fruits
- Add personal notes for each fruit
- Calculate total and average calories for favourite list

---

## Technologies Used

- Electron
- HTML
- CSS
- JavaScript
- Node.js File System (fs)
- External REST API

---

## Project Structure
zarith_smart_nutrition/
│
├── main.js
├── package.json
│
├── data/
│   └── favouritefruit.json
│
└── renderer/
├── index.html
├── favourites.html
├── fruit.js
├── favourites.js
└── style.css

---

## How to Run the Application

1. Install dependencies
2. npm install
3. Run the application

---

## Author

Name: Zarith  
Course: Object-Oriented Programming  
Project: Final Project – Smart Nutrition Fruit Advisor
