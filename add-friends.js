const mockUsers = [
    "alice@company.com",
    "bob@company.com",
    "carol@company.com",
    "dave@company.com"
];

let friends = JSON.parse(localStorage.getItem("friends")) || [];

function searchUsers() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const results = mockUsers.filter(u => u.includes(query) && !friends.includes(u));
    const resultsDiv = document.getElementById("searchResults");
    resultsDiv.innerHTML = "";

    results.forEach(user => {
        const div = document.createElement("div");
        div.innerHTML = `
            <div class="search-result">
                <span>${user}</span>
                <button class="add-btn" onclick="addFriend('${user}')">➕ Add Friend</button>
            </div>
        `;
        resultsDiv.appendChild(div);
    });
}

function addFriend(user) {
    friends.push(user);
    localStorage.setItem("friends", JSON.stringify(friends));
    updateFriendsList();
    document.getElementById("searchResults").innerHTML = "Friend request sent!";
}

function updateFriendsList() {
    const list = document.getElementById("friendsList");
    list.innerHTML = "";
    friends.forEach(friend => {
        const li = document.createElement("li");
        li.innerHTML = `<span>👤</span> <span>${friend}</span>`;
        list.appendChild(li);
    });
}

updateFriendsList();
