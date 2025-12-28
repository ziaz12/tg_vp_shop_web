document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartItemsEl = document.getElementById("cart-items");
    const totalPriceEl = document.getElementById("total-price");

    function renderCart() {
        cartItemsEl.innerHTML = "";

        cart.forEach((item, index) => {
            const div = document.createElement("div");
            div.className = "cart-item";
            div.innerHTML = `
                <img src="${item.img}" class="cart-img">
                <div class="cart-info">
                    <h3>${item.name}</h3>
                    <p>Цена: ${item.price} ₽</p>
                    <p>Количество: ${item.qty}</p>
                    <div class="qty-controls">
                        <button class="minus-btn">-</button>
                        <span>${item.qty}</span>
                        <button class="plus-btn">+</button>
                    </div>
                    <button class="remove-btn">Удалить</button>
                </div>
            `;

            // Удаление с подтверждением
            div.querySelector(".remove-btn").addEventListener("click", () => {
                if (confirm(`Вы уверены, что хотите удалить "${item.name}" из корзины?`)) {
                    cart.splice(index, 1);
                    localStorage.setItem("cart", JSON.stringify(cart));
                    renderCart();
                    updateTotal();
                    updateCartCounter();
                }
            });

            // Изменение количества
            div.querySelector(".minus-btn").addEventListener("click", () => {
                if (item.qty > 1) {
                    item.qty -= 1;
                    localStorage.setItem("cart", JSON.stringify(cart));
                    renderCart();
                    updateTotal();
                    updateCartCounter();
                }
            });
            div.querySelector(".plus-btn").addEventListener("click", () => {
                item.qty += 1;
                localStorage.setItem("cart", JSON.stringify(cart));
                renderCart();
                updateTotal();
                updateCartCounter();
            });

            cartItemsEl.appendChild(div);
        });
    }

    function updateTotal() {
        const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
        totalPriceEl.innerText = `${total} ₽`;
    }

    function updateCartCounter() {
        const countEl = document.getElementById("cart-count");
        const count = cart.reduce((sum, item) => sum + item.qty, 0);
        countEl.innerText = count;
    }

    // Инициализация
    renderCart();
    updateTotal();
    updateCartCounter();
});
