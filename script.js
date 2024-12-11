let api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
const fromDropDown = document.getElementById("from-currency-select");
const toDropDown = document.getElementById("to-currency-select");

// Create dropdown from the currencies array
currencies.forEach((currency) => {
  const option = document.createElement("option");
  option.value = currency;
  option.text = currency;
  fromDropDown.add(option);
});

// Repeat for the "to" dropdown
currencies.forEach((currency) => {
  const option = document.createElement("option");
  option.value = currency;
  option.text = currency;
  toDropDown.add(option);
});

// Setting default values
fromDropDown.value = "USD";
toDropDown.value = "INR";

// Convert currency function
let convertCurrency = () => {
  // Get amount and selected currencies
  const amount = document.querySelector("#amount").value.trim(); // Trim spaces from the input
  const fromCurrency = fromDropDown.value;
  const toCurrency = toDropDown.value;

  // Check if amount is empty when the convert button is clicked
  if (amount === "") {
    alert("Please fill in the amount");  // Show alert if the amount is empty
  } else {
    fetch(api)
      .then((resp) => resp.json())
      .then((data) => {
        let fromExchangeRate = data.conversion_rates[fromCurrency];
        let toExchangeRate = data.conversion_rates[toCurrency];
        const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
        result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
      })
      .catch((error) => {
        // Error handling for fetch failure
        alert("Error fetching conversion rates. Please try again.");
      });
  }
};

// Add event listener for "Convert" button click
document.querySelector("#convert-button").addEventListener("click", convertCurrency);
