import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ClerkProvider, SignIn, SignUp, useAuth } from '@clerk/clerk-react';
import { UserProvider } from './context/UserContext';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import DogClassifier from './pages/DogClassifier';
import DogResult from './pages/DogResult';
import DogProducts from './pages/DogProducts';
import FeedbackForm from './pages/FeedbackForm';
import './components/App.css';

// Replace with your actual Clerk publishable key
const clerkPubKey = "pk_test_ZGVjZW50LXB1cC0yNi5jbGVyay5hY2NvdW50cy5kZXYk";

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isSignedIn } = useAuth();
  
  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }
  
  return children;
};

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <UserProvider>
        <Router>
          <div className="app">
            <Navbar />
            <main className="app-main">
              <div className="container">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
                  <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/classify" 
                    element={
                      <ProtectedRoute>
                        <DogClassifier />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/result/:id" 
                    element={
                      <ProtectedRoute>
                        <DogResult />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/products" 
                    element={
                      <ProtectedRoute>
                        <DogProducts />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="/feedback" element={<FeedbackForm />} />
                </Routes>
              </div>
            </main>
            <footer className="app-footer">
              <div className="container">
                <p>© 2023 Dogify. All rights reserved.</p>
              </div>
            </footer>
          </div>
        </Router>
      </UserProvider>
    </ClerkProvider>
  );
}

export default App;
