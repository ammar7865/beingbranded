const firebaseConfig = {
  apiKey: "AIzaSyBJ39vavvpqOeKhFnv36L-6Uu_Z22yk9fI",
  authDomain: "being-branded.firebaseapp.com",
  projectId: "being-branded",
  storageBucket: "being-branded.firebasestorage.app",
  messagingSenderId: "1063346161762",
  appId: "1:1063346161762:web:1bdb0732c120ca8092693b"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if product already exists
    const existingProduct = cart.find(p => p.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart");
      updateCartCount(); // update count after adding
}

//cart count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const countEl = document.getElementById("cart-count");
  if (countEl) countEl.textContent = cartCount;
}

// Run it on page load
document.addEventListener("DOMContentLoaded", updateCartCount);

//FIREBASE
async function loadProducts() {
  const snapshot = await db.collection("products").get();
  const container = document.getElementById("product-list");
  container.innerHTML = "";

  snapshot.forEach((doc) => {
    const product = doc.data();

    const productHTML = `
  <div class="product-card">
    <img src="${product.image}" alt="${product.name}">
    <div class="product-info">
      <h3>${product.name}</h3>
      <p class="product-price"> &#8377;${product.price}</p>
      <button class="add-to-cart" onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
    </div>
  </div>
`;

    container.innerHTML += productHTML;
  });

  updateCartCount(); // Optional
}

document.addEventListener("DOMContentLoaded", loadProducts);


