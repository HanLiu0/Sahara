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