//HANDLING NEXT STEPS IN FORM

function navigateStep(nextStep, currentStep) {

    hideAllSteps(currentStep);
    document.getElementById(`step-${nextStep}`).style.display = "flex";

    if (isStepVisible(3)) {
        activateLoader();
    }

    if (isStepVisible(6)) {
        const headerPhoneLink = document.querySelector('.form__header__phone');
        const companiesFooter = document.querySelector('.companies');

        headerPhoneLink.style.display = "none";
        companiesFooter.style.display = "none";
    }
}

function hideAllSteps(currentStep) {
    let step = document.querySelector(`.step-${currentStep}`);
    step.style.display = "none"
}


// Function to simulate loading with a delay
function simulateLoading(delay) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, delay);
    });
}

// LOADER

function activateLoader() {
    const loaderContainer = document.querySelector('.loader__container');
    const loader = document.querySelector('.loader');
    const loaderSuccess = document.querySelector('.success');

    simulateLoading(5000)
        .then(() => {
            loaderContainer.removeChild(loader);
            loaderSuccess.style.display = 'flex';
            return simulateLoading(2000);
        })
        .then(() => {
            // navigateStep(4, 3);
        })
        .catch(error => {
            console.error('An error occurred:', error);
        });


}
