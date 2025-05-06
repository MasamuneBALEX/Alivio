window.addEventListener('DOMContentLoaded', () => {
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

    function activeLink(links, fLinks) {

        function showLink(i = 0) {
            const active = 'link_active';
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

        let linkId = 0;

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
            } else {

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
                    const checkBg = getParentChild.classList.contains(`${bgName}__bg`);
                    const checkBgPrefix = getParentChild.classList.contains(`${bgName}__${prefix}-bg`);
                    if (checkBg || checkBgPrefix) {
                        console.log(getParentChild);
                        function createContainer() {
                            const container = document.createElement('div');
                            container.classList.add('container');
                            return container;
                        }
                        getParentChild.after(createContainer());
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

            function getSectionContainer(name, shortName, prefix) {
                if (name.firstElementChild.classList.contains(`${shortName}__bg`) || `${shortName}__${prefix}-bg`) {
                    return name.lastElementChild;
                } else {
                    return name.firstElementChild;
                }
            }

            function removePreviousPages(element) {
                switch (element) {
                    case '.why':
                        const whyElements = document.querySelectorAll('.why, .why__choose, .why__works, .why__join');
                        if (whyElements) {
                            whyElements.forEach(why => {
                                why.remove();
                            });
                        };
                        break;

                    case '.solutions':
                        const solutionsElements = document.querySelectorAll('.solutions, .solutions__our, .solutions__solves, .solutions__join');
                        if (solutionsElements) {
                            solutionsElements.forEach(solutions => {
                                solutions.remove();
                            })
                        };
                        break;

                    case '.community':
                        const communityElements = document.querySelectorAll('.community, .community__why, .community__how, .community__join');
                        if (communityElements) {
                            communityElements.forEach(community => {
                                community.remove();
                            });
                        };
                        break;

                    case '.pricing':
                        const pricingElements = document.querySelectorAll('.pricing, .pricing__plans, .pricing__works, .pricing__join');
                        if (pricingElements) {
                            pricingElements.forEach(pricing => {
                                pricing.remove();
                            });
                        };
                        break;
                };
            };

            switch (id) {
                case 0:
                    header.after(createSection('why'));
                    const whyPromoSection = getSectionName('.why');
                    const whyPromoBg = setSectionBackground('why__bg');
                    whyPromoSection.append(whyPromoBg);
                    hasBgCheck(whyPromoSection, 'why');
                    const whyPromo = getSectionContainer(whyPromoSection, 'why');
                    whyPromo.innerHTML = `
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

                    whyPromoSection.after(createSection('why__choose'));
                    const whyChooseSection = getSectionName('.why__choose');
                    hasBgCheck(whyChooseSection, 'why__choose');
                    const choose = getSectionContainer(whyChooseSection, 'why');
                    choose.innerHTML = `
    
                        <h2 class="title title_choose">
                            Why Choose Alivio?
                        </h2>
                    <ul class="why__choose-ul">
                        <li class="why__choose-li">
                        <img class="why__choose-icon" alt="list icon" src="../icons/list.svg">
                            <p class="text text_title">Tailored to You: Through a quick, intuitive survey, we customize your journaling experience to focus on your unique stress triggers, emotional expressions, and personal goals.</p>
                        </li>

                        <li class="why__choose-li">
                        <img class="why__choose-icon" alt="list icon" src="../icons/list.svg">
                        <p class="text text_title">Guided Emotional Clarity: Write, reflect, and explore with expertly crafted prompts designed to uncover insights and provide practical strategies for stress relief.</p>
                        </li>

                        <li class="why__choose-li">
                        <img class="why__choose-icon" alt="list icon" src="../icons/list.svg">
                        <p class="text text_title">Empowering Self-Awareness: Gain a deeper understanding of what drives your stress and learn tools to overcome it, building emotional strength for the long term.</p>
                        </li>

                        <li class="why__choose-li">
                        <img class="why__choose-icon" alt="list icon" src="../icons/list.svg">
                        <p class="text text_title">Proven Success: See how Alivio has transformed lives, like Kayla’s, through real stories of stress management and personal growth.</p>
                        </li>

                    </ul>
                    `;

                    whyChooseSection.after(createSection('why__works'));
                    const whyWorksSection = getSectionName('.why__works');
                    hasBgCheck(whyWorksSection, 'why__works');
                    const works = getSectionContainer(whyWorksSection, 'why');
                    works.innerHTML = `
                    <div class="why__works-wrapper">
                    <div class="why__works-text">
                        <h3 class="title title_works">Why It Works</h3>
                        <p class="text text_works">
                        Alivio’s simple yet powerful three-step process — Personalize, Write & Understand, and Alivio! — makes stress management accessible and effective. With unlimited journals addressing emotions like anxiety, sadness, or anger, we provide a safe space for reflection and growth. Backed by research, journaling helps reduce stress, improve mental clarity, and foster well-being, making Alivio your partner in creating a calmer, happier life.
                        </p>
                    </div>
                    <img alt="why works img" src="../img/why-works.jpg" class="why__works-img">
                    </div>
                    `;

                    whyWorksSection.after(createSection('why__join'));
                    const whyJoinSection = getSectionName('.why__join');
                    hasBgCheck(whyJoinSection, 'why__join');
                    const join = getSectionContainer(whyJoinSection, 'why');
                    join.innerHTML = `
                        <div class="why__join-wrapper">

                        <div class="why__join-click">
                        <h2 class="title title_describe">Be aware, manage well</h2>
                        <p class="text">
                        Join Alivio today and start your journey to a stress-free you. Let’s write your path to peace together!
                        </p>
                        <div class="button button_works">Join to us</div>
                        </div>
                        <img class="why__join-img" src="../img/why-join.jpg" alt="kayla">

                        </div>
                    `;

                    const buttonWorks = document.querySelector('.button_works');
                    modalActive(buttonWorks, modal);

                    removePreviousPages('.solutions');
                    removePreviousPages('.community');
                    removePreviousPages('.pricing');
                    break;
                case 1:
                    header.after(createSection('solutions'));
                    const solutionsPromoSection = getSectionName('.solutions');
                    const solutionsPromoBg = setSectionBackground('solutions__bg');
                    solutionsPromoSection.append(solutionsPromoBg);
                    hasBgCheck(solutionsPromoSection, 'solutions');
                    const solutionsPromo = getSectionContainer(solutionsPromoSection, 'solutions');
                    solutionsPromo.innerHTML = `

                    <div class="solutions__title-wrapper">
                    <h1 class="title title_l">Find Your Path to Stress Relief with Alivio’s Tailored Solutions
                    </h1>
                    </div>

                    <div class="solutions__text-wrapper">
                    <p class="text text_solutions">
                    Stress affects everyone differently, and at Alivio, we offer a range of personalized solutions to help you manage it effectively. From guided journaling to insightful stress assessments, our tools are designed to empower you to understand your emotions and build resilience. Discover how Alivio’s solutions can transform your approach to stress management.
                    </p>
                    </div>

                    `;

                    solutionsPromoSection.after(createSection('solutions__our'));
                    const solutionsOurSection = getSectionName('.solutions__our');
                    hasBgCheck(solutionsOurSection, 'solutions');
                    const solutionsOur = getSectionContainer(solutionsOurSection, 'solutions');
                    solutionsOur.innerHTML = `
                    <h2 class="title title_our">Our Solutions</h2>

                    <ul class="solutions__our-ul">

                    <li class="solutions__our-li">
                    <img src="/icons/our-list.svg" alt="solutions icon" class="solutions__our-icon">
                    <p class="text text_title">
                    Personalized Journals: Answer a quick survey to create a custom journal that targets your unique stress triggers, whether it’s anxiety, overwhelm, or sadness. Each journal guides you through prompts tailored to your needs.
                    </p>
                    </li>

                    <li class="solutions__our-li">
                    <img src="/icons/our-list.svg" alt="solutions icon" class="solutions__our-icon">
                    <p class="text text_title">
                    Stress Assessment Tools: Gain clarity with our intuitive surveys that identify your stress patterns and emotional responses, helping you focus on what matters most.
                    </p>
                    </li>

                    <li class="solutions__our-li">
                    <img src="/icons/our-list.svg" alt="solutions icon" class="solutions__our-icon">
                    <p class="text text_title">
                    Guided Reflection: Write, reflect, and grow with expertly crafted prompts that encourage self-awareness and provide practical strategies to overcome stress.
                    </p>
                    </li>

                    <li class="solutions__our-li">
                    <img src="/icons/our-list.svg" alt="solutions icon" class="solutions__our-icon">
                    <p class="text text_title">
                    Real-Life Impact: See how Alivio’s solutions have helped users like Kayla take control of their stress.
                    </p>
                    </li>

                    </ul>
                    `;

                    solutionsOurSection.after(createSection('solutions__solves'));
                    const solutionsSolvesSection = getSectionName('.solutions__solves');
                    hasBgCheck(solutionsSolvesSection, 'solutions');
                    const solutionsSolves = getSectionContainer(solutionsSolvesSection, 'solutions');
                    solutionsSolves.innerHTML = `
                    <h2 class="title title_solves">How Alivio Solves Stress</h2>

                    <div class="solutions__solves-wrapper">

                    <img src="/img/solutions-solves.jpg" alt="solves img" class="solutions__solves-img">

                    <div class="solutions__solves-text">
                    <p class="text text_solves">
                    Our solutions are built on a proven three-step process: Assess, Reflect, and Overcome. By combining personalized insights with guided journaling, Alivio helps you uncover the root of your stress and equips you with the tools to manage it. Whether you’re tackling daily challenges or long-term emotional goals, our flexible approach adapts to your journey.
                    </p>
                    </div>

                    `;

                    solutionsSolvesSection.after(createSection('solutions__join'));
                    const solutionsJoinSection = getSectionName('.solutions__join');

                    const solutionsJoinBg = setSectionBackground('solutions__join-bg');
                    // console.log(solutionsJoinBg);
                    solutionsJoinSection.append(solutionsJoinBg);

                    hasBgCheck(solutionsJoinSection, 'solutions', 'join'); // 3 аргумент использование префикса


                    const solutionsJoin = getSectionContainer(solutionsJoinSection, 'solutions', 'join');
                    //3 аргумент префикс

                    solutionsJoin.innerHTML = `
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

                    removePreviousPages('.why');
                    removePreviousPages('.community');
                    removePreviousPages('.pricing');
                    break;
                case 2:
                    header.after(createSection('community'));
                    const communityPromoSection = getSectionName('.community');

                    const communityPromoVideoBg = setSectionVideoBackground('community__video-bg', 'video/community-bg.mp4');
                    communityPromoVideoBg.addEventListener('loadedmetadata', () => {
                        communityPromoVideoBg.play();
                        console.log('%cMeta Downloaded - video playing', 'color: green');
                    });

                    communityPromoSection.append(communityPromoVideoBg);
                    hasBgVideoCheck(communityPromoSection);

                    const communityPromo = getSectionContainer(communityPromoSection, 'community');
                    communityPromo.innerHTML = `
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

                    communityPromoSection.after(createSection('community__why'));
                    const communityWhySection = getSectionName('.community__why');
                    hasBgCheck(communityWhySection, 'community');
                    const communityWhy = getSectionContainer(communityWhySection, 'community');
                    communityWhy.innerHTML = `
                    <h2 class="title title_choose">Why Join Our Community</h2>

                    <ul class="solutions__our-ul">

                    <li class="solutions__our-li">
                    <img src="/icons/community.svg" alt="solutions icon" class="solutions__our-icon">
                    <p class="text text_title">
                    Share Your Voice: Tell your story, share your insights, or offer tips to inspire others. Your perspective matters.
                    </p>
                    </li>

                    <li class="solutions__our-li">
                    <img src="/icons/community.svg" alt="solutions icon" class="solutions__our-icon">
                    <p class="text text_title">
                    Build Connections: Meet people who understand your journey, creating bonds that foster growth and support.
                    </p>
                    </li>

                    <li class="solutions__our-li">
                    <img src="/icons/community.svg" alt="solutions icon" class="solutions__our-icon">
                    <p class="text text_title">
                    Find Inspiration: Be moved by stories like Emma’s, who discovered new strength through the support of our Community.
                    </p>
                    </li>

                    <li class="solutions__our-li">
                    <img src="/icons/community.svg" alt="solutions icon" class="solutions__our-icon">
                    <p class="text text_title">
                    Engage in Events: Participate in virtual meetups, discussions, and expert-led sessions designed to empower you.
                    </p>
                    </li>

                    </ul>
                    `;

                    communityWhySection.after(createSection('community__how'));
                    const communityHowSection = getSectionName('.community__how');
                    hasBgCheck(communityHowSection, 'community');
                    const communityHow = getSectionContainer(communityHowSection, 'community');
                    communityHow.innerHTML = `
                    <h3 class="title title_solves">How Our Community Works</h3>
                    <p class="text text_solves text_community-how">
                    Our Community is grounded in three principles: Connect, Share, Empower. By joining, you’ll find a safe space to express yourself, learn from others, and celebrate your progress. Whether you’re taking your first steps or mentoring others, our Community helps you grow stronger together.
                    </p>
                    <img class="community__how-img" src="/img/community.jpg" alt="community how">
                    `;

                    communityHowSection.after(createSection('community__join'));
                    const communityJoinSection = getSectionName('.community__join');

                    const communityJoinBg = setSectionBackground('community__join-bg');
                    communityJoinSection.append(communityJoinBg);
                    hasBgCheck(communityJoinSection, 'community', 'join');

                    function createBorder() {
                        const border = document.createElement('span');
                        return border;
                    }
                    communityJoinBg.append(createBorder());
                    communityJoinBg.append(createBorder());

                    const communityJoin = getSectionContainer(communityJoinSection, 'community');
                    communityJoin.innerHTML = `
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


                    removePreviousPages('.why');
                    removePreviousPages('.solutions');
                    removePreviousPages('.pricing');
                    break;
                case 3:
                    header.after(createSection('pricing'));
                    const pricingPromoSection = getSectionName('.pricing');

                    const pricingPromoVideoBg = setSectionVideoBackground('pricing__video-bg', 'video/pricing.mp4');
                    pricingPromoVideoBg.addEventListener('loadedmetadata', () => {
                        let duration = pricingPromoVideoBg.duration;
                        pricingPromoVideoBg.play();
                        duration = duration / 2;
                        // console.log(duration);
                        console.log('%cVideo meta info Downloaded - video playing', 'color: green');
                    });
                    pricingPromoSection.append(pricingPromoVideoBg);
                    hasBgVideoCheck(pricingPromoSection);

                    const pricingPromo = getSectionContainer(pricingPromoSection, 'pricing');
                    pricingPromo.innerHTML = `
                    <div class="pricing__wrapper">
                    <div class="pricing__wrapper-text">
                    <h1 class="title">Find the Perfect Plan for Your Journey</h1>
                    <p class="text text_works">
                    Empower your growth with a plan tailored to your needs. Our transparent pricing options are designed to support you, whether you’re just starting out or ready to dive deeper. From free access to premium features, we’ve got you covered with flexible plans that deliver value at every step. Choose your plan today and take the first step toward a brighter future.
                    </p>
                    </div>
                    
                    </div>
                    `;

                    pricingPromoSection.after(createSection('pricing__plans'));
                    const pricingPlansSection = getSectionName('.pricing__plans');
                    hasBgCheck(pricingPlansSection, 'pricing');
                    const pricingPlans = getSectionContainer(pricingPlansSection, 'pricing');
                    pricingPlans.innerHTML = `
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

                    pricingPlansSection.after(createSection('pricing__works'));
                    const pricingWorksSection = getSectionName('.pricing__works');
                    hasBgCheck(pricingWorksSection, 'pricing');
                    const pricingWorks = getSectionContainer(pricingWorksSection, 'pricing');
                    pricingWorks.innerHTML = `
                    <h3 class="title title_works">How Our Pricing Works</h3>
                    <p class="text text_pricing-works">
                    We believe in simplicity and flexibility. Select a plan that fits your goals, with no hidden fees or surprises. Try our Free Plan to explore, upgrade to Standard or Premium for more power, or reach out for a Custom Plan. Every plan comes with our commitment to your success, backed by 24/7 support and a community ready to cheer you on.
                    </p>
                    <img alt="pricing works" src="img/pricing-works.jpg" class="pricing__works-img">
                    `;

                    pricingWorksSection.after(createSection('pricing__join'));
                    const pricingJoinSection = getSectionName('.pricing__join');
                    hasBgCheck(pricingJoinSection, 'pricing');
                    const pricingJoin = getSectionContainer(pricingJoinSection, 'pricing');
                    pricingJoin.innerHTML = `
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


                    removePreviousPages('.why');
                    removePreviousPages('.solutions');
                    removePreviousPages('.community');
                    break;
            };

        }



    }

    activeLink(headerLinks, footerLinks);

    // Вход в аккаунт 
    const form = modal.querySelector('.login-block__login-data');
    const loginButton = document.querySelector('.link_header');

    loginButton.addEventListener('click', (event) => {
        event.preventDefault();
    });

    function formDataCheck() {
        form.addEventListener('submit', () => {

        })
    }
});

