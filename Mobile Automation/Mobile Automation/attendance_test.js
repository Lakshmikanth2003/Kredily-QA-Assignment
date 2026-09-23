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
    await driver.pause(8000);

    const source = await driver.getPageSource();

    if (
        source.includes("Attendance") ||
        source.includes("Shift") ||
        source.includes("Clocked out") ||
        source.includes("Clocked in")
    ) {
        console.log("PASS: Attendance/Home screen is displayed.");
    } else {
        console.log("FAIL: Attendance/Home screen was not detected.");
    }

    if (
        source.includes("Shift 9:30 AM") ||
        source.includes("Wed 23 Sep")
    ) {
        console.log("PASS: Current attendance information is displayed.");
    } else {
        console.log("WARNING: Expected attendance details were not detected.");
    }

    await driver.deleteSession();
    console.log("ATTENDANCE TEST COMPLETED.");
}

main().catch((error) => {
    console.error("TEST ERROR:", error);
    process.exit(1);
});
