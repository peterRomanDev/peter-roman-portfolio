const log = msg => console.log(msg);

class Element {
    constructor(elementClassName) {
        this.element = document.querySelector(elementClassName);
    }
    showOnScreen() {
        this.element.classList.remove('d-none');
    }
    hideFromScreen() {
        this.element.classList.add('d-none');
    }
    toggleOnScreen() {
        this.element.classList.toggle('d-none');
    }
    enable() {
        this.element.removeAttribute('disabled');
    }
    disable() {
        this.element.setAttribute('disabled', '');
    }
    addEventListener(eventName, callback) {
        this.element.addEventListener(eventName, callback)
    }
    removeEventListener(eventName, callback) {
        this.element.removeEventListener(eventName, callback)
    }
};

class Background extends Element {
    constructor(elementClassName) {
        super(elementClassName);
    }
    showOnScreen() {
        this.element.classList.remove('d-none');
        setTimeout(() => this.element.classList.remove('transparent'), 100);
    }
    hideFromScreen() {
        this.element.classList.add('transparent');
        setTimeout(() => this.element.classList.add('d-none'), 200);
    }
    toggleOnScreen() {
        this.element.classList.contains('d-none') ? this.showOnScreen() : this.hideFromScreen();
    }
};

class HeaderElement extends Element {
    activate() {
        this.element.classList.add('nav-item-active');
    }
    deactivate() {
        this.element.classList.remove('nav-item-active');
    }
    toggleActive() {
        this.element.classList.toggle('nav-item-active');
    }
    toggleExpanded() {
        this.element.classList.toggle('d-none');
    }
    changeIcon(icon) {
        this.element.innerText = icon;
    }
};

class Line extends HeaderElement {
    constructor(elementClassName, animationClassName) {
        super(elementClassName);
        this.animationClassName = animationClassName;
    }
    enable() {
        this.element.classList.remove('btn-toggle-nav-line-disabled');
    }
    disable() {
        this.element.classList.add('btn-toggle-nav-line-disabled');
    }
    toggleAnimation() {
        this.element.classList.toggle(this.animationClassName);
    }
    playAnimationOpen() {
        this.element.classList.add(this.animationClassName);
    }
    playAnimationClose() {
        this.element.classList.remove(this.animationClassName);
    }
};

class Nav extends HeaderElement {
    constructor(elementClassName, onScreenClassName) {
        super(elementClassName);
        this.onScreenClassName = onScreenClassName;
    }
    toggleOnScreen() {
        this.element.classList.toggle(this.onScreenClassName);
    }
    showOnScreen() {
        this.element.classList.add(this.onScreenClassName);
    }
    hideFromScreen() {
        this.element.classList.remove(this.onScreenClassName);
    }
    detectSectionsOnScreen() {

        const sectionHome = document.getElementById('home');
        const sectionAbout = document.getElementById('about');
        const sectionProjects = document.getElementById('projects');
        const sectionContact = document.getElementById('contact');
        const sections = [sectionHome, sectionAbout, sectionProjects, sectionContact];

        let options = {
            rootMargin: '0px 0px -175px 0px'
        };
        
        const linkActivation = entries => {

            entries.forEach(entry => {

                if(entry.target === sectionHome && entry.isIntersecting) {

                    linkHome.activate();
                    linkAbout.deactivate();
                    linkProjects.deactivate();
                    linkContact.deactivate();

                }
                else if(entry.target === sectionAbout && entry.isIntersecting) {

                    linkHome.deactivate();
                    linkAbout.activate();
                    linkProjects.deactivate();
                    linkContact.deactivate();

                }
                else if(entry.target === sectionProjects && entry.isIntersecting) {

                    linkHome.deactivate();
                    linkAbout.deactivate();
                    linkProjects.activate();
                    linkContact.deactivate();

                }
                else if(entry.target === sectionContact && entry.isIntersecting) {

                    linkHome.deactivate();
                    linkAbout.deactivate();
                    linkProjects.deactivate();
                    linkContact.activate();

                }

            });

        };
        
        const observer = new IntersectionObserver(linkActivation, options);

        sections.forEach(section => {
            observer.observe(section);
        });

    }
    clickSmallScreen(e) {

        if(e.target.classList.contains('link-logo') ||
            e.target.classList.contains('link-home') ||
            e.target.classList.contains('link-about') ||
            e.target.classList.contains('link-projects') ||
            e.target.classList.contains('link-contact') ||
            e.target.classList.contains('bg-dark')) {

                pageBody.enableScrolling();
                
                btnToggleNavLineTop.playAnimationClose();
                btnToggleNavLineCenter.playAnimationClose();
                btnToggleNavLineBottom.playAnimationClose();
                
                nav.hideFromScreen();
                bgDark.hideFromScreen();
                
                btnToggleNav.deactivate();

        }
        
    }
    clickLargeScreen(e) {

        if(e.target.classList.contains('btn-toggle-nav')) {
        
            pageBody.toggleScrolling();
            
            btnToggleNavLineTop.toggleAnimation();
            btnToggleNavLineCenter.toggleAnimation();
            btnToggleNavLineBottom.toggleAnimation();

            nav.toggleOnScreen();
            bgDark.toggleOnScreen();

            btnToggleNav.toggleActive();

        }
        else if(e.target.classList.contains('link-logo') && window.outerWidth >= 768 ||
                e.target.classList.contains('link-home') && window.outerWidth >= 768 ||
                e.target.classList.contains('link-about') && window.outerWidth >= 768 ||
                e.target.classList.contains('link-contact') && window.outerWidth >= 768) {

            sectionProjects.resetNoTransition();
            
        }
        else if(e.target.classList.contains('link-projects') && window.outerWidth >= 992) {

            if(sectionProjects.projectView) {

                window.scrollTo(sectionProjects);
                sectionProjects.resetWithTransition();

            }
            else {

                sectionProjects.resetNoTransition();

            }

        }
    }
};

