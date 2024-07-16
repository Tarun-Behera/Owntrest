document.querySelector("#postImg-icon").addEventListener("click", () => {
  document.querySelector("#post-img").click();
});

//# preview image and video
function previewFile(inputFile) {
  const file = inputFile.files[0];
  const preview = document.getElementById("preview");
  preview.innerHTML = `<span class="flex justify-center items-center w-full h-full text-center select-none">
                          Click on Plus icon <br> to select <br> Image or Video
                      </span>`;
  if (file) {
    const fileType = file.type.split("/")[0];
    // Create a URL representing the file object for use in the browser
    const fileURL = URL.createObjectURL(file);

    // Check if the file is an image
    if (fileType === "image") {
      // Create an <img> element
      preview.innerHTML = `<img class="w-full h-full object-cover" src="${fileURL}" alt="uploads" >`;
    }
    // Check if the file is a video
    else if (fileType === "video") {
      // Create a <video> element
      preview.innerHTML = `<video class="h-full w-full object-cover" src="${fileURL}"  controls unmuted></video>`;
    } else {
      // Display a message for unsupported file types
      preview.innerHTML = "<p>Unsupported file type.</p>";
    }
  }
}
///

var form = document.getElementById("postImage-form");
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the form from submitting traditionally

  var formData = new FormData(form);
  // Optionally, process formData, or directly send it using fetch/XHR
  fetch("/create-post", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      let post = data.posts;
      if (post.postImage && post.postImage.mimeType.startsWith('image/')) {
        mediaHtml = `<img src="/posts/${post.postImage.filename}" alt="Post is of ${post.title}" class="w-full h-full object-cover">`;
      } else if (post.postImage && post.postImage.mimeType.startsWith('video/')) {
        mediaHtml = `<video controls class="w-full h-full object-cover" src="/posts/${post.postImage.filename}"></video>`;
      } else {
        mediaHtml = `<p>Unsupported file type.</p>`;
      }
      document.querySelector(
        ".show-post-container"
      ).innerHTML += `<div class="group show-post" id="post-${post._id}">
             <div class=" bg-[#3c3c3c] w-[200px] h-[175px] rounded-xl overflow-hidden relative">
                    <div id="delete"
                        class="bg-red-100 absolute top-0 right-0 m-2 scale-[1.2] rounded-[8px] z-[1] hidden group-hover:block"
                        onclick="delete_post(${post._id})">
                        <i class="ri-delete-bin-7-fill text-black p-[2px] hover:text-red-500"></i>
                    </div>
                         ${mediaHtml}
                    </div>
             <h3 class="text-base text-slate-200 my-1 ">${post.title}</h3>
          </div>`;
      ///
      document.querySelector("#post-length").innerHTML =
        (parseInt(document.querySelector("#post-length").innerHTML) + 1).toString() + " pins";
      window.location.reload();
      // document.querySelector(".noUploads").classList.add("hidden");
      document.querySelector(".p-img").src = "/posts/" + post.postImage.filename;
      //   document.getElementById("result").textContent = 'Submission successful!';
      form.reset();
      document.querySelector(
        "#preview"
      ).innerHTML = `<span class="flex justify-center items-center w-full h-full text-center select-none">
                          Click on Plus icon <br> to select <br> Image or Video
                      </span>`;
      document.querySelector(".post-container-modal").classList.add("hidden");
    })
    .catch((error) => {
      console.error("Error:", error);
      //   document.getElementById("result").textContent = 'An error occurred';
    });
});
