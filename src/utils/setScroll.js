
function setScroll(status) {

    //out function value equal zero
    const widthValue = window.innerWidth - document.documentElement.clientWidth;

    if (status === "hide") {
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = widthValue + "px";
    } else {
        //delay for animation
        setTimeout(() => {
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
        }, 300);
    }

}

export { setScroll }