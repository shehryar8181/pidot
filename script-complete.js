var addClosed = document.querySelector(".skip");
var img = document.querySelector("footer img");
function banner() {
    addClosed.addEventListener("click", function () {
        img.style.display = "none";
        addClosed.style.display = "none";
    });
}
banner();