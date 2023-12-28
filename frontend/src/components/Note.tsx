import styles from '../styles/Note.module.css';
import styleUtils from '../styles/utils.module.css';
import { Card } from 'react-bootstrap';
import { Note as NoteModel } from '../models/note';
import { formatDate } from '../utils/formatDate';
import { MdDelete } from 'react-icons/md';

interface NoteProps {
  note: NoteModel;
  onNoteClicked: (note: NoteModel) => void;
  onDeleteNoteClicked: (note: NoteModel) => void;
  className?: string;
}

const Note = ({
  note,
  className,
  onNoteClicked,
  onDeleteNoteClicked,
}: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;

  let dateText: string;
  if (updatedAt > createdAt) {
    dateText = 'Updated: ' + formatDate(updatedAt);
  } else {
    dateText = 'Created: ' + formatDate(createdAt);
  }
  return (
    <Card
      onClick={() => {
        onNoteClicked(note);
      }}
      className={`${styles.noteCard} ${className}`}
    >
      <Card.Body className={styles.cardBody}>
        <Card.Title className={styleUtils.flexCenter}>
          {title}
          <MdDelete
            className='text-muted ms-auto'
            onClick={(e) => {
              onDeleteNoteClicked(note);
              e.stopPropagation();
            }}
          />
        </Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className='text-muted'>{dateText}</Card.Footer>
    </Card>
  );
};

export default Note;
