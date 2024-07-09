// function Person(first, last, age, eye) {
//     this.firstName = first;
//     this.lastName = last;
//     this.age = age;
//     this.eyeColor = eye;
//     this.defValue="default";
//   }

function Person(first, last, age, eyecolor) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.eyeColor = eyecolor;
    this.fullName = function() {
      return this.firstName + " " + this.lastName;
    };
  }
var myself = new Person("Johnny", "Rally", 22, "green");
var mySister = new Person("Anna", "Rally", 18, "green");
mySister.defValue="hello";
//console.log(myself.fullName());
//adding function to an object
mySister.changeName = function (name) {
    this.lastName = name;
  }
//adding method to a constructor
  Person.prototype.changeName = function (name) {
    this.lastName = name;
  }
  
  mySister.changeName("Doe");

//Adding Properties and Methods to Objects
Person.prototype.nationality = "English";

Person.prototype.name = function() {
    return this.firstName + " " + this.lastName;
  };