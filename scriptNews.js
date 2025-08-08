document.addEventListener("DOMContentLoaded", function () {
  // Пример новостей
  const newsItems = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    title: `Новость ${i + 1}`,
    image: `https://api.klakla.ru/images/sports-teams/2425c5a2-f92c-47a7-8072-dc04a10b89b2.png?text=Новость+${i + 1}`,
    content: `Подробный текст новости ${i + 1}`
  }));

  const newsGrid = document.getElementById("news-grid");
  const pagination = document.getElementById("pagination");

  const itemsPerPage = 4;
  let currentPage = 1;

  function renderNews() {
    if (!newsGrid) return;
    newsGrid.innerHTML = "";
    const start = (currentPage - 1) * itemsPerPage;
    const currentItems = newsItems.slice(start, start + itemsPerPage);

    currentItems.forEach((item) => {
      const div = document.createElement("div");
      div.className = "news-item";
      div.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <h3>${item.title}</h3>
        <button onclick="location.href='news-detail.html?id=${item.id}'">Подробнее</button>
      `;
      newsGrid.appendChild(div);
    });
  }

  function renderPagination() {
    if (!pagination) return;
    pagination.innerHTML = "";
    const totalPages = Math.ceil(newsItems.length / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      if (i === currentPage) btn.disabled = true;
      btn.onclick = () => {
        currentPage = i;
        renderNews();
        renderPagination();
      };
      pagination.appendChild(btn);
    }
  }

  renderNews();
  renderPagination();

  // Модалка
  const openForm = document.getElementById("open-form");
  const closeModal = document.getElementById("close-modal");
  const modal = document.getElementById("modal");
  const form = document.getElementById("feedback-form");

  if (openForm) {
    openForm.onclick = () => {
      modal.style.display = "flex";
    };
  }

  if (closeModal) {
    closeModal.onclick = () => {
      modal.style.display = "none";
    };
  }

  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      alert("Заявка отправлена!");
      modal.style.display = "none";
      form.reset();
    };
  }

  // Бургер
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");

  if (burger && nav) {
    burger.onclick = () => {
      nav.classList.toggle("active");
    };
  }
});
