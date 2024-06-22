document.getElementById('feedback-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const comments = document.getElementById('comments').value;
    const rating = document.getElementById('rating').value;
    const feedbackMessage = document.getElementById('feedback-message');
    
    feedbackMessage.textContent = '';

    if (name === '' || email === '' || comments === '' || rating === '') {
        feedbackMessage.style.color = 'red';
        feedbackMessage.textContent = 'Please fill out all fields.';
        return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        feedbackMessage.style.color = 'red';
        feedbackMessage.textContent = 'Please enter a valid email address.';
        return;
    }
    feedbackMessage.style.color = 'green';
    feedbackMessage.textContent = 'Thank you for your feedback!';
    document.getElementById('feedback-form').reset();
});
