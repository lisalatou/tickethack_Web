// Récupérer les voyages payés
fetch("http://localhost:3000/cart/paid")
  .then((response) => response.json())
  .then((bookingItems) => {
    if (bookingItems.length > 0) {
      document.querySelector("#emptyBooking").style.display = "none";
      document.querySelector("#fullBooking").style.display = "block";

      bookingItems.forEach((bookingItem) => {
        if (bookingItem.tripId) {
          const trip = bookingItem.tripId;

          //formatage de la date
          const date = new Date(trip.date);
          const formattedDate = date.toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });

          // Calcul du temps restant avant le voyage
          const now = new Date();
          const timeDifference = date - now;

          let departureText = "";
          if (timeDifference > 0) {
            //Train pas encore parti
            const hours = Math.floor(timeDifference / (1000 * 60 * 60));
            const minutes = Math.floor(
              (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
            );
            if (hours > 0) {
              departureText = `Departure in ${hours}h ${minutes}min`;
            } else {
              departureText = `Departure in ${minutes}min`;
            }
          } else {
            //Train déjà parti
            departureText = "Departed";
          }

          document.querySelector("#bookings").innerHTML += `
          <div class= "bookings">
              <div id= "tripInfo">
                <p class="booking">${trip.departure} > ${trip.arrival}</p>
                <p class="bookingDate">${formattedDate}</p>
                <p class="bookingPrice">${trip.price} €</p>
              </div>
              <p class="departure">${departureText}</p>
            </div>
         `;
        }
      });
    } else {
      // Si pas de réservation
      document.querySelector("#emptyBooking").style.display = "block";
      document.querySelector("#fullBooking").style.display = "none";
    }
  });
