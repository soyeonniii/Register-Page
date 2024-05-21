const signupForm = document.getElementById("signup-form");

signupForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");

    clearErrors();

    let hasError = false;

    if (username.value.trim() === "") {
        showError(username, "Username is required");
        hasError = true;
    } else {
        showSuccess(username);
    }

    if (email.value.trim() === "") {
        showError(email, "Email is required");
        hasError = true;
    } else if (!checkEmail(email)) {
        showError(email, "Email is not valid");
        hasError = true;
    } else {
        showSuccess(email);
    }

    if (password.value.length < 6) {
        showError(password, "Password must be at least 6 characters");
        hasError = true;
    } else {
        showSuccess(password);
    }

    if (password.value !== confirmPassword.value) {
        showError(confirmPassword, "Passwords do not match");
        hasError = true;
    } else {
        showSuccess(confirmPassword);
    }

    if (hasError === false) { 
        let userDataList = JSON.parse(localStorage.getItem("userDataList")) || [];

        const userData = {
            username: username.value,
            email: email.value,
            password: password.value
        };

        userDataList.push(userData);

        localStorage.setItem("userDataList", JSON.stringify(userDataList));

        alert("회원가입이 완료되었습니다.");
        signupForm.reset();
        clearErrors();
    }
});

function showError(input, message) {
    const errorDiv = input.parentElement.querySelector(".error-message");
    input.classList.add("invalid");
    input.classList.remove("valid");
    errorDiv.innerText = message;
}

function showSuccess(input) {
    const errorDiv = input.parentElement.querySelector(".error-message");
    input.classList.remove("invalid");
    input.classList.add("valid");
    errorDiv.innerText = "";
}

function clearErrors() {
    const inputs = document.querySelectorAll("input");
    inputs.forEach(function(input) {
        input.classList.remove("invalid","valid");
        const errorDiv = input.parentElement.querySelector(".error-message");
        if(errorDiv) errorDiv.innerText = "";
    });
}

function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(input.value).toLowerCase());
}
