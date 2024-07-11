var elm=document.getElementById('style');
//style object modifies style attribute of HTML tags
elm.style.background="yellow";
// elm.style.color="white";
// elm.style.width="200px";
//calling style again and again re-renders the element again and again to prevent this use cssText

// elm.style.cssText="background:yellow; color:white; width:200px";
// elm.style.cssText+="height:200px;";

//computed styles are the styles applied to an element in the HTML and the default styles given by the browser
console.log(getComputedStyle(elm));