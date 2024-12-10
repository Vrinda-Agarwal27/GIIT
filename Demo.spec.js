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
        const filePath='test/specs/images/download.jpeg'
        await BlueSpice.OpenFileList()
        await expect(browser).toHaveTitle("File list - BlueSpice");
        await BlueSpice.UploadClick(filePath);
        await expect($("#ooui-7")).toHaveText('Upload complete')
        await browser.pause(1000)
        await BlueSpice.close.click();
    })

    it("File delete",async()=>
        {
        await BlueSpice.OpenFileList();
        await expect(browser).toHaveTitle("File list - BlueSpice");
        await BlueSpice.deleteFile();
    })
})