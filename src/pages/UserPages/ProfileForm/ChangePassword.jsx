import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import axios from "../../../axios";
import {Button, Input} from "../../../components";
import {Formik} from "formik";
import {useNavigate} from "react-router-dom";
import * as yup from "yup";

const ChangePassword = () => {
    const navigate = useNavigate()
    const {t} = useTranslation()
    const [error, setError] = useState(null)

    const changePassword = (values) => {
        const data= {
            currentPassword: values.currentPassword,
            newPassword: values.newPassword
        }
        axios
            .post("/user/password", data, {headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}})
            .then(({data}) => {
                console.log(data)
                // navigate("/profile")
            })
            .catch((error) => {
                setError(error.response.data.message)
                console.warn(error);
            })
    }

    const validationSchema = yup.object().shape({
        currentPassword: yup.string().typeError(t('type-error')).required(t('currentPassword-required')),
        newPassword: yup.string().min(8, t('password-min', {count: 8}))
            .matches(/[0-9]/, t('password-number'))
            .matches(/[a-zа-яё]/, t('password-lc'))
            .matches(/[A-ZА-ЯЁ]/, t('password-uc'))
            .matches(/\W/, t('password-symbol')).typeError(t('type-error')).required(t('newPassword-required')),
        newPasswordConfirm: yup.string().oneOf([yup.ref('newPassword')], t("confirm-required")).typeError(t('type-error')).required(t('newPassword-required')),
    })

    return (
        <div style={{width: "20em", margin: "auto"}}>
            <div className='title'>
                <h2>{t('changePassword')}</h2>
                <hr/>
            </div>
                <Formik
                    initialValues={{
                        currentPassword: '',
                        newPassword: '',
                        newPasswordConfirm: '',
                    }}
                    validateOnBlur
                    onSubmit={(values) => changePassword(values)}
                    validationSchema={validationSchema}>
                    {
                        ({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit}) => (
                            <form className='container'>

                                <Input
                                    type={`password`}
                                    name={'currentPassword'}
                                    label={t('currentPassword')}
                                    required
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.currentPassword}/>

                                {touched.currentPassword && errors.currentPassword &&
                                    <div className="error"><span>{errors.currentPassword}</span></div>}

                                <Input
                                    type={`password`}
                                    name={'newPassword'}
                                    label={t('newPassword')}
                                    required
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.newPassword}/>

                                {touched.newPassword && errors.newPassword &&
                                    <div className="error"><span>{errors.newPassword}</span></div>}

                                <Input
                                    type={`password`}
                                    name={'newPasswordConfirm'}
                                    label={t('newPasswordConfirm')}
                                    required
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.newPasswordConfirm}/>

                                {touched.newPasswordConfirm && errors.newPasswordConfirm &&
                                    <div className="error"><span>{errors.newPasswordConfirm}</span></div>}

                                <div>
                                    <Button
                                        style={{width: "50%"}}
                                        disabled={!isValid}
                                        onClick={handleSubmit}
                                        type={`submit`}>
                                        {t('save')}
                                    </Button>
                                    <Button
                                        style={{width: "50%"}}
                                        onClick={() => navigate("/profile")}
                                        type={`cancel`}>
                                        {t('cancel')}
                                    </Button>
                                </div>

                                <div className="error">
                                    <span>{error}</span>
                                </div>
                            </form>
                        )
                    }
                </Formik>
        </div>
    );
};

export default ChangePassword;