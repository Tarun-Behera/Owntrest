const msgCtr = document.querySelector(".messageContainer");
async function toggleLike(likeBtn, event) {
  event.stopPropagation();
  const postId = likeBtn.getAttribute("data-post-id");
  const isLiked = likeBtn.getAttribute("data-liked");
  try {
    const response = await fetch(`/toggle-like-post/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // dislike it
      if (isLiked === "true") {
        likeBtn.setAttribute("data-liked", "false");
        likeBtn.classList.add(
          "text-red-500",
          "opacity-0",
          "group-hover:opacity-100",
          "hover:text-red-500",
          "text-[rgba(225,225,225,0.7)]"
        );
        likeBtn.classList.remove("text-red-500", "opacity-100");
        msgCtr.innerHTML = `<div class="unlikedMessage absolute transition-all ease-out duration-[500ms] bottom-[-50px] left-[50%] translate-x-[-50%]  bg-red-500 rounded-md px-4 py-1 z-[999]">Unliked</div>`;
        msgCtr.classList.remove("hidden");
         // Trigger the animation by changing the bottom position
         setTimeout(() => {
          document.querySelector(".unlikedMessage").classList.add("bottom-[50px]");
        }, 10);

        // After the first animation ends, start fading out the message
        setTimeout(() => {
          document.querySelector(".unlikedMessage").classList.add("opacity-0");
        }, 1000);

        // Finally, remove the message from the DOM
        setTimeout(() => {
          document.querySelector(".unlikedMessage").remove();
        }, 2000);
        console.log("Removed from My Likes folder");
      } else {
        // like it
        likeBtn.setAttribute("data-liked", "true");
        likeBtn.classList.remove(
          "text-[rgba(225,225,225,0.7)]",
          "opacity-0",
          "group-hover:opacity-100",
          "hover:text-red-500"
        );
        likeBtn.classList.add("text-red-500", "opacity-100");
        msgCtr.innerHTML = `<div class="likedMessage absolute bottom-[-50px] left-[50%] translate-x-[-50%] transition-all duration-[500ms] ease-out bg-red-500 rounded-md px-4 py-1 z-[999]">liked</div>`;
        msgCtr.classList.remove("hidden");

        // Trigger the animation by changing the bottom position
        setTimeout(() => {
          document.querySelector(".likedMessage").classList.add("bottom-[50px]");
        }, 10);

        // After the first animation ends, start fading out the message
        setTimeout(() => {
          document.querySelector(".likedMessage").classList.add("opacity-0");
        }, 1000);
        console.log("Added to My Likes folder");

        // Finally, remove the message from the DOM
        setTimeout(() => {
          document.querySelector(".likedMessage").remove();
        }, 2000);
      }
    } else {
      console.error("Failed to toggle like");
    }
  } catch (error) {
    // console.error("Error:", error);
  }
}
