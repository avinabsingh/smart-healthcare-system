const { Builder, By } = require("selenium-webdriver");
const fs = require("fs");

async function regressionTest() {
    let driver = await new Builder().forBrowser("chrome").build();

    try {
        console.log("Starting Regression Testing...");
        console.log("Re-running login test to ensure functionality is not broken...");

        // Open website
        await driver.get("http://localhost:3000");
        await driver.sleep(2000);

        console.log("Capturing Login Page screenshot...");
        let img1 = await driver.takeScreenshot();
        fs.writeFileSync("Regression_Test_1_Login_Page.png", img1, "base64");

        // Locate fields
        let email = await driver.findElement(
            By.xpath("//input[@placeholder='Email Address']")
        );

        let password = await driver.findElement(
            By.xpath("//input[@placeholder='Password']")
        );

        console.log("Entering valid credentials...");
        await email.sendKeys("test@gmail.com");
        await password.sendKeys("123456");

        console.log("Capturing Filled Form screenshot...");
        let img2 = await driver.takeScreenshot();
        fs.writeFileSync("Regression_Test_2_Filled_Form.png", img2, "base64");

        // Click login
        let loginBtn = await driver.findElement(
            By.xpath("//button[contains(text(),'Login')]")
        );

        console.log("Clicking login button...");
        await loginBtn.click();

        await driver.sleep(4000);

        console.log("Capturing Result screenshot...");
        let img3 = await driver.takeScreenshot();
        fs.writeFileSync("Regression_Test_3_Result.png", img3, "base64");

        // Validation
        let currentUrl = await driver.getCurrentUrl();
        console.log("Current URL: " + currentUrl);

        if (currentUrl.includes("dashboard")) {
            console.log("Regression Test Passed: Login functionality is working correctly.");
        } else {
            console.log("Regression Test Failed: Login functionality is not working.");
        }

        console.log("Regression Testing Completed Successfully.");

    } catch (err) {
        console.log("Error during regression testing: ", err);
    } finally {
        await driver.quit();
    }
}

regressionTest();