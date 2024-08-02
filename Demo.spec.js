const expectChai=require('chai').expect
const BlueSpice=require('./pageObjs/BlueSpice')
describe("Demo test",function()
{
    before(async ()=>
    {
        browser.url('http://localhost/blue2/mediawiki/index.php')
        browser.maximizeWindow();
        await BlueSpice.cookie.waitForDisplayed();
        await BlueSpice.Accept.click()
    });

    afterEach(()=>
    {
        browser.refresh();
    });
    it('login',async()=>{
        await BlueSpice.Login("Vrinda","HelloWorld123")
        await expect(BlueSpice.notification).toBeDisplayed()
    });

    it('File Upload',async()=>{
        
        const filePath = '/home/vrinda/Downloads/1722315414543.jpg'
        await BlueSpice.OpenFileList()
        await BlueSpice.UploadClick(filePath);
        await browser.pause(1000)
        await $('.oo-ui-iconElement-icon.oo-ui-icon-close').click();
    })

    it("File delete",async()=>
        {
        await BlueSpice.OpenFileList();
        await BlueSpice.deleteFile();
        // await $('.oojsplus-data-gridWidget-table').waitForDisplayed()
        // await browser.pause(2000)

        // const row = await $$('table tr');
        // const lenBefore=row.length;
        // console.log(lenBefore)
        // await $('tbody tr:nth-child(1) td:last-child a.oo-ui-buttonElement-button').moveTo()
        // await browser.pause(2000)
        // await $('tbody tr:nth-child(1) td:last-child a.oo-ui-buttonElement-button').click()
        // await browser.pause(2000)

        // await $('.oo-ui-window-content-ready').waitForExist()
        // await $('#standarddialogs-dlg-delete-btn-done a.oo-ui-buttonElement-button').click()

        // await browser.waitUntil(async () => {
        //     const isPopupDisplayed = await $('.oo-ui-window-content-ready').isDisplayed();
        //     return !isPopupDisplayed;
        // }, {
        //     timeout: 5000, // Timeout after 5 seconds
        //     timeoutMsg: 'Expected pop-up to be closed within 5 seconds'
        // });

        // await browser.pause(2000)
        
        // const rowsAfterDeletion = await $$('table tr');
        // const lenAfter = rowsAfterDeletion.length;
        // console.log(lenAfter)
        
        // expectChai(lenAfter).to.be.equal(lenBefore - 1);
        // await browser.pause(3000)
    })
})