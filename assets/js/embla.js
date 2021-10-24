import EmblaCarousel from "embla-carousel";
import { setupPrevNextBtns, disablePrevNextBtns } from "./prevAndNextButtons";
import { setupDotBtns, generateDotBtns, selectDotBtn } from "./dotButtons";
import "../css/base.css";
import "../css/reset.css";
import "../css/embla.css";
import "../css/header.css";
import "../css/footer.css";

const wrap = document.querySelector(".embla");
const viewPort = wrap.querySelector(".embla__viewport");
const prevBtn = wrap.querySelector(".embla__button--prev");
const nextBtn = wrap.querySelector(".embla__button--next");
const dots = document.querySelector(".embla__dots");
const embla = EmblaCarousel(viewPort, { loop: false, skipSnaps: false });
const dotsArray = generateDotBtns(dots, embla);
const setSelectedDotBtn = selectDotBtn(dotsArray, embla);
const disablePrevAndNextBtns = disablePrevNextBtns(prevBtn, nextBtn, embla);

setupPrevNextBtns(prevBtn, nextBtn, embla);
setupDotBtns(dotsArray, embla);

embla.on("select", setSelectedDotBtn);
embla.on("select", disablePrevAndNextBtns);
embla.on("init", setSelectedDotBtn);
embla.on("init", disablePrevAndNextBtns);


// BUTTONS
export const setupPrevNextBtns = (prevBtn, nextBtn, embla) => {
    prevBtn.addEventListener('click', embla.scrollPrev, false);
    nextBtn.addEventListener('click', embla.scrollNext, false);
  };
  
  export const disablePrevNextBtns = (prevBtn, nextBtn, embla) => {
    return () => {
      if (embla.canScrollPrev()) prevBtn.removeAttribute('disabled');
      else prevBtn.setAttribute('disabled', 'disabled');
  
      if (embla.canScrollNext()) nextBtn.removeAttribute('disabled');
      else nextBtn.setAttribute('disabled', 'disabled');
    };
  };

  
//   dotbuttons
export const setupDotBtns = (dotsArray, embla) => {
    dotsArray.forEach((dotNode, i) => {
      dotNode.addEventListener("click", () => embla.scrollTo(i), false);
    });
  };
  
  export const generateDotBtns = (dots, embla) => {
    const template = document.getElementById("embla-dot-template").innerHTML;
    dots.innerHTML = embla.scrollSnapList().reduce(acc => acc + template, "");
    return [].slice.call(dots.querySelectorAll(".embla__dot"));
  };
  
  export const selectDotBtn = (dotsArray, embla) => () => {
    const previous = embla.previousScrollSnap();
    const selected = embla.selectedScrollSnap();
    dotsArray[previous].classList.remove("is-selected");
    dotsArray[selected].classList.add("is-selected");
  };
  