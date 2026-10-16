// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area=";

// Your code here!

const stateInput = document.getElementById("state-input");
const fetchButton = document.getElementById("fetch-alerts");
const alertsDisplay = document.getElementById("alerts-display");
const errorDiv = document.getElementById("error-message");


async function fetchWeatherAlerts(state) {
  try {
    if (!state) {
      throw new Error("Please enter a state abbreviation.");
    }

    const response = await fetch(
      `https://api.weather.gov/alerts/active?area=${state}`,
    );

    if (!response.ok) {
      throw new Error("Could not get alerts. Check the state abbreviation.");
    }

    const data = await response.json();
    console.log(data);

    
    stateInput.value = "";
    clearError();

    displayAlerts(data);
  } catch (error) {
    console.log(error.message);
    showError(error.message); 
  }
}


function displayAlerts(data) {
  alertsDisplay.innerHTML = ""; 

  const summary = document.createElement("p");
  summary.textContent = `${data.title}: ${data.features.length}`;
  alertsDisplay.appendChild(summary);

  const ul = document.createElement("ul");
  data.features.forEach((alert) => {
    const li = document.createElement("li");
    li.textContent = alert.properties.headline;
    ul.appendChild(li);
  });
  alertsDisplay.appendChild(ul);
}


function showError(message) {
  errorDiv.textContent = message;
  errorDiv.classList.remove("hidden");
  errorDiv.style.display = "block";
  alertsDisplay.innerHTML = "";
}

function clearError() {
  errorDiv.textContent = "";
  errorDiv.classList.add("hidden");
  errorDiv.style.display = "none";
}


fetchButton.addEventListener("click", () => {
  const state = stateInput.value.trim().toUpperCase();
  fetchWeatherAlerts(state);
});
















