// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBJ39vavvpqOeKhFnv36L-6Uu_Z22yk9fI",
  authDomain: "being-branded.firebaseapp.com",
  projectId: "being-branded",
  storageBucket: "being-branded.firebasestorage.app",
  messagingSenderId: "1063346161762",
  appId: "1:1063346161762:web:1bdb0732c120ca8092693b",
  measurementId: "G-LXBBTKBT4C"
};

firebase.initializeApp(firebaseConfig)
const auth = firebase.auth();
const db = firebase.firestore();

// Protect admin.html
auth.onAuthStateChanged(user => {
  if (!user) {
    alert("Access denied. Please login.");
    window.location.href = "login.html";
  }
});

// Add product
document.getElementById("productForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const price = parseFloat(document.getElementById("price").value);
  const image = document.getElementById("image").value;
  const description = document.getElementById("description").value;

  db.collection("products").add({
    name,
    price,
    image,
    description
  }).then(() => {
    alert("Product added!");
    e.target.reset();
    loadProducts();
  });
});


// Load products
function loadProducts() {
  const list = document.getElementById("productList");
  list.innerHTML = "";

  db.collection("products").get().then(snapshot => {
    snapshot.forEach(doc => {
      const data = doc.data();
      const div = document.createElement("div");
      div.innerHTML = `
        <h3>${data.name}</h3>
        <img src="${data.image}" style="width: 200px; height: 150px; object-fit: cover;">
        <p>₹${data.price}</p>
        <p>${data.description}</p>
        <button onclick="deleteProduct('${doc.id}')">Delete</button>
        <hr>
      `;
      list.appendChild(div);
    });
  });
}

function deleteProduct(id) {
  db.collection("products").doc(id).delete().then(() => {
    alert("Product deleted!");
    loadProducts();
  });
}

loadProducts();

function logout() {
  firebase.auth().signOut().then(() => {
    window.location.href = "login.html";
  });
}
