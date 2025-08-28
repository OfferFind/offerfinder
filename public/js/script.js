document.addEventListener("DOMContentLoaded", () => {
  const offerForm = document.getElementById("offerForm");
  const adminOffers = document.getElementById("adminOffers");
  const userOffers = document.getElementById("offers");

  let offers = JSON.parse(localStorage.getItem("offers")) || [];
  let editingIndex = null; // track if editing an offer

  function saveOffers() {
    localStorage.setItem("offers", JSON.stringify(offers));
  }

  function renderOffers(container, isAdmin = false) {
    if (!container) return;
    container.innerHTML = offers.map((o, index) => `
      <div class="offer-card">
        <img src="${o.image}" alt="${o.title}">
        <h3>${o.title}</h3>
        <p>${o.price}</p>
        <a href="${o.link}" target="_blank">Grab Deal</a>
        ${isAdmin ? `
          <div class="card-actions">
            <button class="btn-edit" data-index="${index}">✏️ Edit</button>
            <button class="btn-delete" data-index="${index}">🗑 Delete</button>
          </div>` : ""}
      </div>
    `).join("");

    if (isAdmin) {
      document.querySelectorAll(".btn-delete").forEach(btn => {
        btn.addEventListener("click", e => {
          const i = e.target.dataset.index;
          offers.splice(i, 1);
          saveOffers();
          renderOffers(adminOffers, true);
        });
      });

      document.querySelectorAll(".btn-edit").forEach(btn => {
        btn.addEventListener("click", e => {
          const i = e.target.dataset.index;
          const offer = offers[i];
          document.getElementById("title").value = offer.title;
          document.getElementById("price").value = offer.price;
          document.getElementById("link").value = offer.link;
          document.getElementById("image").value = offer.image;
          editingIndex = i; // mark as editing
        });
      });
    }
  }

  // Initial render
  renderOffers(adminOffers, true);
  renderOffers(userOffers);

  // Add / Update Offer
  if (offerForm) {
    offerForm.addEventListener("submit", e => {
      e.preventDefault();
      const newOffer = {
        title: document.getElementById("title").value,
        price: document.getElementById("price").value,
        link: document.getElementById("link").value,
        image: document.getElementById("image").value
      };

      if (editingIndex !== null) {
        offers[editingIndex] = newOffer;
        editingIndex = null;
      } else {
        offers.push(newOffer);
      }

      saveOffers();
      offerForm.reset();
      renderOffers(adminOffers, true);
      renderOffers(userOffers);
    });
  }
});
