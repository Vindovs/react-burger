import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../services/actions/auth";
import { useForm } from './profile-inputs';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {

    const { values, handleChange, setValues } = useForm({
        email: '',
        password: ''
    });

    const errorMessage = useSelector(store => store.user.errorMessage);
    const dispatch = useDispatch();

    const loginSubmit = (e) => {
        e.preventDefault();

        dispatch(loginUser({
            email: values.email,
            password: values.password
        }));
    }

    return (<div className='main'>
        <form onSubmit={loginSubmit}>
            <h2 className='text text_type_main-medium m-5'>Вход</h2>
            <EmailInput
                extraClass='m-5'
                placeholder='E-mail'
                isIcon={false}
                value={values.email}
                onChange={handleChange}
                name='email'
            />
            <PasswordInput
                extraClass='m-5'
                value={values.password}
                onChange={handleChange}
                name='password'
            />
            <Button
                htmlType='submit'
                disabled={!values.email || !values.password}>
                Войти
            </Button>
        </form>
        <div className='p-10 text text_type_main-default text_color_inactive'>
            <span>Вы - новый пользователь? <Link to='/register'>Зарегистрироваться</Link></span>
            <p />
            <span>Забыли пароль?<Link to='/forgot-password'>Восстановить пароль</Link></span>
        </div>
        <ErrorMessage message={errorMessage} />
    </div>);
}

export const ErrorMessage = ({ message }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!message) {
            setVisible(false);
            return;
        }

        setVisible(true);
        const timer = setTimeout(() => {
            setVisible(false);
        }, 3000)

        return () => clearTimeout(timer);
    }, [message]);

    return (visible && (<div className='p-5'>
        <p className='text text_type_main text_color_inactive'>{message}</p>
    </div>));
}

export default Login;