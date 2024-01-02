var modal = document.getElementById('helloModal');
var btn = document.getElementById('sayHelloAlert');
var span = document.getElementsByClassName('setCloseModal')[0];

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}