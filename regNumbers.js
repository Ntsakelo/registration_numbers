function regNumbers() {
  let regNum = "";
  let allTowns = [];
  let isAvailable = false;
  let filteredReg = [];
  let townName = "";
  let filterTown = "";
  //get and validate the string
  function getInput(val) {
    if (/^C[AFJY]\s\d\d\d(\s|\-|\S|)\d\d\d$/.test(val)) {
      regNum = val;
    }
    if (!/^C[AFJY]\s\d\d\d(\s|\-|\S|)\d\d\d$/.test(val)) {
      regNum = "";
      return regNum;
    }
    if (allTowns.length > 0) {
      for (let i = 0; i < allTowns.length; i++) {
        if (regNum === allTowns[i]) {
          isAvailable = true;
          return isAvailable;
        }
      }
      isAvailable = false;
    }
    if (isAvailable === false) {
      allTowns.push(regNum);
    }
  }
  //Return the input
  function getRegNum() {
    return regNum;
  }
  function getTownName() {
    if (regNum.startsWith("CA")) {
      townName = "Cape town";
    } else if (regNum.startsWith("CJ")) {
      townName = "Paarl";
    } else if (regNum.startsWith("CY")) {
      townName = "Bellville";
    } else if (regNum.startsWith("CF")) {
      townName = "Kuilsriver";
    }
  }
  function theTown() {
    return townName;
  }
  function getAllTowns() {
    return allTowns;
  }
  //Filtering array
  function filterArr(val) {
    if (val === "capeTown") {
      filterTown = "Cape town";
      filteredReg = [];
      for (let i = 0; i < allTowns.length; i++) {
        if (allTowns[i].startsWith("CA")) {
          filteredReg.push(allTowns[i]);
        }
      }
    }
    if (val === "kuilsriver") {
      filterTown = "Kuilsriver";
      filteredReg = [];
      for (let i = 0; i < allTowns.length; i++) {
        if (allTowns[i].startsWith("CF")) {
          filteredReg.push(allTowns[i]);
        }
      }
    }
    if (val === "bellville") {
      filterTown = "bellville";
      filteredReg = [];
      for (let i = 0; i < allTowns.length; i++) {
        if (allTowns[i].startsWith("CY")) {
          filteredReg.push(allTowns[i]);
        }
      }
    }
    if (val === "paarl") {
      filterTown = "paarl";
      filteredReg = [];
      for (let i = 0; i < allTowns.length; i++) {
        if (allTowns[i].startsWith("CJ")) {
          filteredReg.push(allTowns[i]);
        }
      }
    }
    if (val === "all") {
      filterTown = "all towns";
      filteredReg = [];
      for (let i = 0; i < allTowns.length; i++) {
        filteredReg.push(allTowns[i]);
      }
    }
    return filteredReg;
  }
  function checkAvailable() {
    return isAvailable;
  }
  //Validation
  function validateMessage() {
    if (regNum === "") {
      return "The registration entered is invalid";
    }
    if (regNum !== "" && isAvailable === true) {
      return `The registration ${regNum} already exists`;
    }
    if (regNum !== "" && isAvailable === false) {
      return `Sucessfully added a ${townName} registration`;
    }
  }

  //append
  function displayReg(parentElem) {
    parentElem.innerHTML = "";
    if (filteredReg.length === 0) {
      let empty = document.createElement("p");
      empty.setAttribute("class", "empty");
      empty.innerHTML = `No reg from ${filterTown}`;
      parentElem.append(empty);
    }
    filteredReg.forEach(function (item) {
      let parentElement = parentElem;
      let firstChild = parentElement.firstChild;
      let childElement = document.createElement("div");
      childElement.setAttribute("class", "regNumber");
      let textElement = document.createElement("h3");
      textElement.setAttribute("class", "regText");
      textElement.innerHTML = item;
      childElement.append(textElement);
      if (regNum.startsWith("CA")) {
        childElement.classList.add("capeTown");
      }
      if (regNum.startsWith("CJ")) {
        childElement.classList.add("paarl");
      }
      if (regNum.startsWith("CF")) {
        childElement.classList.add("kuilsriver");
      }
      if (regNum.startsWith("CY")) {
        childElement.classList.add("bellville");
      }
      parentElement.insertBefore(childElement, firstChild);
    });
  }
  //function to remove child elements
  function clearList(parentNode) {
    while (parentNode.firstChild) {
      parentNode.removeChild(parentNode.firstChild);
    }
  }
  //Reassign values to array
  function getDataFromStorage(localArr) {
    allTowns = localArr;
  }
  function updateArr(newArr) {
    filteredArr = newArr;
  }
  function changeState(val) {
    isAvailable = val;
  }
  //return the array
  function getFilterArr() {
    return filteredReg;
  }
  return {
    getInput,
    getAllTowns,
    filterArr,
    displayReg,
    validateMessage,
    getDataFromStorage,
    clearList,
    updateArr,
    changeState,
    getRegNum,
    checkAvailable,
    getFilterArr,
    getTownName,
    theTown,
  };
}
