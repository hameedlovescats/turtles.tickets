document.addEventListener("DOMContentLoaded", function () {
    var storedUserData = JSON.parse(localStorage.getItem("userFormData"));
    console.log(storedUserData); // Check if user data is retrieved

    if (storedUserData) {
        var fullName = storedUserData.fullName;
        var mobileNumber = storedUserData.mobileNumber;
        var email = storedUserData.email;
        var gender = storedUserData.gender;

        console.log(fullName, mobileNumber, email, gender); // Check individual data

        document.getElementById("summaryName").textContent = fullName;
        document.getElementById("summaryMobile").textContent = mobileNumber;
        document.getElementById("summaryEmail").textContent = email;
        document.getElementById("summaryGender").textContent = gender;
    }

    const summaryDate = document.getElementById("summaryDate");
    const summaryTime = document.getElementById("summaryTime");
    const summaryDuration = document.getElementById("summaryDuration");
    const summaryTickets = document.getElementById("summaryTickets");
    const summaryTotal = document.getElementById("summaryTotal");

    const storedSummaryData = localStorage.getItem("summaryData");
    if (storedSummaryData) {
        const summaryData = JSON.parse(storedSummaryData);
        summaryDate.textContent = summaryData.summaryDate;
        summaryTime.textContent = summaryData.summaryTime;
        summaryDuration.textContent = summaryData.summaryDuration;
        summaryTickets.innerHTML = summaryData.summaryTickets;
        summaryTotal.textContent = summaryData.summaryTotal;
    }
});
