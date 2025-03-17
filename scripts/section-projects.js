class PageBody {
    constructor(elementTagName) {
        this.element = document.querySelector(elementTagName);
    }
    disableScrolling() {
        this.element.classList.add('scrolling-disabled');
    }
    enableScrolling() {
        this.element.classList.remove('scrolling-disabled');
    }
    toggleScrolling() {
        this.element.classList.toggle('scrolling-disabled');
    }
    disableRightClick() {
        const imgsDisabledRightClick = document.querySelectorAll('.img-disabled-right-click');

        imgsDisabledRightClick.forEach(imgDisabledRightClick => imgDisabledRightClick.addEventListener('contextmenu', e => e.preventDefault()));
    }
};

class Section {
    constructor(sectionID) {
        this.section = document.getElementById(sectionID);
        this.top = this.section.getBoundingClientRect().top;
        this.bottom = this.section.getBoundingClientRect().bottom;
    }
    addEventListener(eventName, callback) {
        this.section.addEventListener(eventName, callback)
    }
    removeEventListener(eventName, callback) {
        this.section.removeEventListener(eventName, callback)
    }
    show() {
        this.section.classList.remove('transparent');
    }
    hide() {
        this.section.classList.add('transparent')
    }
};

class SectionProjects extends Section {
    constructor(sectionID) {
        super(sectionID);
        this.projectView = false;
    }
    projectViewOn() {
        this.projectView = true;
    }
    projectViewOff() {
        this.projectView = false;
    }
    detectProjectsListOnScreen() {
        
        const projectsList = document.querySelector('.projects');
        
        const projectsListOnScreen = entries => {
            
            entries.forEach(entry => {

                if(entry.isIntersecting) {

                    devices.showOnScreenWithTransition();
                    devicesMidScreen.showOnScreenWithTransition();
                    
                }
                else {
                    
                    devices.hideFromScreenWithTransition();
                    devicesMidScreen.hideFromScreenWithTransition();

                }

            });
            
        };

        const observer = new IntersectionObserver(projectsListOnScreen);

        observer.observe(projectsList);

    }
    hoverOverProject(e) {

        if(e.target.classList.contains('btn-lingvakviz')) {

            screenMsgs.hide();
            imgsLingvaKviz.show();
            
        }
        else if(e.target.classList.contains('btn-polyglot-gathering')) {
            
            screenMsgs.hide();
            imgsPolyglotGathering.show();
            
        }
        else if(e.target.classList.contains('btn-ekokviz')) {
            
            screenMsgs.hide();
            imgsEkokviz.show();
            
        }
        else if(e.target.classList.contains('btn-jump-over-cacti')) {
            
            screenMsgs.hide();
            imgsJumpOverCacti.show();
            
        }
        else if(e.target.classList.contains('btn-peter-roman-portfolio')) {
            
            screenMsgs.hide();
            imgsPortfolio.show();
            
        }
        else if(e.target.classList.contains('btn-sustainary-main-website')) {
            
            screenMsgs.hide();
            imgsSustainary.show();
            
        }
        else if(e.target.classList.contains('btn-sdg-tech-awards')) {
            
            screenMsgs.hide();
            imgsSDGTechAwards.show();

        }
        else if(e.target.classList.contains('btn-talent-friendly-nation')) {
            
            screenMsgs.hide();
            imgsTalentFriendlyNation.show();

        }
        else if(e.target.classList.contains('btn-sustainable-innovation-camp')) {
            
            screenMsgs.hide();
            imgsSustainableInnovationCamp.show();

        }
        // else if(e.target.classList.contains('btn-little-lemon')) {
            
        //     screenMsgs.hide();
        //     imgsLittleLemon.show();

        // }

    }
    hoverOutOfProject(e) {

        if(e.target.classList.contains('btn-lingvakviz')) {

            imgsLingvaKviz.hide();
            screenMsgs.show();
            
        }
        else if(e.target.classList.contains('btn-polyglot-gathering')) {
            
            imgsPolyglotGathering.hide();
            screenMsgs.show();
            
        }
        else if(e.target.classList.contains('btn-ekokviz')) {
            
            imgsEkokviz.hide();
            screenMsgs.show();
            
        }
        else if(e.target.classList.contains('btn-jump-over-cacti')) {
            
            imgsJumpOverCacti.hide();
            screenMsgs.show();
            
        }
        else if(e.target.classList.contains('btn-peter-roman-portfolio')) {
            
            imgsPortfolio.hide();
            screenMsgs.show();
            
        }
        else if(e.target.classList.contains('btn-sustainary-main-website')) {
            
            imgsSustainary.hide();
            screenMsgs.show();
            
        }
        else if(e.target.classList.contains('btn-sdg-tech-awards')) {
            
            imgsSDGTechAwards.hide();
            screenMsgs.show();

        }
        else if(e.target.classList.contains('btn-talent-friendly-nation')) {
            
            imgsTalentFriendlyNation.hide();
            screenMsgs.show();

        }
        else if(e.target.classList.contains('btn-sustainable-innovation-camp')) {
            
            imgsSustainableInnovationCamp.hide();
            screenMsgs.show();

        }
        // else if(e.target.classList.contains('btn-little-lemon')) {
            
        //     imgsLittleLemon.hide();
        //     screenMsgs.show();

        // }
        
    }
    clickProject(e) {

        if(e.target.classList.contains('btn-lingvakviz')) {
    
            document.removeEventListener('click', nav.clickLargeScreen);
            linkLogo.disable();
            linkHome.disable();
            linkAbout.disable();
            linkProjects.disable();
            linkContact.disable();
            linksOutsideProjects.removeFocus();
            buttonsOutsideProjects.removeFocus();
            
            pageBody.disableScrolling();
            
            sectionProjects.removeEventListener('pointerover', sectionProjects.hoverOverProject);
            sectionProjects.removeEventListener('pointerout', sectionProjects.hoverOutOfProject);

            headingSectionProjects.hideFromScreenWithTransition();
            projectsList.hideFromScreenWithTransition();
            sectionAbout.hide();
            sectionContact.hide();

            btnBackToProjects.removeDisplayNone();
            btnBackToProjects.removeFocus();
            
            imgsLingvaKviz.show();

            setTimeout(() => {

                sectionProjects.projectViewOn();
                
                headingSectionProjects.undisplay();
                projectsExceptLingvaKviz.undisplay();
                btnsViewProject.undisplay();
                projectDetailsLingvaKviz.display();
                linksInsideProjects.removeFocus();
                sectionAbout.show();
                sectionContact.show();

                window.scrollTo(sectionProjects);

            }, 500);
            setTimeout(() => {

                linkAbout.deactivate();
                linkProjects.activate();
                projectsList.showOnScreenWithTransition();
                btnBackToProjects.showOnScreenWithTransition();

            }, 750);
            setTimeout(() => {

                document.addEventListener('click', nav.clickLargeScreen);
                linkLogo.enable();
                linkHome.enable();
                linkAbout.enable();
                linkProjects.enable();
                linkContact.enable();
                btnBackToProjects.addFocus();
                linksInsideProjects.addFocus();

            }, 1250);
            
        }
        else if(e.target.classList.contains('btn-polyglot-gathering')) {
    
            document.removeEventListener('click', nav.clickLargeScreen);
            linkLogo.disable();
            linkHome.disable();
            linkAbout.disable();
            linkProjects.disable();
            linkContact.disable();
            linksOutsideProjects.removeFocus();
            buttonsOutsideProjects.removeFocus();
            
            pageBody.disableScrolling();
            
            sectionProjects.removeEventListener('pointerover', sectionProjects.hoverOverProject);
            sectionProjects.removeEventListener('pointerout', sectionProjects.hoverOutOfProject);

            headingSectionProjects.hideFromScreenWithTransition();
            projectsList.hideFromScreenWithTransition();
            sectionAbout.hide();
            sectionContact.hide();

            btnBackToProjects.removeDisplayNone();
            btnBackToProjects.removeFocus();
            
            imgsPolyglotGathering.show();

            setTimeout(() => {

                sectionProjects.projectViewOn();
                
                headingSectionProjects.undisplay();
                projectsExceptPolyglotGathering.undisplay();
                btnsViewProject.undisplay();
                projectDetailsPolyglotGathering.display();
                linksInsideProjects.removeFocus();
                sectionAbout.show();
                sectionContact.show();

                window.scrollTo(sectionProjects);

            }, 500);
            setTimeout(() => {

                linkAbout.deactivate();
                linkProjects.activate();
                projectsList.showOnScreenWithTransition();
                btnBackToProjects.showOnScreenWithTransition();

            }, 750);
            setTimeout(() => {

                document.addEventListener('click', nav.clickLargeScreen);
                linkLogo.enable();
                linkHome.enable();
                linkAbout.enable();
                linkProjects.enable();
                linkContact.enable();
                btnBackToProjects.addFocus();
                linksInsideProjects.addFocus();

            }, 1250);
            
        }
        else if(e.target.classList.contains('btn-ekokviz')) {
    
            document.removeEventListener('click', nav.clickLargeScreen);
            linkLogo.disable();
            linkHome.disable();
            linkAbout.disable();
            linkProjects.disable();
            linkContact.disable();
            linksOutsideProjects.removeFocus();
            buttonsOutsideProjects.removeFocus();
            
            pageBody.disableScrolling();
            
            sectionProjects.removeEventListener('pointerover', sectionProjects.hoverOverProject);
            sectionProjects.removeEventListener('pointerout', sectionProjects.hoverOutOfProject);

            headingSectionProjects.hideFromScreenWithTransition();
            projectsList.hideFromScreenWithTransition();
            sectionAbout.hide();
            sectionContact.hide();

            btnBackToProjects.removeDisplayNone();
            btnBackToProjects.removeFocus();
            
            imgsEkokviz.show();

            setTimeout(() => {

                sectionProjects.projectViewOn();
                
                headingSectionProjects.undisplay();
                projectsExceptEkoKviz.undisplay();
                btnsViewProject.undisplay();
                projectDetailsEkoKviz.display();
                linksInsideProjects.removeFocus();
                sectionAbout.show();
                sectionContact.show();

                window.scrollTo(sectionProjects);

            }, 500);
            setTimeout(() => {

                linkAbout.deactivate();
                linkProjects.activate();
                projectsList.showOnScreenWithTransition();
                btnBackToProjects.showOnScreenWithTransition();

            }, 750);
            setTimeout(() => {

                document.addEventListener('click', nav.clickLargeScreen);
                linkLogo.enable();
                linkHome.enable();
                linkAbout.enable();
                linkProjects.enable();
                linkContact.enable();
                btnBackToProjects.addFocus();
                linksInsideProjects.addFocus();

            }, 1250);
            
        }
        else if(e.target.classList.contains('btn-jump-over-cacti')) {
    
            document.removeEventListener('click', nav.clickLargeScreen);
            linkLogo.disable();
            linkHome.disable();
            linkAbout.disable();
            linkProjects.disable();
            linkContact.disable();
            linksOutsideProjects.removeFocus();
            buttonsOutsideProjects.removeFocus();
            
            pageBody.disableScrolling();
            
            sectionProjects.removeEventListener('pointerover', sectionProjects.hoverOverProject);
            sectionProjects.removeEventListener('pointerout', sectionProjects.hoverOutOfProject);

            headingSectionProjects.hideFromScreenWithTransition();
            projectsList.hideFromScreenWithTransition();
            sectionAbout.hide();
            sectionContact.hide();

            btnBackToProjects.removeDisplayNone();
            btnBackToProjects.removeFocus();
            
            imgsJumpOverCacti.show();

            setTimeout(() => {

                sectionProjects.projectViewOn();
                
                headingSectionProjects.undisplay();
                projectsExceptJumpOverCacti.undisplay();
                btnsViewProject.undisplay();
                projectDetailsJumpOverCacti.display();
                linksInsideProjects.removeFocus();
                sectionAbout.show();
                sectionContact.show();
                
                window.scrollTo(sectionProjects);

            }, 500);
            setTimeout(() => {

                linkAbout.deactivate();
                linkProjects.activate();
                projectsList.showOnScreenWithTransition();
                btnBackToProjects.showOnScreenWithTransition();

            }, 750);
            setTimeout(() => {

                document.addEventListener('click', nav.clickLargeScreen);
                linkLogo.enable();
                linkHome.enable();
                linkAbout.enable();
                linkProjects.enable();
                linkContact.enable();
                btnBackToProjects.addFocus();
                linksInsideProjects.addFocus();

            }, 1250);
            
        }
        else if(e.target.classList.contains('btn-peter-roman-portfolio')) {

            document.removeEventListener('click', nav.clickLargeScreen);
            linkLogo.disable();
            linkHome.disable();
            linkAbout.disable();
            linkProjects.disable();
            linkContact.disable();
            linksOutsideProjects.removeFocus();
            buttonsOutsideProjects.removeFocus();
            
            pageBody.disableScrolling();
            
            sectionProjects.removeEventListener('pointerover', sectionProjects.hoverOverProject);
            sectionProjects.removeEventListener('pointerout', sectionProjects.hoverOutOfProject);

            headingSectionProjects.hideFromScreenWithTransition();
            projectsList.hideFromScreenWithTransition();
            sectionAbout.hide();
            sectionContact.hide();

            btnBackToProjects.removeDisplayNone();
            btnBackToProjects.removeFocus();
            
            imgsPortfolio.show();

            setTimeout(() => {

                sectionProjects.projectViewOn();
                
                headingSectionProjects.undisplay();
                projectsExceptPeterRomanPortfolio.undisplay();
                btnsViewProject.undisplay();
                projectDetailsPeterRomanPortfolio.display();
                linksInsideProjects.removeFocus();
                sectionAbout.show();
                sectionContact.show();

                window.scrollTo(sectionProjects);

            }, 500);
            setTimeout(() => {

                linkAbout.deactivate();
                linkProjects.activate();
                projectsList.showOnScreenWithTransition();
                btnBackToProjects.showOnScreenWithTransition();

            }, 750);
            setTimeout(() => {

                document.addEventListener('click', nav.clickLargeScreen);
                linkLogo.enable();
                linkHome.enable();
                linkAbout.enable();
                linkProjects.enable();
                linkContact.enable();
                btnBackToProjects.addFocus();
                linksInsideProjects.addFocus();

            }, 1250);
            
        }
        else if(e.target.classList.contains('btn-sustainary-main-website')) {
    
            document.removeEventListener('click', nav.clickLargeScreen);
            linkLogo.disable();
            linkHome.disable();
            linkAbout.disable();
            linkProjects.disable();
            linkContact.disable();
            linksOutsideProjects.removeFocus();
            buttonsOutsideProjects.removeFocus();
            
            pageBody.disableScrolling();
            
            sectionProjects.removeEventListener('pointerover', sectionProjects.hoverOverProject);
            sectionProjects.removeEventListener('pointerout', sectionProjects.hoverOutOfProject);

            headingSectionProjects.hideFromScreenWithTransition();
            projectsList.hideFromScreenWithTransition();
            sectionAbout.hide();
            sectionContact.hide();

            btnBackToProjects.removeDisplayNone();
            btnBackToProjects.removeFocus();
            
            imgsSustainary.show();

            setTimeout(() => {

                sectionProjects.projectViewOn();
                
                headingSectionProjects.undisplay();
                projectsExceptSustainaryMainWebsite.undisplay();
                btnsViewProject.undisplay();
                projectDetailsSustainaryMainWebsite.display();
                linksInsideProjects.removeFocus();
                sectionAbout.show();
                sectionContact.show();

                window.scrollTo(sectionProjects);

            }, 500);
            setTimeout(() => {

                linkAbout.deactivate();
                linkProjects.activate();
                projectsList.showOnScreenWithTransition();
                btnBackToProjects.showOnScreenWithTransition();

            }, 750);
            setTimeout(() => {

                document.addEventListener('click', nav.clickLargeScreen);
                linkLogo.enable();
                linkHome.enable();
                linkAbout.enable();
                linkProjects.enable();
                linkContact.enable();
                btnBackToProjects.addFocus();
                linksInsideProjects.addFocus();

            }, 1250);
        
        }
        else if(e.target.classList.contains('btn-sdg-tech-awards')) {
    
            document.removeEventListener('click', nav.clickLargeScreen);
            linkLogo.disable();
            linkHome.disable();
            linkAbout.disable();
            linkProjects.disable();
            linkContact.disable();
            linksOutsideProjects.removeFocus();
            buttonsOutsideProjects.removeFocus();
            
            pageBody.disableScrolling();
            
            sectionProjects.removeEventListener('pointerover', sectionProjects.hoverOverProject);
            sectionProjects.removeEventListener('pointerout', sectionProjects.hoverOutOfProject);

            headingSectionProjects.hideFromScreenWithTransition();
            projectsList.hideFromScreenWithTransition();
            sectionAbout.hide();
            sectionContact.hide();

            btnBackToProjects.removeDisplayNone();
            btnBackToProjects.removeFocus();
            
            imgsSDGTechAwards.show();

            setTimeout(() => {

                sectionProjects.projectViewOn();
                
                headingSectionProjects.undisplay();
                projectsExceptSDGTechAwards.undisplay();
                btnsViewProject.undisplay();
                projectDetailsSDGTechAwards.display();
                linksInsideProjects.removeFocus();
                sectionAbout.show();
                sectionContact.show();

                window.scrollTo(sectionProjects);

            }, 500);
            setTimeout(() => {

                linkAbout.deactivate();
                linkProjects.activate();
                projectsList.showOnScreenWithTransition();
                btnBackToProjects.showOnScreenWithTransition();

            }, 750);
            setTimeout(() => {

                document.addEventListener('click', nav.clickLargeScreen);
                linkLogo.enable();
                linkHome.enable();
                linkAbout.enable();
                linkProjects.enable();
                linkContact.enable();
                btnBackToProjects.addFocus();
                linksInsideProjects.addFocus();

            }, 1250);
        
        }
        else if(e.target.classList.contains('btn-talent-friendly-nation')) {
    
            document.removeEventListener('click', nav.clickLargeScreen);
            linkLogo.disable();
            linkHome.disable();
            linkAbout.disable();
            linkProjects.disable();
            linkContact.disable();
            linksOutsideProjects.removeFocus();
            buttonsOutsideProjects.removeFocus();
            
            pageBody.disableScrolling();
            
            sectionProjects.removeEventListener('pointerover', sectionProjects.hoverOverProject);
            sectionProjects.removeEventListener('pointerout', sectionProjects.hoverOutOfProject);

            headingSectionProjects.hideFromScreenWithTransition();
            projectsList.hideFromScreenWithTransition();
            sectionAbout.hide();
            sectionContact.hide();

            btnBackToProjects.removeDisplayNone();
            btnBackToProjects.removeFocus();
            
            imgsTalentFriendlyNation.show();

            setTimeout(() => {

                sectionProjects.projectViewOn();
                
                headingSectionProjects.undisplay();
                projectsExceptTalentFriendlyNation.undisplay();
                btnsViewProject.undisplay();
                projectDetailsTalentFriendlyNation.display();
                linksInsideProjects.removeFocus();
                sectionAbout.show();
                sectionContact.show();

                window.scrollTo(sectionProjects);

            }, 500);
            setTimeout(() => {

                linkAbout.deactivate();
                linkProjects.activate();
                projectsList.showOnScreenWithTransition();
                btnBackToProjects.showOnScreenWithTransition();

            }, 750);
            setTimeout(() => {

                document.addEventListener('click', nav.clickLargeScreen);
                linkLogo.enable();
                linkHome.enable();
                linkAbout.enable();
                linkProjects.enable();
                linkContact.enable();
                btnBackToProjects.addFocus();
                linksInsideProjects.addFocus();

            }, 1250);
        
        }
        else if(e.target.classList.contains('btn-sustainable-innovation-camp')) {
    
            document.removeEventListener('click', nav.clickLargeScreen);
            linkLogo.disable();
            linkHome.disable();
            linkAbout.disable();
            linkProjects.disable();
            linkContact.disable();
            linksOutsideProjects.removeFocus();
            buttonsOutsideProjects.removeFocus();
            
            pageBody.disableScrolling();
            
            sectionProjects.removeEventListener('pointerover', sectionProjects.hoverOverProject);
            sectionProjects.removeEventListener('pointerout', sectionProjects.hoverOutOfProject);

            headingSectionProjects.hideFromScreenWithTransition();
            projectsList.hideFromScreenWithTransition();
            sectionAbout.hide();
            sectionContact.hide();

            btnBackToProjects.removeDisplayNone();
            btnBackToProjects.removeFocus();
            
            imgsSustainableInnovationCamp.show();

            setTimeout(() => {

                sectionProjects.projectViewOn();
                
                headingSectionProjects.undisplay();
                projectsExceptSustainableInnovationCamp.undisplay();
                btnsViewProject.undisplay();
                projectDetailsSustainableInnovationCamp.display();
                linksInsideProjects.removeFocus();
                sectionAbout.show();
                sectionContact.show();

                window.scrollTo(sectionProjects);

            }, 500);
            setTimeout(() => {

                linkAbout.deactivate();
                linkProjects.activate();
                projectsList.showOnScreenWithTransition();
                btnBackToProjects.showOnScreenWithTransition();

            }, 750);
            setTimeout(() => {

                document.addEventListener('click', nav.clickLargeScreen);
                linkLogo.enable();
                linkHome.enable();
                linkAbout.enable();
                linkProjects.enable();
                linkContact.enable();
                btnBackToProjects.addFocus();
                linksInsideProjects.addFocus();

            }, 1250);
        
        }
        // else if(e.target.classList.contains('btn-little-lemon')) {
    
        //     document.removeEventListener('click', nav.clickLargeScreen);
        //     linkLogo.disable();
        //     linkHome.disable();
        //     linkAbout.disable();
        //     linkProjects.disable();
        //     linkContact.disable();
        //     linksOutsideProjects.removeFocus();
        //     buttonsOutsideProjects.removeFocus();
            
        //     pageBody.disableScrolling();
            
        //     sectionProjects.removeEventListener('pointerover', sectionProjects.hoverOverProject);
        //     sectionProjects.removeEventListener('pointerout', sectionProjects.hoverOutOfProject);

        //     headingSectionProjects.hideFromScreenWithTransition();
        //     projectsList.hideFromScreenWithTransition();
        //     sectionAbout.hide();
        //     sectionContact.hide();

        //     btnBackToProjects.removeDisplayNone();
        //     btnBackToProjects.removeFocus();
            
        //     imgsLittleLemon.show();

        //     setTimeout(() => {

        //         sectionProjects.projectViewOn();
                
        //         headingSectionProjects.undisplay();
        //         projectsExceptLittleLemon.undisplay();
        //         btnsViewProject.undisplay();
        //         projectDetailsLittleLemon.display();
        //         linksInsideProjects.removeFocus();
        //         sectionAbout.show();
        //         sectionContact.show();

        //         window.scrollTo(sectionProjects);

        //     }, 500);
        //     setTimeout(() => {

        //         linkAbout.deactivate();
        //         linkProjects.activate();
        //         projectsList.showOnScreenWithTransition();
        //         btnBackToProjects.showOnScreenWithTransition();

        //     }, 750);
        //     setTimeout(() => {

        //         document.addEventListener('click', nav.clickLargeScreen);
        //         linkLogo.enable();
        //         linkHome.enable();
        //         linkAbout.enable();
        //         linkProjects.enable();
        //         linkContact.enable();
        //         btnBackToProjects.addFocus();
        //         linksInsideProjects.addFocus();

        //     }, 1250);
        
        // }
        else if(e.target.classList.contains('btn-back-to-projects')) {

            sectionProjects.resetWithTransition();
            
        }
    }
    resetWithTransition() {

        projectsList.hideFromScreenWithTransition();
        btnBackToProjects.hideFromScreenWithTransition();

        sectionProjects.addEventListener('pointerover', sectionProjects.hoverOverProject);
        sectionProjects.addEventListener('pointerout', sectionProjects.hoverOutOfProject);

        setTimeout(() => {

            btnBackToProjects.addDisplayNone();
            
            sectionProjects.projectViewOff();
            
            projectDetailsContentAll.scrollToTop();
            projectDetailsAll.undisplay();
            projectsAll.display();
            btnsViewProject.display();

            linksOutsideProjects.addFocus();
            buttonsOutsideProjects.addFocus();
            
            imgsLingvaKviz.hide();
            imgsPolyglotGathering.hide();
            imgsEkokviz.hide();
            imgsJumpOverCacti.hide();
            imgsPortfolio.hide();
            imgsSustainary.hide();
            imgsSDGTechAwards.hide();
            imgsTalentFriendlyNation.hide();
            imgsSustainableInnovationCamp.hide();
            // imgsLittleLemon.hide();
            screenMsgs.show();
            
            window.scrollTo(sectionProjects);
            
        }, 500);
        setTimeout(() => {

            headingSectionProjects.showOnScreenWithTransition();
            projectsList.showOnScreenWithTransition();
            pageBody.enableScrolling();

        }, 750);

    }
    resetNoTransition() {

        pageBody.enableScrolling();
        sectionProjects.projectViewOff();
        
        headingSectionProjects.showOnScreenNoTransition();
        projectsList.showOnScreenNoTransition();
        btnBackToProjects.hideFromScreenNoTransition();
        btnBackToProjects.addDisplayNone();
        projectDetailsContentAll.scrollToTop();
        projectDetailsAll.undisplay();
        projectsAll.display();
        btnsViewProject.display();
        
        linksOutsideProjects.addFocus();
        buttonsOutsideProjects.addFocus();

        imgsLingvaKviz.hide();
        imgsPolyglotGathering.hide();
        imgsEkokviz.hide();
        imgsJumpOverCacti.hide();
        imgsPortfolio.hide();
        imgsSustainary.hide();
        imgsSDGTechAwards.hide();
        imgsTalentFriendlyNation.hide();
        imgsSustainableInnovationCamp.hide();
        // imgsLittleLemon.hide();
        screenMsgs.show();
        
        sectionProjects.addEventListener('pointerover', sectionProjects.hoverOverProject);
        sectionProjects.addEventListener('pointerout', sectionProjects.hoverOutOfProject);
        
    }
};



