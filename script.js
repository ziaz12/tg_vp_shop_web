document.addEventListener("DOMContentLoaded", () => {
    // ===== ОЧИЩАЕМ КОРЗИНУ ПРИ ЗАГРУЗКЕ =====
    localStorage.removeItem("cart");
    let cart = [];

    // ===== ТОВАРЫ =====
    const products = [
    {
        name: "Vape Strawberry 500",
        brand: "VapeCo",
        flavor: "Клубника",
        puffs: "500",
        price: 1200,
        type: "vape",
        img: "https://github.com/ziaz12/tg_vp_shop_web/commit/6fffb775fd6eaea311968d642ec63114e847a546https://github.com/ziaz12/tg_vp_shop_web/raw/main/images/vape1.jpg"
    },
    {
        name: "Vape Mint 800",
        brand: "VapeTech",
        flavor: "Мята",
        puffs: "800",
        price: 1500,
        type: "vape",
        img: "https://github.com/ziaz12/tg_vp_shop_web/raw/main/images/vape1.jpg"
    },
    {
        name: "Juice Mango 30ml",
        brand: "VapeCo",
        flavor: "Манго",
        puffs: "-",
        price: 600,
        type: "juice",
        img: "images/juice1.png"
    },
    {
        name: "Snus Mint Pack",
        brand: "SnusCo",
        flavor: "Мята",
        puffs: "-",
        price: 500,
        type: "snus",
        img: "images/snus1.png"
    },
    {
        name: "Pod Recharge Pro",
        brand: "VapePro",
        flavor: "Табак",
        puffs: "Перезаряжаемая",
        price: 5000,
        type: "pod",
        img: "https://github.com/ziaz12/tg_vp_shop_web/raw/main/images/vape1.jpg"
    }
];


    const productList = document.getElementById("product-list");
    const searchInput = document.getElementById("search-input");
    const brandFilter = document.getElementById("brand-filter");
    const flavorFilter = document.getElementById("flavor-filter");
    const puffsFilter = document.getElementById("puffs-filter");
    const priceFilter = document.getElementById("price-filter");
    const typeFilter = document.getElementById("type-filter"); // новый фильтр по типу
    const filterBtn = document.getElementById("filter-btn");
    const searchBtn = document.getElementById("search-btn");
    const cartCountEl = document.getElementById("cart-count");

    // ===== РЕНДЕР ТОВАРОВ =====
    function renderProducts() {
        productList.innerHTML = "";

        const search = searchInput.value.toLowerCase();
        const brand = brandFilter.value;
        const flavor = flavorFilter.value;
        const puffs = puffsFilter.value;
        const priceMax = parseInt(priceFilter.value);
        const type = typeFilter.value; // значение фильтра типа

        products.forEach(p => {
            const matches =
                (!search || p.name.toLowerCase().includes(search)) &&
                (!brand || p.brand === brand) &&
                (!flavor || p.flavor === flavor) &&
                (!puffs || p.puffs === puffs) &&
                (!priceMax || p.price <= priceMax) &&
                (!type || p.type === type); // проверка типа товара

            if (matches) {
                const div = document.createElement("div");
                div.className = "product-card";
                div.innerHTML = `
                    <img src="${p.img}" alt="${p.name}" class="product-img">
                    <h3>${p.name}</h3>
                    <div class="price">${p.price} ₽</div>
                    <p>Количество затяжек: ${p.puffs}</p>
                    <p>Вкус: ${p.flavor}</p>
                    <p>Бренд: ${p.brand}</p>
                    <button>Добавить в корзину</button>
                    `;

                productList.appendChild(div);

                div.querySelector("button").addEventListener("click", () => {
                    const existing = cart.find(
                        item => item.name === p.name && item.puffs === p.puffs
                    );

                    if (existing) {
                        existing.qty += 1;
                    } else {
                        cart.push({ ...p, qty: 1 });
                    }

                    localStorage.setItem("cart", JSON.stringify(cart));
                    updateCartUI();
                });
            }
        });
    }

    // ===== КОРЗИНА UI =====
    function updateCartUI() {
        let count = 0;
        cart.forEach(item => count += item.qty);
        cartCountEl.innerText = count;
    }

    // ===== ОБРАБОТЧИКИ =====
    filterBtn.addEventListener("click", renderProducts);
    searchBtn.addEventListener("click", renderProducts);
    searchInput.addEventListener("keypress", e => {
        if (e.key === "Enter") renderProducts();
    });

    renderProducts();
    updateCartUI();
});
