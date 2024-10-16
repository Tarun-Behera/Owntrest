// Ensure page scrolls to the top on reload
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'; // Disable automatic scroll restoration
}

window.scrollTo(0, 0); // Scroll to the top on page reload



const lenis = new Lenis({
    duration: 4,
  });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  
  requestAnimationFrame(raf);
  gsap.registerPlugin(ScrollTrigger);
document.querySelectorAll(".item").forEach((elem) => {
    let image = elem.querySelector("img");
    let t1 = gsap.timeline();
    let xTransform = gsap.utils.random(-100, 100);
    t1.set(
      image,
      {
        transformOrigin: `${xTransform < 0 ? 0 : "100%"}`,
      },
      "start"
    );
    gsap
      .fromTo(
        image,
        { scale: 0.6 }, // Starting scale
        {
          scale: 1, // End scale
          duration: 6,
          ease: "none",
          scrollTrigger: {
            trigger: image,
            start: "top 70%", // Animation starts when image comes into view
            end: "top 30%", // Animation ends when the image reaches the top
            scrub: true, // Smoothly scrub the animation as you scroll
            onLeaveBack: () => gsap.to(image, { scale: 0.6 }), // Scale up when scrolling back up
            onEnterBack: () => gsap.to(image, {}), // Scale down when reaching the top again
          },
        },
        "start"
      )
        t1.to(
          elem,
          {
            scale: 0.5, // End scale
            duration: 4,
            ease: "none",
            scrollTrigger: {
              trigger: image,
              start: "top 8%", // Animation starts when image comes into view
              end: "top bottom", // Animation ends when the image reaches the top
              scrub: 4, // Smoothly scrub the animation as you scroll
            },
          },
        )
      t1.to(
        elem,
        {
          xPercent: xTransform,
          scrollTrigger: {
            trigger: image,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
        "start"
      );
  });