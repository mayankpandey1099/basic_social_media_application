document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "http://localhost:3000"; // Update with your API URL

  const postForm = document.getElementById("postForm");
  const postsContainer = document.getElementById("posts");

  const createPost = async (imageUrl, description) => {
    try {
      const response = await fetch(`${apiUrl}/api/create-post`, {
        method: "POST",
        body: JSON.stringify({ link: imageUrl, description: description }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Successfully created post");
        return true;
      }else{
        console.log("error creating the post");
        return false;
      }
    } catch (error) {
      console.log("Error while creating the post", error);
      return false;
    }
  };

  const deletePost = async (postId) => {
    try {
      const response = await fetch(`${apiUrl}/api/create-post/${postId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchPosts();
      } else {
        alert("Error deleting the post");
      }
    } catch (error) {
      console.log("Error deleting the post", error);
    }
  };

  const addComment = async (postId) => {
    const commentInput = document.getElementById(`commentInput${postId}`);
    const commentText = commentInput.value;

    if (!commentText) {
      alert("Please enter a comment before submitting.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/create-post/${postId}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          commentText: commentText,
        }),
      });

      if (response.ok) {
        commentInput.value = "";
        fetchPosts();
      } else {
        console.log("Error adding the comment");
      }
    } catch (error) {
      console.log("Error adding the comment", error);
    }
  };

  postsContainer.addEventListener("click", (event) => {
    const target = event.target;
    if (target.tagName === "BUTTON" && target.textContent === "Delete") {
      const postId = target.getAttribute("data-post-id");
      deletePost(postId);
    } else if (target.tagName === "BUTTON" && target.textContent === "Send") {
      const postId = target.getAttribute("data-post-id");
      addComment(postId);
    }
  });

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/create-post`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();

        if (Array.isArray(data.posts)) {
          const posts = data.posts;
          postsContainer.innerHTML = "";

          posts.forEach((post) => {
            const postElement = document.createElement("div");
            postElement.classList.add("post");
            postElement.innerHTML = `
              <div>
                <img src="${post.link}" alt="${post.description}">
                <p>${post.description}</p>
                <button class="deleteB" data-post-id="${
                  post.id
                }">Delete</button>
                <div class="comment-input">
                <input type="text" class="commentbox" id="commentInput${
                  post.id
                }" placeholder="Enter your comment">
                <button class="comment-button" data-post-id="${
                  post.id
                }">Send</button>
                </div>
                
                <div id="comments${post.id}">
                  ${post.Comments.map(
                    (comment) => `
                    <span class="comment-user">Anonymous:</span>
                    <p>
                      <span class="comment-text">${comment.text}</span>   
                    </p>`
                  ).join("")}
                </div>
              </div>
            `;
            postsContainer.appendChild(postElement);
          });
        } else {
          console.log("Error fetching the posts");
        }
      } else {
        console.log("Error fetching the posts");
      }
    } catch (error) {
      console.log("Error fetching posts", error);
    }
  };

  postForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const imageUrlInput = document.getElementById("imageUrlInput");
    const descriptionInput = document.getElementById("descriptionInput");

    const imageUrl = imageUrlInput.value;
    const description = descriptionInput.value;

    if (imageUrl && description) {
      const created = await createPost(imageUrl, description);

      if (created) {
        postForm.reset();
        fetchPosts();
      } else {
        console.log("Error while posting the image");
      }
    } else {
      alert("Please provide both an image URL and description.");
    }
  });

  fetchPosts();
});
