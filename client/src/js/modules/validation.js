const phoneInputField = document.querySelector("#phone");
const phoneInput = window.intlTelInput(phoneInputField, {
    onlyCountries: ["us", "ca"],
    utilsScript: "src/js/intlTelInput/utils.js",
});

//TODO: Refactor code

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

function validateZipCode(input, errorId, updateFunction) {
    let timeoutId;

    const validation = () => {
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
    
        if (!zipCode) {
            errorElement.textContent = "";
        }
    }

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
        validation()
    }, 1000)
}

function validateFullName(input, errorId, updateFuntion) {
    let timeoutId;

    const validation = () => {
        const validationRegex = /^[A-Za-z\s'-]+$/;
        const errorMessage = "Please enter a valid name"
    
        const fullNameInput = document.getElementById(input.id);
        const errorSpan = document.getElementById(errorId)
    
        const fullName = fullNameInput.value;
    
        if (!validationRegex.test(fullName)) {
            errorSpan.textContent = errorMessage;
            updateFuntion("", input.id);
        } else {
            errorSpan.textContent = "";
            updateFuntion(fullName);
        }
    
        if (!fullName) {
            errorSpan.textContent = "";
        }
    }

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
        validation();
    }, 1000)
}

function validateEmail(input, errorId, updateFunction) {
    let timeoutId;

    const validation = () => {
        const validationRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        const errorMessage = "Please enter a valid email";
    
        const emailInput = document.getElementById(input.id);
        const errorSpan = document.getElementById(errorId);
    
        const email = emailInput.value
    
        if (!validationRegex.test(email)) {
            errorSpan.textContent = errorMessage;
            updateFunction("", input.id);
        } else {
            errorSpan.textContent = "";
            updateFunction(email);
        }
    
        if (!email) {
            errorSpan.textContent = "";
        }
    }

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
        validation()
    }, 1000)
}

function validatePhone(errorId, updateFunction) {
    let timeoutId;

    const validation = () => {
        const phoneNumber = phoneInput.getNumber();
        const isValid = phoneInput.isValidNumber();
        const dynamicField = document.querySelector('.phone-number-field');
    
        const errorMessage = "Please enter a valid phone number.";
        const errorSpan = document.getElementById(errorId);
    
        if (!isValid) {
            errorSpan.textContent = errorMessage;
            updateFunction("");
        } else {
            dynamicField.textContent = phoneNumber;
            errorSpan.textContent = "";
            updateFunction(phoneNumber);
        }
    
        if (!phoneInput) {
            errorSpan.textContent = "";
        }
    }

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
        validation()
    }, 1000)
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
            } else {
                errorSpan.textContent = "";
            }
        }
    } else {
        navigateStep(3, 2)
    }
}

function validateFourthStep() {
    if (!formData.email || !formData.fullName || !formData.phone) {
        const filedsToValidate = [
            {
                name: 'email',
                errorSpan: document.getElementById('email-error'),
                errorMessage: "Please enter a valid name."
            },
            {
                name: 'fullName',
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
            } else {
                errorSpan.textContent = "";
            }
        }
    } else {
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
}