class SectionProjectsElement {
    constructor(elementClassName, onScreenClassName, transitionClassName) {
        this.element = document.querySelector(elementClassName);
        this.onScreenClassName = onScreenClassName;
        this.transitionClassName = transitionClassName;
        
        this.top = this.element.getBoundingClientRect().top;
        this.bottom = this.element.getBoundingClientRect().bottom;
    }
    display() {
        this.element.classList.add('d-block');
    }
    undisplay() {
        this.element.classList.remove('d-block');
    }
    addDisplayNone() {
        this.element.classList.add('d-none');
    }
    removeDisplayNone() {
        this.element.classList.remove('d-none');
    }
    removeFocus() {
        this.element.setAttribute('tabindex', -1);
    }
    addFocus() {
        this.element.setAttribute('tabindex', 0);
    }
    addTransition() {
        this.element.classList.add(this.transitionClassName);
    }
    removeTransition() {
        this.element.classList.remove(this.transitionClassName);
    }
    showOnScreenWithTransition() {
        this.addTransition();
        this.element.classList.add(this.onScreenClassName);
    }
    showOnScreenNoTransition() {
        this.element.classList.add(this.onScreenClassName);
    }
    hideFromScreenWithTransition() {
        this.addTransition();
        this.element.classList.remove(this.onScreenClassName);
    }
    hideFromScreenNoTransition() {
        this.element.classList.remove(this.onScreenClassName);
    }
};

