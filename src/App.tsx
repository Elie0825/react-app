import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { User } from './types'; 


function Home() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is my first React application, and I’m so happy I did it!</p>
      <p>Click the <Link to="/about">About</Link> button to learn more about me.</p>
    </div>
  );
}


function About() {
  const [user, setUser] = useState<User>({
    name: 'Elie Faniar',
    bio: 'React developer',
    imageUrl: 'src/img/Elie.jpg',
  });

 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value, 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/updateUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        console.log('User updated on the server:', user);
      } else {
        console.error('Failed to update user on the server');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      <h1>About Me</h1>
      <img src={user.imageUrl} alt="About me" />
      <h2>{user.name}</h2>
      <p>{user.bio}</p>

      <h3>Update Your Information</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </label>
        </div>
        <div>
          <label>
            Bio:
            <textarea
              name="bio"
              value={user.bio}
              onChange={handleChange}
              placeholder="Enter your bio"
            />
          </label>
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}



function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
