const products = [
  // Samsung
  { id: "s23", brand: "samsung", name: "Galaxy S23", price: 3499, promo: true, img: "https://images.unsplash.com/photo-1675423499277-eecfc8f45376?q=80&w=1200&auto=format&fit=crop" },
  { id: "s24", brand: "samsung", name: "Galaxy S24", price: 4199, promo: false, img: "https://images.unsplash.com/photo-1580915411957-c8e9c05ceb3a?q=80&w=1200&auto=format&fit=crop" },
  { id: "a54", brand: "samsung", name: "Galaxy A54", price: 1899, promo: true, img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop" },
  // Motorola
  { id: "g84", brand: "motorola", name: "Moto G84", price: 1499, promo: true, img: "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?q=80&w=1200&auto=format&fit=crop" },
  { id: "edge40", brand: "motorola", name: "Motorola Edge 40", price: 2399, promo: false, img: "https://images.unsplash.com/photo-1678618247334-1f8193b9a9d5?q=80&w=1200&auto=format&fit=crop" },
  // Xiaomi
  { id: "mi13", brand: "xiaomi", name: "Xiaomi 13", price: 2899, promo: true, img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop" },
  { id: "redmi12", brand: "xiaomi", name: "Redmi 12", price: 1199, promo: false, img: "https://images.unsplash.com/photo-1520975682031-a9bcb6f9e66f?q=80&w=1200&auto=format&fit=crop" },
  // iPhone
  { id: "ip14", brand: "iphone", name: "iPhone 14", price: 4499, promo: false, img: "https://images.unsplash.com/photo-1607013407627-6ee814329547?q=80&w=1200&auto=format&fit=crop" },
  { id: "ip15", brand: "iphone", name: "iPhone 15", price: 5499, promo: true, img: "https://images.unsplash.com/photo-1695048137244-75a2832640bd?q=80&w=1200&auto=format&fit=crop" },
];

const grid = document.querySelector('#grid');
const empty = document.querySelector('#emptyState');
const chips = Array.from(document.querySelectorAll('.chip'));
const searchInput = document.querySelector('#searchInput');
const clearSearchBtn = document.querySelector('#clearSearch');
const yearSpan = document.querySelector('#year');

function formatBRL(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function createCard(product) {
  const el = document.createElement('article');
  el.className = 'card';
  el.setAttribute('data-brand', product.brand);
  el.setAttribute('data-name', product.name.toLowerCase());
  el.innerHTML = `
    <div class="thumb">
      <img src="${product.img}" alt="${product.name}" loading="lazy" />
    </div>
    <div class="content">
      <div class="title">${product.name}</div>
      <div class="row">
        <div class="meta">${product.brand.charAt(0).toUpperCase() + product.brand.slice(1)}</div>
        ${product.promo ? '<span class="tag">Oferta</span>' : ''}
      </div>
      <div class="row">
        <div class="price">${formatBRL(product.price)}</div>
        <button class="buy" aria-label="Comprar ${product.name}">Comprar</button>
      </div>
    </div>
  `;
  return el;
}

function render(list) {
  grid.innerHTML = '';
  list.forEach(p => grid.appendChild(createCard(p)));
  empty.hidden = list.length !== 0;
}

function applyFilters() {
  const activeBrand = chips.find(c => c.classList.contains('active'))?.dataset.brand || 'all';
  const term = searchInput.value.trim().toLowerCase();
  let list = products;
  if (activeBrand !== 'all') list = list.filter(p => p.brand === activeBrand);
  if (term) list = list.filter(p => p.name.toLowerCase().includes(term));
  render(list);
}

chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    applyFilters();
  });
});

searchInput.addEventListener('input', () => applyFilters());
clearSearchBtn.addEventListener('click', () => { searchInput.value = ''; applyFilters(); });

yearSpan.textContent = new Date().getFullYear();

// Initial render
render(products);
