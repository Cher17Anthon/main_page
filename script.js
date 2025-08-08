// Бургер-меню
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");

burger.addEventListener("click", () => {
  nav.classList.toggle("active");
});

// Слайдер
const slides = document.querySelectorAll(".slide");
const dotsContainer = document.getElementById("dots");
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) =>
    slide.classList.toggle("active", i === index)
  );
  document.querySelectorAll(".dot").forEach((dot, i) =>
    dot.classList.toggle("active", i === index)
  );
}

slides.forEach((_, index) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  if (index === 0) dot.classList.add("active");
  dot.addEventListener("click", () => {
    currentSlide = index;
    showSlide(currentSlide);
  });
  dotsContainer.appendChild(dot);
});

document.getElementById("prev").onclick = () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
};
document.getElementById("next").onclick = () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
};

// Новости + пагинация
const news = Array.from({ length: 12 }, (_, i) => ({
  title: `Новость #${i + 1}`,
  image: "https://api.klakla.ru/images/sports-teams/2425c5a2-f92c-47a7-8072-dc04a10b89b2.png",
}));

const newsPerPage = 4;
let currentPage = 1;

function renderNews() {
  const grid = document.getElementById("news-grid");
  grid.innerHTML = "";

  const start = (currentPage - 1) * newsPerPage;
  const pagedNews = news.slice(start, start + newsPerPage);

  pagedNews.forEach((n) => {
    const card = document.createElement("div");
    card.className = "news-card";
    card.innerHTML = `
      <img src="${n.image}" alt="">
      <h4>${n.title}</h4>
      <button>Подробнее</button>
    `;
    grid.appendChild(card);
  });

  renderPagination();
}

function renderPagination() {
  const totalPages = Math.ceil(news.length / newsPerPage);
  const container = document.getElementById("pagination");
  container.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.disabled = true;
    btn.onclick = () => {
      currentPage = i;
      renderNews();
    };
    container.appendChild(btn);
  }
}

renderNews();

// Модальное окно
document.getElementById("open-form").onclick = () => {
  document.getElementById("modal").style.display = "flex";
};

document.getElementById("close-modal").onclick = () => {
  document.getElementById("modal").style.display = "none";
};

document.getElementById("feedback-form").onsubmit = (e) => {
  e.preventDefault();
  alert("Форма отправлена!");
  document.getElementById("modal").style.display = "none";
  e.target.reset();
};
