import { useEffect, useState } from 'react';
import { Note as NoteModel } from './models/note';
import Note from './components/Note';
import { Container, Row } from 'react-bootstrap';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const response = await fetch('/api/notes', {
          method: 'GET',
        });
        const notes = await response.json();
        setNotes(notes);
      } catch (error) {
        console.error(error);
      }
    };
    loadNotes();
  }, []);

  return (
    <Container>
      <Row xs={1} md={2} xl={3}>
        {notes.map((note) => (
          <Note note={note} key={note._id} />
        ))}
      </Row>
    </Container>
  );
}

export default App;
