import { ProfileUI } from '@ui-pages';
import {
  ChangeEvent,
  FC,
  FormEvent,
  SyntheticEvent,
  useEffect,
  useState
} from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectUserData,
  selectUserProfileUpdateIsLoading,
  updateUser
} from '@slices';
import { Preloader } from '@ui';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserData);
  const isProfileUpdateLoading = useSelector(selectUserProfileUpdateIsLoading);

  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUser(formValue));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  if (isProfileUpdateLoading) {
    return <Preloader />;
  }

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );

  return null;
};
