const $shoppingCar = document.querySelector(".shoppingCar")

document.onclick = (e) => {
    if (e.target.matches(".icon-shopping") || e.target.matches(".fa-heart")){
        $shoppingCar.classList.toggle("openClose-shoppingCar")
    }
    if (e.target.matches(".fa-x")){
        $shoppingCar.classList.remove("openClose-shoppingCar")
    }
}