import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import {Link, useNavigate} from "react-router-dom";
import axios from "../../../axios";
import * as yup from "yup";
import {Formik} from "formik";
import {Button, Input} from "../../../components";
import styles from "../Registration/Registration.module.css";
import RadioButtons from "../../../components/RadioButtons";

const Registration = () => {
    const {t} = useTranslation();
    const navigate = useNavigate()
    const [error, setError] = useState(null);

    const registration = (values) => {
        const data = {
            email: values.email,
            password: values.password,
            lastName: values.lastName,
            firstName: values.firstName,
            patronymic: values.patronymic,
            gender: values.gender
        }
        axios
            .post(`/registration`, data)
            .then(() => {
                navigate('/login')
            })
            .catch((error) => {
                console.warn(error);
                setError(error.response.data.message)
            })
    }

    const validationSchema = yup.object().shape({
        email: yup.string().email(t('email-invalid')).typeError(t('type-error')).required(t('email-required')),
        password: yup.string().min(8, t('password-min', {count: 8}))
            .matches(/[0-9]/, t('password-number'))
            .matches(/[a-zа-яё]/, t('password-lc'))
            .matches(/[A-ZА-ЯЁ]/, t('password-uc'))
            .matches(/\W/, t('password-symbol')).typeError(t('type-error')).required(t('password-required')),
        passwordConfirm: yup.string().oneOf([yup.ref('password')], t("confirm-required")).typeError(t('type-error')).required(t('password-required')),
        lastName: yup.string().typeError(t('type-error')).required(t('lastName-required')),
        firstName: yup.string().typeError(t('type-error')).required(t('firstName-required')),
        patronymic: yup.string().typeError(t('type-error')),
        gender: yup.string().typeError(t('type-error')).required(t('gender-required')),
    })


    return (
        <div className={styles.registration}>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    lastName: '',
                    firstName: '',
                    patronymic: '',
                    gender: 'MALE'
                }}
                validateOnBlur
                onSubmit={(values) => registration(values)}
                validationSchema={validationSchema}>
                {
                    ({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit}) => (
                        <form className='container'>
                            <div className='title'>
                                <h3>{t("registration")}</h3>
                                <hr/>
                            </div>

                            <Input
                                type={`text`}
                                name={'firstName'}
                                label={t('firstName')}
                                required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.firstName}/>

                            {touched.firstName && errors.firstName &&
                                <div className={styles.error}><span>{errors.firstName}</span></div>}

                            <Input
                                type={`text`}
                                name={'lastName'}
                                label={t('lastName')}
                                required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lastName}/>

                            {touched.lastName && errors.lastName &&
                                <div className={styles.error}><span>{errors.lastName}</span></div>}

                            <Input
                                type={`text`}
                                name={'patronymic'}
                                label={t('patronymic')}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.patronymic}/>

                            {touched.patronymic && errors.patronymic &&
                                <div className={styles.error}><span>{errors.patronymic}</span></div>}

                            <RadioButtons
                                name={'gender'}
                                label={t('genderLabel')}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                checked={values.gender}
                                required
                                values={[{
                                    label: t('gender', {context: 'male'}),
                                    value: 'MALE'
                                }, {label: t('gender', {context: 'female'}), value: 'FEMALE'}]}
                            />

                            {touched.gender && errors.gender &&
                                <div className={styles.error}><span>{errors.gender}</span></div>}

                            <Input
                                type={`email`}
                                name={'email'}
                                label={t('email')}
                                placeholder="example@mail.ru"
                                required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}/>

                            {touched.email && errors.email &&
                                <div className={styles.error}><span>{errors.email}</span></div>}

                            <Input
                                type={`password`}
                                name={'password'}
                                label={t('password')}
                                required
                                placeholder="*******"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}/>

                            {touched.password && errors.password &&
                                <div className={styles.error}><span>{errors.password}</span></div>}

                            <Input
                                type={`password`}
                                name={'passwordConfirm'}
                                label={t('passwordConfirm')}
                                placeholder="*******"
                                required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.passwordConfirm}/>

                            {touched.passwordConfirm && errors.passwordConfirm &&
                                <div className={styles.error}><span>{errors.passwordConfirm}</span></div>}

                            <Button
                                style={{width: "100%"}}
                                disabled={!isValid}
                                onClick={handleSubmit}
                                type={`submit`}>
                                {t('submit-reg')}
                            </Button>

                            <div className={styles.error}>
                                <span>{error}</span>
                            </div>

                            <span>{t('exist-account')} <Link to="/login">{t('submit-login')}</Link></span>
                        </form>
                    )
                }
            </Formik>
        </div>
    );
};

export default Registration;