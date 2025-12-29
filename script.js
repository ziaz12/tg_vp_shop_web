document.addEventListener("DOMContentLoaded", () => {

    /* ================= CART ================= */
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function updateCartUI() {
        const count = cart.reduce((sum, i) => sum + i.qty, 0);
        cartCountEl.textContent = count;
    }

    /* ================= PRODUCTS ================= */
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
            img: "https://github.com/ziaz12/tg_vp_shop_web/raw/main/images/vape1.jpg"
        },
        {
            name: "Snus Mint Pack",
            brand: "SnusCo",
            flavor: "Мята",
            puffs: "-",
            price: 500,
            type: "snus",
            img: "https://github.com/ziaz12/tg_vp_shop_web/raw/main/images/vape1.jpg"
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

    /* ================= DOM ================= */
    const productList = document.getElementById("product-list");
    const searchInput = document.getElementById("search-input");
    const brandFilter = document.getElementById("brand-filter");
    const flavorFilter = document.getElementById("flavor-filter");
    const puffsFilter = document.getElementById("puffs-filter");
    const priceFilter = document.getElementById("price-filter");
    const typeFilter = document.getElementById("type-filter");
    const sortFilter = document.getElementById("sort-filter");

    const filterBtn = document.getElementById("filter-btn");
    const searchBtn = document.getElementById("search-btn");

    const cartCountEl = document.getElementById("cart-count");
    const cartButton = document.getElementById("cart-button");

    /* ================= RENDER ================= */
    function renderProducts() {
        productList.innerHTML = "";

        const search = searchInput.value.toLowerCase();
        const brand = brandFilter.value;
        const flavor = flavorFilter.value;
        const puffs = puffsFilter.value;
        const priceMax = parseInt(priceFilter.value);
        const type = typeFilter.value;

        let filtered = products.filter(p =>
            (!search || p.name.toLowerCase().includes(search)) &&
            (!brand || p.brand === brand) &&
            (!flavor || p.flavor === flavor) &&
            (!puffs || p.puffs === puffs) &&
            (!priceMax || p.price <= priceMax) &&
            (!type || p.type === type)
        );

        /* ===== SORT ===== */
        if (sortFilter.value === "price-asc") {
            filtered.sort((a, b) => a.price - b.price);
        }
        if (sortFilter.value === "price-desc") {
            filtered.sort((a, b) => b.price - a.price);
        }

        filtered.forEach(p => {
            const div = document.createElement("div");
            div.className = "product-card";
            div.innerHTML = `
                <img src="${p.img}" class="product-img">
                <h3>${p.name}</h3>
                <div class="price">${p.price} ₽</div>
                <p>Затяжки: ${p.puffs}</p>
                <p>Вкус: ${p.flavor}</p>
                <p>Бренд: ${p.brand}</p>
                <div class="cart-action"></div>
            `;
            productList.appendChild(div);

            const cartAction = div.querySelector(".cart-action");

            function updateButton() {
                const item = cart.find(i => i.name === p.name);

                if (item) {
                    cartAction.innerHTML = `
                        <div class="qty-controls">
                            <button class="minus">-</button>
                            <span>${item.qty}</span>
                            <button class="plus">+</button>
                        </div>
                    `;

                    cartAction.querySelector(".plus").onclick = () => {
                        item.qty++;
                        saveCart();
                        updateButton();
                        updateCartUI();
                    };

                    cartAction.querySelector(".minus").onclick = () => {
                        if (item.qty > 1) item.qty--;
                        else cart = cart.filter(i => i.name !== p.name);

                        saveCart();
                        updateButton();
                        updateCartUI();
                    };
                } else {
                    cartAction.innerHTML = `<button class="add-btn">Добавить в корзину</button>`;
                    cartAction.querySelector(".add-btn").onclick = () => {
                        cart.push({ ...p, qty: 1 });
                        saveCart();
                        updateButton();
                        updateCartUI();
                    };
                }
            }

            updateButton();
        });
    }

    /* ================= EVENTS ================= */
    filterBtn.onclick = renderProducts;
    searchBtn.onclick = renderProducts;
    sortFilter.onchange = renderProducts;

    searchInput.addEventListener("keydown", e => {
        if (e.key === "Enter") renderProducts();
    });

    cartButton.onclick = () => {
        window.location.href = "cart.html";
    };

    /* ================= SCROLL TOP ================= */
    const scrollBtn = document.getElementById("scrollTopBtn");
    let lastScroll = window.scrollY;
    let isAutoScroll = false;

    window.addEventListener("scroll", () => {
        if (isAutoScroll) return;

        const current = window.scrollY;

        if (current < lastScroll && current > 100) {
            scrollBtn.style.display = "block";
        }

        if (current > lastScroll) {
            scrollBtn.style.display = "none";
        }

        lastScroll = current;
    });

    scrollBtn.addEventListener("click", () => {
        isAutoScroll = true;
        scrollBtn.style.display = "none";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        setTimeout(() => {
            isAutoScroll = false;
        }, 600);
    });

    /* ================= START ================= */
    renderProducts();
    updateCartUI();
});
