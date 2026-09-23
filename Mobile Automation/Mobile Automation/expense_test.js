const { remote } = require("webdriverio");

async function main() {
    const driver = await remote({
        hostname: "127.0.0.1",
        port: 4723,
        path: "/",
        capabilities: {
            platformName: "Android",
            "appium:automationName": "UiAutomator2",
            "appium:deviceName": "Android",
            "appium:appPackage": "com.kredily.mobile",
            "appium:appActivity": "com.kredily.mobile.MainActivity",
            "appium:noReset": true,
            "appium:ignoreHiddenApiPolicyError": true
        }
    });

    console.log("SESSION STARTED");

    await driver.activateApp("com.kredily.mobile");
    await driver.pause(5000);

    const moreButton = await driver.$(
        'android=new UiSelector().description("More")'
    );

    await moreButton.click();
    console.log("PASS: More menu opened.");

    await driver.pause(2000);

    const expenseButton = await driver.$(
        'android=new UiSelector().text("Expense").instance(0)'
    );

    await expenseButton.click();
    console.log("PASS: Expense menu item clicked.");

    await driver.pause(3000);

    const source = await driver.getPageSource();

    if (
        source.includes("New claim") ||
        source.includes("New Claim") ||
        source.includes("Pending") ||
        source.includes("Approved")
    ) {
        console.log("PASS: Expense screen opened.");
        console.log("PASS: Expense sections detected.");
    } else {
        console.log("FAIL: Expense screen was not detected.");
    }

    await driver.deleteSession();
    console.log("EXPENSE TEST COMPLETED.");
}

main().catch((error) => {
    console.error("TEST ERROR:", error);
    process.exit(1);
});
