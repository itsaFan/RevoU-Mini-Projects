var modal = document.getElementById("regModal");
var btn = document.getElementById("formBtn");
var span = document.getElementsByClassName("setCloseModal")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

//
var secondModal = document.getElementById("commentModal");
var secondBtn = document.getElementById("commentBtn");
var secondSpan = document.getElementsByClassName("setCloseModal")[1];

secondBtn.onclick = function () {
  secondModal.style.display = "block";
};

secondSpan.onclick = function () {
  secondModal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == secondModal) {
    secondModal.style.display = "none";
  }
};

const hamburgerBtn = document.getElementById('hamburgerBtn');
const closeBtn = document.getElementById('closeBtn');
const navigation = document.querySelector('.navigation');

hamburgerBtn.addEventListener('click', function () {
  navigation.classList.add('active');
  closeBtn.style.display = 'block';
});

closeBtn.addEventListener('click', function () {
  navigation.classList.remove('active');
  closeBtn.style.display = 'none'; 
});


