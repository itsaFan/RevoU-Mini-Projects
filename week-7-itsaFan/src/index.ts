document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("financialForm") as HTMLFormElement;
  const firstNameInput = document.getElementById("firstName") as HTMLInputElement;
  const lastNameInput = document.getElementById("lastName") as HTMLInputElement;
  const productInput = document.getElementById("product") as HTMLInputElement;
  const amountInput = document.getElementById("amount") as HTMLInputElement;
  const buyoutType = document.getElementById("type") as HTMLSelectElement;


  const financialDataDisplay = document.getElementById("financialDataDisplay")!;

  let dataList: string[] = []; 

  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    const firstName: string = firstNameInput.value.trim();
    const lastName:string = lastNameInput.value.trim();
    const product:string = productInput.value.trim();
    const amount:string = amountInput.value.trim();

    if (firstName && lastName && product && amount) {
      const type = buyoutType.value === "new-item" ? "baru" : "bekas";
      const amountNumber: number = parseFloat(amount); // buat convert ke number aja
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

      contentDiv.appendChild(dataElement)
      cardElement.appendChild(contentDiv)

      financialDataDisplay.appendChild(cardElement);
    });
  }
});
