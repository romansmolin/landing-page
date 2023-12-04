// const phoneInputField = document.querySelector("#phone");
// const phoneInput = window.intlTelInput(phoneInputField, {
//     utilsScript: "js/intlTelInput/utils.js",
// });

function handleChoiceButtonClick(button, updateFunction) {
    const data = button.getAttribute("data-type");
    updateFunction(data);
}

function validateZipCode(input, errorId) {
    const validationRegex = /^[0-9]*$/i;
    const errorMessage = "Please enter a valid 5-digit zip code";
    const length = 5;

    const zipCodeInput = document.getElementById(input.id);
    const errorElement = document.getElementById(errorId);

    const zipCode = zipCodeInput.value;

    if (!validationRegex.test(zipCode) || zipCode.length !== length) {
        errorElement.textContent = errorMessage;
    } else {
        errorElement.textContent = "";
    }
}

function validateFirstStep() {
    console.log(formData)
}