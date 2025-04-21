function generatePassword() {
    let length = document.getElementById("length").value;
    let use_digits = document.getElementById("digits").checked;
    let use_special_chars = document.getElementById("special").checked;
    let min_digits = document.getElementById("minDigits").checked;
    let min_special = document.getElementById("minSpecials").checked;

    fetch('/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ length, use_digits, use_special_chars, min_digits, min_special })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("password").innerText = data.password;
        checkStrength(data.password);
    });
}

function copyToClipboard() {
    let passwordText = document.getElementById("password").innerText;
    if (!passwordText) return;

    navigator.clipboard.writeText(passwordText).then(() => {
        let copyBtn = document.getElementById("copyBtn");
        copyBtn.innerText = "Copied!";
        setTimeout(() => copyBtn.innerText = "Copy", 1500);
    });
}

function checkStrength(password) {
    let strengthBar = document.getElementById("strengthBar");
    let strengthText = document.getElementById("strengthText");

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[@#$%^&*()_+!]/.test(password)) strength++;

    let colors = ["red", "orange", "yellow", "green", "darkgreen"];
    let texts = ["Weak 😞", "Okay 😐", "Moderate 🙂", "Strong 💪", "Very Strong 🔥"];

    strengthBar.style.width = (strength * 20) + "%";
    strengthBar.style.backgroundColor = colors[strength - 1];
    strengthText.innerText = texts[strength - 1];
}

function checkCustomPassword() {
    let customPassword = document.getElementById("customPassword").value;
    checkStrength(customPassword);
}