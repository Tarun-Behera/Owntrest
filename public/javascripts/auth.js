// *AJAX code for Sign-up

document.querySelector("#sf").addEventListener("submit", (event) => {
  event.preventDefault();
  var formData = new FormData(event.target);
  var njson = {};
  for (const [key, value] of formData) {
    njson[key] = value;
  }

  fetch("/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(njson),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.message);
        });
      }
      return response.json();
    })
    .then((data) => {
      document.querySelector("#success_message").textContent = data.message;
      setTimeout(() => {
        document.querySelector("#success_message").textContent = "";
      }, 2800);
      logBtn.click();
      document.querySelector("#sf").reset();
    })
    .catch((error) => {
      document.querySelector("#error_message").textContent = error.message;
      setTimeout(() => {
        document.querySelector("#error_message").textContent = "";
      }, 2800);
    });
});


// *AJAX code for login
document.querySelector("#lf").addEventListener("submit", (e) => {
  e.preventDefault();
  var formData = new FormData(e.target);
  var plainObject = {};
  for (const [key, value] of formData) {
    plainObject[key] = value;
  }
  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(plainObject),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.message);
        });
      }
      return response.json();
    })
    .then((data) => {
      if (data.success) {
        // Redirect or perform some other action on successful login
        window.location.href = "/home";
        // document.querySelector("#lf").reset();
        // document.querySelector(".nav-modal").classList.add("hidden");
      }
    })
    .catch((error) => {
      console.error(error)
      document.querySelector("#lf").reset();
      document.querySelector("#errorMessage").textContent = error.message;
      setTimeout(() => {
        document.querySelector("#errorMessage").textContent = "";
      }, 1800);
    });
});