class SectionProjectsElements {
    constructor(elementClassName) {
        this.elements = document.querySelectorAll(elementClassName);
        this.topPosition = {
            top: 0,
            behavior: 'instant'
        };
    }
    display() {
        this.elements.forEach(element => element.classList.add('d-block'));
    }
    undisplay() {
        this.elements.forEach(element => element.classList.remove('d-block'));
    }
    scrollToTop() {
        this.elements.forEach(element => element.scrollTo(this.topPosition));
    }
};

class Projects {
    constructor(elementClassName) {
        this.elements = document.querySelectorAll(elementClassName);
    }
    display() {
        this.elements.forEach(element => element.classList.remove('d-none'));
    }
    undisplay() {
        this.elements.forEach(element => element.classList.add('d-none'));
    }
};

class ScreenElements {
    constructor(screenElementsClassName) {
        this.screenElements = document.querySelectorAll(screenElementsClassName);
    }
    show() {
        this.screenElements.forEach(screenElement => screenElement.classList.remove('transparent'));
    }
    hide() {
        this.screenElements.forEach(screenElement => screenElement.classList.add('transparent'));
    }
};

class Links {
    constructor(linksElementName) {
        this.links = document.querySelectorAll(linksElementName);
    }
    removeFocus() {
        this.links.forEach(link => link.setAttribute('tabindex', -1));
    }
    addFocus() {
        this.links.forEach(link => link.setAttribute('tabindex', 0));
    }
};





