const postInput = document.getElementById("postInput");
const feed = document.getElementById("feed");
const friends = JSON.parse(localStorage.getItem("friends")) || [];
let posts = JSON.parse(localStorage.getItem("posts")) || [];

// Demo friend posts (runs only if empty)
if (posts.length === 0) {
  posts = [
    { author: "alice@company.com", text: "Excited to launch the new feature!", likes: 3, timestamp: "4/1/2025, 9:00 AM" },
    { author: "bob@company.com", text: "Just finished a great team sprint.", likes: 1, timestamp: "4/1/2025, 10:30 AM" }
  ];
  localStorage.setItem("posts", JSON.stringify(posts));
}

function submitPost() {
  const text = postInput.value.trim();
  if (!text) return;

  const post = {
    author: "You",
    text,
    likes: 0,
    timestamp: new Date().toLocaleString()
  };

  posts.unshift(post);
  localStorage.setItem("posts", JSON.stringify(posts));
  postInput.value = "";
  renderFeed();
}

function likePost(index) {
  posts[index].likes++;
  localStorage.setItem("posts", JSON.stringify(posts));
  renderFeed();
}

function renderFeed() {
  feed.innerHTML = "";

  posts
    .filter(p => p.author === "You" || friends.includes(p.author))
    .forEach((post, i) => {
      const card = document.createElement("div");
      card.className = "post-card";
      card.innerHTML = `
        <p><strong>${post.author}</strong> <small>(${post.timestamp})</small></p>
        <p>${post.text}</p>
        <button class="btn small-btn" onclick="likePost(${i})">❤️ Like (${post.likes})</button>
      `;
      feed.appendChild(card);
    });
}

renderFeed();
