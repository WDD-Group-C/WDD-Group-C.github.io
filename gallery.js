
function showpopup(popup){
    let popupElement = document.getElementById(popup);
    popupElement.style.display = "block";

}
function hidepopup(popup){
    document.getElementById(popup).style.display= 'none';
}
function changeBackground(popup, color){ //allows the user to select the color of the background of the description 
    document.getElementById(popup).style.backgroundColor = color;
}

function changeFont(popup, font){ // to change the font of the text in the description
    document.getElementsByClassName(popup).style.fontFamily = font;
}
