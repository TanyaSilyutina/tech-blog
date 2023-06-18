const loginEl  = document.querySelector('#login_form');
const signupEl = document.querySelector('#signup_form');

async function handleLogin(e){
    e.preventDefault();
    
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    if (email && password) {
        // Login API
        const res = await fetch("/api/user/login", {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
              "Content-Type": "application/json"
          },
          
        });
        if (res.ok) {
          document.location.replace("/");
        } else {
          console.log(await res.text());
        }
      }

}
loginEl.addEventListener('submit', handleLogin);

const handleSignUp = async (e) => {
    e.preventDefault();

    const email = document.querySelector('#signup_email').value.trim();
    const username = document.querySelector('#signup_username').value.trim();
    const password = document.querySelector('#signup_password').value.trim();

    if (email && username && password) {
      const res = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({ email, username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        document.location.replace('/');
      } else {
        console.log("Sign-up error");
      }
    }
  };
signupEl.addEventListener('submit', handleSignUp);