const expectChai=require('chai').expect
class BlueSpice 
{
    get username()
    {
        return $('#wpName1');
    }
    get password()
    {
        return $('#wpPassword1')
    }
    get cookie()
    {
        return $('.bs-privacy-cookie-consent-mw-provider-bar')
    }
    get Accept()
    {
        return $('.bs-privacy-cookie-consent-mw-provider-bar span.oo-ui-buttonElement-framed a.oo-ui-buttonElement-button')
    }
    get logIn()
    {
        return $('#wpLoginAttempt')
    }
    get globalAction()
    {
        return $('#ga-btn')
    }
    get filelist()
    {
        return $('#ga-enhanced-standard-uis-filelist')
    }
    get notification()
    {
        return $('.mw-notification-content')
    }
    get uploadBtn()
    {
        return $("span a[href='/blue2/mediawiki/index.php/Special:Upload']");
    }
    get fileInput()
    {
        return $('a input.oo-ui-inputWidget-input');
    }
    get close()
    {
        return $('.oo-ui-iconElement-icon.oo-ui-icon-close');
    }
    get table()
    {
        return $$('table tr');
    }
    async Login(username,password)
    {
        await $('#usr-login').click()
        await this.username.setValue(username);
        await this.password.setValue(password);
        await this.logIn.click()
       // await this.globalAction.waitForDisplayed()
    }
    async OpenFileList()
    {
        await this.globalAction.waitForDisplayed()
        await this.globalAction.click()

        await this.filelist.waitForDisplayed()
        await this.filelist.click()

        
    }
    async UploadClick(filePath)
    {
        await this.uploadBtn.click()
        await expect(browser).toHaveTitle("Upload - BlueSpice");

        //const filePath = '/home/vrinda/Downloads/download.jpeg'
        const remoteFilePath = await browser.uploadFile(filePath)
        await this.fileInput.setValue(remoteFilePath)
        browser.pause(2000)
        await $('.buttonField.oo-ui-layout.oo-ui-horizontalLayout').scrollIntoView()
        //await $("//span[@class='oo-ui-widget oo-ui-widget-enabled oo-ui-buttonElement oo-ui-buttonElement-framed oo-ui-labelElement oo-ui-flaggedElement-primary oo-ui-flaggedElement-progressive oo-ui-buttonWidget']//a[@role='button']").click();

        await $('.oo-ui-flaggedElement-progressive a.oo-ui-buttonElement-button').click()

        
    }
    async deleteFile()
    {
        await $('.oojsplus-data-gridWidget-table').waitForDisplayed()

        const row = await this.table;
        const lenBefore=row.length;
        console.log(lenBefore)

        await $('tbody tr:nth-child(1) td:last-child a.oo-ui-buttonElement-button').moveTo()
        await browser.pause(2000)
        await $('tbody tr:nth-child(1) td:last-child a.oo-ui-buttonElement-button').click()
        await browser.pause(2000)

        await $('.oo-ui-window-content-ready').waitForExist()
        await $('#standarddialogs-dlg-delete-btn-done a.oo-ui-buttonElement-button').click()

        await browser.waitUntil(async () => {
            const isPopupDisplayed = await $('.oo-ui-window-content-ready').isDisplayed();
            return !isPopupDisplayed;
        }, {
            timeout: 5000, // Timeout after 5 seconds
            timeoutMsg: 'Expected pop-up to be closed within 5 seconds'
        });

        await browser.pause(2000)
        
        const rowsAfterDeletion = await this.table;
        const lenAfter = rowsAfterDeletion.length;
        console.log(lenAfter)
        
        expectChai(lenAfter).to.be.equal(lenBefore - 1);
        await browser.pause(3000)
    }
}
// new className
module.exports=new BlueSpice();