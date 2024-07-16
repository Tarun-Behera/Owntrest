//# delete operation
async function delete_post(postId) {
  try {
    const response = await fetch(`/posts/${postId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      // window.location.reload();
      // alert("This post will be deleted permanently !")
      document.getElementById(`post-${postId}`).remove();
    } else {
      console.error("Failed to delete the post");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
