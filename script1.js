var pHello=document.getElementById('hello');//returns reference to that object 
pHello.innerText="new world";
pHello.innerHTML+="order <span>Hello World</span>";//in case of innerText treats all this as regular text
pHello.outerHTML='<h2 id="Hello">new world order hello world</span></h2>';//modifies the outside tags,mind '' and ""
var spanH1=document.querySelectorAll('h1 span');//returns an array of objects to modify contents of span,
spanH1=document.querySelectorAll('h1 span')[0];
spanH1.innerHTML="new text here!!";
