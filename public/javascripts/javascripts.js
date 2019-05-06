function toggleNav() {
    var sidebar = document.getElementById("sidebar");
    if(sidebar.style.width === "250px"){
        document.getElementById("sidebar").style.width = "0px";
        document.getElementById("main").style.marginLeft = "0px";
    }
    else{
        document.getElementById("sidebar").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
    }
}

function readText(input) {
    if (input.files && input.files[0]) {
        var image = document.getElementById("image");
        document.getElementById("fileLabel").innerText = image.value;

    }
}

(function () {
    'use strict';

    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');

        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

function checkInputBox() {
    var inputs = document.querySelectorAll("input[type='checkbox']");
    console.log(inputs);
    var checked = true;
    for(var i = 0 ; i < inputs.length; i++){
        if(inputs[i].checked)
            checked = false;
    }
    document.getElementById("return-submit").disabled = checked;
}