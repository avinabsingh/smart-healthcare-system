const { Builder, By } = require("selenium-webdriver");
const fs = require("fs");

async function runTest(emailValue, passwordValue, testName) {
    let driver = await new Builder().forBrowser("chrome").build();

    try {
        console.log("\nRunning " + testName + "...");

        await driver.get("http://localhost:3000");
        await driver.sleep(2000);

        // Screenshot - Login Page
        let img1 = await driver.takeScreenshot();
        fs.writeFileSync(testName + "_1_Login_Page.png", img1, "base64");

        // Locate fields
        let email = await driver.findElement(
            By.xpath("//input[@placeholder='Email Address']")
        );

        let password = await driver.findElement(
            By.xpath("//input[@placeholder='Password']")
        );

        // Enter values
        await email.sendKeys(emailValue);
        await password.sendKeys(passwordValue);

        // Screenshot - Filled Form
        let img2 = await driver.takeScreenshot();
        fs.writeFileSync(testName + "_2_Filled_Form.png", img2, "base64");

        // Click login
        let loginBtn = await driver.findElement(
            By.xpath("//button[contains(text(),'Login')]")
        );

        await loginBtn.click();
        await driver.sleep(3000);

        // Handle alert (for invalid cases)
        try {
            let alert = await driver.switchTo().alert();
            let alertText = await alert.getText();
            console.log(testName + " Alert Message: " + alertText);

            await alert.accept();

            console.log(testName + " PASSED (Invalid Login handled correctly)");

        } catch (e) {
            // No alert → check success
            let currentUrl = await driver.getCurrentUrl();
            console.log(testName + " URL: " + currentUrl);

            if (currentUrl.includes("dashboard")) {
                console.log(testName + " PASSED (Login Successful)");
            } else {
                console.log(testName + " FAILED");
            }
        }

        // Screenshot - Result
        let img3 = await driver.takeScreenshot();
        fs.writeFileSync(testName + "_3_Result.png", img3, "base64");

    } catch (err) {
        console.log("Error in " + testName + ": ", err);
    } finally {
        await driver.quit();
    }
}

// Run all test cases
(async () => {

    // Test Case 1: Valid Login
    await runTest("test@gmail.com", "123456", "Test_Valid_Login");

    // Test Case 2: Invalid Username
    await runTest("wrong@gmail.com", "123456", "Test_Invalid_Username");

    // Test Case 3: Invalid Password
    await runTest("test@gmail.com", "wrongpass", "Test_Invalid_Password");

})();