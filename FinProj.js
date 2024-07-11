function set()
{
    alert('set');
    let div=document.getElementById('modify');
    let element=document.getElementsByName('cssProp');
    for(let i=0;i<element.length;i++)
    {
        let cssProp=element[i].getAttribute('id');
        let cssVal=element[i].value;
        
        div.style[cssProp]=cssVal;
    }
}
document.getElementById('set').addEventListener('click',set);