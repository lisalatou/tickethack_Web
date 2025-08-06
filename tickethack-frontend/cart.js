// Récupérer les voyages sélectionnés par l'utilisateur
fetch("http://localhost:3000/cart/notpaid")
  .then((response) => response.json())
  .then((cartItems) => {
    if (cartItems.length > 0) {
      // Si des trajets sont enregistrés dans le panier
      document.querySelector("#emptyCart").style.display = "none";
      document.querySelector("#fullCart").style.display = "block";

      cartItems.forEach((cartItem) => {
        if (cartItem.tripId) {
          const trip = cartItem.tripId;

          //formatage de la date
          const date = new Date(trip.date);
          const formattedDate = date.toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });

          document.querySelector("#trips").innerHTML += `<div class = "trips">
                <p class="trip">${trip.departure} > ${trip.arrival}</p>
                <p class="tripDate">${formattedDate}</p>
                <p class="tripPrice">${trip.price} €</p>
                <button class="suppButton" data-trip-id="${trip._id}">x</button>
            </div>`;
        }
      });
      calculateTotal();
      addDelete();
    } else {
      // Si le panier est vide
      document.querySelector("#emptyCart").style.display = "block";
      document.querySelector("#fullCart").style.display = "none";
    }
  });

// Fonction pour calculer le montant total du panier
function calculateTotal() {
  const values = document.querySelectorAll(".tripPrice");
  let totalValue = 0;

  values.forEach((priceElement) => {
    const priceText = priceElement.textContent.replace("€", "");
    totalValue += Number(priceText);
  });

  document.querySelector("#valueTotal").textContent = `Total : ${totalValue}€`;
}

// Fonction supprimer
function addDelete() {
  const suppButton = document.querySelectorAll(".suppButton");

  suppButton.forEach((button) => {
    button.addEventListener("click", function () {
      const tripId = this.getAttribute("data-trip-id");
      this.parentNode.remove();
      fetch(`http://localhost:3000/cart/${tripId}`, {
        method: "DELETE",
      }).then(() => {
        calculateTotal();
      });
    });
  });
}

// Fonction purchase
document.querySelector("#purchaseButton").addEventListener("click", () => {
  async function updateTrajets(tripId) {
    const response = await fetch(`http://localhost:3000/cart/${tripId}`, {
      method: "PUT",
    });
    const data = await response.json();
    return data;
  }
  const suppButton = document.querySelectorAll(".suppButton");
  for (let i = 0; i < suppButton.length; i++) {
    const tripId = suppButton[i].getAttribute("data-trip-id");
    updateTrajets(tripId);
  }
  window.location.href = "booking.html";
});
