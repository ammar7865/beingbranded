const firebaseConfig = {
  apiKey: "AIzaSyBJ39vavvpqOeKhFnv36L-6Uu_Z22yk9fI",
  authDomain: "being-branded.firebaseapp.com",
  projectId: "being-branded",
  storageBucket: "being-branded.firebasestorage.app",
  messagingSenderId: "1063346161762",
  appId: "1:1063346161762:web:1bdb0732c120ca8092693b",
  measurementId: "G-LXBBTKBT4C"
};


firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Handle login
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "admin.html";
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
    });
});
