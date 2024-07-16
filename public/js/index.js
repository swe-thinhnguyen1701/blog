const logoutBtn = $("#logout-btn");
const signUpBtn = $("#signup-btn");
const newPostBtn = $("#add-new-post-btn");
const deletePostBtn = $("#delete-post-btn");
const loginForm = $("#login-form");
const postForm = $("#post-form");
const signupForm = $("#signup-form");
const commentForm = $("#comment-form")
const editForm = $("#edit-form");
const userNameInput = $("#usernameInput");
const passwordInput = $("#passwordInput");

const logout = async () => {
    try {
        const res = await $.ajax({
            url: "/api/users/logout",
            method: "POST",
            contentType: "application/json",
            complete: (xhr, status) => {
                if (xhr.status === 204)
                    window.location.replace("/");
            }, error: xhr => {
                alert(xhr.responseJSON.message)
            }
        });
    } catch (error) {
        console.log("Failed to log out");
    }
}

const login = async (event) => {
    try {
        event.preventDefault();

        const username = userNameInput.val();
        const password = passwordInput.val();
        await $.ajax({
            url: "/api/users/login",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ username, password }),
            success: res => {
                if (res) window.location.replace("/");
            }, error: xhr => {
                alert(xhr.responseJSON.message);
                console.log(xhr);
            }
        });
        userNameInput.val("");
        passwordInput.val("");

    } catch (error) {
        console.log("failed to log in");
    }
}

const newPostHandler = async (event) => {
    try {
        event.preventDefault();

        const title = $("#new-post-title").val();
        const content = $("#new-post-content").val();
        const res = await $.ajax({
            url: "/api/users/dashboard",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ title, content })
        });

        $("#new-post-title").val("");
        $("#new-post-content").val("");

        if (res) window.location.replace("/dashboard");
    } catch (error) {
        alert("failed to create a new post");
    }
}

const commentHandler = async (event) => {
    event.preventDefault();
    const poster_id = commentForm.data("postId");
    const content = $("#comment-input").val();
    const res = await $.ajax({
        url: "/api/users/comment",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({ content, poster_id })
    });
    if (res) window.location.replace(`/post/${poster_id}`);

}

const editPostHandler = async (event) => {
    try {
        event.preventDefault();

        const postId = editForm.data("postId");
        const title = $("#new-post-title").val();
        const content = $("#new-post-content").val();
        const res = await $.ajax({
            url: `/api/users/dashboard/post/${postId}`,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify({ title, content })
        });

        if (res) window.location.replace("/dashboard");
    } catch (error) {

    }
}

const signupHandler = async (event) => {
    try {
        event.preventDefault();

        const username = userNameInput.val();
        const password = passwordInput.val();
        const res = await $.ajax({
            url: "/api/users/signup",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ username, password }),
            success: res => {
                if (res) window.location.replace("/");
            }, error: xhr => {
                console.log(xhr);
                alert(xhr.responseJSON.message);
            }, complete: () => {
                userNameInput.val("");
                passwordInput.val("");  
            }
        });


        if (res) window.location.replace("/");
    } catch (error) {
        console.log("Sign Up Failed!");
    }
}

const deletePostHandler = async () => {
    try {
        const postId = editForm.data("postId");
        const res = await $.ajax({
            url: `/api/users/dashboard/post/${postId}`,
            method: "DELETE",
            contentType: "application/json"
        });

        if (res) window.location.replace("/dashboard");
    } catch (error) {
        alert("Fail to delete");
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
newPostBtn.on("click", showNewPost);
deletePostBtn.on("click", deletePostHandler);
loginForm.on("submit", login);
postForm.on("submit", newPostHandler);
signupForm.on("submit", signupHandler);
editForm.on("submit", editPostHandler);
commentForm.on("submit", commentHandler);