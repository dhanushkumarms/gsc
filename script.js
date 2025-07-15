// ✅ Replace with your actual Firebase project config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// 👤 Login Function
function login() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, pass)
    .then(() => {
      document.getElementById("authStatus").innerText = "✅ Logged in!";
      showMainApp();
    })
    .catch(err => {
      document.getElementById("authStatus").innerText = err.message;
    });
}

// ✍️ Sign Up Function
function signup() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, pass)
    .then(() => {
      document.getElementById("authStatus").innerText = "✅ Account created!";
      showMainApp();
    })
    .catch(err => {
      document.getElementById("authStatus").innerText = err.message;
    });
}

// 📦 Switch to Main App
function showMainApp() {
  document.getElementById("authSection").style.display = "none";
  document.getElementById("mainApp").style.display = "block";
}

// 📤 Submit Data to Flask Backend
function submitForm() {
  const template = document.querySelector('input[name="template"]:checked')?.value;
  const file = document.getElementById("excelFile").files[0];

  if (!template || !file) {
    alert("Please select a template and upload a file.");
    return;
  }

  const formData = new FormData();
  formData.append("template_index", template);
  formData.append("file", file);

  fetch("https://your-flask-api-url.com/index", {
    method: "POST",
    body: formData
  })
    .then(res => res.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      const fileName = file.name.endsWith('.csv') && file.size < 30000 ? 'certificate.pdf' : 'certificates.zip';
      document.getElementById("downloadLink").innerHTML = `
        <a href="${url}" download="${fileName}" class="text-blue-700 underline">⬇ Download Generated File</a>
      `;
    })
    .catch(err => {
      alert("Error: " + err.message);
    });
}
