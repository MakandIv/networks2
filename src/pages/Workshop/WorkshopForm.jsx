import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import axios from "../../axios";
import * as yup from "yup";
import {Formik} from "formik";
import {Button, Input} from "../../components";
import {Select} from "../../components";

const WorkshopForm = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [bosses, setBosses] = useState([]);

    useEffect(() => {
        axios.get("/user/list", {headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}}).then(({data}) => {
            setBosses(data);
        })
    }, [])

    const saveWorkshop = (values) => {
        const data = {
            name: values.name,
            number: values.number,
            bossId: values.bossId,
            schedule: values.schedule
        }
        axios
            .post(`/workshop`, data, {headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}})
            .then(() => {
                navigate('/workshop')
            })
            .catch((error) => {
                console.warn(error);
                setError(error.response.data.message)
            })
    }

    const validationSchema = yup.object().shape({
        name: yup.string().typeError(t('type-error')).required(t('name-required')),
        number: yup.number().typeError(t('type-error')).required(t('number-required')),
        bossId: yup.number().typeError(t('type-error')),
        schedule: yup.string().typeError(t('type-error')),
    })

    return (
        <div style={{width: "20em", margin: "auto"}}>
            <div className='title'>
                <h3>{t("add-workshop")}</h3>
                <hr/>
            </div>
            <Formik
                initialValues={{
                    name: '',
                    number: '',
                    bossId: '',
                    schedule: ''
                }}
                validateOnBlur
                onSubmit={(values) => saveWorkshop(values)}
                validationSchema={validationSchema}>
                {
                    ({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit}) => (
                        <form className='container'>
                            <Input
                                type={`text`}
                                name={'name'}
                                label={t('workshop-name')}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}/>

                            {touched.name && errors.name &&
                                <div className="error"><span>{errors.name}</span></div>}

                            <Input
                                type={`number`}
                                name={'number'}
                                label={t('workshop-number')}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.number}/>

                            {touched.number && errors.number &&
                                <div className="error"><span>{errors.number}</span></div>}

                            <Select name={'bossId'} label={t('boss')} value={values.professionId} onChange={handleChange} onBlur={handleBlur}>
                                {bosses.map((value) => {return <option key={value.id} value={value.id} name={value.id}>{value.firstName} {value.lastName}</option>})}
                            </Select>

                            {touched.bossId && errors.bossId &&
                                <div className="error"><span>{errors.bossId}</span></div>}

                            <Input
                                type={`text`}
                                name={'schedule'}
                                label={t('schedule')}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.schedule}/>

                            {touched.schedule && errors.schedule &&
                                <div className="error"><span>{errors.schedule}</span></div>}

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
                                    onClick={() => navigate("/salary")}
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

export default WorkshopForm;