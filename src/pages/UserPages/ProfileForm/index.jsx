import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import axios from "../../../axios";
import {Button, Input} from "../../../components";
import {Formik} from "formik";
import {useNavigate} from "react-router-dom";
import * as yup from "yup";
import RadioButtons from "../../../components/RadioButtons"
import FileImg from "../../../components/FileImg";
import styles from './ProfileForm.module.css'

const ProfileForm = () => {
    const navigate = useNavigate()
    const {t} = useTranslation()
    const data = useSelector((state) => state.user)
    const [avatarId, setAvatarId] = useState(null);
    const [error, setError] = useState(null)

    useEffect(() => {
        setAvatarId(data.avatarId)
    }, [data.avatarId])

    const upload = (file) => {
        console.log(file)
        const formData = new FormData();
        formData.append('file', file);
        axios
            .post("/files", formData, {headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}})
            .then(({data}) => {
                setAvatarId(data.id)
            })
            .catch((error) => {
                console.warn(error);
                setError(error.response.data.message)
            })
    }

    const updateUser = (values) => {
        const data = {
            avatarId: avatarId,
            firstName: values.firstName,
            lastName: values.lastName,
            patronymic: values.patronymic,
            gender: values.gender
        }
        axios
            .patch("/user", data, {headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}})
            .then(({data}) => {
                console.log(data)
                // navigate("/profile")
            })
            .catch((error) => {
                console.warn(error);
                setError(error.response.data.message)
            })
    }

    const validationSchema = yup.object().shape({
        firstName: yup.string().typeError(t('type-error')).required(t('firstName-required')),
        lastName: yup.string().typeError(t('type-error')).required(t('lastName-required')),
        patronymic: yup.string().typeError(t('type-error')),
        gender: yup.string().typeError(t('type-error')).required(t('gender-required')),
    })

    return (
        <div style={{width: "20em", margin: "auto"}}>
            <div className='title'>
                <h2>{t('edit-profile')}</h2>
                <hr/>
            </div>
            {data ?
                <Formik
                    initialValues={{
                        firstName: data.firstName,
                        lastName: data.lastName,
                        patronymic: data.patronymic,
                        gender: data.gender,
                    }}
                    validateOnBlur
                    onSubmit={(values) => updateUser(values)}
                    validationSchema={validationSchema}>
                    {
                        ({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit}) => (
                            <form className='container'>
                                <div className={styles.avatar}>
                                    <FileImg avatarId={avatarId}/>
                                </div>

                                <Input
                                    type={`file`}
                                    name={'avatarId'}
                                    label={t('avatar')}
                                    onChange={(e) => {
                                        upload(e.target.files[0])
                                    }}
                                    onBlur={handleBlur}
                                    accept='image/*'
                                    value=''/>

                                {touched.avatarId && errors.avatarId &&
                                    <div className="error"><span>{errors.avatarId}</span></div>}


                                <Input
                                    type={`text`}
                                    name={'firstName'}
                                    label={t('firstName')}
                                    required
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.firstName}/>

                                {touched.firstName && errors.firstName &&
                                    <div className="error"><span>{errors.firstName}</span></div>}

                                <Input
                                    type={`text`}
                                    name={'lastName'}
                                    label={t('lastName')}
                                    required
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.lastName}/>

                                {touched.lastName && errors.lastName &&
                                    <div className="error"><span>{errors.lastName}</span></div>}

                                <Input
                                    type={`text`}
                                    name={'patronymic'}
                                    label={t('patronymic')}
                                    required
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.patronymic}/>

                                {touched.patronymic && errors.patronymic &&
                                    <div className="error"><span>{errors.patronymic}</span></div>}

                                <RadioButtons
                                    name={'gender'}
                                    label={t('genderLabel')}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    checked={values.gender}
                                    values={[{
                                        label: t('gender', {context: 'male'}),
                                        value: 'MALE'
                                    }, {label: t('gender', {context: 'female'}), value: 'FEMALE'}]}
                                />

                                {touched.gender && errors.gender &&
                                    <div className="error"><span>{errors.gender}</span></div>}

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
                : <></>}
        </div>
    );
};

export default ProfileForm;