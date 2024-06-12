const cardholderInput = document.querySelector('[name="cardholder-name"]'),
      cardholderName = document.querySelector('.cardholder'),
      cardNumberInput = document.querySelector('[name="card-number"]'),
      cardNumber = document.querySelector('.card-number'),
      cardMonthInput = document.querySelector('[name="mm"]'),
      cardMonth = document.querySelector('.month'),
      cardYearInput = document.querySelector('[name="yy"]'),
      cardYear = document.querySelector('.year'),
      cardCvcInput = document.querySelector('[name="cvc"]'),
      cardCvc = document.querySelector('.cvc'),
      errors = document.querySelectorAll('.error'),
      btnSubmit = document.querySelector('.submit'),
      inputs = document.querySelectorAll('input');

const handleChangeErrorText = (str, index) => { 
    errors[index].innerText = str;
};

for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('input', () => {
        if (i === 0) {
            cardholderName.innerText = cardholderInput.value;
            const regExp = /\d/gim;

            if (regExp.test(cardholderInput.value)) {
                errors[i].classList.add('error-show');
                inputs[i].classList.add('error-input');
                handleChangeErrorText("Wrong format, letters only", i);
            } else {
                errors[i].classList.remove('error-show');
                inputs[i].classList.remove('error-input');
            }

            if (!inputs[i].value) {
                cardholderName.innerText = 'Mila Starovoit';
            }

        } else if (i === 1) {
            cardNumber.innerText = "";
            let formattedNumber = "";
        
            for (let j = 0; j < inputs[i].value.length; j++) {
                if (j !== 0 && (j % 4 === 0)) {
                    formattedNumber += " ";
                } 
                formattedNumber += inputs[i].value[j];
            }
            cardNumber.innerText = formattedNumber;
        
            if (isNaN(+inputs[i].value)) {
                errors[i].classList.add('error-show');
                inputs[i].classList.add('error-input');
                handleChangeErrorText("Wrong format, numbers only", i);
            } else {
                errors[i].classList.remove('error-show');
                inputs[i].classList.remove('error-input');
            }
        
            if (!inputs[i].value) {
                cardNumber.innerText = '0000 0000 0000 0000';
            }

        } else if (i === 2) {
            cardMonth.innerText = inputs[i].value;

            if (isNaN(+inputs[i].value)) {
                inputs[i].classList.add('error-input');
                errors[i].classList.add('error-show');
                handleChangeErrorText("Wrong format, numbers only", i);
            } else if (+inputs[i].value > 12) {
                inputs[i].classList.add('error-input');
                errors[i].classList.add('error-show');
                handleChangeErrorText("Must be lower then 12", i);
            } else {
                inputs[i].classList.remove('error-input');
                errors[i].classList.remove('error-show');
            }   
        
            if (!inputs[i].value) {
                cardMonth.innerText = '00';
            }

        } else if (i === 3) {
            cardYear.innerText = inputs[i].value;

            if (isNaN(+inputs[i].value)) {
                errors[i].classList.add('error-show');
                inputs[i].classList.add('error-input');
                handleChangeErrorText("Wrong format, numbers only", i);
            } else {
                errors[i].classList.remove('error-show');
                inputs[i].classList.remove('error-input');
            }

            if (!inputs[i].value) {
                cardYear.innerText = '00';
            }
        } else if (i === 4) {
            cardCvc.innerText = cardCvcInput.value;

            if (isNaN(+inputs[i].value)) {
                errors[i].classList.add('error-show');
                inputs[i].classList.add('error-input');
                handleChangeErrorText("Wrong format, numbers only", i);
            } else {
                errors[i].classList.remove('error-show');
                inputs[i].classList.remove('error-input');
            }

            if (!inputs[i].value) {
                cardCvc.innerText = '000';
            }
        }
    });    

    btnSubmit.addEventListener('click', (e) => {
        e.preventDefault();

        if (!inputs[i].value) {
            inputs[i].classList.add('error-input');
            errors[i].classList.add('error-show');
            handleChangeErrorText("Can't be blank", i);
            
        } else {
            errors[i].classList.remove('error-show');
            inputs[i].classList.remove('error-input');
            const form = document.querySelector('form'),
                complitedState = document.querySelector('.complited-state');

            form.classList.add('d-none');
            complitedState.classList.remove('d-none');
        }
    });
}
