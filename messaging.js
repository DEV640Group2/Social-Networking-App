// 🧪 Inject test data for demo (runs once)
if (!localStorage.getItem("messages")) {
    const samplePrivateMessages = {
        "alice@company.com": [
            { from: "You", text: "Hi Alice!", timestamp: "4/1/2025, 10:00 AM" },
            { from: "alice@company.com", text: "Hey! How are you?", timestamp: "4/1/2025, 10:02 AM" }
        ],
        "bob@company.com": [
            { from: "You", text: "Morning Bob!", timestamp: "4/1/2025, 9:30 AM" },
            { from: "bob@company.com", text: "Morning! Ready for the meeting?", timestamp: "4/1/2025, 9:31 AM" }
        ]
    };
    localStorage.setItem("messages", JSON.stringify(samplePrivateMessages));
}

if (!localStorage.getItem("groupMessages")) {
    const sampleGroupMessages = [
        {
            from: "You",
            to: ["alice@company.com", "bob@company.com"],
            text: "Hey team, let's sync up later today.",
            timestamp: "4/1/2025, 11:00 AM"
        },
        {
            from: "carol@company.com",
            to: ["You", "bob@company.com"],
            text: "Sounds good!",
            timestamp: "4/1/2025, 11:05 AM"
        }
    ];
    localStorage.setItem("groupMessages", JSON.stringify(sampleGroupMessages));
}

if (!localStorage.getItem("friends")) {
    const mockFriends = ["alice@company.com", "bob@company.com", "carol@company.com"];
    localStorage.setItem("friends", JSON.stringify(mockFriends));
}

// 🔧 Core logic starts here
const chatType = document.getElementById("chatType");
const privateFriendSelectGroup = document.getElementById("privateFriendSelectGroup");
const friendSelect = document.getElementById("friendSelect");
const chatHistory = document.getElementById("chatHistory");
const selectionHint = document.getElementById("selectionHint");

const friends = JSON.parse(localStorage.getItem("friends")) || [];
let messages = JSON.parse(localStorage.getItem("messages")) || {};
let groupMessages = JSON.parse(localStorage.getItem("groupMessages")) || [];

function switchChatMode() {
    const isGroup = chatType.value === "group";

    // Toggle multi-select and hint
    friendSelect.multiple = isGroup;
    selectionHint.style.display = isGroup ? "block" : "none";

    if (isGroup) {
        loadGroupMessages();
    } else {
        loadMessages();
    }
}

function loadFriends() {
    friendSelect.innerHTML = "";
    friends.forEach(friend => {
        const option = document.createElement("option");
        option.value = friend;
        option.textContent = friend;
        friendSelect.appendChild(option);
    });

    loadMessages(); // Load initial private chat
}

function sendMessage() {
    const text = document.getElementById("messageInput").value.trim();
    if (!text) return;

    const timestamp = new Date().toLocaleString();

    if (chatType.value === "private") {
        const friend = friendSelect.value;
        if (!messages[friend]) messages[friend] = [];
        messages[friend].push({ from: "You", text, timestamp });
        localStorage.setItem("messages", JSON.stringify(messages));
        loadMessages();
    } else {
        const selectedFriends = Array.from(friendSelect.selectedOptions).map(opt => opt.value);
        if (selectedFriends.length === 0) return;

        groupMessages.push({ from: "You", to: selectedFriends, text, timestamp });
        localStorage.setItem("groupMessages", JSON.stringify(groupMessages));
        loadGroupMessages();
    }

    document.getElementById("messageInput").value = "";
}

function toggleChatHistory() {
    const list = document.getElementById("chatHistory");
    list.style.display = list.style.display === "none" ? "block" : "none";
}


function loadMessages() {
    const friend = friendSelect.value;
    chatHistory.innerHTML = "";
    (messages[friend] || []).forEach(msg => {
        const li = document.createElement("li");
        li.textContent = `[${msg.timestamp}] ${msg.from}: ${msg.text}`;
        chatHistory.appendChild(li);
    });
}

function loadGroupMessages() {
    chatHistory.innerHTML = "";
    groupMessages.forEach(msg => {
        const recipients = msg.to ? `To [${msg.to.join(", ")}]` : "";
        const li = document.createElement("li");
        li.textContent = `[${msg.timestamp}] ${msg.from} ${recipients}: ${msg.text}`;
        chatHistory.appendChild(li);
    });
}

// Event Listeners
chatType.addEventListener("change", switchChatMode);

friendSelect.addEventListener("change", () => {
    if (chatType.value === "private") {
        loadMessages();
    }
});

// Initialize on page load
loadFriends();
switchChatMode();
