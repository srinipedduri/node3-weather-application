console.log("page loaded after thestart");

const btnClickHandler = () => {
  alert("btn clicked");
};

const btn = document.getElementById("btn");

btn.addEventListener("click", btnClickHandler);
