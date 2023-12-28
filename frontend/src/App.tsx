import { useEffect, useState } from 'react';
import { Note as NoteModel } from './models/note';
import styles from './styles/NotesPage.module.css';
import styleUtils from './styles/utils.module.css';
import Note from './components/Note';
import { Button, Col, Container, Row } from 'react-bootstrap';
import * as NotesApi from './network/notes_api';
import AddNoteDialog from './components/AddNoteDialog';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
      }
    };
    loadNotes();
  }, []);

  return (
    <Container>
      <Button
        className={`mb-4 ${styleUtils.blockCenter}`}
        onClick={() => {
          setShowAddNoteDialog(true);
        }}
      >
        Add new note
      </Button>
      <Row xs={1} md={2} xl={3} className='g-4'>
        {notes.map((note) => (
          <Col key={note._id}>
            <Note note={note} className={styles.note} />
          </Col>
        ))}
      </Row>
      {showAddNoteDialog && (
        <AddNoteDialog
          onNoteSaved={(newNote) => {
            setShowAddNoteDialog(false);
            setNotes([...notes, newNote]);
          }}
          onDismiss={() => setShowAddNoteDialog(false)}
        />
      )}
    </Container>
  );
}

export default App;
