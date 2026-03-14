console.log("Modal script loaded");

document.addEventListener("DOMContentLoaded", () => {
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const modal = document.getElementById("ad-modal");

    modal.innerHTML = `
    <div class="modal-content">
        <span class="close-button">&times;</span>
        <h2>BIG SALE!</h2>
        <p>Avail our tents today! Save up to 20% Discount.</p>
    </div>`;

    const closeBtn = modal.querySelector(".close-button");

    wait(1500).then(() => {
        modal.classList.add("show"); // Show the ad
    });

    closeBtn.onclick = () => {
        modal.classList.remove("show");
    };

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
});