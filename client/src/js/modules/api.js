function sendVerificationCode(phoneNumber) {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phoneNumber }),
    };

    fetch('/send-verification', options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(responseData => console.log(responseData))
        .catch(error => console.error('Error sending verification code:', error.message || error));
}

async function confirmOTP(phoneNumber, otp) {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phoneNumber, code: otp }),
    };

    return fetch('/confirm-otp-code', options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.valid) {
                console.log('Verification code is approved');
                return true;
            } else {
                console.error('Invalid OTP code');
                return false;
            }
        })
        .catch(error => {
            console.error('Error confirming OTP code:', error.message || error);
            return false;
        });
}

async function getCityAndState(zipCode) {
    const apiKey = 'pk.2fb60327e6f2ca10803e8b132537649e'
    const options = { method: 'GET', headers: { accept: 'application/json' } };

    return fetch(`https://us1.locationiq.com/v1/search/postalcode?postalcode=${zipCode}&countrycodes=us%2Cca&format=json&addressdetails=1&statecode=1&key=${apiKey}`, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data); 
            return data; 
        })
        .catch(err => {
            console.error(err);
            throw err; 
        });
}

