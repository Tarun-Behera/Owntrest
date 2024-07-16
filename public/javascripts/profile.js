

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
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    let img = data.profileImage;
    document.querySelector(".prfImg").src = "/prf-img/" + img ;
    window.location.reload()
  })
  .catch(error => {
    console.error('There was a problem with your fetch operation:', error);
  });
});



document.querySelector(".p-card").addEventListener("click", () => {
  document.querySelector(".show-card-modal").classList.remove("hidden");
});

document.querySelector(".createPost").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".post-container-modal").classList.remove("hidden");
});
window.onclick = (e) => {
  if (
    e.target == document.querySelector(".post-container-modal") ||
    e.target == document.querySelector(".show-card-modal")
  ) {
    document.querySelector(".post-container-modal").classList.add("hidden");
    document.querySelector(".show-card-modal").classList.add("hidden");
  }
};
