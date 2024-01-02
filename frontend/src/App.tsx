import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import NavBar from './components/NavBar';
import NotesPageLoggedInView from './components/NotesPageLoggedInView';
import NotesPageLoggedOutView from './components/NotesPageLoggedOutView';
import LoginModal from './components/form/LoginModal';
import SignUpModal from './components/form/SignUpModal';
import { User } from './models/user';
import * as NotesApi from './network/notes_api';
import styles from './styles/NotesPage.module.css';

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
    <>
      <NavBar
        loggedInUser={loggedInUser}
        onLoginClicked={() => setShowLoginModal(true)}
        onSignUpClicked={() => setShowSignupModal(true)}
        onLogoutSuccessful={() => setLoggedInUser(null)}
      />
      <Container className={styles.notesPage}>
        {loggedInUser ? <NotesPageLoggedInView /> : <NotesPageLoggedOutView />}
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
  );
}

export default App;
