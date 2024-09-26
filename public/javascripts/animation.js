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
  t1.set(image, {
    transformOrigin: `${xTransform < 0 ? 0 : "100%"}`,
  },"start").to(image, {
    scale:0,
    duration:6,
    ease: "none",
    scrollTrigger: {
      trigger: image,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  },"start")
  .to(elem,{
    xPercent: xTransform,
    scrollTrigger: {
        trigger: image,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
  })
});
