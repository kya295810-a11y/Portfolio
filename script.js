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
    7. CERTIFICATE MODAL HANDLER
==================================================*/

if (certificateModal && certificateModalImage) {

    const openModal = (img) => {

        if (!img || !img.src) return;

        certificateModalImage.src = img.src;
        certificateModalImage.alt = img.alt || "Certificate Preview";

        certificateModal.classList.add("active");
        document.body.style.overflow = "hidden";
    };

    const closeModal = () => {

        certificateModal.classList.remove("active");
        document.body.style.overflow = "";

        setTimeout(() => {
            certificateModalImage.removeAttribute("src");
        }, 200);

    };

    certificateCards.forEach(card => {

        const img = card.querySelector(".certificate-image img");

        if (!img) return;

        card.style.cursor = "pointer";

        const openHandler = (e) => {

            // Don't open modal when Verify button is clicked
            if (e.target.closest(".verify-btn")) return;

            e.preventDefault();
            e.stopPropagation();

            openModal(img);

        };

        // Desktop
        card.addEventListener("click", openHandler);

        // Mobile (Android & iPhone)
        card.addEventListener("touchend", openHandler, {
            passive: false
        });

    });

    if (certificateClose) {
        certificateClose.addEventListener("click", (e) => {
            e.stopPropagation();
            closeModal();
        });
    }

    certificateModal.addEventListener("click", (e) => {

        if (e.target === certificateModal) {
            closeModal();
        }

    });

    document.addEventListener("keydown", (e) => {

        if (
            e.key === "Escape" &&
            certificateModal.classList.contains("active")
        ) {
            closeModal();
        }

    });

}

});
