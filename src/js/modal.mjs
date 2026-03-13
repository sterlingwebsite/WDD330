

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

window.addEventListener("load", () => {
    const modal = document.getElementById("ad-modal");
    const closeBtn = document.querySelector(".close-button");

    if (modal && closeBtn) {
         wait(1500).then(() => {
            modal.style.display = "flex"; // Show the ad
         });

      closeBtn.onclick = () => {
            modal.style.display = "none";
        };

         window.onclick = (event) => {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };
    }
});