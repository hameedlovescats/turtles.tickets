document.addEventListener("DOMContentLoaded", function () {
  const slAdultNormalCharge = 4;
  const slAdultPeakCharge = 6;
  const slChildNormalCharge = 2;
  const slChildPeakCharge = 3;
  const foreignerAdultNormalCharge = 10;
  const foreignerAdultPeakCharge = 13;
  const foreignerChildNormalCharge = 5;
  const foreignerChildPeakCharge = 8;

  let durationText;

  function calculateTotalPayable() {
    const slAdultTickets = parseInt(document.getElementById("slAdult").value) || 0;
    const slChildTickets = parseInt(document.getElementById("slChild").value) || 0;
    const foreignerAdultTickets = parseInt(document.getElementById("foreignerAdult").value) || 0;
    const foreignerChildTickets = parseInt(document.getElementById("foreignerChild").value) || 0;
    const selectedTimeSlots = Array.from(document.getElementById("timeSlot").selectedOptions).map(option => option.value);

    let totalPayable = 0;

    selectedTimeSlots.forEach(timeSlot => {
      const isPeakHour = timeSlot >= "10-11" && timeSlot <= "17-18";
      totalPayable +=
        slAdultTickets * (isPeakHour ? slAdultPeakCharge : slAdultNormalCharge) +
        slChildTickets * (isPeakHour ? slChildPeakCharge : slChildNormalCharge) +
        foreignerAdultTickets * (isPeakHour ? foreignerAdultPeakCharge : foreignerAdultNormalCharge) +
        foreignerChildTickets * (isPeakHour ? foreignerChildPeakCharge : foreignerChildNormalCharge);
    });

    return totalPayable;
  }

  function updateSummary() {
    const visitDate = document.getElementById("date").value;
    const selectedTimeSlots = Array.from(document.getElementById("timeSlot").selectedOptions).map(option => option.text);
    const isPeakHour = selectedTimeSlots.some(timeSlot => timeSlot.includes("10.00 am - 11.00 am") || timeSlot.includes("05.00 pm - 06.00 pm"));

    const areTimeSlotsConsecutive = areConsecutive(selectedTimeSlots);

    const summaryDateCell = document.getElementById("summaryDate");
    const summaryTimeCell = document.getElementById("summaryTime");
    const summaryDurationCell = document.getElementById("summaryDuration");
    const summaryTicketsCell = document.getElementById("summaryTickets");
    const summaryTotalCell = document.getElementById("summaryTotal");

    summaryDateCell.textContent = visitDate;
    summaryTimeCell.textContent = areTimeSlotsConsecutive ? selectedTimeSlots.join(", ") : "Non-consecutive time slots selected";

    if (areTimeSlotsConsecutive) {
      const selectedTimeSlotCount = selectedTimeSlots.length;
      durationText = selectedTimeSlotCount > 1 ? `${selectedTimeSlotCount} hrs` : "1 hr";
      summaryDurationCell.textContent = `${durationText} (${isPeakHour ? "Peak" : "Normal"})`;
    } else {
      durationText = "Non-consecutive time slots selected";
      summaryDurationCell.textContent = durationText;
      document.getElementById("timeSlot").selectedIndex = -1;
    }

    const slAdultTickets = parseInt(document.getElementById("slAdult").value) || 0;
    const slChildTickets = parseInt(document.getElementById("slChild").value) || 0;
    const foreignerChildTickets = parseInt(document.getElementById("foreignerChild").value) || 0;
    const infantTickets = parseInt(document.getElementById("infant").value) || 0;

    summaryTicketsCell.innerHTML = `
      ${slAdultTickets} SL Adult $${slAdultTickets * (isPeakHour ? slAdultPeakCharge : slAdultNormalCharge)}<br>
      ${slChildTickets} SL Child $${slChildTickets * (isPeakHour ? slChildPeakCharge : slChildNormalCharge)}<br>
      1 Foreigner Adult $${isPeakHour ? foreignerAdultPeakCharge : foreignerAdultNormalCharge}<br>
      ${foreignerChildTickets} Foreigner Child $${foreignerChildTickets * (isPeakHour ? foreignerChildPeakCharge : foreignerChildNormalCharge)}<br>
      ${infantTickets} Infant Free
    `;

    const totalPayable = calculateTotalPayable();
    summaryTotalCell.textContent = `$${totalPayable}`;

    const summaryData = {
      summaryDate: visitDate,
      summaryTime: areTimeSlotsConsecutive ? selectedTimeSlots.join(", ") : "Non-consecutive time slots selected",
      summaryDuration: areTimeSlotsConsecutive ? `${durationText} (${isPeakHour ? "Peak" : "Normal"})` : "Non-consecutive time slots selected",
      summaryTickets: summaryTicketsCell.innerHTML,
      summaryTotal: `$${totalPayable}`
    };

    localStorage.setItem("summaryData", JSON.stringify(summaryData));

    const continueButton = document.getElementById("continueBut");
    continueButton.disabled = totalPayable <= 0;

    const ticketDetails = [
      { quantity: slAdultTickets, type: "SL Adult", charge: slAdultTickets * (isPeakHour ? slAdultPeakCharge : slAdultNormalCharge) },
      { quantity: slChildTickets, type: "SL Child", charge: slChildTickets * (isPeakHour ? slChildPeakCharge : slChildNormalCharge) },
      { quantity: 1, type: "Foreigner Adult", charge: isPeakHour ? foreignerAdultPeakCharge : foreignerAdultNormalCharge },
      { quantity: foreignerChildTickets, type: "Foreigner Child", charge: foreignerChildTickets * (isPeakHour ? foreignerChildPeakCharge : foreignerChildNormalCharge) },
      { quantity: infantTickets, type: "Infant", charge: 0 }
    ];

    localStorage.setItem("ticketDetails", JSON.stringify(ticketDetails));
  }

  document.getElementById("date").addEventListener("change", updateSummary);
  document.getElementById("timeSlot").addEventListener("change", updateSummary);
  document.getElementById("slAdult").addEventListener("input", updateSummary);
  document.getElementById("slChild").addEventListener("input", updateSummary);
  document.getElementById("foreignerAdult").addEventListener("input", updateSummary);
  document.getElementById("foreignerChild").addEventListener("input", updateSummary);
  document.getElementById("infant").addEventListener("input", updateSummary);

  const incrementButtons = document.querySelectorAll(".increment");
  const decrementButtons = document.querySelectorAll(".decrement");

  function handleIncrement(event) {
    event.preventDefault();
    const inputElement = event.target.parentElement.querySelector("input");
    inputElement.value = parseInt(inputElement.value) + 1;
    updateSummary();
  }

  function handleDecrement(event) {
    event.preventDefault();
    const inputElement = event.target.parentElement.querySelector("input");
    const currentValue = parseInt(inputElement.value);
    inputElement.value = currentValue > 0 ? currentValue - 1 : 0;
    updateSummary();
  }

  incrementButtons.forEach((button) => {
    button.addEventListener("click", handleIncrement);
  });

  decrementButtons.forEach((button) => {
    button.addEventListener("click", handleDecrement);
  });

  function areConsecutive(timeSlots) {
    const timeSlotValues = timeSlots.map(slot => parseInt(slot.split('-')[0]));
    const sortedTimeSlots = [...timeSlotValues].sort((a, b) => a - b);
    for (let i = 1; i < sortedTimeSlots.length; i++) {
      if (sortedTimeSlots[i] !== sortedTimeSlots[i - 1] + 1) {
        return false;
      }
    }
    return true;
  }

  const currentDate = new Date().toISOString().split('T')[0];
  document.getElementById("date").value = currentDate;
  const firstTimeSlotOption = document.getElementById("timeSlot").options[0];
  firstTimeSlotOption.selected = true;
  updateSummary();
});
