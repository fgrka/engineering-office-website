class Logo {
    constructor(headerLogo, header) {
        this.headerLogo = headerLogo;
        this.header = header;
    }
    logoColour() {
        const observerOptColour = {
            root: null, 
            rootMargin: "0px",
            threshold: 0.15,
        };
    
        const observerLogoColour = new IntersectionObserver(elements => {
            elements.forEach (el => {
                if (el.isIntersecting) {
                    headerLogo.classList.remove("black");
                }
                else {
                    headerLogo.classList.add("black");
                }
        
            })
        }, observerOptColour);
        observerLogoColour.observe(header);
    }

    moveLogo() {
        window.addEventListener("scroll", moveRange);
             function moveRange() {
                let aboutTitlePosition= header.offsetHeight+15;
                let moveY = window.scrollY;
                if (moveY < aboutTitlePosition)
                headerLogo.style.setProperty("--y", moveY+"px")
            }      
    }

    init() {
        this.logoColour();
        this.moveLogo();
    }
}

const header = document.querySelector(".header");
const headerLogo = document.querySelector(".header-logo");
const logo = new Logo(headerLogo,header);
logo.init();

function showSections() {
    const sections = document.querySelectorAll("section");
    const observerOptSections = {
        root: null, 
        rootMargin: "300px",
        threshold: 0.1,
    };

    const observerSections = new IntersectionObserver(elements => {
        elements.forEach((el) => {
            if (el.isIntersecting) {
                setTimeout(()=>{el.target.classList.add("visible")}, 400)
            }
        })
    }, observerOptSections);

    sections.forEach((sec) =>{
        observerSections.observe(sec);
    })
}
showSections();

function navLinks() {
    const aAbout = document.querySelectorAll(".a-about");
    const aOffer = document.querySelectorAll(".a-offer");
    const aPortfolio = document.querySelectorAll(".a-portfolio");
    const aContact = document.querySelectorAll(".a-contact");
    const aboutTitle = document.querySelector(".about .section-title");
    const offerTitle = document.querySelector(".offer .section-title");
    const portfolioTitle = document.querySelector(".portfolio .section-title");
    const footer = document.querySelector(".footer-main");

    aAbout.forEach(el => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            aboutTitle.scrollIntoView({block: "start", behavior: "smooth"});
        })
    });

    aOffer.forEach(el => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            offerTitle.scrollIntoView({block: "start", behavior: "smooth"});
        })
    });

    aPortfolio.forEach(el => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            portfolioTitle.scrollIntoView({block: "start", behavior: "smooth"});
        })
    });


    aOffer.forEach(el => {
        el.addEventListener("click", () => {
            e.preventDefault();
            offerTitle.scrollIntoView({block: "start", behavior: "smooth"});
        })
    })

    aContact.forEach(el => {
        el.addEventListener("click", () => {
            e.preventDefault();
            footer.scrollIntoView({block: "start", behavior: "smooth"});
        })
    })
}
navLinks();

//SLIDER

const btnLeft = document.querySelector(".left");
const btnRight = document.querySelector(".right");
const slider = document.querySelector(".slider");
const cards = document.querySelectorAll(".card");
let isTransitionEnd = true;

const moveRight = () => {
 
    if (isTransitionEnd) {
    isTransitionEnd=false;    
    const firstItem = slider.children[0];
    slider.style.transition = 'transform 1s ease-in-out';
    slider.style.transform = `translateX(-${firstItem.offsetWidth}px)`;

    const transitionEndHandler = () => {
        slider.style.transition = 'none';
        slider.style.transform = 'translateX(0)';
        slider.appendChild(firstItem.cloneNode(true));
        slider.removeChild(slider.children[0]);
        slider.removeEventListener('transitionend', transitionEndHandler);
    };
    slider.addEventListener('transitionend', transitionEndHandler);
    setTimeout(()=> {isTransitionEnd = true;}, 1000);
    }
}

const moveLeft = () => {
    if (isTransitionEnd) {
    isTransitionEnd=false;

    const lastItem = slider.children[slider.children.length-1];
    slider.style.transition = "transform 1s ease-in-out"
    slider.style.transform = `translateX(${lastItem.offsetWidth}px)`;

    const transitionEndHandler = () => {
        slider.style.transition = 'none';
        slider.style.transform = 'translateX(0)';
        slider.insertBefore(lastItem.cloneNode(true), slider.firstChild);
        slider.removeChild(lastItem);
        slider.removeEventListener('transitionend', transitionEndHandler);
    };
    slider.addEventListener('transitionend', transitionEndHandler);
    
    setTimeout(()=> {
        isTransitionEnd = true;
    }, 1000);
    }
};

btnRight.addEventListener("click", moveRight);
btnLeft.addEventListener("click", moveLeft);


function counterSection() {
    const numbers = document.querySelectorAll(".num");
    let i=0;

    numbers.forEach((number) => {
        number.innerHTML = 0;
        const target = parseInt(number.getAttribute("data-target"));
        
        const counter = () => {
        let count = parseInt(number.textContent);
            if (count<target) {
                if (target < 30) {
                    time=400;
                }
                else if (target < 200) {
                    time=10;
                }
                else if (target > 200) {
                    count += 5;
                    time=10;
                }
                count += 1;
                setTimeout(counter, time);
                number.innerHTML = count;
            }
            else {
                number.innerHTML = target;
            }    
        }
        counter();
    });
}

    const numbers = document.querySelector(".numbers-wrap");
    const observerOptNum = {
        root: null, 
        rootMargin: "400px",
        threshold: 0.2,
    };
    const observerNum = new IntersectionObserver(elements => {
        elements.forEach((el) => {
            if (el.isIntersecting) {
                setTimeout(counterSection, 150);
                observerNum.disconnect();
            }
        }, observerOptNum);
    })

    observerNum.observe(numbers);


const body = document.querySelector("body");
const showPortfolioBtn = document.querySelector(".portfolio-button");
showPortfolioBtn.addEventListener("click", () => {
    portfolioCard.style.display="block";
    body.classList.toggle("blur");
   
})

const closePortfolioBtn = document.querySelector(".portfolio-all-close");
const portfolioCard = document.querySelector(".portfolio-all");
closePortfolioBtn.addEventListener("click", () => {
    portfolioCard.style.display="none";
    body.classList.toggle("blur");
})

//HAMBUGER VISIBILITY

const mobileMenu = document.querySelector(".header-nav-mobile");
const closeMobileMenu = document.querySelector(".header-nav-mobile-close");
const hamburgerIcon = document.querySelector(".header-hamburger");


closeMobileMenu.addEventListener("click", () => {
mobileMenu.style.display = "none"})

hamburgerIcon.addEventListener("click", () => {
    mobileMenu.style.display = "flex";
})


const mobileMenuLinks = document.querySelectorAll(".header-nav-mobile a");
mobileMenuLinks.forEach( link => 
    link.addEventListener("click", () => {
        mobileMenu.style.display = "none";
    }))