var select=document.getElementsByName("cars")[0];
//callback function, event parameter is optional
//this parameter contains the event object that triggered this subroutine
select.onclick=function(event){//inline event
    console.log(event);
}

//not an inline event listener,not visible in the object 'select'
//here 'on' namespace is removed from the event
select.addEventListener('click',function(event){
    console.log('clicked by add event listener');
});
//anonymous function hence cannot be removed 

select.addEventListener('click',function(event){
    console.log('clicked by add event listener2');
});


function clickCallBack(evt)
{
    console.log('clicked by event listener3');
}
select.addEventListener('click',clickCallBack);
select.removeEventListener('click',clickCallBack);