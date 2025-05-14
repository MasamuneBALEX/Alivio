const footerReload = document.querySelector('.title_footer'),
    logoReload = document.querySelector('.header__logo');

function reloadPage(footerLink, logoLink) {
    footerLink.addEventListener('click', () => {
        window.location.reload();
    });
    logoLink.addEventListener('click', () => {
        window.location.reload();
    });
};

export { reloadPage, footerReload, logoReload };