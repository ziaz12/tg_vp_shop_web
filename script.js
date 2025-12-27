document.addEventListener("DOMContentLoaded", () => {
    // ===== СБРОС СТАРОЙ КОРЗИНЫ И БАЛАНСА =====
    localStorage.removeItem("cart");
    localStorage.removeItem("user-balance");

    // ===== ИНИЦИАЛИЗАЦИЯ =====
    let cart = [];
    let userBalance = 5000; // начальный баланс пользователя
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("user-balance", userBalance);

    // ===== ТОВАРЫ =====
    const products = [
        {name: "Vape Juice Strawberry", brand: "VapeCo", flavor: "Клубника", puffs: "500", price: 1200},
        {name: "Vape Device X1", brand: "VapeTech", flavor: "Мята", puffs: "800", price: 3500},
        {name: "Vape Device X1", brand: "VapeTech", flavor: "Мята", puffs: "1200", price: 4000},
        {name: "Vape Device X1", brand: "VapeTech", flavor: "Мята", puffs: "1300", price: 4200}
    ];

    const productList = document.getElementById("product-list");
    const searchInput = document.getElementById("search-input");
    const brandFilter = document.getElementById("brand-filter");
    const flavorFilter = document.getElementById("flavor-filter");
    const puffsFilter = document.getElementById("puffs-filter");
    const priceFilter = document.getElementById("price-filter");
    const filterBtn = document.getElementById("filter-btn");
    const searchBtn = document.getElementById("search-btn");
    const cartCountEl = document.getElementById("cart-count");
    const userBalanceEl = document.getElementById("user-balance");

    userBalanceEl.innerText = userBalance + " ₽";

    // ===== ФУНКЦИЯ РЕНДЕРА ТОВАРОВ =====
    function renderProducts() {
        productList.innerHTML = "";

        const search = searchInput.value.toLowerCase();
        const brand = brandFilter.value;
        const flavor = flavorFilter.value;
        const puffs = puffsFilter.value;
        const priceMax = parseInt(priceFilter.value);

        products.forEach(p => {
            const matches =
                (!search || p.name.toLowerCase().includes(search)) &&
                (!brand || p.brand === brand) &&
                (!flavor || p.flavor === flavor) &&
                (!puffs || p.puffs === puffs) &&
                (!priceMax || p.price <= priceMax);

            if(matches){
                const div = document.createElement("div");
                div.className = "product-card";
                div.innerHTML = `
                    <h3>${p.name}</h3>
                    <p>Количество затяжек: ${p.puffs}</p>
                    <p>Вкус: ${p.flavor}</p>
                    <p>Бренд: ${p.brand}</p>
                    <p>Цена: ${p.price} ₽</p>
                    <button>Купить</button>
                `;
                productList.appendChild(div);

                // ===== КНОПКА КУПИТЬ =====
                div.querySelector("button").addEventListener("click", () => {
                    if(userBalance >= p.price){
                        userBalance -= p.price;
                        userBalanceEl.innerText = userBalance + " ₽";

                        const existing = cart.find(item => item.name === p.name && item.puffs === p.puffs);
                        if(existing){
                            existing.qty += 1;
                        } else {
                            cart.push({...p, qty: 1});
                        }

                        localStorage.setItem("cart", JSON.stringify(cart));
                        updateCartUI();
                    } else {
                        alert("Недостаточно средств!");
                    }
                });
            }
        });
    }

    // ===== ОБНОВЛЕНИЕ UI КОРЗИНЫ =====
    function updateCartUI(){
        let count = 0;
        cart.forEach(item => count += item.qty);
        cartCountEl.innerText = count;
    }

    // ===== ОБРАБОТЧИКИ =====
    filterBtn.addEventListener("click", renderProducts);
    searchBtn.addEventListener("click", renderProducts);
    searchInput.addEventListener("keypress", (e) => { if(e.key === "Enter") renderProducts(); });

    // ===== НАЧАЛЬНЫЙ РЕНДЕР =====
    renderProducts();
    updateCartUI();
});
