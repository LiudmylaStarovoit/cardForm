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
        } else if (inputs[i].value && !errors[i].textContent.includes('Wrong format') && !errors[i].textContent.includes('Must be lower then 12')) {
            inputs[i].classList.remove('error-input');
            errors[i].classList.remove('error-show');
        }

        const notEmpty = Array.from(inputs).every((item) => {
            return item.value;
        });

        const notErrors = Array.from(errors).every((item) => {
            return !item.classList.contains('error-show');
        });
        console.log( notErrors);
        
        if (notEmpty && notErrors) {
            const form = document.querySelector('form'),
                  complitedState = document.querySelector('.complited-state');
    
            form.classList.add('d-none');
            complitedState.classList.remove('d-none');
        }
    });
}


const selectLanguage = document.querySelector('.right-section-select'),
    selectCurrentLanguage = document.querySelector('.right-section-select-flags'),
    optionLanguage = document.querySelector('.right-section-select-option'),
    selectCaret = document.querySelector('.select-caret');

    localStorage.setItem("defaultCurrentLanguage", selectCurrentLanguage.src);


    if (localStorage.getItem("currentLanguage") === optionLanguage.src) {
        selectCurrentLanguage.src = localStorage.getItem("currentLanguage");
        optionLanguage.src = localStorage.getItem("defaultCurrentLanguage", selectCurrentLanguage.src);
    }

let isSelectOpen = false;

selectLanguage.addEventListener('click', () => {
    if (!isSelectOpen) {
        optionLanguage.style.top = '0';
    }else {
        optionLanguage.style.top = "-20px";
    }
    selectCaret.style.rotate = isSelectOpen ? '0deg' : '180deg';
    isSelectOpen = !isSelectOpen;
});

optionLanguage.addEventListener("click", () => {
    const currentFlagSrc = selectCurrentLanguage.src;
    selectCurrentLanguage.src = optionLanguage.src;
    optionLanguage.src = currentFlagSrc;
    localStorage.setItem("currentLanguage", selectCurrentLanguage.src);
    loadLanguageData();
});

document.addEventListener("DOMContentLoaded", () => {
    loadLanguageData();
});

function loadLanguageData() {
    fetch('./data.json')
        .then(response => response.json())
        .then(data => {
            let {pl, en} = data;
            const loadLanguage = document.querySelectorAll(".load-language");

            let objKeys = Object.keys(en);
            let objKeysPl = Object.keys(pl);

            loadLanguage.forEach((item, i) => {
                if (selectCurrentLanguage.src.includes('UK')) {
                    item.innerText = en[objKeys[i]];
                } else {
                    item.innerText = pl[objKeysPl[i]];
                }
            });
        })
        .catch(error => console.error('Error loading language data:', error));
}