function isStepVisible(stepNumber) {
    const step = document.getElementById(`step-${stepNumber}`);
    return window.getComputedStyle(step).display === 'flex';
}