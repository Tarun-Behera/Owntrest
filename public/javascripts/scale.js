// # function to close the scale div
window.onclick = (e) => {
  if (
    e.target == document.querySelector(".scale-posts-modal") ||
    e.target == document.querySelector(".post-close") ||
    e.target == document.querySelector(".ri-close-large-line")
  ) {
    document.querySelector(".scale-posts-modal").classList.add("hidden");
    document.querySelector(".post-media-container").innerHTML = "";
    document.querySelector("body").classList.remove("overflow-hidden");
  }
};

// # function to pass the arguments to another scale div
var pass_post_arg = (event) => {
  var postMedia = event.currentTarget.querySelector(".card-media");
  var title = event.currentTarget.querySelector(".card-title");
  var description = event.currentTarget.querySelector(".card-description");
  var prfImg = event.currentTarget.querySelector(".user-prfImg");
  var userName = event.currentTarget.querySelector(".user-prfName");
  var postMediaContainer = document.querySelector(".post-media-container");
  var postTitle = document.querySelector(".post-title");
  var postDescription = document.querySelector(".post-description");
  var prfPic = document.querySelector(".prf-pic");
  var prfName = document.querySelector(".prf-name");
  postMediaContainer.innerHTML = "";
  if(postMedia.tagName.toLowerCase() === "img"){
    postMediaContainer.innerHTML = `<img class="post-media-vd rounded-[20px] w-full h-full object-cover" src="${postMedia.src}" alt="${postMedia.alt}" />`;
    postTitle.textContent = title.textContent;
    postDescription.textContent = description.textContent;
    prfPic.src = prfImg.src;
    prfName.textContent = userName.textContent;
  }
  else if(postMedia.tagName.toLowerCase() === "video"){
    postMediaContainer.innerHTML = `<video controls class="post-media-vd rounded-[20px] w-full h-full object-cover" src="${postMedia.src} "></video>`;
    postTitle.textContent = title.textContent;
    postDescription.textContent = description.textContent;
    prfPic.src = prfImg.src;
    prfName.textContent = userName.textContent;
  }
  else{
    postMediaContainer.innerHTML = `<p>Invalid media</p>`
  }
};

// # function for scale up div
var scale = () => {
  document.querySelectorAll(".card").forEach((card) =>
    card.addEventListener("click", (e) => {
      document.querySelector(".scale-posts-modal").classList.remove("hidden");
      document.querySelector("body").classList.add("overflow-hidden"); 
      pass_post_arg(e);
    })
  );
};
scale();

