document.addEventListener("DOMContentLoaded", () => {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartItemsEl = document.getElementById("cart-items");
    const totalPriceEl = document.getElementById("total-price");
    const discountEl = document.getElementById("cart-discount");
    const finalEl = document.getElementById("cart-final");
    const checkoutBtn = document.getElementById("checkout-btn");

    /* ===== СОХРАНЕНИЕ ===== */
    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    /* ===== СКИДКИ ===== */
    function calculateDiscount(subtotal) {
        let discount = 0;
        let text = "";

        if (subtotal >= 10000) {
            discount = Math.floor(subtotal * 0.15);
            text = "15%";
        } else if (subtotal >= 7500) {
            discount = 1800;
            text = "−1800 ₽";
        } else if (subtotal >= 5000) {
            discount = 1000;
            text = "−1000 ₽";
        } else if (subtotal >= 3000) {
            discount = 500;
            text = "−500 ₽";
        } else if (subtotal >= 2000) {
            discount = 200;
            text = "−200 ₽";
        }

        return { discount, text };
    }

    /* ===== ОТРИСОВКА ===== */
    function renderCart() {
        cartItemsEl.innerHTML = "";
        let subtotal = 0;

        if (cart.length === 0) {
            cartItemsEl.innerHTML = "<p>Корзина пуста</p>";
            totalPriceEl.innerText = "0 ₽";
            discountEl.innerText = "";
            finalEl.innerText = "";
            checkoutBtn.disabled = true;
            return;
        }

        checkoutBtn.disabled = false;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.qty;
            subtotal += itemTotal;

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

            /* + */
            div.querySelector(".plus").onclick = () => {
                item.qty++;
                saveCart();
                renderCart();
            };

            /* - */
            div.querySelector(".minus").onclick = () => {
                if (item.qty > 1) {
                    item.qty--;
                } else if (confirm(`Удалить "${item.name}" из корзины?`)) {
                    cart.splice(index, 1);
                }
                saveCart();
                renderCart();
            };

            /* удалить */
            div.querySelector(".remove-btn").onclick = () => {
                if (confirm(`Удалить "${item.name}" из корзины?`)) {
                    cart.splice(index, 1);
                    saveCart();
                    renderCart();
                }
            };
        });

        /* ===== ИТОГ ===== */
        const { discount, text } = calculateDiscount(subtotal);
        const finalTotal = subtotal - discount;

        totalPriceEl.innerText = `${subtotal} ₽`;

        if (discount > 0) {
            discountEl.innerText = `Скидка: ${text}`;
            finalEl.innerText = `Итого к оплате: ${finalTotal} ₽`;
        } else {
            discountEl.innerText = "";
            finalEl.innerText = `Итого к оплате: ${subtotal} ₽`;
        }
    }

    /* ===== ОПЛАТА (ПОКА ЗАГЛУШКА) ===== */
    checkoutBtn.onclick = () => {
        alert("Дальше будет оплата через CryptoCloud 💳");
        // тут позже будет запрос на сервер
    };

    renderCart();
});
