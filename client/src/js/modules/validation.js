const phoneInputField = document.querySelector("#phone");
const phoneInput = window.intlTelInput(phoneInputField, {
    utilsScript: "src/js/intlTelInput/utils.js",
});

//TODO: Refactor code

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

function validateFullName(input, errorId, updateFuntion) {
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
}

function validateEmail(input, errorId, updateFunction) {
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

}

function validatePhone(errorId, updateFunction) {
    const phoneNumber = phoneInput.getNumber();
    const isValid = phoneInput.isValidNumber();

    const errorMessage = "Please enter a valid phone number.";
    const errorSpan = document.getElementById(errorId);

    if (!isValid) {
        errorSpan.textContent = errorMessage;
        updateFunction("");
    } else {
        errorSpan.textContent = "";
        updateFunction(phoneNumber);
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

