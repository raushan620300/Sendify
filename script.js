'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('#contact-form');
    const formResponse = document.querySelector('#formResponse');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.querySelector('#name').value.trim();
        const email = document.querySelector('#email').value.trim();
        const phone = document.querySelector('#phone').value.trim();
        const message = document.querySelector('#message').value.trim();

        //todo: Check all input fields are filled up
        if (!name || !email || !phone || !message) {
            const errorAlert = document.createElement('div');
            errorAlert.className = 'errorAlertBox';
            errorAlert.textContent = 'Please Fill up the blank fields!';
            document.body.appendChild(errorAlert);

            setTimeout(() => {
                errorAlert.style.opacity = '1';
                errorAlert.style.visibility = 'visible';
                errorAlert.style.transform = 'translateX(-50%) translateY(0)';
                return;
            }, 500);

            setTimeout(() => {
                document.body.removeChild(errorAlert);
            }, 4000);
        }
        //? Send Messages using API-\
        try {
            const formData = new FormData(contactForm);
            //? Using Access key, User name - 
            formData.append('access_key', '5fecc6e9-0eda-423f-ba7a-2ae89e021c61');
            formData.append('from_name', `This message is sent by ${name}`);
            formData.append('subject', 'Sendify Contact Form');
            //? Fetching API for sending the messages -
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            if (!response.ok) {
                throw new Error(`Your Network connection is poor! ${response.status}`);
            }

            const result = await response.json();
            if (result.success) {
                formResponse.textContent = `Thank you for message ${name}. We'll get back to you soon. :)`;
                formResponse.className = 'form-response success';
                formResponse.style.display = 'block';
                contactForm.reset();
            } else {
                throw new Error(result.message || '! Failed to send.');
            }
        } catch (error) {
            console.error('Error:', error);
            formResponse.textContent = `Failed to send the message! Please try again`;
            formResponse.className = 'form-response error';
            formResponse.style.display = 'block';
        }
        setTimeout(() => {
            formResponse.style.display = 'none';
        }, 3000);
    });

    //todo: Reaching out each Social Media
    const socialIconsUrl = [
        'https://www.instagram.com/raushan_sinha02/?hl=en',
        'https://www.facebook.com/',
        'https://x.com/84Raushan',
        'https://discord.com/channels/@me',
        'https://www.linkedin.com/in/raushan-sinha-4b94452a1/'
    ];
    document.querySelectorAll('.social-media .social-icon').forEach((icon, idx) => {
        icon.addEventListener('click', () => {
            if (idx < socialIconsUrl.length) {
                window.open(socialIconsUrl[idx], '_self');
            }
        });
    });

});