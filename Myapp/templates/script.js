/* script.js */

// Scroll to section functionality
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: "smooth" });
  }
  
  // Theme toggle functionality
 
  
  // Toggle the navigation menu
document.getElementById("menu-toggle").addEventListener("click", function() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("show");
});


document.querySelector('.send-message-btn').addEventListener('click', async (e) => {
  e.preventDefault(); // Prevent form submission

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const message = document.getElementById('message').value;

  try {
    const response = await fetch('http://127.0.0.1:8000/api/send-email/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, phone, message }),
    });

    if (response.ok) {
      alert('Message sent successfully!');
    } else {
      alert('Failed to send the message.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error sending the message.');
  }
});






document.querySelector('.contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    const data = { name, email, phone, message };

    try {
        const response = await fetch('/send-message/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
        } else {
            alert(`Error: ${result.error || result.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again later.');
    }
});
