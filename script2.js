function makeCoffee(sugar,milk)
{
    var greeting="Hello ";
    greeting+=sugar+", Welcome.\n";
    greeting+="To login add username and password.";
    greeting+=" Your id is "+milk;
    return greeting;
}
console.log(makeCoffee("John",66));
//this function can be run directly onto console as well