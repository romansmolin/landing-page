// const phoneInputField = document.querySelector("#phone");
// const phoneInput = window.intlTelInput(phoneInputField, {
//     utilsScript: "js/intlTelInput/utils.js",
// });

function handleChoiceButtonClick(button, updateFunction) {
    const data = button.getAttribute("data-type");
    updateFunction(data);
}

function validateZipCode(input, errorId, updateFunction) {
    const validationRegex = /^[0-9]*$/i;
    const errorMessage = "Please enter a valid 5-digit zip code";
    const length = 5;

    const zipCodeInput = document.getElementById(input.id);
    const errorElement = document.getElementById(errorId);

    const zipCode = zipCodeInput.value;

    if (!validationRegex.test(zipCode) || zipCode.length !== length) {
        errorElement.textContent = errorMessage;
        updateFunction("", input.id);
    } else {
        errorElement.textContent = "";
        updateFunction(zipCode, input.id);
    }
}

function validateFirstStep() {
    if (!formData.dzip || !formData.ozip || !formData.propertyType) {
        const filedsToValidate = [
            {
                name: 'propertyType',
                errorSpan: document.getElementById('property-error'),
                errorMessage: 'You Need To Choose One Option.'
            },
            {
                name: 'ozip',
                errorSpan: document.getElementById('ozip-error'),
                errorMessage: 'Please enter Moving From Zip Code.'
            },
            {
                name: 'dzip',
                errorSpan: document.getElementById('dzip-error'),
                errorMessage: 'Please enter Moving To Zip Code.'
            },
        ]

        for (const { name, errorSpan, errorMessage } of filedsToValidate) {
            if (!formData[name]) {
                errorSpan.textContent = errorMessage;
            } else {
                errorSpan.textContent = "";
            }
        }
    } else {
        navigateStep(2, 1)
    }
}

