import {  EmailInput, PasswordInput, Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import { useState, ChangeEvent } from 'react';
import { updateUserInfo } from "../services/actions/auth";
import '../index.css';
import { TUserInfo } from '../utils/types';

export const ProfileInputs = () => {
//@ts-ignore
    const user = useSelector(store => store.user.user);
    const dispatch = useDispatch();

    const { values, handleChange, setValues } = useForm({
        name: user.name,
        email: user.email,
        password: ''
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault();

        let userInfo : TUserInfo  = {};

        if (values.name !== user.name)
            userInfo.name = values.name;

        if (values.email !== user.email)
            userInfo.email = values.email;

        if (!!values.password)
            userInfo.password = values.password;
//@ts-ignore
        dispatch(updateUserInfo(userInfo));
    }

    const handleReset = () => {
        setValues({
            name: user.name,
            email: user.email,
            password: ''
        });
    }

    const display = (values.name !== user.name || values.email !== user.email || values.password !== '') ? '' : 'none';

    return (<div style={{ display: 'flex' }}>
        <form onReset={handleReset} onSubmit={handleSubmit}>
            <Input
                placeholder="Имя"
                extraClass="mb-2"
                name="name"
                value={values.name}
                onChange={handleChange}
                onPointerEnterCapture={() => { }} // без этого не работает
                onPointerLeaveCapture={() => { }} // -//-//-
            />
            <EmailInput
                extraClass="mb-2"
                name='email'
                value={values.email}
                onChange={handleChange}
            />
            <PasswordInput
                extraClass="mb-2"
                name='password'
                value={values.password}
                onChange={handleChange}
            />
            <div className="saveProfileInfoButtons" style={{ display }}>
                <Button
                    type="secondary"
                    htmlType='reset'
                >Отмена</Button>
                <Button
                    htmlType='submit'
                >Сохранить</Button>
            </div>
            <p className='text text_type_main text_color_inactive mt-5'>В этом разделе вы можете изменить свои персональные данные</p>
        </form>
    </div>);
}

interface IInputsProps{
    [name: string]: string;
}

interface IUseForm{
    values: {[tkу in keyof IInputsProps]: string};
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    setValues: (props: {[tkу in keyof IInputsProps]: string}) => void;
}

export const useForm = (props : IInputsProps) : IUseForm  => {

    const [values, setValues] = useState({
        ...props
    });

    const handleChange = (event : ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setValues({ ...values, [name]: value });
    }

    return { values, handleChange, setValues };
}