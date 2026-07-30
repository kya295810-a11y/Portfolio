/*==================================================
    PORTFOLIO SCRIPT
==================================================*/

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /*==================================================
        1. DOM CACHE
    ==================================================*/
    const body = document.body;
    const navbar = document.querySelector(".navbar");
    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("section[id]");
    const scrollProgress = document.querySelector(".scroll-progress");
    const backToTopBtn = document.querySelector(".back-to-top");
    const mouseGlow = document.querySelector(".mouse-glow");
    const revealElements = document.querySelectorAll(".reveal");

    // Certificate Modal Elements
    const certificateModal = document.getElementById("certificateModal");
    const certificateModalImage = document.getElementById("certificateModalImage");
    const certificateClose = document.querySelector(".certificate-close");
    const certificateCards = document.querySelectorAll(".certificate-card");

    /*==================================================
        2. HELPER FUNCTIONS & DEBOUNCE
    ==================================================*/
    const debounce = (callback, delay = 100) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => callback.apply(this, args), delay);
        };
    };

    /*==================================================
        3. NAVIGATION & MOBILE MENU
    ==================================================*/
    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            const icon = menuBtn.querySelector("i");
            if (icon) {
                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-xmark");
            }
        });

        // Close mobile menu on link click
        navItems.forEach(item => {
            item.addEventListener("click", () => {
                if (navLinks.classList.contains("active")) {
                    navLinks.classList.remove("active");
                    const icon = menuBtn.querySelector("i");
                    if (icon) {
                        icon.classList.add("fa-bars");
                        icon.classList.remove("fa-xmark");
                    }
                }
            });
        });
    }

    /*==================================================
        4. SCROLL & PROGRESS INDICATOR
    ==================================================*/
    const handleScroll = () => {
        const scrollY = window.scrollY;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

        // Navbar blur state
        if (navbar) {
            if (scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        }

        // Scroll Progress Bar
        if (scrollProgress && totalHeight > 0) {
            const progress = (scrollY / totalHeight) * 100;
            scrollProgress.style.width = `${progress}%`;
        }

        // Back to Top button visibility
        if (backToTopBtn) {
            if (scrollY > 300) {
                backToTopBtn.classList.add("active");
            } else {
                backToTopBtn.classList.remove("active");
            }
        }

        // Active Navigation Highlight
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute("id");

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navItems.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    };

    window.addEventListener("scroll", handleScroll);

    // Back to top action
    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    /*==================================================
        5. MOUSE GLOW EFFECT (Desktop Only)
    ==================================================*/
    if (mouseGlow && window.innerWidth > 768) {
        window.addEventListener("mousemove", (e) => {
            mouseGlow.style.left = `${e.clientX}px`;
            mouseGlow.style.top = `${e.clientY}px`;
        });
    }

    /*==================================================
        6. SCROLL REVEAL ANIMATIONS
    ==================================================*/
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < triggerBottom) {
                element.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Trigger initial check

    /*==================================================
    7. CERTIFICATE MODAL HANDLER (Improved)
   ==================================================*/

if (certificateModal && certificateModalImage) {

    let modalOpen = false;
    let isScrolling = false;
    let scrollTimeout;

    /*------------------------------------------
        Detect scrolling (Mobile)
    ------------------------------------------*/
    window.addEventListener("scroll", () => {

        isScrolling = true;

        clearTimeout(scrollTimeout);

        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 150);

    }, { passive: true });

    /*------------------------------------------
        Open Modal
    ------------------------------------------*/
    const openModal = (img) => {

        if (!img || !img.src) return;
        if (modalOpen) return;

        modalOpen = true;

        certificateModalImage.src = img.src;
        certificateModalImage.alt = img.alt || "Certificate Preview";

        certificateModal.classList.add("active");

        body.style.overflow = "hidden";

    };

    /*------------------------------------------
        Close Modal
    ------------------------------------------*/
    const closeModal = () => {

        if (!modalOpen) return;

        modalOpen = false;

        certificateModal.classList.remove("active");

        body.style.overflow = "";

        setTimeout(() => {

            certificateModalImage.removeAttribute("src");

        }, 250);

    };

    /*------------------------------------------
        Card Click
    ------------------------------------------*/
    certificateCards.forEach(card => {

        const img = card.querySelector(".certificate-image img");

        if (!img) return;

        card.style.cursor = "pointer";

        card.addEventListener("click", (e) => {

            // Ignore Verify button
            if (e.target.closest(".verify-btn")) return;

            // Ignore while scrolling
            if (isScrolling) return;

            e.preventDefault();
            e.stopPropagation();

            openModal(img);

        });

    });

    /*------------------------------------------
        Close Button
    ------------------------------------------*/
    if (certificateClose) {

        certificateClose.addEventListener("click", (e) => {

            e.preventDefault();
            e.stopPropagation();

            closeModal();

        });

    }

    /*------------------------------------------
        Click Outside
    ------------------------------------------*/
    certificateModal.addEventListener("click", (e) => {

        if (e.target === certificateModal) {

            closeModal();

        }

    });

    /*------------------------------------------
        ESC Key
    ------------------------------------------*/
    document.addEventListener("keydown", (e) => {

        if (
            e.key === "Escape" &&
            modalOpen
        ) {

            closeModal();

        }

    });

    /*------------------------------------------
        Prevent Image Drag
    ------------------------------------------*/
    certificateModalImage.addEventListener("dragstart", (e) => {

        e.preventDefault();

    });

}

});
