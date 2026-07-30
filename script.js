/*==================================================
    PORTFOLIO SCRIPT
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    /*==================================================
        1. DOM CACHE
    ==================================================*/

    const body = document.body;
    const html = document.documentElement;

    // Navigation
    const navbar = document.querySelector(".navbar");
    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links a");

    // Sections
    const sections = document.querySelectorAll("section[id]");

    // Hero
    const hero = document.querySelector(".hero");
    const heroGrid = document.querySelector(".hero-grid");
    const heroContent = document.querySelector(".hero-content");
    const heroImage = document.querySelector(".hero-image");
    const imageBox = document.querySelector(".image-box");
    const heroButtons = document.querySelector(".hero-buttons");

    // About
    const about = document.querySelector(".about");
    const toolsTrack = document.querySelector(".tools-track");

    // Projects
    const projects = document.querySelector(".projects");
    const featuredProject = document.querySelector(".featured-project");
    const detailCards = document.querySelectorAll(".detail-card");

    // Certificates
    const certificateCards = document.querySelectorAll(".certificate-card");
    const verifyButtons = document.querySelectorAll(".verify-btn");
    const certificateModal = document.querySelector(".certificate-modal");
    const certificateModalImage = document.querySelector(".certificate-modal img");
    const certificateClose = document.querySelector(".certificate-close");

    // Contact
    const contactCards = document.querySelectorAll(".contact-card");
    const socials = document.querySelectorAll(".socials a");

    // Reveal Elements
    const revealElements = document.querySelectorAll(".reveal");

    /*==================================================
        2. GLOBAL SETTINGS
    ==================================================*/

    const MOBILE_BREAKPOINT = 768;
    const NAVBAR_HEIGHT = 82;

    let ticking = false;
    let lastScrollY = window.scrollY;

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    /*==================================================
        3. HELPER FUNCTIONS
    ==================================================*/

    const isMobile = () => window.innerWidth <= MOBILE_BREAKPOINT;

    const clamp = (value, min, max) =>
        Math.min(Math.max(value, min), max);

    const debounce = (callback, delay = 150) => {
        let timeout;

        return (...args) => {
            clearTimeout(timeout);

            timeout = setTimeout(() => {
                callback(...args);
            }, delay);
        };
    };

    const rafThrottle = (callback) => {

        return (...args) => {

            if (ticking) return;

            ticking = true;

            requestAnimationFrame(() => {

                callback(...args);

                ticking = false;

            });

        };

    };

    /*==================================================
        4. NAVBAR
    ==================================================*/

    const updateNavbar = () => {

        if (!navbar) return;

        if (window.scrollY > 30) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    };

    /*==================================================
        5. MOBILE MENU
    ==================================================*/

    const openMenu = () => {

        if (!menuBtn || !navLinks) return;

        navLinks.classList.add("active");

        menuBtn.setAttribute("aria-expanded", "true");

        body.style.overflow = "hidden";

    };

    const closeMenu = () => {

        if (!menuBtn || !navLinks) return;

        navLinks.classList.remove("active");

        menuBtn.setAttribute("aria-expanded", "false");

        body.style.overflow = "";

    };

    const toggleMenu = () => {

        if (!navLinks) return;

        if (navLinks.classList.contains("active")) {
            closeMenu();
        } else {
            openMenu();
        }

    };

    if (menuBtn) {

        menuBtn.setAttribute("aria-label", "Toggle Navigation");

        menuBtn.setAttribute("aria-expanded", "false");

        menuBtn.addEventListener("click", toggleMenu);

    }

    navItems.forEach(link => {

        link.addEventListener("click", () => {

            if (isMobile()) {
                closeMenu();
            }

        });

    });

    /*==================================================
        6. SMOOTH SCROLL
    ==================================================*/

    navItems.forEach(link => {

        link.addEventListener("click", (event) => {

            const href = link.getAttribute("href");

            if (!href || !href.startsWith("#")) return;

            const target = document.querySelector(href);

            if (!target) return;

            event.preventDefault();

            const targetPosition =
                target.offsetTop - NAVBAR_HEIGHT;

            window.scrollTo({
                top: targetPosition,
                behavior: prefersReducedMotion
                    ? "auto"
                    : "smooth"
            });

        });

    });

    const scrollToTop = () => {

        window.scrollTo({

            top: 0,

            behavior: prefersReducedMotion
                ? "auto"
                : "smooth"

        });

    };

    /*==================================================
        7. ACTIVE NAVIGATION
    ==================================================*/

    const updateActiveNav = () => {

        const scrollPosition =
            window.scrollY + NAVBAR_HEIGHT + 80;

        sections.forEach(section => {

            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute("id");

            if (
                scrollPosition >= top &&
                scrollPosition < top + height
            ) {

                navItems.forEach(link => {

                    link.classList.remove("active");

                    if (
                        link.getAttribute("href") === `#${id}`
                    ) {

                        link.classList.add("active");

                    }

                });

            }

        });

    };

    /*==================================================
        8. REVEAL ANIMATIONS
    ==================================================*/

    const revealObserver = new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("active");

                observer.unobserve(entry.target);

            });

        },

        {
            root: null,
            threshold: 0.15,
            rootMargin: "0px 0px -80px 0px"
        }

    );

    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

    const detailCardObserver = new IntersectionObserver(

        (entries, observer) => {

            entries.forEach((entry, index) => {

                if (!entry.isIntersecting) return;

                setTimeout(() => {

                    entry.target.classList.add("active");

                }, index * 120);

                observer.unobserve(entry.target);

            });

        },

        {
            threshold: 0.15
        }

    );

    detailCards.forEach(card => {

        detailCardObserver.observe(card);

    });

    const certificateObserver = new IntersectionObserver(

        (entries, observer) => {

            entries.forEach((entry, index) => {

                if (!entry.isIntersecting) return;

                setTimeout(() => {

                    entry.target.classList.add("active");

                }, index * 100);

                observer.unobserve(entry.target);

            });

        },

        {
            threshold: 0.12
        }

    );

    certificateCards.forEach(card => {

        certificateObserver.observe(card);

    });

    if (heroContent) {

        heroContent.classList.add("fade-up");

    }

    const liveLine = document.querySelector(".live-line");

    if (liveLine) {

        const lineObserver = new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    liveLine.style.transform = "scaleX(1)";

                });

            },

            {
                threshold: 0.3
            }

        );

        lineObserver.observe(liveLine);

    }

    /*==================================================
        9. HERO PARALLAX
    ==================================================*/

    if (imageBox && !prefersReducedMotion && !isMobile()) {

        const handleHeroParallax = rafThrottle((event) => {

            const rect = imageBox.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const rotateY = ((x / rect.width) - 0.5) * 12;
            const rotateX = ((y / rect.height) - 0.5) * -12;

            imageBox.style.transform = `
                perspective(1200px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-8px)
            `;

        });

        imageBox.addEventListener("mousemove", handleHeroParallax);

        imageBox.addEventListener("mouseleave", () => {

            imageBox.style.transform = `
                perspective(1200px)
                rotateX(0deg)
                rotateY(0deg)
                translateY(0)
            `;

        });

    }

    if (toolsTrack) {

        const toolsBox = toolsTrack.closest(".tools-box");

        if (toolsBox) {

            toolsBox.addEventListener("mouseenter", () => {

                toolsTrack.style.animationPlayState = "paused";

            });

            toolsBox.addEventListener("mouseleave", () => {

                toolsTrack.style.animationPlayState = "running";

            });

        }

    }

    /*==================================================
        10. CERTIFICATE MODAL
    ==================================================*/

    const openCertificateModal = (imageSrc, imageAlt = "Certificate") => {

        if (!certificateModal || !certificateModalImage) return;

        certificateModalImage.src = imageSrc;
        certificateModalImage.alt = imageAlt;

        certificateModal.classList.add("active");

        body.style.overflow = "hidden";

        certificateClose?.focus();

    };

    const closeCertificateModal = () => {

        if (!certificateModal || !certificateModalImage) return;

        certificateModal.classList.remove("active");

        body.style.overflow = "";

        setTimeout(() => {

            certificateModalImage.src = "";
            certificateModalImage.alt = "";

        }, 300);

    };

    certificateCards.forEach(card => {

        const image = card.querySelector(".certificate-image img");

        if (!image) return;

        image.style.cursor = "zoom-in";

        image.addEventListener("click", () => {

            openCertificateModal(

                image.src,

                image.alt

            );

        });

    });

    verifyButtons.forEach(button => {

        button.addEventListener("click", event => {

            const href = button.getAttribute("href");

            if (!href || href === "#") {

                event.preventDefault();

            }

        });

    });

    certificateClose?.addEventListener(

        "click",

        closeCertificateModal

    );

    certificateModal?.addEventListener(

        "click",

        event => {

            if (

                event.target === certificateModal

            ) {

                closeCertificateModal();

            }

        }

    );

    certificateModalImage?.addEventListener(

        "click",

        event => {

            event.stopPropagation();

        }

    );

    /*==================================================
        11. CONTACT UTILITIES
    ==================================================*/

    const externalLinks = document.querySelectorAll(
        'a[target="_blank"]'
    );

    externalLinks.forEach(link => {

        if (!link.hasAttribute("rel")) {

            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );

        }

    });

    contactCards.forEach(card => {

        const link = card.querySelector("a");

        if (!link) return;

        card.style.cursor = "pointer";

        card.addEventListener("click", (event) => {

            if (event.target.closest("a")) return;

            link.click();

        });

    });

    const emailLinks = document.querySelectorAll(
        'a[href^="mailto:"]'
    );

    emailLinks.forEach(link => {

        link.addEventListener("click", () => {

            const email = link.href.replace("mailto:", "");

            if (!navigator.clipboard) return;

            navigator.clipboard.writeText(email)
                .catch(() => {});

        });

    });

    document.querySelectorAll(
        ".btn-primary, .btn-secondary, .btn-outline"
    ).forEach(button => {

        button.addEventListener("focus", () => {

            button.classList.add("focus-visible");

        });

        button.addEventListener("blur", () => {

            button.classList.remove("focus-visible");

        });

    });

    document.querySelectorAll("img").forEach(image => {

        if (!image.hasAttribute("loading")) {

            image.loading = "lazy";

        }

        if (!image.hasAttribute("decoding")) {

            image.decoding = "async";

        }

        image.addEventListener("error", () => {

            image.style.opacity = ".5";

            console.warn(
                "Image failed to load:",
                image.getAttribute("src")
            );

        });

    });

    document.querySelectorAll('a[href="#"]').forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

        });

    });

    /*==================================================
        12. PERFORMANCE & GLOBAL LISTENERS
    ==================================================*/

    // Single Consolidated Scroll Listener
    window.addEventListener(
        "scroll",
        rafThrottle(() => {

            lastScrollY = window.scrollY;

            updateNavbar();
            updateActiveNav();

        }),
        { passive: true }
    );

    // Single Consolidated Resize Listener
    window.addEventListener(
        "resize",
        debounce(() => {

            if (!isMobile()) {
                closeMenu();
            }

            if (imageBox) {
                imageBox.style.transform = "";
            }

        }, 150)
    );

    // Single Consolidated Keydown Listener
    document.addEventListener("keydown", event => {

        const isInputActive = ["INPUT", "TEXTAREA"].includes(
            document.activeElement.tagName
        );

        // Escape Key
        if (event.key === "Escape") {

            if (certificateModal?.classList.contains("active")) {
                closeCertificateModal();
            }

            if (navLinks?.classList.contains("active")) {
                closeMenu();
            }

        }

        // Home Key
        if (event.key === "Home" && !isInputActive) {

            scrollToTop();

        }

    });

    // Tab Visibility Handler
    document.addEventListener("visibilitychange", () => {

        if (!toolsTrack) return;

        if (document.hidden) {

            toolsTrack.style.animationPlayState = "paused";

        } else {

            toolsTrack.style.animationPlayState = "running";

        }

    });

    // Page Restore Handler
    window.addEventListener("pageshow", () => {

        updateNavbar();
        updateActiveNav();

    });

    // Before Unload Handler
    window.addEventListener("beforeunload", () => {

        if (certificateModal) {
            certificateModal.classList.remove("active");
        }

        body.style.overflow = "";

    });

    // Single Consolidated Window Load Listener
    window.addEventListener("load", () => {

        body.classList.add("loaded");

        updateNavbar();
        updateActiveNav();

        if (window.location.hash) {

            const target = document.querySelector(window.location.hash);

            if (target) {

                window.scrollTo({

                    top: target.offsetTop - NAVBAR_HEIGHT,

                    behavior: "auto"

                });

            }

        }

    });

    /*==================================================
        13. INITIALIZATION
    ==================================================*/

    const initializePortfolio = () => {

        updateNavbar();
        updateActiveNav();

        if (navLinks) {
            navLinks.classList.remove("active");
        }

        if (menuBtn) {
            menuBtn.setAttribute("aria-expanded", "false");
        }

        body.style.overflow = "";

        // Console Branding & Info
        console.log(
            "%cPortfolio Ready 🚀",
            "color:#63c7ff;font-size:16px;font-weight:bold;"
        );

        console.log(
            "%cDesigned & Developed by Kyaw San Lin",
            "color:#ffffff;font-size:13px;"
        );

        const portfolioInfo = {

            developer: "Kyaw San Lin",

            version: "1.0.0",

            framework: "Vanilla JavaScript",

            status: "Production"

        };

        Object.freeze(portfolioInfo);

        console.table(portfolioInfo);

        console.log(
            "%cPortfolio Script Successfully Loaded ✅",
            "color:#63c7ff;font-size:16px;font-weight:bold;"
        );

        console.log(
            "%cAll Components Initialized Successfully.",
            "color:#9bdcff;font-size:13px;"
        );

    };

    // Single startup execution
    initializePortfolio();

});