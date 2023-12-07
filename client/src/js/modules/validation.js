const phoneInputField = document.querySelector("#phone");
const phoneInput = window.intlTelInput(phoneInputField, {
    onlyCountries: ["us", "ca", "lv"],
    utilsScript: "src/js/intlTelInput/utils.js",
});

function handleChoiceButtonClick(button, updateFunction, errorId, dynamicSpan) {
    const errorSpan = document.getElementById(errorId);
    const dynamicFields = document.querySelectorAll(dynamicSpan);

    if (errorSpan.textContent) {
        errorSpan.textContent = "";
    }

    const container = button.closest('.container'); // Find the closest container
    const buttonsInContainer = container.querySelectorAll('.button'); // Select buttons only within this container

    buttonsInContainer.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');

    const data = button.getAttribute("data-type");

    dynamicFields.forEach(field => {
        field.textContent = data;
    })

    updateFunction(data);
}

function validateInput(input, errorId, updateFunction, validationRegex, errorMessage) {
    const errorSpan = document.getElementById(errorId);
    const condition = !validationRegex.test(input.value);

    checkIfValid(condition, input, input.value, errorSpan, errorMessage, updateFunction)
}

function checkIfValid(condition, input, inputValue, errorSpan, errorMessage, updateFunction) {

    if (condition) {
        errorSpan.textContent = errorMessage;
        input.classList.add("wrong")
        updateFunction(input.id, "");
        setValidationIcon(input.id, false)
    } else {
        input.classList.remove("wrong")
        errorSpan.textContent = "";
        updateFunction(input.id, inputValue);
        setValidationIcon(input.id, true)
    }

    if (!inputValue) {
        errorSpan.textContent = "";
    }
}

function validateZipCode(input, errorId, updateFunction) {
    const errorMessage = "Please enter a valid 5-digit US or CA zip code";
    const minLength = 5;

    const zipCode = input.value;
    const errorSpan = document.getElementById(errorId);

    const usZipCodePattern = /^\d{5}(?:-\d{4})?$/;
    const caPostalCodePattern = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;

    const isUSZipCode = usZipCodePattern.test(zipCode);
    const isCAPostalCode = caPostalCodePattern.test(zipCode);

    const condition = !(isUSZipCode || isCAPostalCode)
    checkIfValid(condition, input, input.value, errorSpan, errorMessage, updateFunction);

}

function validateFullName(input, errorId, updateFuntion) {
    const validationRegex = /^[A-Za-z\s'-]+$/;
    const errorMessage = "Please enter a valid name";

    validateInput(input, errorId, updateFuntion, validationRegex, errorMessage);
}

function validateEmail(input, errorId, updateFunction) {
    const validationRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    const errorMessage = "Please enter a valid email";

    validateInput(input, errorId, updateFunction, validationRegex, errorMessage);
}

function validatePhone(errorId, updateFunction) {
    const phoneNumber = phoneInput.getNumber();
    const isValid = phoneInput.isValidNumber();

    const errorMessage = "Please enter a valid phone number.";
    const errorSpan = document.getElementById(errorId);

    const inputField = document.getElementById('phone')

    const condition = !isValid;

    clearTimeout(timeoutId);

    checkIfValid(condition, inputField, phoneNumber, errorSpan, errorMessage, updateFunction)
}

async function validateFirstStep() {

    const movingToDynamicFields = document.querySelectorAll('.dzip-field')
    const movingFromDynamicFields = document.querySelectorAll('.ozip-field')

    const updateDynamicFields = (response, dynamicFields) => {
        const town = response[0].address.county;
        const stateCode = response[0].address.state_code.toUpperCase();

        dynamicFields.forEach(item => {
            item.textContent = `${town}, ${stateCode}`;
        });
    }

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
                if (name !== 'propertyType') {
                    setValidationIcon(name, false)
                }
            } else {
                errorSpan.textContent = "";
                if (name !== 'propertyType') {
                    setValidationIcon(name, true)
                }
            }
        }
    } else {

        getCityAndState(formData.dzip)
            .then(response => updateDynamicFields(response, movingToDynamicFields))
            .catch(error => console.error("Error:", error));

        getCityAndState(formData.ozip)
            .then(response => updateDynamicFields(response, movingFromDynamicFields))
            .catch(error => console.error("Error:", error));

        navigateStep(2, 1)
    }
}

function validateSecondStep() {
    if (!formData.movesize || !formData.movedte) {
        const filedsToValidate = [
            {
                name: 'movedte',
                errorSpan: document.getElementById('date-error'),
                errorMessage: 'You Need To Choose One Option.'
            },
            {
                name: 'movesize',
                errorSpan: document.getElementById('size-error'),
                errorMessage: 'You Need To Choose One Option.'
            },
        ]

        for (const { name, errorSpan, errorMessage } of filedsToValidate) {
            if (!formData[name]) {
                errorSpan.textContent = errorMessage;
                setValidationIcon(name, false)
            } else {
                errorSpan.textContent = "";
                setValidationIcon(name, true)
            }
        }
    } else {
        navigateStep(3, 2)
    }
}

function validateFourthStep() {
    const phoneDynamicField = document.querySelector('.phone-number-field');

    if (!formData.email || !formData.fullname || !formData.phone) {
        const filedsToValidate = [
            {
                name: 'email',
                errorSpan: document.getElementById('email-error'),
                errorMessage: "Please enter a valid name."
            },
            {
                name: 'fullname',
                errorSpan: document.getElementById('fullname-error'),
                errorMessage: 'You Need To Choose One Option.'
            },
            {
                name: 'phone',
                errorSpan: document.getElementById('phone-error'),
                errorMessage: "Please enter a valid phone number."
            },
        ]

        for (const { name, errorSpan, errorMessage } of filedsToValidate) {
            if (!formData[name]) {
                errorSpan.textContent = errorMessage;
                setValidationIcon(name, false)
            } else {
                errorSpan.textContent = "";
                setValidationIcon(name, true)
            }
        }
    } else {
        phoneDynamicField.textContent = formData.phone;

        sendVerificationCode(formData.phone)
        navigateStep(5, 4)
    }
}

async function validateOtp(errorId) {
    const otp = collectOTP();
    const otpInputs = document.querySelectorAll('.otp-input');
    const errorSpan = document.getElementById(errorId);


    if (otp && otp.length === 4) {
        const isOTPValid = await confirmOTP(formData.phone, otp);

        if (isOTPValid) {
            errorSpan.textContent = "";
            navigateStep(6, 5)
        }
    } else {
        otpInputs.forEach((input) => {
            input.classList.add("error");
        });
        errorSpan.textContent = "Please enter a valid PIN code.";
    }

    console.log(formData);
}