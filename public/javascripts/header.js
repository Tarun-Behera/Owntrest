let logBtn = document.querySelector(".log-btn");
let signBtn = document.querySelector(".sign-btn");
let flag = 0;
let sign = 0;

/*
 * This function is used to toggle the visibility of the log container
 * @param {Event} e - The event object
 */
logBtn.addEventListener("click", (e) => {
  if (flag == 0) {
    document.querySelector(".nav-modal").classList.remove("hidden");
    document.querySelector(".log-container").classList.remove("hidden");
    document.querySelector(".sign-container").classList.add("hidden");
  }
});

/*
 * This function is used to toggle the visibility of the sign up container
 * @param {Event} e - The event object
 */
signBtn.addEventListener("click", (e) => {
  if (sign == 0) {
    document.querySelector(".nav-modal").classList.remove("hidden");
    document.querySelector(".sign-container").classList.remove("hidden");
    document.querySelector(".log-container").classList.add("hidden");
  }
});

//* When the user clicks anywhere outside of the modal, close it
window.onclick = (e) => {
  if (e.target == document.querySelector(".nav-modal")) {
    document.querySelector(".nav-modal").classList.add("hidden");
  }
};

//* fetch sign up and log in container
document.querySelector(".fetch-sign-up").addEventListener("click", function (e) {
  document.querySelector(".log-container").classList.add("hidden");
  document.querySelector(".sign-container").classList.remove("hidden");
});
document.querySelector(".fetch-log-in").addEventListener("click", function (e) {
  document.querySelector(".sign-container").classList.add("hidden");
  document.querySelector(".log-container").classList.remove("hidden");
});
window.addEventListener("beforeunload", function () {
  setTimeout(() => {
    document.querySelector(".nav-modal").classList.add("hidden");
    document.querySelector('#sf').reset();
    document.querySelector('#lf').reset();
  }, 870);
});
