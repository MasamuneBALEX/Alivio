const modal = document.querySelector('.login-block'),
    buttons = document.querySelectorAll('.button');

function modalActive(button, window) {
    if (button.length > 1) {
        button.forEach(item => {
            item.addEventListener('click', (event) => {
                const target = event.target;
                if (!target.closest('.login-block__inputs')) {
                    window.classList.add('login-active');
                    document.body.style.overflow = 'hidden';
                };
            });
        });
    } else {
        button.addEventListener('click', (event) => {
            const target = event.target;
            if (!target.closest('.login-block__inputs')) {
                window.classList.add('login-active');
                document.body.style.overflow = 'hidden';
            };
        });
    }
};

function modalClose(window) {

    if (modal.classList.entries('login-active')) {

        window.addEventListener('click', (event) => {
            const target = event.target;
            const parent = target.closest('.login-block__login-data');
            if (!parent) {
                modal.classList.remove('login-active');
                document.body.style.overflow = '';
            };

        });

        document.addEventListener('keyup', (event) => {
            if (event.key === 'Escape') {
                modal.classList.remove('login-active');
                document.body.style.overflow = '';
            };
        });

    };
};

export default modal;