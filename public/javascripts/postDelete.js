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
      document.querySelector('.post-result-msg').innerHTML = `<div class="deleteMessage bg-[#35090a] text-[#d98b8c] text-[20px] py-[5px] px-4 rounded-md border-2 border-[#460b0d] relative z-[999] transition-all duration-[0.3] delay-[2000] ">Deleted Successfully ! Reload to see changes</div>`;
      setTimeout(() => {
        document.querySelector('.deleteMessage').classList.add('opacity-0');
        document.querySelector('.deleteMessage').remove();
      }, 1500);
    } else {
      console.error("Failed to delete the post");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
