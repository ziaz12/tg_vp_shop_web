document.addEventListener("DOMContentLoaded", () => {
    // Получаем корзину из localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartItemsEl = document.getElementById("cart-items");
    const totalPriceEl = document.getElementById("total-price");

    // Функция для рендера корзины
    function renderCart() {
        cartItemsEl.innerHTML = ""; // очищаем

        if (cart.length === 0) {
            cartItemsEl.innerHTML = "<p>Ваша корзина пуста</p>";
            totalPriceEl.innerText = "0 ₽";
            return;
        }

        let total = 0;

        cart.forEach((item, index) => {
            total += item.price * item.qty;

            const div = document.createElement("div");
            div.className = "cart-item";
            div.innerHTML = `
                <img src="${item.img}" alt="${item.name}" class="cart-img">
                <div class="cart-info">
                    <h4>${item.name}</h4>
                    <p>Цена: ${item.price} ₽</p>
                    <p>Количество: 
                        <button class="decrease">-</button>
                        <span>${item.qty}</span>
                        <button class="increase">+</button>
                    </p>
                    <p>Итого: ${item.price * item.qty} ₽</p>
                </div>
            `;

            // Кнопки +
            div.querySelector(".increase").addEventListener("click", () => {
                item.qty += 1;
                saveAndRender();
            });

            // Кнопки -
            div.querySelector(".decrease").addEventListener("click", () => {
                item.qty -= 1;
                if (item.qty <= 0) {
                    cart.splice(index, 1);
                }
                saveAndRender();
            });

            cartItemsEl.appendChild(div);
        });

        totalPriceEl.innerText = `${total} ₽`;
    }

    function saveAndRender() {
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }

    // Кнопка "Оплатить" (можно добавить логику)
    document.getElementById("checkout-btn").addEventListener("click", () => {
        alert(`Вы оплатили ${totalPriceEl.innerText}`);
        cart = [];
        saveAndRender();
    });

    renderCart();
});
