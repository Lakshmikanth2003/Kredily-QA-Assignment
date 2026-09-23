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

    const source = await driver.getPageSource();

    if (source.includes("Good afternoon") ||
        source.includes("Good evening") ||
        source.includes("Good morning")) {

        console.log("PASS: Kredily is already logged in.");
        console.log("PASS: Login session is active.");

    } else if (source.includes("Login") ||
               source.includes("Email") ||
               source.includes("Password")) {

        console.log("Login screen detected.");

    } else {
        console.log("WARNING: Login screen or Home screen not detected.");
    }

    await driver.deleteSession();
    console.log("LOGIN TEST COMPLETED.");
}

main().catch((error) => {
    console.error("TEST ERROR:", error);
    process.exit(1);
});
