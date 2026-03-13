

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

window.addEventListener("load", () => {
    const modal = document.getElementById("ad-modal");
    

    modal.innerHTML = `
    <div class="modal-content">
        <span class="close-button">&times;</span>
        <h2>BIG SALE!</h2>
        <p>Avail our tents today! Save up to 20% Discount.</p>
    </div>`;

    const closeBtn = modal.querySelector(".close-button");

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