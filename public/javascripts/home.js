//# duration of the video
document.querySelectorAll(".card-media-container").forEach(container => {
  const video = container.querySelector("video");
  const durationElement = container.querySelector(".duration");

  if (video && durationElement) {
      video.addEventListener("loadedmetadata", () => {
          const duration = video.duration;
          const minutes = Math.floor(duration / 60);
          const seconds = Math.floor(duration % 60);
          const formattedDuration = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
          durationElement.textContent = formattedDuration;
      });
  }
});

