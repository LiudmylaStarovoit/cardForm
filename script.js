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
      errorsEmpty = document.querySelectorAll('.error-empty'),
      btnSubmit = document.querySelector('.submit'),
      inputs = document.querySelectorAll('input');


cardholderInput.addEventListener('input', () => {
    cardholderName.innerText = cardholderInput.value;
    const regExp = /\d/gim;

    if (regExp.test(cardholderInput.value)){
        errors[0].classList.add('error-show');
        cardholderInput.classList.add('error-input');
    } else {
        errors[0].classList.remove('error-show');
        cardholderInput.classList.remove('error-input');
    }

    if (cardholderInput.value.length === 0) {
        cardholderName.innerText = 'Mila Starovoit';
    }
});

cardNumberInput.addEventListener('input', () => {
    cardNumber.innerText = "";
    let formattedNumber = "";

    for (let i = 0; i < cardNumberInput.value.length; i++) {
        if (i !== 0 && (i % 4 === 0)) {
            formattedNumber += " ";
        } 
        formattedNumber += cardNumberInput.value[i];
    }
    cardNumber.innerText = formattedNumber;

    if (isNaN(+cardNumberInput.value)) {
        errors[1].classList.add('error-show');
        cardNumberInput.classList.add('error-input');
    } else {
        errors[1].classList.remove('error-show');
        cardNumberInput.classList.remove('error-input');
    }

    if (cardNumberInput.value.length === 0) {
        cardNumber.innerText = '0000 0000 0000 0000';
    }
});

cardMonthInput.addEventListener('input', () => {
    cardMonth.innerText = cardMonthInput.value;

    if (isNaN(+cardMonthInput.value)) {
        errors[2].classList.add('error-show');
        cardMonthInput.classList.add('error-input');
    } else {
        cardMonthInput.classList.remove('error-input');
    } 

    if (!isNaN(+cardMonthInput.value) && !isNaN(+cardYearInput.value)) {
        errors[2].classList.remove('error-show');
    }

    if (cardMonthInput.value !== '' && cardYearInput.value !== '') {
        errorsEmpty[2].classList.remove('error-empty-show');
    }

    if (cardMonthInput.value.length === 0) {
        cardMonth.innerText = '00';
    }
});

cardYearInput.addEventListener('input', () => {
    cardYear.innerText = cardYearInput.value;

    if (isNaN(+cardYearInput.value)) {
        errors[2].classList.add('error-show');
        cardYearInput.classList.add('error-input');
    } else {
        cardYearInput.classList.remove('error-input');
    }

    if (!isNaN(+cardMonthInput.value) && !isNaN(+cardYearInput.value)) {
        errors[2].classList.remove('error-show');
    }

    if (cardMonthInput.value !== '' && cardYearInput.value !== '') {
        errorsEmpty[2].classList.remove('error-empty-show');
    }

    if (cardYearInput.value.length === 0) {
        cardYear.innerText = '00';
    }
});

cardCvcInput.addEventListener('input', () => {
    cardCvc.innerText = cardCvcInput.value;

    if (isNaN(+cardCvcInput.value)) {
        errors[3].classList.add('error-show');
        cardCvcInput.classList.add('error-input');
    } else {
        errors[3].classList.remove('error-show');
        cardCvcInput.classList.remove('error-input');
    }

    if (cardCvcInput.value.length === 0) {
        cardCvc.innerText = '000';
    }
});

btnSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value === '') {
            inputs[i].classList.add('error-input');
            if (i !== 3) {
                errorsEmpty[i].classList.add('error-empty-show');
            }
        } else {
            const form = document.querySelector('form'),
                complitedState = document.querySelector('.complited-state');
            form.classList.add('d-none');
            complitedState.classList.remove('d-none');
        }
    }
});

for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('input', () => {
        if (inputs[i].value !== '' && i !== 2) {
            inputs[i].classList.remove('error-input');
            if ( i !== 2 && i !== 3) {
                errorsEmpty[i].classList.remove('error-empty-show');
            }
        } else if (i === 2 && +inputs[i].value > 12) {
            inputs[i].classList.add('error-input');
        }
    });    
}