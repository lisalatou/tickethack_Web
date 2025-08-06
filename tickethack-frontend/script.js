// Script page d'accueil : recherche de voyage
document.querySelector("#searchButton").addEventListener("click", () => {
  const depart = document.querySelector("#departureInput").value;
  const arriv = document.querySelector("#arrivalInput").value;
  const dateV = document.querySelector("#dateInput").value;
  fetch("http://localhost:3000/trips", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ departure: depart, arrival: arriv, date: dateV }),
  })
    .then((response) => response.json())
    .then((data) => {
      document.querySelector("#tripResult").innerHTML = "";
      if (data.trips) {
        for (let i = 0; i < data.trips.length; i++) {
          //formatage de la date
          const date = new Date(data.trips[i].date);
          const formattedDate = date.toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });

          document.querySelector(
            "#tripResult"
          ).innerHTML += `<div class="tripContainer">
                <p id="trip">${data.trips[i].departure} > ${data.trips[i].arrival}</p>
                <p id="tripDate">${formattedDate}</p>
                <p id="tripPrice">${data.trips[i].price}€</p>
                <button id= "${data.trips[i]._id}" class="bookButton">Book</button>
                </div>`;
        }
        const button = document.querySelectorAll(".bookButton");
        for (let i = 0; i < button.length; i++) {
          button[i].addEventListener("click", () => {
            let tripId = button[i].id;
            fetch(`http://localhost:3000/cart/${tripId}`, {
              method: "POST",
            });
          });
        }
      } else {
        document.querySelector(
          "#tripResult"
        ).innerHTML += `<div id="noTripContainer">
            <img src="./images/notfound.png" alt="no trip found">
            <p>No trip found.</p>
            </div>`;
      }
    });
});
