document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartItemsEl = document.getElementById("cart-items");
    const totalPriceEl = document.getElementById("total-price");

    function renderCart() {
        cartItemsEl.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.qty;
            total += itemTotal;

            const div = document.createElement("div");
            div.className = "cart-item";
            div.innerHTML = `
                <img src="${item.img}" class="cart-img">
                <div class="cart-info">
                    <h3>${item.name}</h3>
                    <p>Цена: ${item.price} ₽</p>
                    <div class="qty-controls">
                        <button class="minus">-</button>
                        <span>${item.qty}</span>
                        <button class="plus">+</button>
                    </div>
                </div>
                <button class="remove-btn">Удалить</button>
            `;
            cartItemsEl.appendChild(div);

            // Кнопка +
            div.querySelector(".plus").addEventListener("click", () => {
                item.qty += 1;
                saveCart();
                renderCart();
            });

            // Кнопка -
            div.querySelector(".minus").addEventListener("click", () => {
                if (item.qty > 1) {
                    item.qty -= 1;
                } else {
                    if (confirm(`Вы хотите удалить "${item.name}" из корзины?`)) {
                        cart.splice(index, 1);
                    }
                }
                saveCart();
                renderCart();
            });

            // Кнопка удалить
            div.querySelector(".remove-btn").addEventListener("click", () => {
                if (confirm(`Вы хотите удалить "${item.name}" из корзины?`)) {
                    cart.splice(index, 1);
                    saveCart();
                    renderCart();
                }
            });
        });

        totalPriceEl.innerText = `${total} ₽`;
    }

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    renderCart();
});
