import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from './profile-inputs';
import { resetPassword } from '../services/actions/auth';

const ResetPassword = () => {
    const dispatch = useDispatch();

    const { resetPasswordEmailSent, passwordIsSet } = useSelector(store => store.user);

    const { values, handleChange } = useForm({
        newPassword: '',
        code: ''
    });

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(resetPassword({ password: values.newPassword, token: values.code }));
    }

    return ((resetPasswordEmailSent && !passwordIsSet) ? (<div className='mainPanel'>
        <form onSubmit={handleSubmit}>
            <h2 className='text text_type_main-medium m-5'>Восcтановление пароля</h2>
            <PasswordInput
                extraClass='m-5'
                placeholder='Введите новый пароль'
                value={values.newPassword}
                name='newPassword'
                onChange={handleChange} />
            <Input
                extraClass='m-5'
                placeholder='Введите код из письма'
                value={values.code}
                name='code'
                onChange={handleChange} />
            <Button
                htmlType='submit'
                disabled={!values.newPassword || !values.code}>Сохранить</Button>
        </form>

        <div className='text text_type_main-default text_color_inactive p-10'>
            <span>Вспомнили пароль? <Link to='/login'> Войти </Link></span>
        </div>
    </div>) : (passwordIsSet && resetPasswordEmailSent) ? <Navigate to="/login" /> : <Navigate to="/forgot-password" />);
}

export default ResetPassword;