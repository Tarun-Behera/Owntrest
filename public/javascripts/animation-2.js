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
            start: "top bottom", // Animation starts when image comes into view
            end: "top top", // Animation ends when the image reaches the top
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