//const { expect } = require('chai');
const apiUtils = require('./apiUtils');
const expectChai=require('chai').expect

describe('Login Test', () => {
    it('should login via API and verify UI state', async () => {
        // Perform API login
        //const loginRes=await apiUtils.loginRequest('Vrinda', 'HelloWorld123');
        const { cookies, data: loginRes }=await apiUtils.loginRequest('Vrinda', 'HelloWorld123');
        expectChai(loginRes.login.result).to.equal('Success');

        
        // Navigate to the application page
        await browser.url('http://localhost/blue2/mediawiki/index.php');

        for (const cookie of cookies) {
            const [name, value] = cookie.split(';')[0].split('=');
            await browser.setCookies({
                name: name.trim(),
                value: value.trim(),
                domain: 'localhost',  // Set this to the domain of your application
                path: '/'             // Ensure the path is correctly set
            });
        }

        // Refresh the page to apply cookies
        await browser.refresh();

        // Verify some UI element that indicates the user is logged in
        const userProfile = await $('#ga-btn'); // Adjust the selector as needed
        await userProfile.waitForDisplayed({ timeout: 5000 });

        expectChai(await userProfile.isDisplayed()).to.be.true;
    });
});
