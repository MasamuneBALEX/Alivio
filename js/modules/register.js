import { why, community, solutions, pricing } from "./SPA-Links";
import { disableMenu, linkId } from "./SPA-Links";

const headerLinks = document.querySelectorAll('.header .link'),
    footerLinks = document.querySelectorAll('.link_footer'),
    active = 'link_active';

function register(buttonActivate) {

    const header = document.querySelector('.header');

    function createRegisterBlock() {
        const signIn = document.createElement('section'),
            containerBlock = document.createElement('div');

        containerBlock.classList.add('container');
        signIn.classList.add('sign');
        signIn.append(containerBlock);

        return {
            'sign': signIn,
            'container': containerBlock
        }
    }

    function getFormData() {
        const form = document.querySelector('.sign__form');

        class User {
            constructor(name, surname, login, pass, birth, email) {
                this.name = name;
                this.surname = surname;
                this.login = login;
                this.pass = pass;
                this.birth = birth;
                this.email = email;
            };

            createWarning(blockName, errorText) {
                const name = document.querySelector(blockName);
                const parent = name.parentElement,
                    warning = document.createElement('div');
                warning.classList.add('sign__form-warning');
                parent.append(warning);
                warning.innerHTML = `
                ${errorText}
            `;
                setTimeout(function () {
                    warning.remove();
                }, 5000);
            }

            checkNames(name, surname) {
                const numberName = Number(this.name);
                const numberSurname = Number(this.surname);

                if (numberName) {
                    this.name = null;
                } else {
                    this.name = name;
                }

                if (this.name === null) {
                    this.createWarning('[name="user_name"]', 'Incorrect name!');
                }

                if (numberSurname) {
                    this.surname = null;

                    if (this.surname === null) {
                        this.createWarning('[name="user_surname"]', 'Incorrect surname!');
                    }
                } else if (surname === '') {
                    this.surname = 'undefined';
                } else {
                    this.surname = surname;
                }
            };

            checkAge() {
                const currentYear = new Date(),
                    age = new Date(this.birth);

                function checkYears() {
                    const currentMonths = currentYear.getMonth(),
                        currentDay = currentYear.getDate(),
                        birthMonth = age.getMonth(),
                        birthDay = age.getDate(),
                        yearsDiff = currentYear.getFullYear() - age.getFullYear();

                    if (yearsDiff !== 0) {
                        if (birthMonth === currentMonths) {
                            if (birthDay <= currentDay) {
                                return yearsDiff;
                            } else {
                                return yearsDiff - 1;
                            }
                        } else if (birthMonth > currentMonths) {
                            return yearsDiff - 1;
                        } else {
                            return yearsDiff;
                        }

                    } else {
                        return yearsDiff;
                    }


                }

                const checkedAge = checkYears();

                if (checkedAge < 18) {
                    this.createWarning('[name="user_birthdate"]', 'Birth less 18!');

                    return false;
                } else {
                    // console.log(checkedAge);
                    // console.log('Access succeed');
                    return {
                        'bool': true,
                        'years': checkedAge
                    }
                }
            }
        };

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = form.querySelector('[name="user_name"]').value,
                surname = form.querySelector('[name="user_surname"]').value,
                login = form.querySelector('[name="user_login"]').value,
                password = form.querySelector('[name="user_password"]').value,
                birthdate = form.querySelector('[name="user_birthdate"]').value,
                email = form.querySelector('[name="user_email"]').value;

            const newUser = new User(name, surname, login, password, birthdate, email);
            newUser.checkNames(newUser.name, newUser.surname);

            const checkAge = newUser.checkAge();
            // console.log(checkAge.checkedAge);
            newUser.birth = checkAge.years;

            if (checkAge.bool) {
                form.classList.add('sign__form_success');
                form.innerHTML = `
            <h2 class="title title_solves">Thanks for registration</h2>
            <p class="text text_success">Your login: <span>${newUser.login}</span> </p>
            <p class="text text_success">Your login: <span>${newUser.pass}</span> </p>
            `;

                localStorage.setItem(`${newUser.login}`, `${JSON.stringify(newUser)}`);
                // registeredUser[newUser.login] = JSON.parse(JSON.stringify(newUser));
                // localStorage.setItem(``)

                setTimeout(function () {
                    window.location.reload();
                }, 8000);
            }
        });
    }

    function clearElements(headerLinks, footerLinks) {

        headerLinks.forEach(link => {
            if (link.classList.entries(active)) {
                link.classList.remove(active);
                switch (linkId) {
                    case 0:
                        const whyElements = document.querySelectorAll(why);
                        whyElements.forEach(el => {
                            el.remove();
                        });
                    case 1:
                        const solutionsElements = document.querySelectorAll(solutions);
                        solutionsElements.forEach(el => {
                            el.remove();
                        });
                    case 2:
                        const communityElements = document.querySelectorAll(community);
                        communityElements.forEach(el => {
                            el.remove();
                        });
                    case 3:
                        const pricingElements = document.querySelectorAll(pricing);
                        pricingElements.forEach(el => {
                            el.remove();
                        });

                }
            }
        });

        footerLinks.forEach(link => {
            if (link.classList.entries(active)) {
                link.classList.remove(active);
            }
        })
    }

    buttonActivate.addEventListener('click', (event) => {
        event.preventDefault();
        clearElements(headerLinks, footerLinks);
        disableMenu();
        buttonActivate.classList.add(active);
        const register = createRegisterBlock();
        header.after(register.sign);
        register.container.innerHTML = `
    <h1 class="title title_registration">Registration</h1>
    <form class="sign__form">

    <div class="sign__form-wrapper">
    <label class="sign__form-block">
    <span>Your name *</span>
    <input name="user_name" type="text" required>
    </label>

    <label class="sign__form-block">
    <span>Your surname</span>
    <input name="user_surname" type="text">
    </label>

    <label class="sign__form-block">
    <span>Your login *</span>
    <input name="user_login" type="text" required>
    </label>

    <label class="sign__form-block">
    <span>Your password *</span>
    <input name="user_password" type="password" required>
    </label>

    <label class="sign__form-block">
    <span>Birthdate *</span>
    <input name="user_birthdate" type="date" required>
    </label>

    <label class="sign__form-block">
    <span>Email *</span>
    <input name="user_email" type="email" required>
    </label>

    </div>
    <button class="button button_register" type="submit">Register</button>
    </div>


    </form>
    `;
        getFormData();
    });
};

export { register, headerLinks, footerLinks, active };