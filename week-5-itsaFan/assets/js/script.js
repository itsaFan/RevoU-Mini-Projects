const hamburgerBtn = document.getElementById("hamburgerBtn");
const closeBtn = document.getElementById("closeBtn");
const navigation = document.querySelector(".main-nav");

hamburgerBtn.addEventListener("click", function () {
  navigation.classList.toggle("active");
  hamburgerBtn.classList.toggle("active");
});

function changeTab(tabNumber) {
  var tabContents = document.getElementsByClassName("tab-content");
  for (var i = 0; i < tabContents.length; i++) {
    tabContents[i].style.display = "none";
  }
  
  var selectedContent = document.getElementById("content" + tabNumber);
  selectedContent.style.display = "grid";
}

window.onload = function() {
  if (window.innerWidth > 768) {
    changeTab(1);
  }
};

