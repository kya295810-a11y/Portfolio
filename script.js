/*==================================================
    PORTFOLIO SCRIPT
    Part 1
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==================================================
        DOM CACHE
    ==================================================*/

    const body = document.body;

    const navbar = document.querySelector(".navbar");
   const menuToggle = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    const sections = document.querySelectorAll("section");
    const navigationLinks = document.querySelectorAll(".nav-links a");

    const revealItems = document.querySelectorAll(".reveal");

    const progressBar = document.querySelector(".scroll-progress");

    const mouseGlow = document.querySelector(".mouse-glow");

    const backToTop = document.querySelector(".back-to-top");

    const magneticButtons =
        document.querySelectorAll(
            ".btn,.btn-primary,.btn-secondary,.visit-btn"
        );

    const floatingIcons =
        document.querySelectorAll(".floating-icon");


    /*==================================================
        MOBILE MENU
    ==================================================*/

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            menuToggle.classList.toggle("active");
            navLinks.classList.toggle("active");

        });

    }


    /*==================================================
        CLOSE MENU AFTER CLICK
    ==================================================*/

    navigationLinks.forEach(link => {

        link.addEventListener("click", () => {

            menuToggle?.classList.remove("active");
            navLinks?.classList.remove("active");

        });

    });


    /*==================================================
        SMOOTH SCROLL
    ==================================================*/

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", e => {

                const targetID =
                    link.getAttribute("href");

                if (!targetID.startsWith("#")) return;

                const target =
                    document.querySelector(targetID);

                if (!target) return;

                e.preventDefault();

                target.scrollIntoView({

                    behavior: "smooth",
                    block: "start"

                });

            });

        });


    /*==================================================
        REVEAL ANIMATION
    ==================================================*/

    const revealObserver =
        new IntersectionObserver(

            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("active");

                    observer.unobserve(entry.target);

                });

            },

            {

                threshold: .15

            }

        );

    revealItems.forEach(item => {

        revealObserver.observe(item);

    });


    /*==================================================
        HELPER FUNCTIONS
    ==================================================*/

    function getScrollPercent() {

        const height =
            document.documentElement.scrollHeight -
            window.innerHeight;

        return (window.scrollY / height) * 100;

    }


    function showBackTop(show) {

        if (!backToTop) return;

        backToTop.classList.toggle("show", show);

    }


    function updateProgressBar() {

        if (!progressBar) return;

        progressBar.style.width =
            `${getScrollPercent()}%`;

    }
        /*==================================================
        ACTIVE NAVIGATION
    ==================================================*/

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {

                currentSection = section.id;

            }

        });

        navigationLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") === "#" + currentSection
            ) {

                link.classList.add("active");

            }

        });

    }


    /*==================================================
        NAVBAR BLUR
    ==================================================*/

    function updateNavbar() {

        if (!navbar) return;

        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }


    /*==================================================
        SCROLL HANDLER
        (Single Scroll Event)
    ==================================================*/

    let ticking = false;

    function handleScroll() {

        updateProgressBar();

        updateNavbar();

        updateActiveNavigation();

        showBackTop(window.scrollY > 500);

        ticking = false;

    }

    window.addEventListener("scroll", () => {

        if (!ticking) {

            window.requestAnimationFrame(handleScroll);

            ticking = true;

        }

    });


    /*==================================================
        INITIAL LOAD
    ==================================================*/

    handleScroll();


    /*==================================================
        BACK TO TOP
    ==================================================*/

    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }
        /*==================================================
        MOUSE GLOW
    ==================================================*/

    if (mouseGlow) {

        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener("mousemove", (e) => {

            mouseX = e.clientX;
            mouseY = e.clientY;

            mouseGlow.style.transform =
`translate(${mouseX}px, ${mouseY}px)`;

        });

    }


    /*==================================================
        MAGNETIC BUTTONS
    ==================================================*/

    magneticButtons.forEach(button => {

        button.addEventListener("mousemove", (e) => {

            const rect = button.getBoundingClientRect();

            const x =
                e.clientX - rect.left - rect.width / 2;

            const y =
                e.clientY - rect.top - rect.height / 2;

            button.style.transform =
                `translate(${x * 0.15}px, ${y * 0.15}px)`;

        });

        button.addEventListener("mouseleave", () => {

            button.style.transform = "";

        });

    });


    /*==================================================
        FLOATING ICONS
    ==================================================*/

    floatingIcons.forEach((icon, index) => {

        icon.animate(
            [
                {
                    transform: "translateY(0px)"
                },
                {
                    transform: "translateY(-12px)"
                },
                {
                    transform: "translateY(0px)"
                }
            ],
            {
                duration: 2400 + index * 250,
                iterations: Infinity,
                easing: "ease-in-out"
            }
        );

    });


    /*==================================================
        PARALLAX HERO
    ==================================================*/

    const heroImage =
        document.querySelector(".hero-image");

    window.addEventListener("mousemove", (e) => {

        if (!heroImage) return;

        const x =
            (e.clientX / window.innerWidth - 0.5) * 12;

        const y =
            (e.clientY / window.innerHeight - 0.5) * 12;

        heroImage.style.transform =
`translate3d(${x}px, ${y}px, 0)`;

    });


    /*==================================================
        WINDOW RESIZE
    ==================================================*/

    window.addEventListener("resize", () => {

        handleScroll();

    });


        /*==================================================
        PRELOADER
        (Optional)
    ==================================================*/

    const loader =
        document.querySelector(".preloader");

    if (loader) {

        window.addEventListener("load", () => {

            loader.classList.add("hide");

            setTimeout(() => {

                loader.remove();

            }, 500);

        });

    }


    /*==================================================
        ABOUT TOOLS MARQUEE
    ==================================================*/

    const toolsTrack = document.querySelector(".tools-track");

    if (toolsTrack) {

        toolsTrack.addEventListener("mouseenter", () => {

            toolsTrack.style.animationPlayState = "paused";

        });

        toolsTrack.addEventListener("mouseleave", () => {

            toolsTrack.style.animationPlayState = "running";

        });

    }


    /*==================================================
        END
    ==================================================*/
