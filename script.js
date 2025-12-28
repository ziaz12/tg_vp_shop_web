document.addEventListener("DOMContentLoaded", () => {
    // ===== КОРЗИНА (БЕЗ ОЧИСТКИ) =====
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // ===== ТОВАРЫ =====
    const products = [
        {
            name: "Vape Strawberry 500",
            brand: "VapeCo",
            flavor: "Клубника",
            puffs: "500",
            price: 1200,
            type: "vape",
            img: "https://github.com/ziaz12/tg_vp_shop_web/raw/main/images/vape1.jpg"
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
            img: "https://github.com/ziaz12/tg_vp_shop_web/raw/main/images/juice1.jpg"
        },
        {
            name: "Snus Mint Pack",
            brand: "SnusCo",
            flavor: "Мята",
            puffs: "-",
            price: 500,
            type: "snus",
            img: "https://github.com/ziaz12/tg_vp_shop_web/raw/main/images/snus1.jpg"
        },
        {
            name: "Pod Recharge Pro",
            brand: "VapePro",
            flavor: "Табак",
            puffs: "Перезаряжаемая",
            price: 5000,
            type: "pod",
            img: "https://github.com/ziaz12/tg_vp_shop_web/raw/main/images/pod1.jpg"
        }
    ];

    // ===== ЭЛЕМЕНТЫ =====
    const productList = document.getElementById("product-list");
    const searchInput = document.getElementById("search-input");
    const brandFilter = document.getElementById("brand-filter");
    const flavorFilter = document.getElementById("flavor-filter");
    const puffsFilter = document.getElementById("puffs-filter");
    const priceFilter = document.getElementById("price-filter");
    const typeFilter = document.getElementById("type-filter");
    const filterBtn = document.getElementById("filter-btn");
    const searchBtn = document.getElementById("search-btn");
    const cartCountEl = document.getElementById("cart-count");

    // ===== РЕНДЕР =====
    function renderProducts() {
        productList.innerHTML = "";

        const search = searchInput.value.toLowerCase();
        const brand = brandFilter.value;
        const flavor = flavorFilter.value;
        const puffs = puffsFilter.value;
        const priceMax = parseInt(priceFilter.value);
        const type = typeFilter.value;

        products.forEach(p => {
            const matches =
                (!search || p.name.toLowerCase().includes(search)) &&
                (!brand || p.brand === brand) &&
                (!flavor || p.flavor === flavor) &&
                (!puffs || p.puffs === puffs) &&
                (!priceMax || p.price <= priceMax) &&
                (!type || p.type === type);

            if (!matches) return;

            const div = document.createElement("div");
            div.className = "product-card";
            div.innerHTML = `
                <img src="${p.img}?v=${Date.now()}" class="product-img">
                <h3>${p.name}</h3>
                <div class="price">${p.price} ₽</div>
                <p>Затяжки: ${p.puffs}</p>
                <p>Вкус: ${p.flavor}</p>
                <p>Бренд: ${p.brand}</p>
                <button>Добавить в корзину</button>
            `;

            div.querySelector("button").addEventListener("click", () => {
                const item = cart.find(i => i.name === p.name);

                if (item) {
                    item.qty += 1;
                } else {
                    cart.push({ ...p, qty: 1 });
                }

                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartUI();
            });

            productList.appendChild(div);
        });
    }

    // ===== СЧЁТЧИК КОРЗИНЫ =====
    function updateCartUI() {
        const count = cart.reduce((sum, i) => sum + i.qty, 0);
        cartCountEl.innerText = count;
    }

    // ===== ОБРАБОТЧИКИ =====
    filterBtn.addEventListener("click", renderProducts);
    searchBtn.addEventListener("click", renderProducts);
    searchInput.addEventListener("keydown", e => {
        if (e.key === "Enter") renderProducts();
    });

    // ===== СТАРТ =====
    renderProducts();
    updateCartUI();
});
