import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import axios from "../../axios";
import * as yup from "yup";
import {Formik} from "formik";
import {Button, Input} from "../../components";
import {Select} from "../../components";

const SalaryForm = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [professions, setProfessions] = useState([]);

    useEffect(() => {
        axios.get("/profession/list", {headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}}).then(({data}) => {
            setProfessions(data);
        })
    }, [])

    const saveSalary = (values) => {
        const data = {
            professionId: values.professionId,
            grade: values.grade,
            amount: values.amount
        }
        axios
            .post(`/salary`, data, {headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}})
            .then(() => {
                navigate('/salary')
            })
            .catch((error) => {
                console.warn(error);
                setError(error.response.data.message)
            })
    }

    const validationSchema = yup.object().shape({
        professionId: yup.number().typeError(t('type-error')).required(t('profession-required')),
        grade: yup.number().typeError(t('type-error')).required(t('grade-required')),
        amount: yup.number().typeError(t('type-error')).required(t('amount-required')),
    })

    return (
        <div style={{width: "20em", margin: "auto"}}>
            <div className='title'>
                <h3>{t("add-salary")}</h3>
                <hr/>
            </div>
            <Formik
                initialValues={{
                    professionId: '',
                    grade: '',
                    amount: ''
                }}
                validateOnBlur
                onSubmit={(values) => saveSalary(values)}
                validationSchema={validationSchema}>
                {
                    ({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit}) => (
                        <form className='container'>
                            <Select
                                name={'professionId'}
                                label={t('profession')}
                                value={values.professionId}
                                onChange={handleChange}
                                required
                                onBlur={handleBlur}>
                                {professions.map((value) => {return <option key={value.id} value={value.id} name={value.id}>{value.name}</option>})}
                            </Select>

                            {touched.professionId && errors.professionId &&
                                <div className="error"><span>{errors.professionId}</span></div>}

                            <Input
                                type={`number`}
                                name={'grade'}
                                label={t('grade')}
                                required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.grade}/>

                            {touched.grade && errors.grade &&
                                <div className="error"><span>{errors.grade}</span></div>}

                            <Input
                                type={`number`}
                                name={'amount'}
                                label={t('amount')}
                                required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.amount}/>

                            {touched.amount && errors.amount &&
                                <div className="error"><span>{errors.amount}</span></div>}

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

export default SalaryForm;