const pageBody = new PageBody('body');
const sectionHome = new Section('home');
const sectionAbout = new Section('about');
const sectionProjects = new SectionProjects('projects');

const devicesMidScreen = new SectionProjectsElement('.devices-lg', 'devices-lg-on-screen', 'transition-devices');
const devices = new SectionProjectsElement('.devices-xl', 'devices-xl-on-screen', 'transition-devices');

const headingSectionProjects = new SectionProjectsElement('.section-projects-h2-wrapper', 'pos-section-projects-h2-on-screen', 'transition-section-projects-h2');
const projectsList = new SectionProjectsElement('.projects', 'pos-projects-on-screen', 'transition-projects');
const btnBackToProjects = new SectionProjectsElement('.btn-back-to-projects', 'pos-btn-back-to-projects-on-screen', 'transition-btn-back-to-projects');
const btnsViewProject = new Projects('.btn-view-project');

const projectsAll = new Projects('.project');
const projectsExceptLingvaKviz = new Projects('.project:not(.project-lingvakviz)');
const projectsExceptPolyglotGathering = new Projects('.project:not(.project-polyglot-gathering)');
const projectsExceptEkoKviz = new Projects('.project:not(.project-ekokviz)');
const projectsExceptJumpOverCacti = new Projects('.project:not(.project-jump-over-cacti)');
const projectsExceptPeterRomanPortfolio = new Projects('.project:not(.project-peter-roman-portfolio)');
const projectsExceptSustainaryMainWebsite = new Projects('.project:not(.project-sustainary-main-website)');
const projectsExceptSDGTechAwards = new Projects('.project:not(.project-sdg-tech-awards)');
const projectsExceptTalentFriendlyNation = new Projects('.project:not(.project-talent-friendly-nation)');
const projectsExceptSustainableInnovationCamp = new Projects('.project:not(.project-sustainable-innovation-camp)');
// const projectsExceptLittleLemon = new Projects('.project:not(.project-little-lemon)');

