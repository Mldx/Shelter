import pet from '../../assets/script/pet.js'

const modal = document.querySelector('.modal');
const html = document.querySelector('html');
const hamburger = document.querySelector('.hamburger');
const navigationBlock = document.querySelector('.navigation');
const navigationMenu = document.querySelector('.navigation__menu');
const navigationItemLink = document.querySelectorAll('.navigation__item > a');
const navigationItem = document.querySelectorAll('.navigation__item');
const paginationButtonAll = document.querySelectorAll('.pets__content__navigation__button-paginator')
const cards = document.querySelectorAll('.pets__content__card-container__item');
const cardAll = document.querySelectorAll('.pets__content__card-container__item');
const modalCard = document.querySelector('.modal-card');
const modalCardCloseButton = document.querySelector('.modal-card__button');


/*-------------------PAGINATION-------------------*/

/*-------------------Generate Random Arr 48 Pets-------------------*/
const generationRandomArrPetsCard = () => {
    const arr48 = [];
    let n3 = 0;
    let n6 = 0;
    let n8 = 0;
    for (let i = 1; i <= 48; i++) {
        while (true) {
            let rand = pet[getRandom(0, 7)]
            if ([...arr48].splice(n3, 3).indexOf(rand) === -1) {
                if ([...arr48].splice(n6, 6).indexOf(rand) === -1) {
                    if ([...arr48].splice(n8, 8).indexOf(rand) === -1) {
                        arr48.push(rand);
                        if (i % 3 === 0 && arr48.length % 3 === 0) {
                            n3 += 3;
                        }
                        if (i % 6 === 0 && arr48.length % 6 === 0) {
                            n6 += 6
                        }
                        if (i % 8 === 0 && arr48.length % 8 === 0) {
                            n8 += 8
                        }
                        break;
                    }
                }
            }
        }
    }
    return arr48;
}
/*-------------------Change Card on Load page-------------------*/
const changeCardOnPageLoad = () => {
    cards.forEach((value, index) => {
        const cardImage = value.querySelector('.pets__content__card-container__item__img > img');
        const cardName = value.querySelector('.pets__content__card-container__item__name');
        cardImage.src = randomArrPetsCard[index].img;
        cardName.innerText = randomArrPetsCard[index].name;
        value.dataset.id = randomArrPetsCard[index].id;
    })
}
/*-------------------Count Page Pagination-------------------*/
const pageCount = () => {
    let temp = 0;
    cards.forEach((value) => {
            if (getComputedStyle(value).display !== 'none') {
                temp++;
            }
        }
    )
    return Math.ceil(randomArrPetsCard.length / temp);
}
/*-------------------Generate Arr Displayed Card-------------------*/
const getDisplayCard = () => {
    let arrDisplay = [];
    cards.forEach((value) => {
            if (getComputedStyle(value).display !== 'none') {
                arrDisplay.push(value);
            }
        }
    )
    return arrDisplay;
}
/*-------------------Next Page-------------------*/
const paginationNextPage = () => {
    let page = Number(paginationButtonAll[2].innerText);
    if (page < pageCount()) {
        displayCard.forEach((value, index) => {
            const cardImage = value.querySelector('.pets__content__card-container__item__img > img');
            const cardName = value.querySelector('.pets__content__card-container__item__name');
            setTimeout(() => {
                cardImage.src = randomArrPetsCard[index + (page * 48 / pageCount())].img;
                cardName.innerText = randomArrPetsCard[index + (page * 48 / pageCount())].name;
                value.dataset.id = randomArrPetsCard[index + (page * 48 / pageCount())].id;
            }, 300);
        })
        paginationButtonAll[2].innerText = page + 1;
        if (Number(paginationButtonAll[2].innerText) >= 1) {
            unDisableButton(paginationButtonAll[0]);
            unDisableButton(paginationButtonAll[1]);
        }
        if (Number(paginationButtonAll[2].innerText) === pageCount()) {
            disableButton(paginationButtonAll[3]);
            disableButton(paginationButtonAll[4]);
        }
    }
}
/*-------------------Previous Page-------------------*/
const paginationPreviousPage = () => {
    let page = Number(paginationButtonAll[2].innerText);
    if (page > 1) {
        for (let i = 0; i <= displayCard.length - 1; i++) {
            const cardImage = displayCard[i].querySelector('.pets__content__card-container__item__img > img');
            const cardName = displayCard[i].querySelector('.pets__content__card-container__item__name');
            setTimeout(() => {
                cardImage.src = randomArrPetsCard[((page - 2) * 48 / pageCount()) + i].img;
                cardName.innerText = randomArrPetsCard[((page - 2) * 48 / pageCount()) + i].name;
                displayCard[i].dataset.id = randomArrPetsCard[((page - 2) * 48 / pageCount()) + i].id;
            }, 300);
        }
        paginationButtonAll[2].innerText = page - 1;
        if (Number(paginationButtonAll[2].innerText) <= pageCount()) {
            unDisableButton(paginationButtonAll[3]);
            unDisableButton(paginationButtonAll[4]);
        }
        if (Number(paginationButtonAll[2].innerText) === 1) {
            disableButton(paginationButtonAll[0]);
            disableButton(paginationButtonAll[1]);
        }
    }
}
/*-------------------First Page-------------------*/
const paginationFirstPage = () => {
    let page = Number(paginationButtonAll[2].innerText);
    if (page > 1) {
        for (let i = 0; i <= displayCard.length - 1; i++) {
            const cardImage = displayCard[i].querySelector('.pets__content__card-container__item__img > img');
            const cardName = displayCard[i].querySelector('.pets__content__card-container__item__name');
            setTimeout(() => {
                cardImage.src = randomArrPetsCard[i].img;
                cardName.innerText = randomArrPetsCard[i].name;
                displayCard[i].dataset.id = randomArrPetsCard[i].id;
            }, 300);
        }
        paginationButtonAll[2].innerText = 1;
        if (Number(paginationButtonAll[2].innerText) <= pageCount()) {
            disableButton(paginationButtonAll[0]);
            disableButton(paginationButtonAll[1]);
            unDisableButton(paginationButtonAll[3]);
            unDisableButton(paginationButtonAll[4]);
        }
    }
}
/*-------------------Last Page-------------------*/
const paginationLastPage = () => {
    let page = Number(paginationButtonAll[2].innerText);
    if (page < pageCount()) {
        displayCard.forEach((value, index) => {
            const cardImage = value.querySelector('.pets__content__card-container__item__img > img');
            const cardName = value.querySelector('.pets__content__card-container__item__name');
            setTimeout(() => {
                cardImage.src = randomArrPetsCard[index + ((pageCount() - 1) * 48 / pageCount())].img;
                cardName.innerText = randomArrPetsCard[index + ((pageCount() - 1) * 48 / pageCount())].name;
                value.dataset.id = randomArrPetsCard[index + ((pageCount() - 1) * 48 / pageCount())].id;
            }, 300);
        })
        paginationButtonAll[2].innerText = pageCount();
        if (Number(paginationButtonAll[2].innerText) >= pageCount()) {
            disableButton(paginationButtonAll[4]);
            disableButton(paginationButtonAll[3]);
            unDisableButton(paginationButtonAll[0]);
            unDisableButton(paginationButtonAll[1]);
        }
    }
}

