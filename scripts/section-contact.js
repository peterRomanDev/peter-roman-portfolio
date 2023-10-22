class SectionContact extends Section {
    constructor(sectionID) {
        super(sectionID);
    }
    detectChatWindowOnScreen() {

        const windowChat = document.querySelector('.chat-window');
        
        const chatWindowOnScreen = entries => {

            entries.forEach(entry => {
                
                if (entry.isIntersecting) {

                    window.removeEventListener('DOMContentLoaded', sectionContact.detectChatWindowOnScreen);
                    observer.unobserve(windowChat);

                    chatWindow.startChat();
                    
                }
                
            });
            
        };
        
        const observer = new IntersectionObserver(chatWindowOnScreen);

        observer.observe(windowChat);
        
    }
};

class ChatWindow {
    constructor(elementClassName) {
        this.element = document.querySelector(elementClassName);
    }
    startChat() {

        msgTyping.display();

        setTimeout(() => {
            
            msgTyping.undisplay();

        }, 500)
        setTimeout(() => {
            
            textBubble1.borderRadiusFirstItem();
            textBubble1.display();
            
        }, 750)
        setTimeout(() => {
            
            msgTyping.display();
            
        }, 1000)
        setTimeout(() => {
            
            msgTyping.undisplay();
            
        }, 2000)
        setTimeout(() => {
            
            textBubble1.borderRadiusFirstItemRemove();
            textBubble1.borderRadiusFirstItemFollowedByItem();
            textBubble2.borderRadiusNewItem();
            textBubble2.display();
            
        }, 2250)
        setTimeout(() => {
            
            msgTyping.display();
            
        }, 2500)
        setTimeout(() => {
            
            msgTyping.undisplay();
            
        }, 4000)
        setTimeout(() => {
            
            textBubble2.borderRadiusNewItemRemove();
            textBubble2.borderRadiusItemFollowedByItem();
            textBubble3.borderRadiusNewItem();
            textBubble3.display();
            
        }, 4250)
        setTimeout(() => {
            
            msgTyping.display();
            
        }, 4500)
        setTimeout(() => {
            
            msgTyping.undisplay();
            
        }, 6000)
        setTimeout(() => {
            
            textBubble3.borderRadiusNewItemRemove();
            textBubble3.borderRadiusItemFollowedByItem();
            textBubble4.borderRadiusNewItem();
            textBubble4.display();
            
        }, 6250)
    }
};

class ChatWindowElement {
    constructor(elementClassName) {
        this.element = document.querySelector(elementClassName);
    }
    display() {
        this.element.classList.remove('d-none')
    }
    undisplay() {
        this.element.classList.add('d-none')
    }
    addEventListener(eventName, callback) {
        this.element.addEventListener(eventName, callback)
    }
    removeEventListener(eventName, callback) {
        this.element.removeEventListener(eventName, callback)
    }
    borderRadiusFirstItem() {
        this.element.classList.add('border-radius-first-item');
    }
    borderRadiusFirstItemRemove() {
        this.element.classList.remove('border-radius-first-item');
    }
    borderRadiusFirstItemFollowedByItem() {
        this.element.classList.add('border-radius-first-item-followed-by-item');
    }
    borderRadiusFirstItemFollowedByItemRemove() {
        this.element.classList.remove('border-radius-first-item-followed-by-item');
    }
    borderRadiusItemFollowedByItem() {
        this.element.classList.add('border-radius-item-followed-by-item');
    }
    borderRadiusItemFollowedByItemRemove() {
        this.element.classList.remove('border-radius-item-followed-by-item');
    }
    borderRadiusNewItem() {
        this.element.classList.add('border-radius-new-item');
    }
    borderRadiusNewItemRemove() {
        this.element.classList.remove('border-radius-new-item');
    }
};

const sectionContact = new SectionContact('section-contact');
const chatWindow = new ChatWindow('.chat-window');
const textBubble1 = new ChatWindowElement('.text-bubble-1');
const textBubble2 = new ChatWindowElement('.text-bubble-2');
const textBubble3 = new ChatWindowElement('.text-bubble-3');
const textBubble4 = new ChatWindowElement('.text-bubble-4');
const msgTyping = new ChatWindowElement('.msg-typing');
const greenDot = new ChatWindowElement('.chat-window-header-text-status-dot');

window.addEventListener('DOMContentLoaded', sectionContact.detectChatWindowOnScreen);