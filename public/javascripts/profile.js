document.querySelector("#prfImg-icon").addEventListener("click", () => {
  document.querySelector("#prfImg-form input").click();
});

//# profile image part
document.querySelector("#prfImg-form input").addEventListener("change", () => {
  const formElement = document.getElementById("prfImg-form");
  const formData = new FormData(formElement);

  fetch("/profile-image", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      let img = data.profileImage;
      document.querySelector(".prfImg").src = img;
      window.location.reload();
    })
    .catch((error) => {
      // console.error("There was a problem with your fetch operation:", error);
    });
});
///

// # cards of contains
document.querySelectorAll(".p-card").forEach((p) => {
  p.addEventListener("click", (event) => {
    if (event.currentTarget === document.querySelector(".liked-post-container")) {
      document.querySelector(".show-like-card-modal").classList.remove("hidden");
      document.querySelector(".profile-main").classList.add("fixed");
    } else {
      document.querySelector(".show-card-modal").classList.remove("hidden");
      document.querySelector(".profile-main").classList.add("fixed");
    }
  });
});
///

document.querySelector(".createPost").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".post-container-modal").classList.remove("hidden");
  document.querySelector("body").classList.add("fixed");
});
window.onclick = (e) => {
  if (
    e.target == document.querySelector(".post-container-modal") ||
    e.target == document.querySelector(".post-container-close") ||
    e.target == document.querySelector(".show-card-modal") ||
    e.target == document.querySelector(".show-like-card-modal") ||
    e.target == document.querySelector(".show-post-container-close") ||
    e.target == document.querySelector(".show-like-post-container-close")
  ) {
    document.querySelector(".show-card-modal").classList.add("hidden");
    document.querySelector(".show-like-card-modal").classList.add("hidden");
    document.querySelector(".post-container-modal").classList.add("hidden");
    document.querySelector(".profile-main").classList.remove("fixed");
    document.querySelector("body").classList.remove("fixed");
  }
};
