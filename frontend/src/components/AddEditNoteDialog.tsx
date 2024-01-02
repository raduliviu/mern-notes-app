import { Button, Form, Modal } from 'react-bootstrap';
import { Note } from '../models/note';
import { useForm } from 'react-hook-form';
//import { NoteInput } from '../network/notes_api';
import * as NotesApi from '../network/notes_api';
import TextInputField from './form/TextInputField';

interface AddEditNoteDialogProps {
  noteToEdit?: Note;
  onDismiss: () => void;
  onNoteSaved: (note: Note) => void;
}

const AddEditNoteDialog = ({
  onDismiss,
  onNoteSaved,
  noteToEdit,
}: AddEditNoteDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NotesApi.NoteInput>({
    defaultValues: {
      title: noteToEdit?.title || '',
      text: noteToEdit?.text || '',
    },
  });

  const onSubmit = async (input: NotesApi.NoteInput) => {
    try {
      let noteResponse: Note;

      if (noteToEdit) {
        noteResponse = await NotesApi.updateNote(noteToEdit._id, input);
      } else {
        noteResponse = await NotesApi.createNote(input);
      }

      onNoteSaved(noteResponse);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={true} onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>{noteToEdit ? 'Edit Note' : 'Add Note'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id='addEditNoteForm' onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name='title'
            label='Title'
            type='text'
            placeholder='Title'
            register={register}
            error={errors.title}
            registerOptions={{ required: 'Required' }}
          />
          <TextInputField
            name='text'
            label='Text'
            as='textarea'
            rows={5}
            placeholder='Text'
            register={register}
          />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button type='submit' form='addEditNoteForm' disabled={isSubmitting}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEditNoteDialog;
