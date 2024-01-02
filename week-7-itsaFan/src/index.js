"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("financialForm");
    const firstNameInput = document.getElementById("firstName");
    const lastNameInput = document.getElementById("lastName");
    const productInput = document.getElementById("product");
    const amountInput = document.getElementById("amount");
    const buyoutType = document.getElementById("type");
    const financialDataDisplay = document.getElementById("financialDataDisplay");
    let dataList = [];
    form === null || form === void 0 ? void 0 : form.addEventListener("submit", (event) => {
        event.preventDefault();
        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const product = productInput.value.trim();
        const amount = amountInput.value.trim();
        if (firstName && lastName && product && amount) {
            const type = buyoutType.value === "new-item" ? "baru" : "bekas";
            const amountNumber = parseFloat(amount); // buat convert ke number aja
            const inputResult = `Hello ${firstName} ${lastName}, anda telah membeli ${product} ${type} seharga ${amountNumber} rupiah.`;
            dataList.push(inputResult);
            // dataList.sort(); 
            updateDataDisplay();
        }
    });
    function updateDataDisplay() {
        financialDataDisplay.innerHTML = "";
        dataList.forEach((result) => {
            const cardElement = document.createElement("li");
            cardElement.classList.add("card");
            const contentDiv = document.createElement("div");
            contentDiv.classList.add("content");
            const dataElement = document.createElement("p");
            dataElement.textContent = `${result}`;
            contentDiv.appendChild(dataElement);
            cardElement.appendChild(contentDiv);
            financialDataDisplay.appendChild(cardElement);
        });
    }
});