const projectDetailsAll = new SectionProjectsElements('.project-lg-xl-details');
const projectDetailsContentAll = new SectionProjectsElements('.project-lg-xl-details-content');
const projectDetailsLingvaKviz = new SectionProjectsElement('.project-details-lingvakviz');
const projectDetailsPolyglotGathering = new SectionProjectsElement('.project-details-polyglot-gathering');
const projectDetailsEkoKviz = new SectionProjectsElement('.project-details-ekokviz');
const projectDetailsJumpOverCacti = new SectionProjectsElement('.project-details-jump-over-cacti');
const projectDetailsPeterRomanPortfolio = new SectionProjectsElement('.project-details-peter-roman-portfolio');
const projectDetailsSustainaryMainWebsite = new SectionProjectsElement('.project-details-sustainary-main-website');
const projectDetailsSDGTechAwards = new SectionProjectsElement('.project-details-sdg-tech-awards');
const projectDetailsTalentFriendlyNation = new SectionProjectsElement('.project-details-talent-friendly-nation');
const projectDetailsSustainableInnovationCamp = new SectionProjectsElement('.project-details-sustainable-innovation-camp');
// const projectDetailsLittleLemon = new SectionProjectsElement('.project-details-little-lemon');

const screenMsgs = new ScreenElements('.screen-msg');
const imgsLingvaKviz = new ScreenElements('.img-lingvakviz');
const imgsPolyglotGathering = new ScreenElements('.img-polyglot-gathering');
const imgsEkokviz = new ScreenElements('.img-ekokviz');
const imgsJumpOverCacti = new ScreenElements('.img-jump-over-cacti');
const imgsPortfolio = new ScreenElements('.img-portfolio');
const imgsSustainary = new ScreenElements('.img-sustainary');
const imgsSDGTechAwards = new ScreenElements('.img-sdg-tech-awards');
const imgsTalentFriendlyNation = new ScreenElements('.img-talent-fiendly-nation');
const imgsSustainableInnovationCamp = new ScreenElements('.img-sustainable-innovation-camp');
// const imgsLittleLemon = new ScreenElements('.img-little-lemon');

