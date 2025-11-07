// small UI helpers for the demo site
document.getElementById('year')?.textContent = new Date().getFullYear();
document.querySelectorAll('.logo').forEach(()=>{ /* placeholder for later */ });

function submitForm(e){
  e.preventDefault();
  // demo behavior — no backend
  document.getElementById('contactForm')?.classList.add('hidden');
  const msg = document.getElementById('msg');
  if(msg){ msg.classList.remove('hidden'); msg.textContent = 'Thanks! (This is a demo. Integrate a real form service.)'; }
}
window.submitForm = submitForm;
