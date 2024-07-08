const logoutBtn = $("#logout-btn");
const signUpBtn = $("#sign-up-btn");

const logout = async () => {
    const res = await $.ajax({
        url: "/api/users/loggout",
        method: "POST",
        contentType: "application/json"
    });

    if(res) {
        window.location.replace("/");
    }else{
        alert("Failed to log out");
    }
}

const signUp = async () => {

}

logoutBtn.on("click", logout);
