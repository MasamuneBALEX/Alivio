window.addEventListener('DOMContentLoaded', () => {

    const checkLogin = Boolean(localStorage.getItem("login"));

    // console.log(checkLogin);

    if (checkLogin) {
        loginActive();
        loginActiveMenu();
        loginActiveEvents();
    } else {
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
            // const close = document.querySelector('.login-block__close');
            // close.addEventListener('click', () => {
            //     modal.classList.remove('login-active');
            //     document.body.style.overflow = '';
            // });

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

        modalActive(buttons, modal);
        modalClose(modal);

        // Одностраничный функционал

        const headerLinks = document.querySelectorAll('.header .link'),
            footerLinks = document.querySelectorAll('.link_footer'),
            footerReload = document.querySelector('.title_footer'),
            logoReload = document.querySelector('.header__logo');

        function reloadPage(footerLink, logoLink) {
            footerLink.addEventListener('click', () => {
                window.location.reload();
            });
            logoLink.addEventListener('click', () => {
                window.location.reload();
            });
        };

        reloadPage(footerReload, logoReload);

        function disableMenu() {
            const promo = document.querySelector('.promo'),
                describe = document.querySelector('.describe');
            promoVideo = document.querySelector('.promo-video');
            product = document.querySelector('.product');

            if (promo && describe && promoVideo && product) {
                promo.remove();
                describe.remove();
                promoVideo.remove();
                product.remove();
            }
        }
        const active = 'link_active',
            registerButton = document.querySelector('.link_header');

        let linkId = 0;

        const why = '.why, .why__choose, .why__works, .why__join',
            solutions = '.solutions, .solutions__our, .solutions__solves, .solutions__join',
            community = '.community, .community__why, .community__how, .community__join',
            pricing = '.pricing, .pricing__plans, .pricing__works, .pricing__join';

        function activeLink(links, fLinks) {
            const headerButtons = document.querySelector('.header__buttons'),
                signButton = headerButtons.querySelector('.link_active');


            function showLink(i = 0) {
                links[i].classList.add(active);
                fLinks[i].classList.add(active);
            };

            function hideLink(links, fLinks) {
                const active = 'link_active';
                links.forEach(item => {
                    if (item.classList.contains(active)) {
                        item.classList.remove(active);
                    }
                });
                fLinks.forEach(item => {
                    if (item.classList.contains(active)) {
                        item.classList.remove(active);
                    }
                });
            };

            links.forEach((item, index) => {
                if (!item.closest('.header__buttons')) {
                    item.addEventListener('click', (event) => {
                        event.preventDefault();

                        const target = event.target;
                        if (target === links[index]) {
                            hideLink(headerLinks, footerLinks);
                            showLink(index);
                            disableMenu();
                            linkId = index;
                            checkId(linkId);
                        };
                    });
                }
            });

            fLinks.forEach((item, index) => {
                item.addEventListener('click', (event) => {
                    event.preventDefault();

                    const target = event.target;
                    if (target === fLinks[index]) {
                        hideLink(headerLinks, footerLinks);
                        showLink(index);
                        disableMenu();
                        linkId = index;
                        checkId(linkId);
                    }
                })
            });

            function checkId(id) {
                const header = document.querySelector('.header');

                function createSection(name) {
                    const section = document.createElement('section');
                    section.classList.add(name);
                    return section;
                };

                function setSectionBackground(name) {
                    const bg = document.createElement('div');
                    bg.classList.add(name);
                    return bg;
                }

                function hasBgCheck(parent, bgName, prefix) {
                    const getParentChild = parent.firstElementChild;
                    if (getParentChild) {
                        let checkBg, checkBgPrefix;
                        if (prefix) {
                            checkBgPrefix = getParentChild.classList.contains(`${bgName}-bg`);
                        } else {
                            checkBg = getParentChild.classList.contains(`${bgName}__bg`);
                        }

                        if (checkBg || checkBgPrefix) {
                            // console.log(checkBgPrefix);
                            // console.log(getParentChild);
                            function createContainer() {
                                const container = document.createElement('div');
                                container.classList.add('container');
                                return container;
                            }
                            return getParentChild.after(createContainer());
                        }
                    } else {
                        console.error(`HTML element with name: ${parent.classList}\n('Don't have childrens')`);
                        function createContainer() {
                            const container = document.createElement('div');
                            container.classList.add('container');
                            return container;
                        };
                        console.log('Create element as Container')
                        parent.append(createContainer());
                        console.log(`HTML element with name: ${parent.classList}\n` + '%cElement was added', 'color: green')
                    }
                }

                function setSectionVideoBackground(name, src) {
                    if (typeof src === 'string') {
                        const videoBg = document.createElement('video');
                        videoBg.classList.add(name);
                        videoBg.setAttribute("autoplay", "");
                        videoBg.setAttribute("muted", "");
                        videoBg.setAttribute("loop", "");
                        videoBg.setAttribute("playsinline", "");
                        const videoSource = document.createElement('source');
                        videoSource.setAttribute("type", "video/mp4");
                        videoSource.setAttribute("src", src);
                        videoBg.append(videoSource);
                        return videoBg;
                    }
                };

                function hasBgVideoCheck(parent) {
                    const getParentChild = parent.firstElementChild;
                    if (getParentChild) {
                        function createContainer() {
                            const container = document.createElement('div');
                            container.classList.add('container');
                            return container;
                        }
                        getParentChild.after(createContainer());
                    }
                }

                function getSectionName(name) {
                    return document.querySelector(name);
                }

                function getSectionContainer(name, shortName) {
                    if (name.firstElementChild.classList.contains(`${shortName}__bg`) || `${shortName}-bg`) {
                        return name.lastElementChild;
                    } else {
                        return name.firstElementChild;
                    }
                }

                function removePreviousPages(elements) {
                    const blocks = document.querySelectorAll(elements);
                    if (blocks) {
                        blocks.forEach(elements => {
                            elements.remove();
                        });
                    };
                };

                function createElement(after, sectionParent, bgSectionName, hasBgElement, bgPrefix, videoPrefix, videoSrc) {
                    after.after(createSection(sectionParent));
                    const section = getSectionName(`.${sectionParent}`);

                    let bg;
                    if (hasBgElement) {
                        bg = setSectionBackground(bgSectionName);
                        section.append(bg);

                        if (typeof bgPrefix === 'string') {
                            // console.log(bgPrefix);
                            hasBgCheck(section, sectionParent, bgPrefix);
                        } else {
                            hasBgCheck(section, sectionParent);
                        }

                        // return bg;

                    } else if (videoPrefix) {
                        const videoBg = setSectionVideoBackground(`${sectionParent}__${videoPrefix}-bg`, videoSrc);
                        section.append(videoBg);
                        videoBg.addEventListener('loadedmetadata', () => {
                            videoBg.play();
                            console.log('%cMeta Downloaded - video playing', 'color: green');
                        });
                        const videoParent = videoBg.closest(`.${sectionParent}`);
                        hasBgVideoCheck(videoParent);

                    } else {
                        hasBgCheck(section, sectionParent);
                    };

                    const container = getSectionContainer(section, sectionParent);
                    // console.log(container);

                    return {
                        'section': section,
                        'container': container,
                        'bg': bg
                    }
                }

                function removeSign(sign) {
                    const signSection = document.querySelector(sign);
                    if (signSection) {
                        signSection.remove();
                    }
                }

                switch (id) {
                    case 0:
                        // signActive();
                        const whyElements = createElement(header, 'why', 'why__bg', true);
                        whyElements.container.innerHTML = `
                    <div class="why__wrapper">

                    <div class="why__title">
                    <h1 class="title title_why-l">Why Alivio?</h1>
                    <h2 class="title title_describe title_why">Discover a Stress-Free You with Alivio</h2>
                    </div>

                    <p class="text why__descr text_why">
                    At Alivio, we believe that everyone experiences stress differently, and managing it starts with understanding yourself. Our personalized journaling platform empowers you to be aware of your emotions and manage stress effectively. Whether you're navigating anxiety, feeling overwhelmed, or seeking clarity, Alivio offers a guided, tailored experience to help you find peace and resilience.
                    </p>

                    </div>

                    `;

                        const whyChooseElements = createElement(whyElements.section, 'why__choose', false, false);
                        whyChooseElements.container.innerHTML = `

                        <h2 class="title title_choose">
                        Why Choose Alivio ?
                        </h2>
                        <ul class="why__choose-ul">
                            <li class="why__choose-li">
                                <img class="why__choose-icon" alt="list icon" src="icons/list.svg">
                                    <p class="text text_title">Tailored to You: Through a quick, intuitive survey, we customize your journaling experience to focus on your unique stress triggers, emotional expressions, and personal goals.</p>
                            </li>

                            <li class="why__choose-li">
                                <img class="why__choose-icon" alt="list icon" src="icons/list.svg">
                                    <p class="text text_title">Guided Emotional Clarity: Write, reflect, and explore with expertly crafted prompts designed to uncover insights and provide practical strategies for stress relief.</p>
                            </li>

                            <li class="why__choose-li">
                                <img class="why__choose-icon" alt="list icon" src="icons/list.svg">
                                    <p class="text text_title">Empowering Self-Awareness: Gain a deeper understanding of what drives your stress and learn tools to overcome it, building emotional strength for the long term.</p>
                            </li>

                            <li class="why__choose-li">
                                <img class="why__choose-icon" alt="list icon" src="icons/list.svg">
                                    <p class="text text_title">Proven Success: See how Alivio has transformed lives, like Kayla’s, through real stories of stress management and personal growth.</p>
                            </li>

                        </ul>
                    `;

                        const whyWorksElements = createElement(whyChooseElements.section, 'why__works', false, false);
                        whyWorksElements.container.innerHTML = `

                    <div class="why__works-wrapper">
                        <div class="why__works-text">
                        <h3 class="title title_works">Why It Works</h3>
                        <p class="text text_works">
                        Alivio’s simple yet powerful three-step process — Personalize, Write & Understand, and Alivio! — makes stress management accessible and effective. With unlimited journals addressing emotions like anxiety, sadness, or anger, we provide a safe space for reflection and growth. Backed by research, journaling helps reduce stress, improve mental clarity, and foster well-being, making Alivio your partner in creating a calmer, happier life.
                        </p>
                    </div>
                    <img alt="why works img" src="img/why-works.jpg" class="why__works-img">
                    </div>
                    `;

                        const whyJoinElements = createElement(whyWorksElements.section, 'why__join', false, false);
                        whyJoinElements.container.innerHTML = `

                        <div class="why__join-wrapper">

                        <div class="why__join-click">
                        <h2 class="title title_describe">Be aware, manage well</h2>
                        <p class="text">
                        Join Alivio today and start your journey to a stress-free you. Let’s write your path to peace together!
                        </p>
                        <div class="button button_works">Join to us</div>
                        </div>
                        <img class="why__join-img" src="img/why-join.jpg" alt="kayla">

                        </div>
                    `;

                        const buttonWorks = document.querySelector('.button_works');
                        modalActive(buttonWorks, modal);

                        removeSign('.sign');
                        removePreviousPages(solutions);
                        removePreviousPages(community);
                        removePreviousPages(pricing);
                        break;
                    case 1:

                        const solutionsElements = createElement(header, 'solutions', 'solutions__bg', true);
                        solutionsElements.container.innerHTML = `

                        <div class="solutions__title-wrapper">
                        <h1 class="title title_l">Find Your Path to Stress Relief with Alivio’s Tailored Solutions
                        </h1>
                        </div 

                        <div class="solutions__text-wrapper">
                            <p class="text text_solutions">
                                Stress affects everyone differently, and at Alivio, we offer a range of personalized solutions to help you manage it effectively. From guided journaling to insightful stress assessments, our tools are designed to empower you to understand your emotions and build resilience. Discover how Alivio’s solutions can transform your approach to stress management.
                            </p>
                        </div>

                    `;

                        const solutionsOurElements = createElement(solutionsElements.section, 'solutions__our', false, false);
                        solutionsOurElements.container.innerHTML = `

                        <h2 class="title title_our">Our Solutions</h2>

                    <ul class="solutions__our-ul">

                        <li class="solutions__our-li">
                            <img src="icons/our-list.svg" alt="solutions icon" class="solutions__our-icon">
                                <p class="text text_title">
                                    Personalized Journals: Answer a quick survey to create a custom journal that targets your unique stress triggers, whether it’s anxiety, overwhelm, or sadness. Each journal guides you through prompts tailored to your needs.
                                </p>
                        </li>

                        <li class="solutions__our-li">
                            <img src="icons/our-list.svg" alt="solutions icon" class="solutions__our-icon">
                                <p class="text text_title">
                                    Stress Assessment Tools: Gain clarity with our intuitive surveys that identify your stress patterns and emotional responses, helping you focus on what matters most.
                                </p>
                        </li>

                        <li class="solutions__our-li">
                            <img src="icons/our-list.svg" alt="solutions icon" class="solutions__our-icon">
                                <p class="text text_title">
                                    Guided Reflection: Write, reflect, and grow with expertly crafted prompts that encourage self-awareness and provide practical strategies to overcome stress.
                                </p>
                        </li>

                        <li class="solutions__our-li">
                            <img src="icons/our-list.svg" alt="solutions icon" class="solutions__our-icon">
                                <p class="text text_title">
                                    Real-Life Impact: See how Alivio’s solutions have helped users like Kayla take control of their stress.
                                </p>
                        </li>

                    </ul>
                    `;

                        const solutionsSolvesElements = createElement(solutionsOurElements.section, 'solutions__solves', false, false);
                        solutionsSolvesElements.container.innerHTML = `

                    <h2 class="title title_solves" >How Alivio Solves Stress</h2>

                    <div class="solutions__solves-wrapper">

                        <img src="img/solutions-solves.jpg" alt="solves img" class="solutions__solves-img">

                            <div class="solutions__solves-text">
                                <p class="text text_solves">
                                    Our solutions are built on a proven three-step process: Assess, Reflect, and Overcome. By combining personalized insights with guided journaling, Alivio helps you uncover the root of your stress and equips you with the tools to manage it. Whether you’re tackling daily challenges or long-term emotional goals, our flexible approach adapts to your journey.
                                </p>
                            </div>

                            `;

                        const solutionsJoinElements = createElement(solutionsSolvesElements.section, 'solutions__join', 'solutions__join-bg', true, 'join');
                        solutionsJoinElements.container.innerHTML = `

                        <div class="solutions__join-wrapper">
                                <h2 class="title title_solves-join">Be aware, manage well</h2>
                                <p class="text solutions__join-text">
                                    With Alivio’s solutions, you’re not just coping—you’re thriving. Start exploring our tools today and find the stress relief you deserve!
                                </p>
                                <div class="button button_solutions">Join to us</div>
                        </div>
                    `;

                        const buttonSolutions = document.querySelector('.button_solutions');
                        modalActive(buttonSolutions, modal);

                        removeSign('.sign');
                        removePreviousPages(why);
                        removePreviousPages(community);
                        removePreviousPages(pricing);
                        break;
                    case 2:

                        const communityElements = createElement(header, 'community', false, false, false, 'video', 'video/community-bg.mp4');
                        communityElements.container.innerHTML = `

                    <div class="community__wrapper">

                    <div class="community__wrapper-title">
                    <h1 class="title title_solves title_community">Unite, Inspire, and Grow with Our Community
                    </h1>
                    </div>

                    <div class="community__wrapper-text">
                    <p class="text text_solves text_community">
                    No one should navigate life’s challenges alone. Our Community is a welcoming space where people come together to share their stories, offer support, and find inspiration. Whether you’re seeking encouragement or eager to uplift others, this is where connections are made, and resilience is built. Join our Community today and be part of something meaningful.
                    </p>
                    </div>

                    </div>
                    `;

                        const communityWhyElements = createElement(communityElements.section, 'community__why', false, false);
                        communityWhyElements.container.innerHTML = `
                    
                    <h2 class="title title_choose">Why Join Our Community</h2>

                    <ul class="solutions__our-ul">

                    <li class="solutions__our-li">
                    <img src="icons/community.svg" alt="solutions icon" class="solutions__our-icon">
                    <p class="text text_title">
                    Share Your Voice: Tell your story, share your insights, or offer tips to inspire others. Your perspective matters.
                    </p>
                    </li>

                    <li class="solutions__our-li">
                    <img src="icons/community.svg" alt="solutions icon" class="solutions__our-icon">
                    <p class="text text_title">
                    Build Connections: Meet people who understand your journey, creating bonds that foster growth and support.
                    </p>
                    </li>

                    <li class="solutions__our-li">
                    <img src="icons/community.svg" alt="solutions icon" class="solutions__our-icon">
                    <p class="text text_title">
                    Find Inspiration: Be moved by stories like Emma’s, who discovered new strength through the support of our Community.
                    </p>
                    </li>

                    <li class="solutions__our-li">
                    <img src="icons/community.svg" alt="solutions icon" class="solutions__our-icon">
                    <p class="text text_title">
                    Engage in Events: Participate in virtual meetups, discussions, and expert-led sessions designed to empower you.
                    </p>
                    </li>

                    </ul>
                    `;

                        const communityHowElements = createElement(communityWhyElements.section, 'community__how', false, false);
                        communityHowElements.container.innerHTML = `

                    <h3 class="title title_solves">How Our Community Works</h3>
                    <p class="text text_solves text_community-how">
                    Our Community is grounded in three principles: Connect, Share, Empower. By joining, you’ll find a safe space to express yourself, learn from others, and celebrate your progress. Whether you’re taking your first steps or mentoring others, our Community helps you grow stronger together.
                    </p>
                    <img class="community__how-img" src="img/community.jpg" alt="community how">
                    `;

                        function createBorder() {
                            const border = document.createElement('span');
                            return border;
                        }

                        const communityJoinElements = createElement(communityHowElements.section, 'community__join', 'community__join-bg', true, 'join');
                        communityJoinElements.bg.append(createBorder());
                        communityJoinElements.bg.append(createBorder());
                        communityJoinElements.container.innerHTML = `
                    
                    <div class="community__join-wrapper">

                    <h3 class="title title_login title_why-l">Be part of something bigger</h3>

                    <p class="text text_solutions text_solves">
                    With our Community, you’re never alone. <br> Sign up now and start connecting with those who lift you up!
                    </p>

                    <div class="button button_community">Sign up now</div>

                    </div>
                    `;

                        const buttonCommunity = document.querySelector('.button_community');
                        modalActive(buttonCommunity, modal);

                        removeSign('.sign');
                        removePreviousPages(why);
                        removePreviousPages(solutions);
                        removePreviousPages(pricing);
                        break;
                    case 3:

                        const pricingPromoElements = createElement(header, 'pricing', false, false, false, 'video', 'video/pricing.mp4');
                        pricingPromoElements.container.innerHTML = `
                        <div class="pricing__wrapper">
                            <div class="pricing__wrapper-text">
                                <h1 class="title">Find the Perfect Plan for Your Journey</h1>
                                <p class="text text_works">
                                    Empower your growth with a plan tailored to your needs. Our transparent pricing options are designed to support you, whether you’re just starting out or ready to dive deeper. From free access to premium features, we’ve got you covered with flexible plans that deliver value at every step. Choose your plan today and take the first step toward a brighter future.
                                </p>
                            </div>

                        </div>
                    `;

                        const pricingPlansElements = createElement(pricingPromoElements.section, 'pricing__plans', false, false);
                        pricingPlansElements.container.innerHTML = `

                        <h2 class="title title_login">Our Pricing Plans</h2>
                            <div class="pricing__plans-wrapper">

                                <div class="pricing__plans-card">

                                    <div class="pricing__plans-card__title-block">
                                        <h4>Free</h4>
                                    </div>

                                    <p class="text pricing__plans-card-text">
                                        Get started at no cost with essential features to explore our platform. Perfect for trying out tools, joining discussions, and connecting with others.
                                    </p>

                                    <img src="img/price-card-free.jpg" alt="free plan" class="pricing__plans-card-image">

                                </div>

                                <div class="pricing__plans-card">

                                    <div class="pricing__plans-card__title-block">
                                        <h4>Standard</h4>
                                    </div>

                                    <p class="text pricing__plans-card-text">
                                        Unlock advanced features for a deeper experience, including exclusive content, personalized insights, and priority support. Ideal for those ready to commit to their growth.
                                    </p>

                                    <img src="img/price-card-standard.jpg" alt="free plan" class="pricing__plans-card-image">

                                </div>

                                <div class="pricing__plans-card">

                                    <div class="pricing__plans-card__title-block">
                                        <h4>Premium</h4>
                                    </div>

                                    <p class="text pricing__plans-card-text">
                                        Access everything we offer, from unlimited tools and resources to one-on-one coaching and special events. Designed for those who want the ultimate experience.
                                    </p>

                                    <img src="img/price-card-premium.jpg" alt="free plan" class="pricing__plans-card-image">

                                </div>

                                <div class="pricing__plans-card">

                                    <div class="pricing__plans-card__title-block">
                                        <h4>Custom</h4>
                                    </div>

                                    <p class="text pricing__plans-card-text">
                                        Need something unique? Contact us to create a tailored solution for teams, organizations, or special projects.
                                    </p>

                                    <img src="img/price-card-custom.jpg" alt="free plan" class="pricing__plans-card-image">

                                </div>
                            </div>

                    `;

                        const pricingWorksElements = createElement(pricingPlansElements.section, 'pricing__works', false, false);
                        pricingWorksElements.container.innerHTML = `

                        <h3 class="title title_works">How Our Pricing Works</h3>
                            <p class="text text_pricing-works">
                                We believe in simplicity and flexibility. Select a plan that fits your goals, with no hidden fees or surprises. Try our Free Plan to explore, upgrade to Standard or Premium for more power, or reach out for a Custom Plan. Every plan comes with our commitment to your success, backed by 24/7 support and a community ready to cheer you on.
                            </p>
                        <img alt="pricing works" src="img/pricing-works.jpg" class="pricing__works-img">
                    `;

                        const pricingJoinElements = createElement(pricingWorksElements.section, 'pricing__join', false, false);
                        pricingJoinElements.container.innerHTML = `

                        <div class="pricing__join-wrapper">
                            <div class="pricing__join-text">
                                <h2 class="title title_pricing-join">Start small, grow big</h2>

                                <p class="text text_pricing-join">
                                    Find the plan that’s right for you and join thousands who’ve transformed their journey. Sign up now and unlock your potential!
                                </p>

                                <div class="button button_pricing-join">Sign up</div>

                            </div>
                            <img class="pricing__join-img" src="img/pricing-join.jpg" alt="pricing join">
                        </div>


                    `;

                        const buttonPricing = document.querySelector('.button_pricing-join');
                        modalActive(buttonPricing, modal);

                        removeSign('.sign');
                        removePreviousPages(why);
                        removePreviousPages(solutions);
                        removePreviousPages(community);
                        break;
                };

            }

        }

        const regHeader = document.querySelector('.reg__header');
        if (!regHeader) {
            activeLink(headerLinks, footerLinks);
        }


        //Регистрация

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

        register(registerButton);

        // Вход в аккаунт 
        const form = modal.querySelector('.login-block__login-data');

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
        }

        formDataCheck();

    }


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

});

