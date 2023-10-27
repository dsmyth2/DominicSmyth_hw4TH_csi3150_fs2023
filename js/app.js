import usedCars from "./usedCars.js";

function createCards(usedCars) {
  const carContainer = document.getElementById("cargrid");
  usedCars.forEach((car) => {
    car.price = car.price.toLocaleString();
    car.mileage = car.mileage.toLocaleString();
    const card = document.createElement("div");
    card.className = "car-card border border-dark rounded p-2 m-2";
    card.innerHTML = `
        <img src="${car.image}" alt"${car.make} ${car.model} Image">  
        <h2>${car.make} ${car.model}</h2>
        <h4>Price: $${car.price}</h4>
        <p>Year: ${car.year}</p>
        <p>Color: ${car.color}</p>
        <p>Mileage: ${car.mileage}</p>
        <p>Gas Mileage: ${car.gasMileage}</p>
        `;
    carContainer.appendChild(card);
  });
}

createCards(usedCars);
