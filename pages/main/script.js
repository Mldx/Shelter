import pet from '../../assets/script/pet.js'


const modal = document.querySelector('.modal');
const navigationLogo = document.querySelector('.navigation__logo');
const logo = document.querySelector('.logo');
const html = document.querySelector('html');
const hamburger = document.querySelector('.hamburger');
const navigationBlock = document.querySelector('.navigation');
const navigationMenu = document.querySelector('.navigation__menu');
const navigationItemLink = document.querySelectorAll('.navigation__item > a');
const navigationItem = document.querySelectorAll('.navigation__item');
const sliderButtonAll = document.querySelectorAll('.pets__content__slider__button');
const cardAll = document.querySelectorAll('.pets__content__slider__card');
const modalCard = document.querySelector('.modal-card');
const modalCardCloseButton = document.querySelector('.modal-card__button');

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
const removeOpenMenu = () => {
    hamburger.classList.remove('open');
    navigationBlock.classList.remove('open');
    navigationMenu.classList.remove('open');
    modal.classList.remove('open');
    html.classList.remove('open');
}
/*-------------------Delete Event Listener-------------------*/
const deleteListenerOver768pxBurger = () => {
    window.addEventListener('resize', () => {
        if (window.innerWidth > 767) {
            navigationItemLink.forEach((el) => el.removeEventListener(('click'), toggleMenu));
            modal.removeEventListener(('click'), removeOpenMenu);
            removeOpenMenu();
        }
    });
}
/*-------------------Scroll Top page-------------------*/
const scrollTop = () => {
    navigator.userAgent.indexOf('Firefox') !== -1 ?
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        }) : window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
}

/*-------------------Slider-------------------*/
const changeCardSlider = () => {
    let cards = document.querySelectorAll('.pets__content__slider__card');
    let id = [];
    cards.forEach(el => {
        id.push(el.dataset.id)
    })

    //change card
    cards.forEach((value) => {
        const image = value.querySelector('.pets__content__slider__card__img > img');
        const name = value.querySelector('.pets__content__slider__card__name');
        let rand;

        //random
        while (true) {
            if (id.indexOf(String(rand = getRandom(0, 7))) === -1) {
                break;
            }
        }

        image.src = pet[rand].img;
        name.innerText = pet[rand].name;
        value.dataset.id = pet[rand].id;

        id.push(value.dataset.id)
    })
}

/*-------------------Slider Animations Next/Previous-------------------*/
const addSliderAnimationNext = (e) => {
    const sliderAllCards = document.querySelectorAll('.pets__content__slider__card');
    document.querySelector('.pets__content__slider__all-cards').style.overflowX = 'hidden';
    sliderAllCards.forEach(value => value.style.animation = 'sliderNext 0.8s ease-in-out')
    e.target.disabled = true;
    setTimeout(() => {
        document.querySelector('.pets__content__slider__all-cards').style.overflowX = 'unset';
        e.target.disabled = false;
        sliderAllCards.forEach(value => value.style.animation = '');
    }, 800);
}
const addSliderAnimationPrevious = (e) => {
    const sliderAllCards = document.querySelectorAll('.pets__content__slider__card');
    document.querySelector('.pets__content__slider__all-cards').style.overflowX = 'hidden';
    sliderAllCards.forEach(value => value.style.animation = 'sliderPrevious 0.8s ease-in-out')
    e.target.disabled = true;
    setTimeout(() => {
        document.querySelector('.pets__content__slider__all-cards').style.overflowX = 'unset';
        e.target.disabled = false;
        sliderAllCards.forEach(value => value.style.animation = '');
    }, 800);
}

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

deleteListenerOver768pxBurger();

navigationItem[0].addEventListener('click', () => {
    removeOpenMenu();
    scrollTop();
});
logo.addEventListener('click', scrollTop);

navigationLogo.addEventListener('click', toggleMenu)

hamburger.addEventListener('click', () => {
    toggleMenu();
    scrollTop();
    navigationItemLink.forEach((el) => el.addEventListener(('click'), toggleMenu));
    modal.addEventListener('click', removeOpenMenu);
})

sliderButtonAll[1].addEventListener('click', addSliderAnimationNext);
sliderButtonAll[0].addEventListener('click', addSliderAnimationPrevious);

sliderButtonAll.forEach((el) => el.addEventListener('click', () => {
    setTimeout(changeCardSlider, 400)
}));

cardAll.forEach((el) => {
    el.addEventListener('click', createPetCardModal)
})

modalCardCloseButton.addEventListener('click', () => {
    instantCloseModal();
    removeOpenCard();
})