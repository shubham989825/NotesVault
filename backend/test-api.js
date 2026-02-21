const testAPI = async () => {
  try {
    // Test register
    const registerResponse = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: '123456'
      })
    });
    
    const registerData = await registerResponse.json();
    console.log('Register Response:', registerData);
    
    // Test login
    const loginResponse = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: '123456'
      })
    });
    
    const loginData = await loginResponse.json();
    console.log('Login Response:', loginData);
    
  } catch (error) {
    console.error('Error:', error);
  }
};

testAPI();
