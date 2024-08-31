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
      if (isLiked === "true") {
        //   if liked then dislike it
        likeBtn.setAttribute("data-liked", "false");
        likeBtn.classList.add(
          "text-red-500",
          "opacity-0",
          "group-hover:opacity-100",
          "hover:text-red-500",
          "text-[rgba(225,225,225,0.7)]"
        );
        likeBtn.classList.remove("text-red-500", "opacity-100");
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
      }
    } else {
      console.error("Failed to toggle like");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
