# AI-Assisted QA

## 1. Purpose

AI assistance was used during the Kredily HRMS mobile QA assignment to support test-case design, bug-report structure, and mobile automation development.

AI was used as a supporting tool. Final test execution, validation, bug confirmation, and result recording were performed manually.

## 2. AI Prompt Used

### Test Case Generation

Prompt used:

> Create functional test cases for a mobile HRMS application covering attendance, leave, expense, payslips, holidays, directory, approvals, profile, and other major workflows. Include positive, negative, and edge-case scenarios with test steps and expected results.

### Bug Report Structure

Prompt used:

> Create a structured bug report format for mobile application testing including bug ID, title, steps to reproduce, expected result, actual result, severity, status, and evidence.

### Mobile Automation

Prompt used:

> Create Appium WebdriverIO JavaScript automation examples for important HRMS mobile journeys such as login/session validation, attendance, clock-out, leave, and expense.

## 3. AI Output Used

The AI-generated suggestions were used as an initial draft for:

- Functional test scenarios
- Test-case structure
- Bug-report structure
- Appium/WebdriverIO automation scripts
- QA documentation structure

## 4. Human Review and Changes

All AI-generated content was reviewed and validated against the actual Kredily Android application.

The following changes were made during manual validation:

- Test cases were adjusted according to the actual screens and workflows available in the APK.
- Only genuinely observed application issues were reported as bugs.
- Two confirmed bugs were documented:
  - Incorrect Clock-In confirmation message.
  - Incorrect Clock-Out confirmation message.
- Additional bugs were not fabricated when they could not be confirmed.
- Automation locators were corrected when an initial locator selected the wrong UI element.
- The Leave automation was updated after manual inspection of the More menu.
- Automation scripts were executed on a physical Android device.

## 5. Validation Performed

AI-generated test scenarios and automation were validated against the actual application.

Validation included:

- Attendance and clock-in/clock-out workflows
- Leave workflow
- Expense workflow
- Attendance screen validation
- Mobile UI navigation
- Automation execution using Appium and UiAutomator2

The final test results and bugs were based on observed application behavior rather than AI-generated assumptions.

## 6. API Testing Assistance

AI was also used to help structure API test scenarios and a Postman collection based on API routes identified from the Android APK.

The production API host and authentication details could not be reliably obtained during testing, so the API requests were documented as prepared test scenarios rather than claiming successful live execution.

## 7. Conclusion

AI was used to accelerate QA documentation, test design, and automation development. All important outputs were manually reviewed and validated before inclusion in the final assignment.
