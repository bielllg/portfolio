document.addEventListener('DOMContentLoaded', () => {
    // Dados dos produtos (simulando um banco de dados)
    const products = [
        {
            id: 1,
            name: "Bolo de Chocolate Belga",
            description: "Bolo fofinho com cobertura de ganache e raspas de chocolate",
            price: "89.90",
            category: "bolos",
            image: "https://i.imgur.com/your-chocolate-cake-image.png" // Substitua pela URL da sua imagem
        },
        {
            id: 2,
            name: "Bolo de Morango com Chantilly",
            description: "Camadas de pão de ló com morangos frescos e chantilly",
            price: "95.90",
            category: "bolos",
            image: "https://i.imgur.com/your-strawberry-cake-image.png" // Substitua pela URL da sua imagem
        },
        {
            id: 3,
            name: "Red Velvet",
            description: "Clássico bolo vermelho com cream cheese frosting",
            price: "110.00",
            category: "bolos",
            image: "https://i.imgur.com/your-red-velvet-image.png" // Substitua pela URL da sua imagem
        },
        {
            id: 4,
            name: "Cupcake de Baunilha",
            description: "Massa leve de baunilha com buttercream colorido",
            price: "12.90",
            category: "cupcakes",
            image: "https://i.imgur.com/your-vanilla-cupcake-image.png" // Substitua pela URL da sua imagem
        },
        // Adicione mais produtos aqui, incluindo categorias de Tortas e Brigadeiros
        {
            id: 5,
            name: "Torta de Limão Merengada",
            description: "Base crocante, recheio azedinho e merengue tostado",
            price: "75.00",
            category: "tortas",
            image: "https://i.imgur.com/your-lemon-pie-image.png" // Exemplo
        },
        {
            id: 6,
            name: "Brigadeiro Gourmet ao Leite",
            description: "Clássico brigadeiro feito com chocolate belga",
            price: "4.50",
            category: "brigadeiros",
            image: "https://i.imgur.com/your-brigadeiro-image.png" // Exemplo
        }
    ];

    const productsGrid = document.getElementById('products-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    // Função para renderizar os produtos
    function renderProducts(filteredProducts) {
        productsGrid.innerHTML = ''; // Limpa o grid antes de adicionar novos produtos
        filteredProducts.forEach(product => {
            const productCard = `
                <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover rounded-md mb-4">
                    <h3 class="font-semibold text-xl mb-2 text-pink-700">${product.name}</h3>
                    <p class="text-gray-600 text-sm mb-4">${product.description}</p>
                    <div class="flex justify-between items-center">
                        <span class="text-pink-600 font-bold text-lg">R$ ${product.price}</span>
                        <button class="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium transition duration-300">
                            + Adicionar
                        </button>
                    </div>
                </div>
            `;
            productsGrid.innerHTML += productCard;
        });
    }

    // Event listener para os botões de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active')); // Remove 'active' de todos
            button.classList.add('active'); // Adiciona 'active' ao clicado

            const category = button.dataset.category;
            const filtered = category === 'all'
                ? products
                : products.filter(product => product.category === category);
            renderProducts(filtered);
        });
    });

    // Renderizar todos os produtos na carga inicial
    renderProducts(products);

    // Lógica para o botão "Voltar ao Topo"
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Mostra o botão após rolar 300px
            scrollToTopBtn.classList.add('show');
            scrollToTopBtn.classList.remove('hidden');
        } else {
            scrollToTopBtn.classList.remove('show');
            scrollToTopBtn.classList.add('hidden');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Rolagem suave
        });
    });

    // Rolagem suave para os links do cabeçalho
    document.querySelectorAll('header nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});