/*==================================================
    LIVE WEBSITE CARD
==================================================*/

const liveCard = document.querySelector(".live-card");
const liveLine = document.querySelector(".live-line");

if (liveCard && liveLine) {

    liveCard.addEventListener("mouseenter", () => {

        liveLine.style.transform = "scaleX(1)";
        liveLine.style.transformOrigin = "left";

    });

    liveCard.addEventListener("mouseleave", () => {

        liveLine.style.transform = "scaleX(.35)";

    });

}
});
/*==================================================
    CERTIFICATE SECTION
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==================================
        IMAGE MODAL
    ==================================*/

    const modal = document.getElementById("certificateModal");
    const modalImage = document.getElementById("certificateModalImage");
    const closeBtn = document.querySelector(".certificate-close");

    document.querySelectorAll(".certificate-image img").forEach(image => {

        image.style.cursor = "zoom-in";

        image.addEventListener("click", () => {

            modal.classList.add("active");
            modalImage.src = image.src;
            modalImage.alt = image.alt;

            document.body.style.overflow = "hidden";

        });

    });

    function closeModal(){

        modal.classList.remove("active");
        document.body.style.overflow = "";

    }

    closeBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", (e)=>{

        if(e.target === modal){

            closeModal();

        }

    });

    document.addEventListener("keydown",(e)=>{

        if(e.key==="Escape"){

            closeModal();

        }

    });

    /*==================================
        CARD TILT EFFECT
    ==================================*/

    document.querySelectorAll(".certificate-card").forEach(card=>{

        card.addEventListener("mousemove",(e)=>{

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateY = (x / rect.width - 0.5) * 10;
            const rotateX = -(y / rect.height - 0.5) * 10;

            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        });

        card.addEventListener("mouseleave",()=>{

            card.style.transform="";

        });

    });

    /*==================================
        REVEAL ANIMATION
    ==================================*/

    const revealItems = document.querySelectorAll(".certificate-card");

    const observer = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.animate(

                    [

                        {
                            opacity:0,
                            transform:"translateY(50px)"
                        },

                        {
                            opacity:1,
                            transform:"translateY(0)"
                        }

                    ],

                    {

                        duration:700,
                        easing:"ease-out",
                        fill:"forwards"

                    }

                );

                observer.unobserve(entry.target);

            }

        });

    },{

        threshold:.15

    });

    revealItems.forEach(item=>{

        item.style.opacity="0";

        observer.observe(item);

    });

});
/*==================================================
            CONTACT SECTION
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".contact-card");

    /*=====================================
            CARD HOVER
    =====================================*/

    cards.forEach(card => {

        card.addEventListener("mousemove", e => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty("--x", `${x}px`);
            card.style.setProperty("--y", `${y}px`);

        });

    });

    /*=====================================
            COPY EMAIL
    =====================================*/

    const emailCard = document.querySelector('a[href^="mailto:"]');

    if(emailCard){

        emailCard.addEventListener("click",(e)=>{

            e.preventDefault();

            const email="youremail@gmail.com";

            navigator.clipboard.writeText(email);

            const old=emailCard.querySelector("p").innerHTML;

            emailCard.querySelector("p").innerHTML="Copied ✓";

            setTimeout(()=>{

                emailCard.querySelector("p").innerHTML=old;

            },1800);

        });

    }

    /*=====================================
            BUTTON RIPPLE
    =====================================*/

    document.querySelectorAll(".btn-primary,.btn-outline").forEach(btn=>{

        btn.addEventListener("click",function(e){

            const ripple=document.createElement("span");

            ripple.className="ripple";

            const rect=this.getBoundingClientRect();

            ripple.style.left=e.clientX-rect.left+"px";

            ripple.style.top=e.clientY-rect.top+"px";

            this.appendChild(ripple);

            setTimeout(()=>{

                ripple.remove();

            },600);

        });

    });

});