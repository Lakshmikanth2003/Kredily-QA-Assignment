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

    const leaveItems = await driver.$$(
        'android=new UiSelector().text("Leave")'
    );

    console.log("Leave elements found:", leaveItems.length);

    if (leaveItems.length === 0) {
        console.log("FAIL: Leave menu item was not found.");
        await driver.deleteSession();
        return;
    }

    const leaveButton = leaveItems[leaveItems.length - 1];

    await leaveButton.click();
    console.log("PASS: Leave menu item clicked.");

    await driver.pause(3000);

    const source = await driver.getPageSource();

    if (
        source.includes("Available this year") ||
        source.includes("My requests") ||
        source.includes("Balances")
    ) {
        console.log("PASS: Leave screen opened.");
        console.log("PASS: Leave balances/request section detected.");
    } else {
        console.log("FAIL: Leave screen was not detected.");
    }

    await driver.deleteSession();
    console.log("LEAVE TEST COMPLETED.");
}

main().catch((error) => {
    console.error("TEST ERROR:", error);
    process.exit(1);
});
