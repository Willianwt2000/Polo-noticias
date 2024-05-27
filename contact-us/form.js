const btn = document.querySelector('.btn');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Sending...';

   const serviceID = 'default_service';
   const templateID = 'template_4igjk6d';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Send Email';
      alert('Enviado');
    }, (err) => {
      btn.value = 'Send Email';
      alert(JSON.stringify(err));
    });
});