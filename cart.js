document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartItemsEl = document.getElementById("cart-items");
    const totalPriceEl = document.getElementById("total-price");

    function renderCart() {
        cartItemsEl.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price * item.qty;

            const div = document.createElement("div");
            div.className = "cart-item";
            div.innerHTML = `
                <img src="${item.img}" class="cart-img">
                <div class="cart-info">
                    <h3>${item.name}</h3>
                    <p>Бренд: ${item.brand}</p>
                    <p>Вкус: ${item.flavor}</p>
                    <p>Затяжки: ${item.puffs}</p>
                    <p>Цена: ${item.price} ₽</p>
                    <div class="qty-controls">
                        <button class="decrease">−</button>
                        <span class="qty">${item.qty}</span>
                        <button class="increase">+</button>
                    </div>
                </div>
            `;

            const decreaseBtn = div.querySelector(".decrease");
            const increaseBtn = div.querySelector(".increase");
            const qtyEl = div.querySelector(".qty");

            decreaseBtn.addEventListener("click", () => {
                if (item.qty > 1) {
                    item.qty -= 1;
                } else {
                    cart.splice(index, 1); // удаляем если 0
                }
                saveAndRender();
            });

            increaseBtn.addEventListener("click", () => {
                item.qty += 1;
                saveAndRender();
            });

            cartItemsEl.appendChild(div);
        });

        totalPriceEl.innerText = total + " ₽";
    }

    function saveAndRender() {
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }

    document.getElementById("checkout-btn").addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Корзина пуста!");
            return;
        }
        alert("Оплата пока не реализована 😎");
    });

    renderCart();
});
