document.querySelector("#postImg-icon").addEventListener("click", () => {
  document.querySelector("#post-img").click();
});

//# preview image and video and error handling if no file is selected
function previewFile(inputFile) {
  const fileSelected = inputFile.files[0];
  const preview = document.getElementById("preview");
  preview.innerHTML = `<span class="flex justify-center items-center w-full h-full text-center select-none">
                          Click on Plus icon <br> to select <br> Image or Video
                      </span>`;
                      
  if (fileSelected) {
    const fileType = fileSelected.type.split("/")[0];
    // Create a URL representing the file object for use in the browser
    const fileURL = URL.createObjectURL(fileSelected);

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

//# post upload functionality
document.addEventListener("DOMContentLoaded", () => {

    // Check if the success state is set in session storage
  if (sessionStorage.getItem("uploadSuccess") === "true") {
    // Display the success message
    document.querySelector('.post-result-msg').innerHTML = `<div class="successMessage border-2 border-[#0d3626] bg-[#0b3322] text-[#9ae5bf] text-[20px] py-[5px] px-4 rounded-md relative z-[999] transition-all duration-[0.9] ease-in-out" >Successfully uploaded !</div>`;

    setTimeout(() => {
      document.querySelector('.successMessage').classList.add('opacity-0');
      document.querySelector('.successMessage').remove();
    }, 1500);

    // Remove the success state from local storage
    sessionStorage.removeItem("uploadSuccess");
  }



  var form = document.getElementById("postImage-form");
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting traditionally

    var formData = new FormData(form);
    // Optionally, process formData, or directly send it using fetch/XHR
    fetch("/create-post", {
      method: "POST",
      body: formData,
    })
    .then((response) => {
      // Check if the response is not successful
      if (!response.ok) {
        return response.json().then((err) => {
          throw new Error(err.error); // Extract and throw the error message from API
        });
      }
      return response.json();
    })
      .then((data) => {
        let post = data.posts;
        if (post.postImage && post.postImage.mimeType.startsWith("image/")) {
          mediaHtml = `<img src="${post.postImage.url}" alt="Post is of ${post.title}" class="w-full h-full object-cover">`;
        } else if (post.postImage && post.postImage.mimeType.startsWith("video/")) {
          mediaHtml = `<video controls class="w-full h-full object-cover" src="${post.postImage.url}"></video>`;
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
        handleUploadSuccess();
        form.reset();
        document.querySelector(
          "#preview"
        ).innerHTML = `<span class="flex justify-center items-center w-full h-full text-center select-none">
                          Click on Plus icon <br> to select <br> Image or Video
                      </span>`;
        document.querySelector(".post-container-modal").classList.add("hidden");
      })
      .catch((error) => {
        // console.error("Error:", error.message);
        document.querySelector('.result').innerHTML = `<div class="errorMessage border-2 border-[#522529] bg-[#4a1215] text-[#f8c4c7] text-[20px] py-[5px] px-4 rounded-md relative z-[999] transition-all duration-[0.9] ease-in-out">${error.message}</div>`;
        // error for not selecting image
        setTimeout(() => {
          document.querySelector('.errorMessage').classList.add('opacity-0');
          document.querySelector('.errorMessage').remove();
        }, 1500);
      });
  });
});

// Assuming this is where you detect a successful upload
function handleUploadSuccess() {
  // Save the success state in local storage
  sessionStorage.setItem("uploadSuccess", "true");
  // Reload the page
  window.location.reload();
}


