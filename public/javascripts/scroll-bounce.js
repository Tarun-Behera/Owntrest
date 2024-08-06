// script.js
document.addEventListener('DOMContentLoaded', () => {

    // Scroll to top on page reload
 if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
    
    const scrollArrow = document.querySelector('.scrollArrow');
    
    function checkScrollable() {
        if (document.body.scrollHeight > window.innerHeight) {66666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            scrollArrow.classList.remove('hidden','fade-out');
        } else {
            scrollArrow.classList.add('fade-out');
        }
    }
    
    function hideArrowOnScroll() {
        scrollArrow.classList.add('fade-out');
        window.removeEventListener('scroll', hideArrowOnScroll);
    }

    function handleScroll() {
        if (window.scrollY === 0) {
            scrollArrow.classList.remove('fade-out');
        } else {
            hideArrowOnScroll();
        }
    }

    window.addEventListener('resize', checkScrollable);
    window.addEventListener('scroll', handleScroll);
    checkScrollable();
   
});

