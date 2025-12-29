document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartItemsEl = document.getElementById("cart-items");
    const sumEl = document.getElementById("sum");
    const discountEl = document.getElementById("discount");
    const finalEl = document.getElementById("final");
    const checkoutBtn = document.getElementById("checkout-btn");
    const discountRow = document.getElementById("discount-row");

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }

    function renderCart() {
        cartItemsEl.innerHTML = "";
        let sum = 0;

        cart.forEach((item, index) => {
            sum += item.price * item.qty;

            const div = document.createElement("div");
            div.className = "cart-item";
            div.innerHTML = `
                <img src="${item.img}" class="cart-img">
                <div class="cart-info">
                    <h3>${item.name}</h3>
                    <p>${item.price} ₽</p>

                    <div class="qty-controls">
                        <button class="minus">-</button>
                        <span>${item.qty}</span>
                        <button class="plus">+</button>
                    </div>
                </div>
                <button class="remove-btn">Удалить</button>
            `;
            cartItemsEl.appendChild(div);

            div.querySelector(".plus").onclick = () => {
                item.qty++;
                saveCart();
            };

            div.querySelector(".minus").onclick = () => {
                if (item.qty > 1) item.qty--;
                else cart.splice(index, 1);
                saveCart();
            };

            div.querySelector(".remove-btn").onclick = () => {
                cart.splice(index, 1);
                saveCart();
            };
        });

        sumEl.textContent = sum;
        calculateDiscount(sum);
    }

    async function calculateDiscount(sum) {
        if (sum === 0) {
            discountEl.textContent = 0;
            finalEl.textContent = 0;
            discountRow.style.display = "none";
            return;
        }

        try {
            const res = await fetch(`http://127.0.0.1:8000/calc?amount=${sum}`);
            const data = await res.json();

            discountEl.textContent = data.discount;
            finalEl.textContent = data.to_pay;

            discountRow.style.display = data.discount > 0 ? "block" : "none";

        } catch (err) {
            console.error("BACKEND ERROR:", err);
            discountEl.textContent = 0;
            finalEl.textContent = sum;
            discountRow.style.display = "none";
        }
    }

    checkoutBtn.onclick = () => {
        if (!cart.length) {
            alert("Корзина пустая");
            return;
        }

        alert(
            `Сумма: ${sumEl.textContent} ₽\n` +
            `Скидка: ${discountEl.textContent} ₽\n` +
            `К оплате: ${finalEl.textContent} ₽`
        );
    };

    renderCart();
});


