const logoutBtn = $("#logout-btn");
const signUpBtn = $("#signup-btn");
const newPostBtn = $("#add-new-post-btn");
const loginForm = $("#login-form");
const postForm = $("#post-form");
const signupForm = $("#signup-form");
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

const newPostHandler = async (event) => {
    try{
        event.preventDefault();

        const title = $("#new-post-title").val();
        const content = $("#new-post-content").val();
        const res = await $.ajax({
            url: "/api/users/dashboard",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ title, content})
        });

        $("#new-post-title").val("");
        $("#new-post-content").val("");

        if(res) window.location.replace("/dashboard");
    }catch(error){
        alert("failed to create a new post");
    }
}

const signupHandler = async (event) => {
    try{
        event.preventDefault();
        
        const username = userNameInput.val();
        const password = passwordInput.val();
        const res = await $.ajax({
            url: "/api/users/signup",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ username, password})
        });
        userNameInput.val("");
        passwordInput.val("");

        if(res) window.location.replace("/");
    }catch(error){
        alert("Sign Up Failed!");
    }
}

const showNewPost = () => {
    if (postForm.is(":hidden")) {
        postForm.show();
        newPostBtn.text("Close");
    } else {
        postForm.hide();
        newPostBtn.text("+ New Post");
    }
}

logoutBtn.on("click", logout);
loginForm.on("submit", login);
postForm.on("submit", newPostHandler);
signupForm.on("submit", signupHandler);
newPostBtn.on("click", showNewPost);
