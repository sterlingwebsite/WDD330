export default class Alert {
  constructor() {
 
    this.path = "../json/alerts.json";
  }

  async init() {
    const alerts = await this.getData();
    if (alerts && alerts.length > 0) {
      this.renderAlerts(alerts);
    }
  }

  async getData() {
    try {
      const response = await fetch(this.path);
      if (response.ok) {
        return await response.json();
      }
    } catch (err) {
      console.error("Error fetching alerts:", err);
    }
    return null;
  }

  renderAlerts(alerts) {
    const section = document.createElement("section");
    section.classList.add("alert-list");

    alerts.forEach((alert) => {
      const alertContainer = document.createElement("div");
      alertContainer.classList.add("alert-item");
      
    
      alertContainer.style.backgroundColor = alert.background;
      alertContainer.style.color = alert.color;

      const p = document.createElement("p");
      p.textContent = alert.message;
      p.classList.add("alert-message");

      const closeBtn = document.createElement("span");
      closeBtn.textContent = "X";
      closeBtn.classList.add("alert-close");
      
  
      closeBtn.onclick = () => alertContainer.remove();

    // appending
      alertContainer.appendChild(p);
      alertContainer.appendChild(closeBtn);
      section.appendChild(alertContainer);
    });

    const main = document.querySelector("main");
    if (main) {
      main.prepend(section);
    } else {
      
      document.body.prepend(section);
    }
  }
}