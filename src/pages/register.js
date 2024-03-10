import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../services/actions/auth';
import { useForm } from './profile-inputs';
import { ErrorMessage } from '../pages/login';

const Register = () => {
    const { values, handleChange } = useForm({
        userName: '',
        userEmail: '',
        userPassword: ''
    });

    const dispatch = useDispatch();
    const { user, errorMessage } = useSelector(store => store.user);

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createUser({
            name: values.userName,
            email: values.userEmail,
            password: values.userPassword
        }));
    }

    return (<div>
        {user && <Navigate to="/profile" />}
        <form onSubmit={handleSubmit}>
            <h2 className='text text_type_main-medium m-5'>Регистрация</h2>
            <Input
                extraClass='m-5'
                placeholder='Имя'
                value={values.userName}
                onChange={handleChange}
                name='userName'
            />
            <EmailInput
                extraClass='m-5'
                placeholder='E-mail'
                isIcon={false}
                value={values.userEmail}
                onChange={handleChange}
                name='userEmail'
            />
            <PasswordInput
                extraClass='m-5'
                value={values.userPassword}
                onChange={handleChange}
                name='userPassword'
            />
            <Button
                htmlType='submit'
                disabled={!values.userName || !values.userEmail || !values.userPassword}
            >Зарегистрироваться</Button>
        </form>

        <div className='text text_type_main-default text_color_inactive p-10'>
            <span>Уже зарегистрированы? <Link to='/login' > Войти </Link></span>
        </div>

        <ErrorMessage message={errorMessage} />
    </div>);
}

export default Register;