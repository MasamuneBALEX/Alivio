import { modal } from "./modal";

const form = modal.querySelector('.login-block__login-data');

const checkLogin = Boolean(localStorage.getItem("login"));

function formDataCheck() {
    const loginInput = form.querySelector('[name="login"]'),
        passwordInput = form.querySelector('[name="pass"]');

    function findLoginPass(login, pass) {
        const loginData = login.value,
            passData = pass.value;

        const parseObj = {};

        parseObj[loginData] = JSON.parse(localStorage.getItem(`${loginData}`));

        const checkLogin = JSON.parse(localStorage.getItem(`${loginData}`)),
            loginButton = document.querySelector('.button_login');


        if (Boolean(checkLogin) && checkLogin.login === loginData) {
            const parseObjPass = parseObj[loginData].pass;

            if (passData === parseObjPass) {
                const close = document.querySelector('.login-block__close');
                close.remove();
                modal.classList.remove('login-active');
                modal.classList.add('login-loading');
                document.body.style.overflow = `hidden`;
                form.innerHTML = `
                    <h2 class="title title_login-success">Account loading</h2>
                    <img class="login-block__loading" alt="loading animation" src="img/loading.webp">
                    `;

                loading();
                loading()
                    .then(result => {
                        console.log(result);
                        loginActive();
                        localStorage.setItem("login", true);
                        localStorage.setItem("login-name", parseObj[loginData].login)
                        window.location.reload();
                    });

                function loading() {
                    return new Promise((resolve, reject) => {
                        const text = form.querySelector('.title_login-success');
                        let countDots = 1,
                            interval;

                        if (text) {
                            interval = setInterval(function () {
                                if (countDots === 1) {
                                    countDots = 2;
                                    text.textContent = 'Account loading.'
                                } else if (countDots === 2) {
                                    countDots = 3;
                                    text.textContent = 'Account loading..'
                                } else {
                                    countDots = 1;
                                    text.textContent = 'Account loading...'
                                }
                            }, 800);

                        }

                        setTimeout(success, 3000);

                        function success() {
                            clearInterval(interval);
                            form.innerHTML = `
                            <h2 class="title title_login-success">Authorization succeed</h2>
                            `;

                            setTimeout(function () {
                                resolve('Authorization succeed');
                            }, 1000);
                        }
                    });

                }
            } else {

                passwordInput.classList.add('login-block__input_error');
                loginButton.classList.add('button_login-error');

                setTimeout(() => {
                    passwordInput.classList.remove('login-block__input_error');
                    loginButton.classList.remove('button_login-error');
                }, 1500);
            }
        } else {
            loginInput.classList.add('login-block__input_error');
            passwordInput.classList.add('login-block__input_error');
            loginButton.classList.add('button_login-error');

            setTimeout(() => {
                loginInput.classList.remove('login-block__input_error');
                passwordInput.classList.remove('login-block__input_error');
                loginButton.classList.remove('button_login-error');
            }, 1500);
        }

    };

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        findLoginPass(loginInput, passwordInput);
    })
};

// Функция активации логина
function loginActive() {

    document.body.innerHTML = `
        <header class="header reg__header">
            <div class="container">
                <div class="header__wrapper">
                    <div class="header__logo">
                        <img src="icons/Logo.svg" alt="logo">
                    </div>
                    <ul class="header__links">
                        <li class="header__link-block">
                            <a class="link reg__header-link" href="">Link 1</a>
                        </li>
                        <li class="header__link-block">
                            <a class="link reg__header-link" href="">Link 2</a>
                        </li>
                        <li class="header__link-block">
                            <a class="link reg__header-link" href="">Link 3</a>
                        </li>
                        <li class="header__link-block">
                            <a class="link reg__header-link" href="">Link 4</a>
                        </li>
                    </ul>

                    <div class="header__buttons">
                        <div class="button reg__header-button">My profile</div>
                    </div>
                </div>
            </div>
        </header>

        <script src="js/script.js"></script>
    `;

};

function loginActiveMenu() {
    const newHeader = document.querySelector('.reg__header'),
        links = newHeader.querySelectorAll('.link');

    links.forEach(items => {
        items.addEventListener('click', (event) => {
            event.preventDefault();
        })
    });
}

function loginActiveEvents() {
    const button = document.querySelector('.reg__header-button'),
        header = document.querySelector('.reg__header');

    const plans = ["Free", "Standard", "Premium", "Custom"];

    function createMyProfile(newSection) {
        const create = document.createElement('section');
        create.classList.add(`reg__${newSection}`);
        return create;
    }

    function getContainerElement(parentName) {
        const parent = document.querySelector(parentName);
        return parent;
    }

    function createLogoutButton() {
        const logout = document.createElement('div');
        logout.classList.add('button');
        logout.classList.add('button_logout');
        logout.textContent = 'Logout';

        return logout;
    }

    const headerButtons = document.querySelector('.header__buttons');
    headerButtons.prepend(createLogoutButton());

    const logout = document.querySelector('.button_logout');
    logout.addEventListener('click', () => {

        if (checkLogin) {
            localStorage.removeItem("login");
        }

        setTimeout(function () {
            window.location.reload();
        }, 300)
    }, { once: true })

    button.addEventListener('click', () => {
        const element = document.querySelector('.reg__my-profile');

        if (!element) {
            header.after(createMyProfile('my-profile'));

            const loginName = localStorage.getItem("login-name"),
                loginData = JSON.parse(localStorage.getItem(loginName));

            // console.log(loginData);

            const container = getContainerElement('.reg__my-profile');
            container.innerHTML = `
        <div class="container">
            <div class="reg__my-profile__wrapper">

                <div class="reg__my-profile__data">

                    <h1 class="title title_my-profile">Profile data</h1>

                    <div class="reg__my-profile__info">
                        <p class="text">Login: <span>${loginName}</span></p>
                    </div>

                    <div class="reg__my-profile__info">
                        <p class="text">Name: <span>${loginData.name}</span></p>
                    </div>

                    <div class="reg__my-profile__info">
                        <p class="text">Surname: <span data-surname>${loginData.surname}</span></p>
                    </div>

                    <div class="reg__my-profile__info">
                        <p class="text">Age: <span>${loginData.birth}</span></p>
                    </div>

                    <div class="reg__my-profile__info">
                        <p class="text">Mail: <span>${loginData.email}</span></p>
                    </div>

                </div>

                <div class="reg__my-profile__other-data">
                    <h1 class="title title_my-profile">Others</h1>

                    <div class="reg__my-profile__info">
                        <p class="text">Plan: <span>${plans[0]}</span></p>
                    </div>

                    <div class="button button_delete">Delete Profile</div>
                </div>
        </div>
        `;

            const surname = document.querySelector('[data-surname]');

            if (surname.textContent === 'undefined') {
                surname.parentElement.parentElement.remove();
            }

            const deleteButton = document.querySelector('.button_delete');

            deleteButton.addEventListener('click', () => {
                localStorage.removeItem(loginName);
                localStorage.removeItem("login");
                localStorage.removeItem("login-name");
                window.location.reload();
            }, { once: true });
        } else {
            element.remove();
        }
    });
}

export { formDataCheck, loginActive, loginActiveMenu, loginActiveEvents, checkLogin };