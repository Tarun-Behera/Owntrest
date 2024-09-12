const msgCtr = document.querySelector(".messageContainer");
async function toggleLike(likeBtn, event) {
  event.stopPropagation();
  const postId = likeBtn.getAttribute("data-post-id");
  const isLiked = likeBtn.getAttribute("data-liked");
  const postLikeBtn = document.querySelector(`.likeBtn[data-post-id='${postId}']`);
  const sclLikeBtn = document.querySelector(`.sclTgleLike[data-post-id='${postId}']`);
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
        if (postLikeBtn) {
          postLikeBtn.setAttribute("data-liked", "false");
          postLikeBtn.classList.add(
            "text-red-500",
            "opacity-0",
            "group-hover:opacity-100",
            "hover:text-red-500",
            "text-[rgba(225,225,225,0.7)]"
          );
          postLikeBtn.classList.remove("text-red-500", "opacity-100");
        }
        if (sclLikeBtn) {
          sclLikeBtn.setAttribute("data-liked", "false");
          sclLikeBtn.classList.add("text-[rgba(225,225,225,0.7)]");
          sclLikeBtn.classList.remove("text-red-500", "opacity-100");
        }
        msgCtr.innerHTML = `<div class="unlikedMessage absolute transition-all ease-out duration-[500ms] bottom-[-50px] left-[50%] translate-x-[-50%] bg-[#2b2b2b] rounded-[10px] p-4 z-[99999]">Removed from My Likes</div>`;
        msgCtr.classList.remove("hidden");
        // Trigger the animation by changing the bottom position
        setTimeout(() => {
          document.querySelector(".unlikedMessage").classList.add("bottom-[50px]");
        }, 10);

        // After the first animation ends, start fading out the message
        setTimeout(() => {
          document.querySelector(".unlikedMessage").classList.add("opacity-0");
        }, 1500);

        // Finally, remove the message from the DOM
        setTimeout(() => {
          document.querySelector(".unlikedMessage").remove();
        }, 1650);
        // console.log("Removed from My Likes folder");
      } else {
        // like it
        if (postLikeBtn) {
          postLikeBtn.setAttribute("data-liked", "true");
          postLikeBtn.classList.remove(
            "text-[rgba(225,225,225,0.7)]",
            "opacity-0",
            "group-hover:opacity-100",
            "hover:text-red-500"
          );
          postLikeBtn.classList.add("text-red-500", "opacity-100");
        }
        if (sclLikeBtn) {
          sclLikeBtn.setAttribute("data-liked", "true");
          sclLikeBtn.classList.remove(
            "text-[rgba(225,225,225,0.7)]",
            "opacity-0",
            "group-hover:opacity-100",
            "hover:text-red-500"
          );
          sclLikeBtn.classList.add("text-red-500", "opacity-100");
        }
        msgCtr.innerHTML = `<div class="likedMessage absolute bottom-[-50px] left-[50%] translate-x-[-50%] transition-all duration-[500ms] ease-out bg-[#2b2b2b] rounded-[10px] p-4 z-[99999]"><i class="ri-heart-3-fill text-red-500 mx-2"></i>Added to My Likes</div>`;
        msgCtr.classList.remove("hidden");

        // Trigger the animation by changing the bottom position
        setTimeout(() => {
          document.querySelector(".likedMessage").classList.add("bottom-[70px]");
        }, 10);

        // After the first animation ends, start fading out the message
        setTimeout(() => {
          document.querySelector(".likedMessage").classList.add("opacity-0");
        }, 1500);
        // console.log("Added to My Likes folder");

        // Finally, remove the message from the DOM
        setTimeout(() => {
          document.querySelector(".likedMessage").remove();
        }, 1650);
      }
    } else {
      // console.error("Failed to toggle like");
    }
  } catch (error) {
    // console.error("Error:", error);
  }
}
