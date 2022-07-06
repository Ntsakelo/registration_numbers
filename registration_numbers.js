//Instructions logic
const closeInstructions = document.querySelector(".closeInstructions");
const infoLink = document.querySelector(".infoLink");
const instructions = document.querySelector(".instructions");
const usageInfo = document.querySelector(".usageInfo");
const regNumInput = document.querySelector(".regNumInput");
closeInstructions.addEventListener("click", function () {
  instructions.classList.remove("addInfo");
  instructions.classList.add("removeInfo");

  usageInfo.classList.remove("infoIn");
  usageInfo.classList.add("infoOut");
});

infoLink.addEventListener("click", function () {
  instructions.classList.remove("removeInfo");
  instructions.classList.add("addInfo");

  usageInfo.classList.remove("infoOut");
  usageInfo.classList.add("infoIn");
});
regNumInput.addEventListener("focusin", function () {
  regNumInput.setAttribute("placeholder", "");
});
regNumInput.addEventListener("focusout", function () {
  regNumInput.setAttribute("placeholder", "Registration Number");
});
//DOM LOGIC
const addBtn = document.querySelector(".add");
const clearBtn = document.querySelector(".clearList");
const regInput = document.querySelector(".regNumInput");
const regDisplay = document.querySelector(".regNumberDisplay");
const displayState = document.querySelector(".state");
const stateDiv = document.querySelector(".displayState");
const empty = document.querySelector(".empty");

let registration = regNumbers();

function validation() {
  stateDiv.setAttribute("style", "visibility:hidden");
}

addBtn.addEventListener("click", function () {
  displayState.innerHTML = "";
  registration.getInput(regInput.value.toUpperCase());
  registration.filterArr("all");
  registration.displayReg(regDisplay);
  registration.getTownName();
  //remove classes
  stateDiv.classList.remove("danger");
  stateDiv.classList.remove("warning");
  stateDiv.classList.remove("sucess");
  stateDiv.setAttribute("style", "visibility:visible");
  //SET TIMEOUT
  //Default town select to all towns
  const townSelect = document.querySelector(".towns");
  townSelect.value = "all";
  if (registration.getFilterArr().length === 0) {
    regDisplay.innerHTML = "";
  }
  if (regInput.value === "") {
    stateDiv.classList.add("danger");
    displayState.innerHTML = "Enter a registration number";
    setTimeout(validation, 5000);
    return;
  }
  if (
    registration.validateMessage() === "The registration entered is invalid"
  ) {
    stateDiv.classList.add("danger");
    displayState.innerHTML = registration.validateMessage();
  }
  if (
    registration.validateMessage() ===
    `The registration ${registration.getRegNum()} already exists`
  ) {
    stateDiv.classList.add("warning");
    displayState.innerHTML = registration.validateMessage();
  }
  if (
    registration.validateMessage() ===
    `Sucessfully added a ${registration.theTown()} registration`
  ) {
    stateDiv.classList.add("sucess");
    displayState.innerHTML = registration.validateMessage();
  }
  regInput.value = "";

  function validation() {
    stateDiv.setAttribute("style", "visibility:hidden");
  }
  setTimeout(validation, 5000);
  //local storage setup
  let allTownsData = registration.getAllTowns();
  let allTownsString = JSON.stringify(allTownsData);
  localStorage.setItem("reg", allTownsString);
});
if (localStorage["reg"]) {
  let localArray = JSON.parse(localStorage.getItem("reg"));
  registration.getDataFromStorage(localArray);
  registration.filterArr("all");
  registration.displayReg(regDisplay);
}
//DropDown filter towns
document.querySelector(".towns").addEventListener("change", function () {
  const selectElem = document.getElementById("towns");
  const selectValue = selectElem.options[selectElem.selectedIndex].value;

  if (selectValue === "capeTown") {
    registration.filterArr("capeTown");
  } else if (selectValue === "paarl") {
    registration.filterArr("paarl");
  } else if (selectValue === "kuilsRiver") {
    registration.filterArr("kuilsriver");
  } else if (selectValue === "bellville") {
    registration.filterArr("bellville");
  } else if (selectValue === "all") {
    registration.filterArr("all");
  }

  setTimeout(validation, 5000);
  // registration.regNumberStorage();
  registration.displayReg(regDisplay);
});
//Clear local storage
clearBtn.addEventListener("click", function () {
  stateDiv.classList.remove("danger");
  stateDiv.classList.remove("warning");
  stateDiv.classList.remove("sucess");
  stateDiv.setAttribute("style", "visibility:visible");
  // SET TIMEOUT

  if (!localStorage["reg"]) {
    stateDiv.classList.add("warning");
    displayState.innerHTML = "Storage is empty";
  }
  if (localStorage["reg"]) {
    if (registration.getAllTowns().length === 0) {
      stateDiv.classList.add("warning");
      displayState.innerHTML = "Storage is empty";
      setTimeout(validation, 5000);
      return;
    }
    let newArr = [];
    localStorage.clear();
    registration.getDataFromStorage(newArr);
    registration.changeState(false);
    registration.clearList(regDisplay);
    stateDiv.classList.add("sucess");
    displayState.innerHTML = "Sucessfully removed all entries";
  }

  setTimeout(validation, 5000);
});
