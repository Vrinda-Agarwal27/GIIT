var obj={
    prop: this,
    //changes scope of this to obj
    method : function(){return this;}
};

var arr=[
    this,
    //changes scope of this to arr
    function(){ return this; }
];

function global()
{
    return this;
}
