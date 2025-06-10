document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-container");
  const totalPriceElement = document.getElementById("total-price");

  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    cartContainer.innerHTML = "";
    let total = 0;

    if (cartItems.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
      totalPriceElement.textContent = "0";
      return;
    }

    cartItems.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const itemEl = document.createElement("div");
      itemEl.className = "cart-item";
      itemEl.innerHTML = `
  <img src="${item.image}" alt="${item.name}" />
  <div class="item-details">
    <h4>${item.name}</h4>
    <p>Price: ₹${item.price}</p>
<div class="quantity-control">
  <button onclick="updateQuantity(${index}, -1)">-</button>
  <span>${item.quantity}</span>
  <button onclick="updateQuantity(${index}, 1)">+</button>
</div>
<p>Total: ₹${item.price * item.quantity}</p>

    <button onclick="removeItem(${index})">Remove</button>
  </div>
`;
  cartContainer.appendChild(itemEl);
    });

    totalPriceElement.textContent = total.toFixed(2);
  }

  window.removeItem = function(index) {
    cartItems.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    renderCart();
  };

  renderCart();
});
window.updateQuantity = function(index, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity += change;

  // Prevent quantity from going below 1
  if (cart[index].quantity < 1) {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
};

//cart count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const countEl = document.getElementById("cart-count");
  if (countEl) countEl.textContent = cartCount;
}

// Run it on page load
document.addEventListener("DOMContentLoaded", updateCartCount);
