const posts = [
  {
    name: "Rose Padilla",
    time: "7h • 🌐",
    avatar: "https://randomuser.me/api/portraits/women/66.jpg",
    text: "just chilling",
    image: "https://picsum.photos/400/300?random=1"
  },
  {
    name: "Leo Marshall",
    time: "4h • 📍 Office",
    avatar: "https://randomuser.me/api/portraits/men/34.jpg",
    text: "Team meeting went great! Big shoutout to everyone who contributed 👏",
    image: "https://picsum.photos/400/300?random=2"
  },
  {
    name: "Jasmine Tan",
    time: "2h • ☕ Break Time",
    avatar: "https://randomuser.me/api/portraits/women/30.jpg",
    text: "Coffee and code — the perfect pair 💻☕",
    image: "https://picsum.photos/400/300?random=3"
  }
];

function renderPosts() {
  const container = document.getElementById("postsContainer");
  container.innerHTML = "";

  posts.forEach(post => {
    const card = document.createElement("div");
    card.className = "post-card";
    card.innerHTML = `
      <div class="post-header">
        <img class="avatar" src="${post.avatar}" />
        <div>
          <strong>${post.name}</strong><br/>
          <small>${post.time}</small>
        </div>
      </div>
      <p class="post-text">${post.text}</p>
      ${post.image ? `<img class="post-image" src="${post.image}" alt="Post image" />` : ""}
    `;
    container.appendChild(card);
  });
}

function openModal() {
  document.getElementById("postModal").classList.add("show");
}

function closeModal() {
  document.getElementById("postModal").classList.remove("show");
  document.getElementById("newPostText").value = "";
}

function showBirthdays() {
  document.getElementById("birthdayModal").classList.add("show");
}

function closeBirthdays() {
  document.getElementById("birthdayModal").classList.remove("show");
}

function createPost() {
  const text = document.getElementById("newPostText").value.trim();
  if (!text) return;

  posts.unshift({
    name: "You",
    time: "Just now • 🌐",
    avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
    text,
    image: null
  });

  closeModal();
  renderPosts();
}

window.onload = renderPosts;
