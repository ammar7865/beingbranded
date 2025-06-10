

// Firebase Config (same as in script.js)
const firebaseConfig = {
  apiKey: "AIzaSyBJ39vavvpqOeKhFnv36L-6Uu_Z22yk9fI",
  authDomain: "being-branded.firebaseapp.com",
  projectId: "being-branded",
  storageBucket: "being-branded.firebasestorage.app",
  messagingSenderId: "1063346161762",
  appId: "1:1063346161762:web:1bdb0732c120ca8092693b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.getElementById("orderForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = e.target.name.value.trim();
  const email = e.target.email.value.trim();
  const phone = e.target.phone.value.trim();
  const address = e.target.address.value.trim();
  const notes = e.target.notes.value.trim();
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0) * 100;

  const options = {
    key: "YOUR_LIVE_KEY_ID", // 🔁 Replace with your Razorpay Key ID
    amount: totalAmount,
    currency: "INR",
    name: "Being Branded",
    description: "Product Payment",
    handler: function (response) {
      // ✅ Payment succeeded → Save order
      const orderData = {
        customer: { name, email, phone, address, notes },
        cart: cart,
        paymentId: response.razorpay_payment_id,
        date: new Date().toISOString()
      };

      db.collection("orders")
        .add(orderData)
        .then(() => {
          localStorage.removeItem("cart");
          document.getElementById("order-success").style.display = "block";
          e.target.reset();
        })
        .catch((error) => {
          alert("Order save failed. Contact support.");
          console.error("Firebase Error:", error);
        });
    },
    prefill: {
      name: name,
      email: email,
      contact: phone
    },
    theme: {
      color: "#ff6600"
    }
  };

  const payment = new Razorpay(options);
  payment.open();
});

  
