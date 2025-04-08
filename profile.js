function uploadProfilePic() {
    const input = document.getElementById("uploadPic");
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("profilePic").src = e.target.result;
            localStorage.setItem("profilePic", e.target.result);
        };
        reader.readAsDataURL(file);
    }
}

function togglePrivacy() {
    const isPrivate = document.getElementById("privacyToggle").checked;
    localStorage.setItem("isPrivate", isPrivate);
}

// Load saved data on page load
window.onload = function () {
    const pic = localStorage.getItem("profilePic");
    if (pic) document.getElementById("profilePic").src = pic;
    document.getElementById("privacyToggle").checked = localStorage.getItem("isPrivate") === "true";
};
