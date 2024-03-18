import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tryResetPassword } from "../services/actions/auth";
import { useForm } from './profile-inputs';

const ForgotPassword = () => {
    const { values, handleChange, setValues } = useForm({
        email: ''
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch({ type: 'resetPasswordResponse' });
    }, [])

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); //@ts-ignore
        dispatch(tryResetPassword(values.email));
    }
    //@ts-ignore
    const { resetPasswordEmailSent } = useSelector(store => store.user);
    useEffect(() => {

        if (resetPasswordEmailSent)
            navigate('/reset-password');

    }, [resetPasswordEmailSent])

    return (<div>
        <form onSubmit={handleSubmit}>
            <h2 className='text text_type_main-medium m-5'>Восстановление пароля</h2>
            <EmailInput extraClass='m-5'
                placeholder='укажите email'
                isIcon={false}
                autoFocus={true}
                value={values.email}
                onChange={handleChange}
                name="email"
            />
            <Button disabled={!values.email}
                htmlType='submit'>Востановить</Button>
        </form>

        <div className='text text_type_main-default text_color_inactive p-10'>
            <span>Вспомнили пароль? <Link to='/login'> Войти </Link></span>
        </div>
    </div>);
}

export default ForgotPassword;