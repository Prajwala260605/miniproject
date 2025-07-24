document.querySelector('.signin-btn').addEventListener('click', async () => {
  const identifier = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  if (!identifier || !password) {
    alert('Please enter both email and password.');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/auth/signin', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: identifier,
        password: password
      })
    });

    const data = await response.json();

    if (response.ok) {
      alert('Login successful!');
      window.location.href = 'index.html';
    } else {
      alert(data.message || 'Login failed');
    }
  } catch (error) {
    console.error('Signin error:', error);
    alert('Login failed. Please try again.');
  }
});

