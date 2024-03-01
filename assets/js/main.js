/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 


// contact form related
// Initialize emailjs
emailjs.init("vDaQKN39yXb1FmL6b");

function validateAndSend() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const contactResponse = document.getElementById("contact-response");
    // Check if email is valid
    if (!isValidEmail(email)) {
        contactResponse.style.display = 'inline';
        contactResponse.innerText = 'Please enter a valid email address.';
        setTimeout(() => {
            contactResponse.style.display = 'none';
            // contactResponse.innerText = ``;
        }, 5000);
        return;
    }

    // Check if all fields are filled
    if (name && email && message) {
        document.querySelector('.contact__button').innerHTML = `Submitting...`;
        emailjs.send("service_ky2agvt", "template_qnfllcl", {
            to_name: "Recipient Name",  // Replace with the recipient's name
            from_name: name,
            from_email: email,
            message_html: message
        }).then(
            function (response) {
                document.querySelector('.contact__button').innerHTML = `Submit`;
                console.log("Email sent successfully:", response);
                // Show success message or perform other actions
                // Show sent message
                contactResponse.style.display = 'inline';
                contactResponse.innerText = `Message sent successfully.`;
                // Remove message after five seconds
                setTimeout(() => {
                    contactResponse.style.display = 'none';
                    // contactResponse.innerText = ``;
                }, 5000);
                // Clear input fields
                document.getElementById("contact-form").reset();
            },
            function (error) {
                document.querySelector('.contact__button').innerHTML = `Submit`;
                console.log("Email sending failed:", error);
                // Show error message or perform other actions
                // Show error message
                contactResponse.style.display = 'inline';
                contactResponse.innerText = `Message not sent`;
                setTimeout(() => {
                    contactResponse.style.display = 'none';
                    // contactResponse.innerText = ``;
                }, 5000);
            }
        );
    } else {
        alert("Please fill in all fields before submitting.");
    }
}   
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


