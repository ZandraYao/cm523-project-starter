const brands = [
  {
    id: "gongcha",
    name: "Gong Cha",
    logo: "images/gongcha.png",
    neighborhood: "Chinatown",
    description: "Gong Cha is known for classic milk teas and customizable toppings.",
    menu: ["Brown Sugar Milk Tea", "Wintermelon Tea", "Cheese Foam Tea"]
  },
  {
    id: "tsaocaa",
    name: "TSAo CAA",
    logo: "images/tsaocaa.png",
    neighborhood: "Fenway",
    description: "TSao CAA is popular for fruit teas and cheese foam series.",
    menu: ["Grapefruit Tea", "Cheese Oolong Tea", "Four Seasons Fruit Tea"]
  },
  {
    id: "heytea",
    name: "Heytea",
    logo: "images/heytea.png",
    neighborhood: "Cambridge",
    description: "Heytea is known for cheese teas, matcha drinks and seasonal series.",
    menu: ["Cheese Black Tea", "Very Grape", "Matcha Latte"]
  },
  {
    id: "teazzi",
    name: "Teazzi",
    logo: "images/teazzi.png",
    neighborhood: "Allston",
    description: "Teazzi is a student favorite with brown sugar drinks and latte styles.",
    menu: ["Brown Sugar Boba", "Hokkaido Milk Tea", "Coffee Latte Tea"]
  },
  {
    id: "machimachi",
    name: "Machi Machi",
    logo: "images/machimachi.png",
    neighborhood: "Fenway",
    description: "Machi Machi is known for bottled drinks and Taiwanese cream cheese foam.",
    menu: ["Bottle Milk Tea", "Berry Latte", "Black Milk Tea with Cream Top"]
  },
  {
    id: "chichasanchen",
    name: "CHICHA San Chen",
    logo: "images/chicha.png",
    neighborhood: "Chinatown",
    description: "Award-winning brand offering freshly brewed Taiwanese teas.",
    menu: ["Dong Ding Oolong", "Cassia Black Tea", "Bubble Milk Tea"]
  }
];


function initBrandsPage() {
  const brandGrid = document.getElementById("brandGrid");
  if (!brandGrid) return;

  const searchInput = document.getElementById("searchInput");
  const filterNeighborhood = document.getElementById("filterNeighborhood");
  const brandCount = document.getElementById("brandCount");

  const modal = document.getElementById("brandModal");
  const modalClose = document.getElementById("modalClose");
  const modalLogo = document.getElementById("modalLogo");
  const modalName = document.getElementById("modalName");
  const modalDescription = document.getElementById("modalDescription");
  const modalMenu = document.getElementById("modalMenu");

  function openModal(brand) {
    modalLogo.src = brand.logo;
    modalLogo.alt = brand.name + " logo";
    modalName.textContent = brand.name;
    modalDescription.textContent = brand.description;

    modalMenu.innerHTML = "";
    brand.menu.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      modalMenu.appendChild(li);
    });

    modal.classList.remove("hidden");
  }

  function closeModal() {
    modal.classList.add("hidden");
  }

  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  function render(list) {
    brandGrid.innerHTML = "";
    list.forEach((brand) => {
      const card = document.createElement("div");
      card.className = "brand-card";

      card.innerHTML = `
        <img src="${brand.logo}" alt="${brand.name} logo">
        <button class="brand-btn" data-id="${brand.id}">
          ${brand.name}
        </button>
      `;

      brandGrid.appendChild(card);
    });

    brandCount.textContent = `${list.length} brand(s) shown`;

    document.querySelectorAll(".brand-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const brand = brands.find((b) => b.id === id);
        if (brand) openModal(brand);
      });
    });
  }

  function filter() {
    const keyword = searchInput.value.trim().toLowerCase();
    const hood = filterNeighborhood.value;

    const filtered = brands.filter((b) => {
      const text =
        (b.name + " " + b.description + " " + b.neighborhood).toLowerCase();
      const matchesKeyword = !keyword || text.includes(keyword);
      const matchesHood = hood === "all" || b.neighborhood === hood;
      return matchesKeyword && matchesHood;
    });

    render(filtered);
  }

  searchInput.addEventListener("input", filter);
  filterNeighborhood.addEventListener("change", filter);

  render(brands);
}

document.addEventListener("DOMContentLoaded", () => {
  initBrandsPage();
});
