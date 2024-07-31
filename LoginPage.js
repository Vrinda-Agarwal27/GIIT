class loginPage 
{
    get username()
    {
        return $('#username');
    }
    get password()
    {
        return $('//input[@type="password"]')
    }
    get alert()
    {
        return $(".alert-danger")
    }
    get signIn()
    {
        return $("#signInBtn")
    }
    get textInfo()
    {
        return $("p")
    }
    get checkout()
    {
        return $("*=Checkout")
    }
    async Login(username,password)
    {
        await this.username.setValue(username);
        await this.password.setValue(password);
        await this.signIn.click()
    }
    
}
// new className
module.exports=new loginPage();