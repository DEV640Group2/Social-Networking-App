const mockProfiles = [
    {
      email: "alice@company.com",
      name: "Alice Smith",
      department: "Engineering",
      location: "New York",
      bio: "Frontend developer passionate about UI/UX.",
      status: "🚀 Currently shipping a new feature!",
      interests: "React, DevOps",
      avatar: "https://randomuser.me/api/portraits/women/21.jpg"
    },
    {
      email: "bob@company.com",
      name: "Bob Chen",
      department: "Marketing",
      location: "Chicago",
      bio: "Marketing lead with love for storytelling.",
      status: "📣 Running Q2 campaign",
      interests: "Content, Branding",
      avatar: "https://randomuser.me/api/portraits/men/31.jpg"
    }
  ];
  
  const queryParams = new URLSearchParams(window.location.search);
  const email = queryParams.get("email");
  const profile = mockProfiles.find(p => p.email === email);
  const friends = JSON.parse(localStorage.getItem("friends")) || [];
  const profileBox = document.getElementById("profileBox");
  
  const mockChatHistory = {
    "alice@company.com": [
      { sender: "friend", text: "Hey Alice!" },
      { sender: "user", text: "Hey! How’s the new feature coming?" },
      { sender: "friend", text: "Pretty smooth actually! 😎" }
    ],
    "bob@company.com": [
      { sender: "friend", text: "Lunch plans today?" },
      { sender: "user", text: "Sure! 12:30 works?" }
    ]
  };
  
  if (!profile) {
    profileBox.innerHTML = "<p>User not found.</p>";
  } else {
    const isFriend = friends.includes(profile.email);
  
    profileBox.innerHTML = `
      <div class="back-wrapper">
        <button class="back-button" onclick="window.location.href='directory.html'">
          ← Back
        </button>
      </div>
  
      <img src="${profile.avatar}" alt="${profile.name}" class="profile-picture" />
      <h2>${profile.name}</h2>
      <p class="subtitle">${profile.status}</p>
      <div class="profile-info">
        <p><strong>Email:</strong> ${profile.email}</p>
        <p><strong>Department:</strong> ${profile.department}</p>
        <p><strong>Location:</strong> ${profile.location}</p>
        <p><strong>Bio:</strong> ${profile.bio}</p>
        <p><strong>Interests:</strong> ${profile.interests}</p>
      </div>
  
      <div class="profile-actions">
        ${
          isFriend
            ? '<span style="color: green; font-weight: bold;">✓ Friend</span>'
            : `<button class="btn btn-inline" onclick="addFriend('${profile.email}')">Add Friend</button>`
        }
        <button class="btn btn-inline" onclick="showChatBox('${profile.email}')">Message</button>
      </div>
  
      <div class="chat-box" id="chatBox" style="display:none;">
        <h4>Chatting with ${profile.name}</h4>
        <div class="message-area" id="chatMessages"></div>
        <div class="message-input">
          <input type="text" id="chatInput" placeholder="Type a message..." />
          <button onclick="sendMockMessage()">Send</button>
        </div>
      </div>
    `;
  }
  
  function addFriend(email) {
    if (!friends.includes(email)) {
      friends.push(email);
      localStorage.setItem("friends", JSON.stringify(friends));
      alert("Friend added!");
      window.location.reload();
    }
  }
  
  function showChatBox(email) {
    const chatBox = document.getElementById("chatBox");
    const chatMessages = document.getElementById("chatMessages");
    chatBox.style.display = "block";
  
    const history = mockChatHistory[email] || [];
    chatMessages.innerHTML = "";
    history.forEach(msg => {
      const div = document.createElement("div");
      div.className = `message ${msg.sender}`;
      div.textContent = msg.text;
      chatMessages.appendChild(div);
    });
  }
  
  function sendMockMessage() {
    const input = document.getElementById("chatInput");
    const message = input.value.trim();
    if (!message) return;
  
    const div = document.createElement("div");
    div.className = "message user";
    div.textContent = message;
  
    document.getElementById("chatMessages").appendChild(div);
    input.value = "";
  }
  