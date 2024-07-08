const logoutBtn = $("#logout-btn");
// const loginBtn = $("#login-btn");
const loginForm = $("#login-form");
const signUpBtn = $("#signup-btn");
const userNameInput = $("#usernameInput");
const passwordInput = $("#passwordInput");

const logout = async () => {
    try {
        const res = await $.ajax({
            url: "/api/users/logout",
            method: "POST",
            contentType: "application/json",
            complete: (xhr, status) => {
                if (xhr.status === 204) {
                    window.location.replace("/");
                } else {
                    alert("Failed to log out");
                }
            }
        });
    } catch (error) {
        alert("Failed to log out");
    }
}

const login = async (event) => {
    try {
        event.preventDefault();

        const username = userNameInput.val();
        const password = passwordInput.val();
        console.log("FRONT-END");
        console.log("userName :>>", username);
        console.log("password :>>", password);
        const res = await $.ajax({
            url: "/api/users/login",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ username, password })
        });
        userNameInput.val("");
        passwordInput.val("");

        if (res) window.location.replace("/");
    } catch (error) {
        alert("failed to log in");
    }
}

logoutBtn.on("click", logout);
loginForm.on("submit", login);
