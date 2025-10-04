
document.getElementById('lead-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const subject = encodeURIComponent('PixelWerx Website Lead');
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:sales@emblemprojects.example?subject=${subject}&body=${body}`;
});
document.getElementById('year').textContent = new Date().getFullYear();
