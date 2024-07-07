const logoutBtn = $("#logout-btn");

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

logoutBtn.on("click", logout);