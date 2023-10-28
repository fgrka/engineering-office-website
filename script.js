const headerLogo = document.querySelector(".header-logo");
const header = document.querySelector(".header");
const aboutTitle = document.querySelector(".about .section-title");
const about = document.querySelector(".about");
const offerTitle = document.querySelector(".offer .section-title");
const offer = document.querySelector(".offer"); 
const portfolioTitle = document.querySelector(".portfolio .section-title");
const footer = document.querySelector(".footer-main");

class Logo {
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

const logo = new Logo();
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
    const aAbout = document.querySelector(".a-about");
    const aOffer = document.querySelector(".a-offer");
    const aPortfolio = document.querySelector(".a-portfolio");
    const aContact = document.querySelector(".a-contact");

    aAbout.addEventListener("click", (e) => {
        e.preventDefault();
        aboutTitle.scrollIntoView({block: "start", behavior: "smooth"});

    })

    aOffer.addEventListener("click", (e) => {
        e.preventDefault();
        offerTitle.scrollIntoView({block: "start", behavior: "smooth"});

    })

    aPortfolio.addEventListener("click", (e) => {
        e.preventDefault();
        portfolioTitle.scrollIntoView({block: "start", behavior: "smooth"});

    })

    aContact.addEventListener("click", (e) => {
        e.preventDefault();
        footer.scrollIntoView({block: "start", behavior: "smooth"});

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
    slider.appendChild(firstItem.cloneNode(true));
    slider.style.transition = 'transform 1s ease-in-out';
    slider.style.transform = `translateX(-${firstItem.offsetWidth}px)`;

    const transitionEndHandler = () => {
        slider.style.transition = 'none';
        slider.style.transform = 'translateX(0)';
        slider.removeChild(slider.children[0]);
        slider.removeEventListener('transitionend', transitionEndHandler);
    };
    slider.addEventListener('transitionend', transitionEndHandler);
    setTimeout(()=> {isTransitionEnd=true;}, 1100);
}
}

const moveLeft = () => {
    if (isTransitionEnd) {
    isTransitionEnd=false;

    const lastItem = slider.children[slider.children.length-1];
    slider.style.transition = "transform 1s ease-in-out"
    slider.style.transform = `translateX(${lastItem.offsetWidth}px)`;
  
    setTimeout(()=> { slider.insertBefore(lastItem.cloneNode(true), slider.firstChild);
    }, 1000);

    const transitionEndHandler = () => {
        slider.style.transition = 'none';
        slider.style.transform = 'translateX(0)';
        slider.removeChild(lastItem);
        slider.removeEventListener('transitionend', transitionEndHandler);
    };
    slider.addEventListener('transitionend', transitionEndHandler);
    setTimeout(()=> {isTransitionEnd=true;}, 1100);
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
    console.log(numbers)
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
