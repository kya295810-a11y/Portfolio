document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const body = document.body;
    const navbar = document.querySelector(".navbar");
    const menuButton = document.querySelector(".menu-btn");
    const menuIcon = menuButton?.querySelector(".icon use");
    const navLinks = document.querySelector(".nav-links");
    const navItems = [...document.querySelectorAll(".nav-links a")];
    const sections = [...document.querySelectorAll("main section[id]")];
    const scrollProgress = document.querySelector(".scroll-progress");
    const backToTopButton = document.querySelector(".back-to-top");
    const mouseGlow = document.querySelector(".mouse-glow");
    const revealElements = [...document.querySelectorAll(".reveal")];
    const toolsTrack = document.querySelector(".tools-track");
    const toolsBox = document.querySelector(".tools-box");
    const modal = document.getElementById("certificateModal");
    const modalImage = document.getElementById("certificateModalImage");
    const modalCloseButton = document.querySelector(".certificate-close");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer:fine)").matches;
    const scheduleIdleTask = window.requestIdleCallback
        ? (callback) => window.requestIdleCallback(callback, { timeout: 1200 })
        : (callback) => window.setTimeout(callback, 1);

    let ticking = false;
    let activeSectionId = sections[0]?.id || "home";
    let modalOpen = false;
    let glowFrame = 0;

    const setActiveNav = (sectionId) => {
        if (!sectionId || sectionId === activeSectionId) {
            return;
        }

        activeSectionId = sectionId;
        navItems.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${sectionId}`);
        });
    };

    const toggleMenu = (expanded) => {
        if (!menuButton || !navLinks) {
            return;
        }

        const shouldExpand = typeof expanded === "boolean" ? expanded : !navLinks.classList.contains("active");
        navLinks.classList.toggle("active", shouldExpand);
        menuButton.setAttribute("aria-expanded", String(shouldExpand));

        if (menuIcon) {
            menuIcon.setAttribute("href", shouldExpand ? "#icon-close" : "#icon-menu");
        }
    };

    if (menuButton && navLinks) {
        menuButton.addEventListener("click", () => {
            toggleMenu();
        });

        navItems.forEach((link) => {
            link.addEventListener("click", () => {
                toggleMenu(false);
            });
        });
    }

    const updateScrollUI = () => {
        ticking = false;
        const scrollY = window.scrollY || window.pageYOffset;
        const totalHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);

        if (navbar) {
            navbar.classList.toggle("scrolled", scrollY > 50);
        }

        if (scrollProgress) {
            const progress = Math.min((scrollY / totalHeight) * 100, 100);
            scrollProgress.style.transform = `scaleX(${progress / 100})`;
        }

        if (backToTopButton) {
            backToTopButton.classList.toggle("active", scrollY > 300);
        }
    };

    const requestScrollUIUpdate = () => {
        if (ticking) {
            return;
        }

        ticking = true;
        window.requestAnimationFrame(updateScrollUI);
    };

    window.addEventListener("scroll", requestScrollUIUpdate, { passive: true });
    window.addEventListener("resize", requestScrollUIUpdate, { passive: true });
    updateScrollUI();

    if (backToTopButton) {
        backToTopButton.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
        });
    }

    const openModal = (img) => {
        const fullImage = img.dataset.fullImage || img.currentSrc || img.src;
        if (!fullImage || !modal || !modalImage || modalOpen) {
            return;
        }

        modalOpen = true;
        modalImage.src = fullImage;
        modalImage.alt = img.alt || "Certificate Preview";
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        body.style.overflow = "hidden";
    };

    const closeModal = () => {
        if (!modal || !modalImage || !modalOpen) {
            return;
        }

        modalOpen = false;
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        body.style.overflow = "";

        window.setTimeout(() => {
            modalImage.removeAttribute("src");
        }, 220);
    };

    scheduleIdleTask(() => {
        if (!reduceMotion && finePointer && mouseGlow) {
            window.addEventListener("pointermove", (event) => {
                if (glowFrame) {
                    return;
                }

                glowFrame = window.requestAnimationFrame(() => {
                    mouseGlow.style.transform = `translate3d(${event.clientX - 180}px, ${event.clientY - 180}px, 0)`;
                    glowFrame = 0;
                });
            }, { passive: true });
        } else if (mouseGlow) {
            mouseGlow.hidden = true;
        }

        if ("IntersectionObserver" in window) {
            const revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                });
            }, {
                threshold: reduceMotion ? 0 : 0.15,
                rootMargin: "0px 0px -10% 0px"
            });

            revealElements.forEach((element) => revealObserver.observe(element));

            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveNav(entry.target.id);
                    }
                });
            }, {
                rootMargin: "-45% 0px -45% 0px",
                threshold: 0
            });

            sections.forEach((section) => sectionObserver.observe(section));

            if (toolsTrack && toolsBox && !toolsTrack.dataset.duplicated) {
                const toolsObserver = new IntersectionObserver((entries, observer) => {
                    if (!entries.some((entry) => entry.isIntersecting)) {
                        return;
                    }

                    toolsTrack.append(...[...toolsTrack.children].map((node) => node.cloneNode(true)));
                    toolsTrack.dataset.duplicated = "true";
                    observer.disconnect();
                }, {
                    rootMargin: "200px 0px"
                });

                toolsObserver.observe(toolsBox);
            }
        } else {
            revealElements.forEach((element) => element.classList.add("active"));

            if (toolsTrack && !toolsTrack.dataset.duplicated) {
                toolsTrack.append(...[...toolsTrack.children].map((node) => node.cloneNode(true)));
                toolsTrack.dataset.duplicated = "true";
            }
        }

        document.querySelectorAll(".certificate-image").forEach((button) => {
            const image = button.querySelector("img");
            if (!image) {
                return;
            }

            button.addEventListener("click", () => {
                openModal(image);
            });
        });

        modalCloseButton?.addEventListener("click", closeModal);
        modal?.addEventListener("click", (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeModal();
            }
        });
    });
});
