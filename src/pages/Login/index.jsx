import React, {useState} from 'react';
import styles from './Login.module.css';
import {useTranslation} from "react-i18next";
import {Input, Button} from "../../components";
import {Formik} from 'formik'
import {useNavigate} from "react-router-dom";
import axios from "../../axios";
import * as yup from 'yup';


const Login = () => {
    const {t} = useTranslation();
    const navigate = useNavigate()
    const [error, setError] = useState(null);

    const login = (values) => {
        const data = {
            email: values.email,
            password: values.password
        }
        axios
            .post(`/login`, data)
            .then(({data}) => {
                localStorage.setItem("accessToken", data.access);
                localStorage.setItem("refreshToken", data.refresh);
                navigate('/profile')
            })
            .catch((error) => {
                console.warn(error);
                setError(error.response.data.message)
            })
    }


    const validationSchema = yup.object().shape({
        email: yup.string().email(t('email-invalid')).typeError('Неверный тип').required(t('email-required')),
        password: yup.string().typeError('Неверный тип').required(t('password-required')),

    })


    return (
        <div>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validateOnBlur
                onSubmit={(values) => login(values)}
                validationSchema={validationSchema}>
                {
                    ({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit}) => (
                        <form className='container'>
                            <div className='title'>
                                <h3>{t("login")}</h3>
                                <hr/>
                            </div>

                                <Input
                                    type={`text`}
                                    name={'email'}
                                    label={t('email')}
                                    placeholder="example@mail.ru"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}/>

                            {touched.email && errors.email &&
                                <div className={styles.error}><span>{errors.email}</span></div>}

                                <Input
                                    type={`password`}
                                    name={'password'}
                                    label={t('password')}
                                    placeholder="*******"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}/>

                            {touched.password && errors.password &&
                                <div className={styles.error}><span>{errors.password}</span></div>}


                                <Button
                                    style={{width: "100%"}}
                                    disabled={!isValid}
                                    onClick={handleSubmit}
                                    type={`submit`}>
                                    Записать
                                </Button>

                            <div className={styles.error}>
                                <span>{error}</span>
                            </div>
                        </form>
                    )
                }
            </Formik>
        </div>
    );
};

export default Login;