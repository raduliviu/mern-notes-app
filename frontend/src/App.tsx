import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import LoginModal from './components/form/LoginModal';
import SignUpModal from './components/form/SignUpModal';
import { User } from './models/user';
import * as NotesApi from './network/notes_api';
import NotFoundPage from './pages/NotFoundPage';
import NotesPage from './pages/NotesPage';
import PrivacyPage from './pages/PrivacyPage';
import styles from './styles/App.module.css';

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const user = await NotesApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLoggedInUser();
  }, []);
  return (
    <BrowserRouter>
      <>
        <NavBar
          loggedInUser={loggedInUser}
          onLoginClicked={() => setShowLoginModal(true)}
          onSignUpClicked={() => setShowSignupModal(true)}
          onLogoutSuccessful={() => setLoggedInUser(null)}
        />
        <Container className={styles.pageContainer}>
          <Routes>
            <Route
              path='/'
              element={<NotesPage loggedInUser={loggedInUser} />}
            />
            <Route path='/privacy' element={<PrivacyPage />} />
            <Route path='/*' element={<NotFoundPage />} />
          </Routes>
        </Container>
        {showSignupModal && (
          <SignUpModal
            onDismiss={() => setShowSignupModal(false)}
            onSignupSuccessful={(user) => {
              setLoggedInUser(user);
              setShowSignupModal(false);
            }}
          />
        )}
        {showLoginModal && (
          <LoginModal
            onDismiss={() => setShowLoginModal(false)}
            onLoginSuccessful={(user) => {
              setLoggedInUser(user);
              setShowLoginModal(false);
            }}
          />
        )}
      </>
    </BrowserRouter>
  );
}

export default App;
