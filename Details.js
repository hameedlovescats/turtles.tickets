document.addEventListener("DOMContentLoaded", function () {
  var form = document.querySelector("form");
  var submitButton = form.querySelector("button[type='submit']");

  submitButton.addEventListener("click", function (event) {
    if (!validateForm()) {
      event.preventDefault();
    }
  });

  var fullNameInput = document.getElementById("fullName");
  var fullNameError = document.getElementById("fullName-error");

  var countryCodeSelect = document.getElementById("countryCode");
  var mobileNumberInput = document.getElementById("mobileNumber");
  var mobileNumberError = document.getElementById("mobileNumber-error");

  var emailInput = document.getElementById("email");
  var emailError = document.getElementById("email-error");

  var confirmEmailInput = document.getElementById("confirmEmail");
  var confirmEmailError = document.getElementById("confirmEmail-error");

  var genderSelect = document.getElementById("gender");
  var genderError = document.getElementById("gender-error");

  countryCodeSelect.addEventListener("change", function () {
    var selectedCountryCode = countryCodeSelect.value;
    var placeholder = getMobileNumberPlaceholder(selectedCountryCode);
    mobileNumberInput.placeholder = placeholder;
  });

  function getMobileNumberPlaceholder(countryCode) {
    var placeholderMap = {
      "+91": "+91 XXX XXX XXXX",
      "+94": "+94 XXX XXX XXXX",
      "+1": "+1 XXX XXX XXXX",
      "+65": "+65 XXXX XXXX",
      "+86": "+86 XXX XXXX XXXX",
      "+44": "+44 XXXX XXXXXX",
    };

    return placeholderMap[countryCode] || "Mobile Number";
  }

  function validateFullName() {
    var fullNameValue = fullNameInput.value.trim();
    if (fullNameValue === "") {
      fullNameError.textContent = "Please enter your full name.";
      return false;
    } else {
      fullNameError.textContent = "";
      return true;
    }
  }

  function validateMobileNumber() {
    var mobileNumberValue = mobileNumberInput.value.trim();
    if (mobileNumberValue === "") {
      mobileNumberError.textContent = "Please enter your mobile number.";
      return false;
    } else {
      mobileNumberError.textContent = "";
      return true;
    }
  }

  function validateEmail() {
    var emailValue = emailInput.value.trim();
    if (emailValue === "") {
      emailError.textContent = "Please enter your email address.";
      return false;
    } else if (!isValidEmail(emailValue)) {
      emailError.textContent = "Please enter a valid email address.";
      return false;
    } else {
      emailError.textContent = "";
      return true;
    }
  }

  function isValidEmail(email) {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  function validateConfirmEmail() {
    var emailValue = emailInput.value.trim();
    var confirmEmailValue = confirmEmailInput.value.trim();

    if (confirmEmailValue === "") {
      confirmEmailError.textContent = "Please confirm your email.";
      return false;
    } else if (confirmEmailValue !== emailValue) {
      confirmEmailError.textContent = "Email addresses do not match.";
      return false;
    } else {
      confirmEmailError.textContent = "";
      return true;
    }
  }

  function validateGender() {
    var genderValue = genderSelect.value;
    if (genderValue === "") {
      genderError.textContent = "Please select your gender.";
      return false;
    } else {
      genderError.textContent = "";
      return true;
    }
  }

  function validateForm() {
    var isValidFullName = validateFullName();
    var isValidMobileNumber = validateMobileNumber();
    var isValidEmailValue = validateEmail();
    var isValidConfirmEmail = validateConfirmEmail();
    var isValidGender = validateGender();

    if (
      isValidFullName &&
      isValidMobileNumber &&
      isValidEmailValue &&
      isValidConfirmEmail &&
      isValidGender
    ) {
      var nameValue = fullNameInput.value.trim();
      var mobileValue = mobileNumberInput.value.trim();
      var emailValue = emailInput.value.trim();
      var genderValue = genderSelect.value;

      var userFormData = {
        fullName: nameValue,
        mobileNumber: mobileValue,
        email: emailValue,
        gender: genderValue,
      };

      localStorage.setItem("userFormData", JSON.stringify(userFormData));

      var storedSummaryData = JSON.parse(localStorage.getItem("summaryData")) || {};
      var isValidSummaryTable = storedSummaryData.summaryDate && storedSummaryData.summaryTime &&
                               storedSummaryData.summaryDuration && storedSummaryData.summaryTotal;

      return isValidSummaryTable;
    } else {
      return false;
    }
  }

  var storedSummaryData = JSON.parse(localStorage.getItem("summaryData")) || {};
  if (storedSummaryData.summaryDate && storedSummaryData.summaryTime &&
      storedSummaryData.summaryDuration && storedSummaryData.summaryTotal) {
    var summaryDate = storedSummaryData.summaryDate;
    var summaryTime = storedSummaryData.summaryTime;
    var summaryDuration = storedSummaryData.summaryDuration;
    var summaryTotal = storedSummaryData.summaryTotal;

    document.getElementById("summaryDate").textContent = summaryDate;
    document.getElementById("summaryTime").textContent = summaryTime;
    document.getElementById("summaryDuration").textContent = summaryDuration;
    document.getElementById("summaryTotal").textContent = summaryTotal;
  }

  var storedTicketDetails = JSON.parse(localStorage.getItem("ticketDetails")) || [];
  if (storedTicketDetails.length > 0) {
    var summaryTicketsCell = document.getElementById("summaryTickets");
    var ticketDetailsHTML = "";

    storedTicketDetails.forEach(ticket => {
      ticketDetailsHTML += `${ticket.quantity} ${ticket.type} $${ticket.charge}<br>`;
    });

    summaryTicketsCell.innerHTML = ticketDetailsHTML;
  }
});
