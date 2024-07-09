// function name()
// {
//     var fullname="John Doe";
//     function concat(name)
//     {
//         return "Mr."+name;
//     }
//     return concat(fullname);
//     return fullname;
// }

// function name(fullname)
// {
//     return fullname.fname+" "+fullname.lname;
// }
// console.log(
//     name({fname:"John",lname:"Doe"})
// );

function name(fullname)
{
    return fullname();
}
console.log(
    name(function(){return "JohnD";})
);