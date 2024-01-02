import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { User } from '../../models/user';
import * as NotesApi from '../../network/notes_api';
import { SignupCredentials } from '../../network/notes_api';
import styleUtils from '../../styles/utils.module.css';
import TextInputField from './TextInputField';

interface SignUpModalProps {
  onDismiss: () => void;
  onSignupSuccessful: (user: User) => void;
}

const SignUpModal = ({ onDismiss, onSignupSuccessful }: SignUpModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupCredentials>();

  const onSubmit = async (credentials: SignupCredentials) => {
    try {
      const newUser = await NotesApi.signUp(credentials);
      onSignupSuccessful(newUser);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name='username'
            label='Username'
            type='text'
            placeholder='Username'
            register={register}
            registerOptions={{ required: 'Required' }}
            error={errors.username}
          />
          <TextInputField
            name='email'
            label='Email'
            type='email'
            placeholder='Email'
            register={register}
            registerOptions={{ required: 'Required' }}
            error={errors.email}
          />
          <TextInputField
            name='password'
            label='Password'
            type='password'
            placeholder='Password'
            register={register}
            registerOptions={{ required: 'Required' }}
            error={errors.password}
          />
          <Button
            type='submit'
            disabled={isSubmitting}
            className={styleUtils.width100}
          >
            Sign Up
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignUpModal;