class Link extends HeaderElement {
    constructor(elementClassName, link) {
        super(elementClassName);
        this.link = link;
    }
    enable() {
        this.element.setAttribute('href', this.link);
    }
    disable() {
        this.element.removeAttribute('href');
    }
};

class Option extends HeaderElement {
    constructor(elementClassName, onScreenClassName) {
        super(elementClassName);
        this.onScreenClassName = onScreenClassName;
    }
    showOnScreen() {
        this.element.classList.add(this.onScreenClassName);
    }
    hideFromScreen() {
        this.element.classList.remove(this.onScreenClassName);
    }
    toggleOnScreen() {
        this.element.classList.toggle(this.onScreenClassName);
    }
};





const nav = new Nav('.nav', 'pos-nav-on-screen');
const bgDark = new Background('.bg-dark');

const btnToggleNav = new HeaderElement('.btn-toggle-nav');
const btnToggleNavLines = new Line('.btn-toggle-nav-lines');
const btnToggleNavLineTop = new Line('.btn-toggle-nav-line-top', 'btn-toggle-nav-line-top-expanded');
const btnToggleNavLineCenter = new Line('.btn-toggle-nav-line-center', 'btn-toggle-nav-line-center-expanded');
const btnToggleNavLineBottom = new Line('.btn-toggle-nav-line-bottom', 'btn-toggle-nav-line-bottom-expanded');

const linkLogo = new Link('.link-logo', '#home');
const linkHome = new Link('.link-home', '#home');
const linkAbout = new Link('.link-about', '#about');
const linkProjects = new Link('.link-projects', '#projects');
const linkContact = new Link('.link-contact', '#contact');





document.addEventListener('DOMContentLoaded', () => {

    linkHome.activate();

});

document.addEventListener('click', nav.clickLargeScreen);

document.addEventListener('transitionstart', e => {

    if(e.target.classList.contains('nav')) {

        document.removeEventListener('click', nav.clickSmallScreen);
        
        btnToggleNav.disable();
        btnToggleNavLines.disable();
        
        linkLogo.disable();
        linkHome.disable();
        linkAbout.disable();
        linkProjects.disable();
        linkContact.disable();

    }

});

document.addEventListener('transitionend', e => {

    if(e.target.classList.contains('nav')) {

        document.addEventListener('click', nav.clickSmallScreen);
        
        btnToggleNav.enable();
        btnToggleNavLines.enable();
        
        linkLogo.enable();
        linkHome.enable();
        linkAbout.enable();
        linkProjects.enable();
        linkContact.enable();

    }

});

window.addEventListener('resize', () => {

    if(window.outerWidth >= 768) {

        btnToggleNavLineTop.playAnimationClose();
        btnToggleNavLineCenter.playAnimationClose();
        btnToggleNavLineBottom.playAnimationClose();

        nav.hideFromScreen();
        bgDark.hideFromScreen();
        
        btnToggleNav.deactivate();

    }
    
});

window.addEventListener('scroll', nav.detectSectionsOnScreen);
