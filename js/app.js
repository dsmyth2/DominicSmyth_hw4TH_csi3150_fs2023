import usedCars from "./usedCars.js";

// Get filter elements
const minYearInput = document.getElementById("min-year");
const maxYearInput = document.getElementById("max-year");
const makeSelect = document.getElementById("make");
const maxMileageInput = document.getElementById("max-mileage");
const maxPriceInput = document.getElementById("max-price");
const colorCheckboxes = document.querySelectorAll(".color-checkbox");

// Get the car listings container
const carListings = document.getElementById("car-listings");

// Function to filter and display cars
function filterCars() {
  const minYear = parseInt(minYearInput.value);
  const maxYear = parseInt(maxYearInput.value);
  const selectedMake = makeSelect.value;
  const maxMileage = parseInt(maxMileageInput.value);
  const maxPrice = parseInt(maxPriceInput.value);
  const selectedColors = [...colorCheckboxes]
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  // Filter cars based on criteria
  const filteredCars = usedCars.filter((car) => {
    return (
      car.year >= minYear &&
      car.year <= maxYear &&
      (selectedMake === "All" || car.make === selectedMake) &&
      car.mileage <= maxMileage &&
      car.price <= maxPrice &&
      (selectedColors.length === 0 || selectedColors.includes(car.color))
    );
  });

  // Clear previous listings
  carListings.innerHTML = "";

  // Display filtered cars
  if (filteredCars.length > 0) {
    filteredCars.forEach((car) => {
      const card = document.createElement("div");
      card.classList.add("card");
      // Create the card with car details
      // Add an image, year, make, model, mileage, price, etc.
      card.innerHTML = `
        <img src="${car.image}" alt"${car.make} ${car.model} Image">
        <h2>${car.make} ${car.model}</h2>
        <h4>Price: $${car.price}</h4>
        <p>Year: ${car.year}</p>
        <p>Color: ${car.color}</p>
        <p>Mileage: ${car.mileage}</p>
        <p>Gas Mileage: ${car.gasMileage}</p>
        `;
      carListings.appendChild(card);
    });
  } else {
    // No cars match the criteria
    carListings.innerHTML =
      "<p>No cars match the selected criteria. Please try again.</p>";
  }
}

// Event listeners for filter inputs
minYearInput.addEventListener("change", filterCars);
maxYearInput.addEventListener("change", filterCars);
makeSelect.addEventListener("change", filterCars);
maxMileageInput.addEventListener("change", filterCars);
maxPriceInput.addEventListener("change", filterCars);
colorCheckboxes.forEach((checkbox) =>
  checkbox.addEventListener("change", filterCars)
);

// Get the unique car makes from the usedCars array
const carMakes = [...new Set(usedCars.map((car) => car.make))];

// Populate the select box with car makes
carMakes.forEach((make) => {
  const option = document.createElement("option");
  option.value = make;
  option.textContent = make;
  makeSelect.appendChild(option);
});

// Get the Reset Filters button
const resetFiltersButton = document.getElementById("reset-filters");

// Function to reset all filter options to their default values
function resetFilters() {
  minYearInput.value = 2000; // Set the default min year
  maxYearInput.value = 2023; // Set the default max year
  makeSelect.value = "All"; // Set the default car make
  maxMileageInput.value = 100000; // Set the default max mileage
  maxPriceInput.value = 100000; // Set the default max price

  // Uncheck all color checkboxes
  colorCheckboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });

  // Reapply filters to update the listings
  filterCars();
}

// Add an event listener to the Reset Filters button
resetFiltersButton.addEventListener("click", resetFilters);

// Initial call to populate car listings
filterCars();
