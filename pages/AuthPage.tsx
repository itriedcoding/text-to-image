import React, { useState, FormEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card.tsx';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert.tsx';
import { cn } from '@/utils/cn.ts';

// Simple client-side "authentication" using localStorage.
// This is for UI/UX simulation and does not involve a backend or secure token exchange.
const registerUser = (username: string, password: string): { success: boolean, message: string } => {
  if (localStorage.getItem(`user_${username}`)) {
    return { success: false, message: 'Username already exists.' };
  }
  // Store a simple hash (for illustrative purposes, not secure)
  const hashedPassword = btoa(password); // Base64 encode as a simple "hash"
  localStorage.setItem(`user_${username}`, hashedPassword);
  return { success: true, message: 'Registration successful. You can now log in.' };
};

const loginUser = (username: string, password: string): { success: boolean, message: string } => {
  const storedPassword = localStorage.getItem(`user_${username}`);
  if (!storedPassword) {
    return { success: false, message: 'User not found.' };
  }
  const hashedPassword = btoa(password);
  if (storedPassword === hashedPassword) {
    localStorage.setItem('currentUser', username); // Store current user
    localStorage.setItem('isLoggedIn', 'true'); // Mark as logged in
    return { success: true, message: 'Login successful!' };
  }
  return { success: false, message: 'Invalid credentials.' };
};

interface AuthPageProps {
  onLogin: (username: string) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'destructive', text: string } | null>(null);
  const navigate = useNavigate();

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!username || !password) {
      setMessage({ type: 'destructive', text: 'Username and password cannot be empty.' });
      return;
    }

    if (isLoginMode) {
      // Login logic
      const result = loginUser(username, password);
      if (result.success) {
        onLogin(username);
        navigate('/generate'); // Redirect to generate page on success
      } else {
        setMessage({ type: 'destructive', text: result.message });
      }
    } else {
      // Sign up logic
      if (password !== confirmPassword) {
        setMessage({ type: 'destructive', text: 'Passwords do not match.' });
        return;
      }
      const result = registerUser(username, password);
      if (result.success) {
        setMessage({ type: 'success', text: result.message + ' You can now log in.' });
        setIsLoginMode(true); // Switch to login mode after successful registration
        setPassword('');
        setConfirmPassword('');
      } else {
        setMessage({ type: 'destructive', text: result.message });
      }
    }
  }, [username, password, confirmPassword, isLoginMode, navigate, onLogin]);

  return (
    <div className="flex items-center justify-center min-h-screen pt-24 pb-8">
      <Card className="w-full max-w-md p-6">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl text-blue-900">
            {isLoginMode ? 'Login' : 'Sign Up'}
          </CardTitle>
          <CardDescription className="text-blue-700 mt-2">
            {isLoginMode ? 'Access your AI ImageCrafter account' : 'Create a new AI ImageCrafter account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="focus-visible:ring-blue-500"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="focus-visible:ring-blue-500"
              />
            </div>
            {!isLoginMode && (
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="focus-visible:ring-blue-500"
                />
              </div>
            )}
            {message && (
              <Alert variant={message.type} className={cn("mt-4", message.type === 'success' ? 'bg-green-50 text-green-800 border-green-200' : '')}>
                <AlertTitle>{message.type === 'success' ? 'Success!' : 'Error!'}</AlertTitle>
                <AlertDescription>{message.text}</AlertDescription>
              </Alert>
            )}
            <Button
              type="submit"
              className="w-full py-3 text-lg bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
            >
              {isLoginMode ? 'Login' : 'Sign Up'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center pt-0">
          <Button
            variant="link"
            onClick={() => {
              setIsLoginMode(!isLoginMode);
              setMessage(null); // Clear messages when switching modes
              setPassword('');
              setConfirmPassword('');
            }}
            className="text-blue-600 hover:text-blue-800"
          >
            {isLoginMode ? 'Need an account? Sign Up' : 'Already have an account? Login'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthPage;