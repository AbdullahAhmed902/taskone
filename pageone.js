axios({
  method: "get",
  mode: "no-cors",
  url: "https://dev.deepthought.education/assets/uploads/files/files/others/ddugky_project.json",
  headers: { "Content-Type": "application/json; charset=UTF-8" },
})
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

let btn = document.getElementsByClassName("btn");
let btn2 = document.getElementsByClassName("btndivtwo");
let sidebar = document.getElementById("side");
let sidebar2 = document.getElementById("side2");
btn[0].onclick = function () {
  console.log("hello");
  sidebar.style.display = "none";
  sidebar2.style.removeProperty("display");
};

btn2[0].onclick = function () {
  sidebar2.style.display = "none";
  sidebar.style.display = "";
};
let selec = document.getElementsByClassName("selected2");
let menu2 = document.getElementById("menu2");

selec[0].onclick = function () {
  if (menu2.style.visibility == "hidden") {
    menu2.style.visibility = "";
  } else {
    menu2.style.visibility = "hidden";
  }
};

let selec1 = document.getElementsByClassName("selected");
let menu = document.getElementById("menu");

selec1[0].onclick = function () {
  if (menu.style.visibility == "hidden") {
    menu.style.visibility = "";
  } else {
    menu.style.visibility = "hidden";
  }
};

let seemore = document.getElementById("seemore");
let morep = document.getElementById("more");
console.log(seemore);
console.log(morep.style.display);
seemore.onclick = function () {
  if (morep.style.display == "none") {
    morep.style.display = "";
    seemore.innerHTML = "See less";
  } else {
    morep.style.display = "none";
    seemore.innerHTML = "See more";
  }
};

let seemore2 = document.getElementById("seemore2");
let morep2 = document.getElementById("more2");
seemore2.onclick = function () {
  if (morep2.style.display == "none") {
    morep2.style.display = "";
    seemore2.innerHTML = "See less";
  } else {
    morep2.style.display = "none";
    seemore2.innerHTML = "See more";
  }
};
