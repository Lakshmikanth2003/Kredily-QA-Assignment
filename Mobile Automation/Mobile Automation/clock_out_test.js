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
    console.log("APP ACTIVATED");

    let source = "";

    for (let i = 0; i < 6; i++) {
        await driver.pause(5000);
        source = await driver.getPageSource();

        if (source.includes('resource-id="hm-clockbtn"')) {
            console.log("PASS: Clock Out button found.");
            break;
        }

        console.log("Waiting for Clock Out button...");
    }

    if (!source.includes('resource-id="hm-clockbtn"')) {
        console.log("FAIL: Clock Out button was not found.");
        await driver.deleteSession();
        return;
    }

    await driver.execute("mobile: clickGesture", {
        x: 828,
        y: 521
    });

    console.log("PASS: First Clock Out tapped.");

    await driver.pause(3000);
    source = await driver.getPageSource();

    if (source.includes("Verify &amp; confirm")) {
        console.log("PASS: Verify & Confirm screen displayed.");
    } else {
        console.log("FAIL: Verify & Confirm screen not displayed.");
        await driver.deleteSession();
        return;
    }

    const finalButton = await driver.$(
        'android=new UiSelector().description("✓ Clock Out")'
    );

    await finalButton.waitForDisplayed({ timeout: 10000 });
    console.log("PASS: Final Clock Out button found.");

    await finalButton.click();
    console.log("PASS: Final Clock Out clicked.");

    await driver.pause(4000);
    source = await driver.getPageSource();

    if (
        source.includes("Clocked out") ||
        source.includes("Day recorded") ||
        source.includes("Clock In")
    ) {
        console.log("PASS: Clock Out automation completed.");
    } else {
        console.log("WARNING: Final state not detected.");
    }

    await driver.deleteSession();
}

main().catch((error) => {
    console.error("TEST ERROR:", error);
    process.exit(1);
});