/*-------------------Un Disable Button-------------------*/
function unDisableButton(button) {
    button.classList.add('button_transparent');
    button.classList.remove('button_disable');
}

/*-------------------Disable Button-------------------*/
function disableButton(button) {
    button.classList.remove('button_transparent');
    button.classList.add('button_disable');
}

/*-------------------Add Card Change Animation-------------------*/
const addChangeCardAnimation = (e) => {
    e.target.disabled = true;
    const card = document.querySelectorAll('.pets__content__card-container__item')
    card.forEach(value => value.style.animation = 'paginationCardAnimation 0.6s linear')
    setTimeout(() => {
        card.forEach(value => value.style.animation = 'unset');
        e.target.disabled = false;
    }, 600)
}

/*-------------------Random number-------------------*/
function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*-------------------Toggle Burger Menu-------------------*/
const toggleMenu = () => {
    hamburger.classList.toggle('open');
    navigationBlock.classList.toggle('open');
    navigationMenu.classList.toggle('open');
    modal.classList.toggle('open');
    html.classList.toggle('open');
}
/*-------------------Remove class 'open'-------------------*/
const removeOpen = () => {
    hamburger.classList.remove('open');
    navigationBlock.classList.remove('open');
    navigationMenu.classList.remove('open');
    modal.classList.remove('open');
    html.classList.remove('open');
}
/*-------------------Delete Event Listener Burger Menu-------------------*/
const deleteListenerOver768pxBurger = () => {
    window.addEventListener('resize', () => {
        if (window.innerWidth > 767) {
            navigationItemLink.forEach((el) => el.removeEventListener(('click'), toggleMenu));
            modal.removeEventListener(('click'), removeOpen);
            removeOpen();
        }
    });
}
/*-------------------Add Scroll on Top with click on second element menu-------------------*/
navigationItem[1].addEventListener('click', () => {
    removeOpen();
    window.scrollTo(0, 0)
})
/*-------------------Create Pet Card Modal Window-------------------*/
const createPetCardModal = () => {
    const img = document.querySelector('.modal-card__img>img')
    const name = document.querySelector('.modal-card__text__title')
    const subTitle = document.querySelector('.modal-card__text__subtitle')
    const description = document.querySelector('.modal-card__text__description')
    const list = document.querySelectorAll('.modal-card__text__list__item__value')
    const id = event.currentTarget.dataset.id;

    img.src = pet[id].img
    name.innerText = pet[id].name
    subTitle.innerText = (`${pet[id].type} - ${pet[id].breed}`)
    description.innerText = pet[id].description
    list[0].innerText = pet[id].age
    list[1].innerText = pet[id].inoculations
    list[2].innerText = pet[id].diseases
    list[3].innerText = pet[id].parasites

    modalCard.classList.add('openCard');
    modal.classList.add('openCard');
    html.classList.add('openCard');

    modal.addEventListener('mousemove', () => {
        modalCardCloseButton.classList.add('modalMouseOver');
    })
    modal.addEventListener('mouseleave', () => {
        modalCardCloseButton.classList.remove('modalMouseOver');
    })
    modal.addEventListener('click', () => {
        if (modal.classList.contains('openCard')) {
            instantCloseModal();
        }
        modalCard.classList.remove('openCard');
        modal.classList.remove('openCard');
        html.classList.remove('openCard');

    })
}

