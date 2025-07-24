window.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('http://localhost:5000/auth/me', {
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error('Not logged in');
    }

    const user = await res.json();

    // Update profile section
    const usernameEl = document.querySelector('.profile-details p:nth-of-type(1)');
    const emailEl = document.querySelector('.profile-details p:nth-of-type(2)');

    if (usernameEl && emailEl) {
      usernameEl.textContent = `Username: ${user.name || 'Unknown'}`;
      emailEl.textContent = `Email: ${user.email || 'Unknown'}`;
    }

  } catch (err) {
    console.log('User not logged in or failed to fetch:', err);
    // Optional: Hide profile section or show default guest
  }
});
