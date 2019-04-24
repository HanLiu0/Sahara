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

function getItemTypes(){
    return ["Books", "Clothing/ Shoes/ Jewelry", "Electronics", "Entertainment", "Furniture", "Health care", "Home &amp; Kitchen", "Music Instruments", "Pet Supplies", "Snake/Food", "Toy/Game/Movie"];
}