/*-------------------Remove Class OpenCard-------------------*/
const removeOpenCard = () => {
    modalCard.classList.remove('openCard');
    modal.classList.remove('openCard');
    html.classList.remove('openCard');
    modal.removeEventListener('mousemove', () => {
        modalCardCloseButton.classList.add('modalMouseOver');
    })
    modal.removeEventListener('mouseleave', () => {
        modalCardCloseButton.classList.remove('modalMouseOver');
    })
}
/*-------------------Instant Close Modal -------------------*/
const instantCloseModal = () => {
    modal.style.transition = 'all 0s';
    setTimeout(() => modal.style.transition = '', 10)
}
/*-------------------USE FUNCTIONS-------------------*/

const randomArrPetsCard = generationRandomArrPetsCard();

paginationButtonAll.forEach((el) => {
    el.addEventListener('click', addChangeCardAnimation)
})
paginationButtonAll[0].addEventListener('click', paginationFirstPage)
paginationButtonAll[1].addEventListener('click', paginationPreviousPage)
paginationButtonAll[3].addEventListener('click', paginationNextPage)
paginationButtonAll[4].addEventListener('click', paginationLastPage)
changeCardOnPageLoad();
const displayCard = getDisplayCard();


deleteListenerOver768pxBurger();
hamburger.addEventListener('click', () => {
    toggleMenu();
    navigationItemLink.forEach((el) => el.addEventListener(('click'), toggleMenu));
    modal.addEventListener('click', removeOpen);
})

//test
let x = {};
let n = 1;
for (let i = 0; i < 48; i += 48 / pageCount()) {
    x[n] = [...randomArrPetsCard].splice(i, 48 / pageCount());
    n++
}
console.log(x)

cardAll.forEach((el) => {
    el.addEventListener('click', createPetCardModal)
})

modalCardCloseButton.addEventListener('click', () => {
    instantCloseModal();
    removeOpenCard();
})
