function isStepVisible(stepNumber) {
    const step = document.getElementById(`step-${stepNumber}`);
    return window.getComputedStyle(step).display === 'flex';
}

function collectOTP() {
    let otp = "";
    for (let i = 1; i <= 4; i++) {
        let digit = document.getElementById(`otp-${i}`).value;
        otp += digit;
    }

    return otp;
}