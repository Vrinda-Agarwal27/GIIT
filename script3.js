var car={
    //key and value pairs
    color:"red",
    speed:200,
    //obj inside obj
    engine:{
        size:2.0,
        fuel:"petrol",
        pistons:["piston1","piston2"]
    },
    drive:function(){ return "drive"; }
};

var list=[
    'apple','orange','kiwi'
];

var arr=["string",
    100,
    ["embedd",200],
    {car: "ford"},
    function(){ return "drive"; }];
//run on console