const linksOutsideProjects = new Links('a[tabindex="0"]');
const linksInsideProjects = new Links('.link-inside-project');
const buttonsOutsideProjects = new Links('.button-outside-project');





document.addEventListener('DOMContentLoaded', () => {

    sectionProjects.addEventListener('pointerover', sectionProjects.hoverOverProject);
    sectionProjects.addEventListener('pointerout', sectionProjects.hoverOutOfProject);
    sectionProjects.addEventListener('click', sectionProjects.clickProject);
    sectionProjects.detectProjectsListOnScreen();
    
    pageBody.disableRightClick();

});
                                

document.addEventListener('transitionstart', e => {

    if(e.target.classList.contains('devices-xl') ||
        e.target.classList.contains('devices-lg')) {

        sectionProjects.removeEventListener('click', sectionProjects.clickProject);

    }
    else if(e.target.classList.contains('projects') ||
        e.target.classList.contains('btn-back-to-projects')) {

        sectionProjects.removeEventListener('click', sectionProjects.clickProject);

    }

});

document.addEventListener('transitionend', e => {

    if(e.target.classList.contains('devices-xl') ||
        e.target.classList.contains('devices-lg')) {

        devices.removeTransition();
        
        sectionProjects.addEventListener('click', sectionProjects.clickProject);

    } else if(e.target.classList.contains('projects')) {
        
        projectsList.removeTransition();
        
        sectionProjects.addEventListener('click', sectionProjects.clickProject);
        
    } else if(e.target.classList.contains('btn-back-to-projects')) {

        btnBackToProjects.removeTransition();
        
        sectionProjects.addEventListener('click', sectionProjects.clickProject);
        
    } else if(e.target.classList.contains('section-projects-h2-wrapper')) {

        headingSectionProjects.removeTransition();
        
        sectionProjects.addEventListener('click', sectionProjects.clickProject);
        
    }

});

window.addEventListener('resize', () => {

    if(sectionProjects.projectView && window.outerWidth < 992) {

        sectionProjects.resetNoTransition();

    }

});