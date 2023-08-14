document.addEventListener("DOMContentLoaded", function () {
  const cardNumberInput = document.getElementById("cardNumber");
  const expiryDateInput = document.getElementById("expiryDate");
  const cvcInput = document.getElementById("cvc");
  const cardNameInput = document.getElementById("cardName");
  const proceedButton = document.getElementById("proceedToPayment");

  proceedButton.addEventListener("click", function (event) {
      event.preventDefault();

      if (validatePaymentDetails()) {
          updateSummary();
          alert("Payment confirmed! Thank you.");
          window.location.href = "confirmation.html";
      }
  });

  function validatePaymentDetails() {
      const cardName = cardNameInput.value.trim();
      const cardNumber = cardNumberInput.value.trim();
      const expiryDate = expiryDateInput.value.trim();document.addEventListener("DOMContentLoaded", function () {
        const cardNumberInput = document.getElementById("cardNumber");
        const expiryDateInput = document.getElementById("expiryDate");
        const cvcInput = document.getElementById("cvc");
        const cardNameInput = document.getElementById("cardName");
        const proceedButton = document.getElementById("proceedToPayment");
    
        proceedButton.addEventListener("click", function (event) {
            event.preventDefault();
    
            if (validatePaymentDetails()) {
                updateSummary();
                alert("Payment confirmed! Thank you.");
                window.location.href = "confirmation.html";
            }
        });
    
        function validatePaymentDetails() {
            const cardName = cardNameInput.value.trim();
            const cardNumber = cardNumberInput.value.trim();
            const expiryDate = expiryDateInput.value.trim();
            const cvc = cvcInput.value.trim();
    
            if (cardName === "" || cardNumber === "" || expiryDate === "" || cvc === "") {
                alert("Please fill in all payment details.");
                return false;
            }
    
            if (!isValidCardNumber(cardNumber)) {
                alert("Invalid card number. Please enter a valid 16-digit card number without spaces.");
                return false;
            }
    
            if (!isValidExpiryDate(expiryDate)) {
                alert("Invalid expiry date. Please use MM/YY format and ensure it's a valid future date.");
                return false;
            }
    
            if (!isValidCVC(cvc)) {
                alert("Invalid CVC. Please enter a valid 3 or 4-digit CVC.");
                return false;
            }
    
            return true;
        }
    
        function isValidCardNumber(cardNumber) {
            return /^\d{16}$/.test(cardNumber);
        }
    
        function isValidExpiryDate(expiryDate) {
            if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
                return false;
            }
    
            const [month, year] = expiryDate.split("/");
            const currentYear = new Date().getFullYear() % 100;
            const inputMonth = parseInt(month, 10);
            const inputYear = parseInt(year, 10);
    
            const isValidMonth = inputMonth >= 1 && inputMonth <= 12;
            const isValidYear = inputYear >= currentYear && inputYear <= currentYear + 10;
    
            return isValidMonth && isValidYear;
        }
    
        function isValidCVC(cvc) {
            return /^\d{3,4}$/.test(cvc);
        }
    
        function updateSummary() {
            const summaryTable = document.createElement("table");
            summaryTable.innerHTML = `
                <tr>
                    <th>Summary</th>
                    <th>Value</th>
                </tr>
                <tr>
                    <td>Name on Card:</td>
                    <td>${cardNameInput.value.trim()}</td>
                </tr>
                <tr>
                    <td>Card Number:</td>
                    <td>${cardNumberInput.value.trim()}</td>
                </tr>
                <tr>
                    <td>Expiry Date:</td>
                    <td>${expiryDateInput.value.trim()}</td>
                </tr>
                <tr>
                    <td>CVC:</td>
                    <td>${cvcInput.value.trim()}</td>
                </tr>
            `;
    
            const summarySection = document.createElement("section");
            summarySection.id = "paymentSummary";
            summarySection.appendChild(summaryTable);
    
            const container = document.querySelector(".container");
            container.appendChild(summarySection);
        }
    
        const storedSummaryData = JSON.parse(localStorage.getItem("summaryData"));
        if (storedSummaryData) {
            const summaryDate = storedSummaryData.summaryDate;
            const summaryTime = storedSummaryData.summaryTime;
            const summaryDuration = storedSummaryData.summaryDuration;
            const summaryTotal = storedSummaryData.summaryTotal;
    
            const summaryTable = document.createElement("table");
            summaryTable.className = "summary-table"; 
            summaryTable.innerHTML = `
                <tr>
                    <th>Summary</th>
                    
                </tr>
                <tr>
                    <td>Date:</td>
                    <td>${summaryDate}</td>
                </tr>
                <tr>
                    <td>Time:</td>
                    <td>${summaryTime}</td>
                </tr>
                <tr>
                    <td>Duration:</td>
                    <td>${summaryDuration}</td>
                </tr>
                <tr>
                    <td>Total:</td>
                    <td>${summaryTotal}</td>
                </tr>
            `;
    
            const summarySection = document.createElement("section");
            summarySection.id = "summarySection";
            summarySection.appendChild(summaryTable);
    
            const container = document.querySelector(".container");
            container.appendChild(summarySection);
        }
    });
    
      const cvc = cvcInput.value.trim();

      if (cardName === "" || cardNumber === "" || expiryDate === "" || cvc === "") {
          alert("Please fill in all payment details.");
          return false;
      }

      if (!isValidCardNumber(cardNumber)) {
          alert("Invalid card number. Please enter a valid 16-digit card number without spaces.");
          return false;
      }

      if (!isValidExpiryDate(expiryDate)) {
          alert("Invalid expiry date. Please use MM/YY format and ensure it's a valid future date.");
          return false;
      }

      if (!isValidCVC(cvc)) {
          alert("Invalid CVC. Please enter a valid 3 or 4-digit CVC.");
          return false;
      }

      return true;
  }

  function isValidCardNumber(cardNumber) {
      return /^\d{16}$/.test(cardNumber);
  }

  function isValidExpiryDate(expiryDate) {
      if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
          return false;
      }

      const [month, year] = expiryDate.split("/");
      const currentYear = new Date().getFullYear() % 100;
      const inputMonth = parseInt(month, 10);
      const inputYear = parseInt(year, 10);

      const isValidMonth = inputMonth >= 1 && inputMonth <= 12;
      const isValidYear = inputYear >= currentYear && inputYear <= currentYear + 10;

      return isValidMonth && isValidYear;
  }

  function isValidCVC(cvc) {
      return /^\d{3,4}$/.test(cvc);
  }

  function updateSummary() {
      const summaryTable = document.createElement("table");
      summaryTable.innerHTML = `
          <tr>
              <th>Summary</th>
              <th>Value</th>
          </tr>
          <tr>
              <td>Name on Card:</td>
              <td>${cardNameInput.value.trim()}</td>
          </tr>
          <tr>
              <td>Card Number:</td>
              <td>${cardNumberInput.value.trim()}</td>
          </tr>
          <tr>
              <td>Expiry Date:</td>
              <td>${expiryDateInput.value.trim()}</td>
          </tr>
          <tr>
              <td>CVC:</td>
              <td>${cvcInput.value.trim()}</td>
          </tr>
      `;

      const summarySection = document.createElement("section");
      summarySection.id = "paymentSummary";
      summarySection.appendChild(summaryTable);

      const container = document.querySelector(".container");
      container.appendChild(summarySection);
  }

  const storedSummaryData = JSON.parse(localStorage.getItem("summaryData"));
  if (storedSummaryData) {
      const summaryDate = storedSummaryData.summaryDate;
      const summaryTime = storedSummaryData.summaryTime;
      const summaryDuration = storedSummaryData.summaryDuration;
      const summaryTotal = storedSummaryData.summaryTotal;

      const summaryTable = document.createElement("table");
      summaryTable.className = "summary-table"; 
      summaryTable.innerHTML = `
          <tr>
              <th>Summary</th>
              
          </tr>
          <tr>
              <td>Date:</td>
              <td>${summaryDate}</td>
          </tr>
          <tr>
              <td>Time:</td>
              <td>${summaryTime}</td>
          </tr>
          <tr>
              <td>Duration:</td>
              <td>${summaryDuration}</td>
          </tr>
          <tr>
              <td>Total:</td>
              <td>${summaryTotal}</td>
          </tr>
      `;

      const summarySection = document.createElement("section");
      summarySection.id = "summarySection";
      summarySection.appendChild(summaryTable);

      const container = document.querySelector(".container");
      container.appendChild(summarySection);
  }
});
