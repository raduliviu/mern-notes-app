import styles from '../styles/Note.module.css';
import { Card } from 'react-bootstrap';
import { Note as NoteModel } from '../models/note';
import { formatDate } from '../utils/formatDate';

interface NoteProps {
  note: NoteModel;
  className?: string;
}

const Note = ({ note, className }: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;

  let dateText: string;
  if (updatedAt > createdAt) {
    dateText = 'Updated: ' + formatDate(updatedAt);
  } else {
    dateText = 'Created: ' + formatDate(createdAt);
  }
  return (
    <Card className={`${styles.noteCard} ${className}`}>
      <Card.Body className={styles.cardBody}>
        <Card.Title>{title}</Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className='text-muted'>{dateText}</Card.Footer>
    </Card>
  );
};

export default Note;
