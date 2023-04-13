import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "../../axios";
import * as yup from "yup";
import {Formik} from "formik";
import {Button, Input} from "../../components";
import contains from "validator/es/lib/contains";

const AllowanceForm = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [data, setData] = useState();

    const {search, pathname} = useLocation();
    const params = new URLSearchParams(search);
    const [error, setError] = useState(null);
    const id = Number(params.get('id')) || 0;

    useEffect(() => {
        if (contains(pathname, "edit")) {
            if (id === 0) {
                navigate("/allowance/create")
            }
            axios.get(`/allowance/${id}`, {headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}})
                .then(({data}) => {
                    setData(data);
                })
                .catch((error) => {
                    console.warn(error);
                    setError(error.response.data.message)
                })
        }
    }, [navigate, id, pathname])

    const saveAllowance = (values) => {
        const data = {
            article: values.article,
            amount: values.amount
        }
        if (contains(pathname, "edit")) {
            axios
                .put(`/allowance/${id}`, data, {headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}})
                .then(() => {
                    navigate('/allowance')
                })
                .catch((error) => {
                    console.warn(error);
                    setError(error.response.data.message)
                })
        } else {
            axios
                .post(`/allowance`, data, {headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}})
                .then(() => {
                    navigate('/allowance')
                })
                .catch((error) => {
                    console.warn(error);
                    setError(error.response.data.message)
                })
        }
    }

    const validationSchema = yup.object().shape({
        article: yup.string().typeError(t('type-error')).required(t('article-required')),
        amount: yup.number().typeError(t('type-error')).required(t('amount-required')),
    })

    return (
        <div style={{width: "20em", margin: "auto"}}>
            <div className='title'>
                <h3>{!id ? t("add-allowance") : t('edit-allowance')}</h3>
                <hr/>
            </div>
            {data ?
            <Formik
                initialValues={{
                    article: data.article,
                    amount: data.amount
                }}
                validateOnBlur
                onSubmit={(values) => saveAllowance(values)}
                validationSchema={validationSchema}>
                {
                    ({values, errors, touched, handleReset, handleChange, handleBlur, isValid, handleSubmit}) => (
                        <form className='container'>
                            <Input
                                type={`text`}
                                name={'article'}
                                label={t('article-allowance')}
                                required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.article}/>

                            {touched.article && errors.article &&
                                <div className="error"><span>{errors.article}</span></div>}

                            <Input
                                type={`number`}
                                name={'amount'}
                                label={t('amount')}
                                required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}/>

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
                                    onClick={() => navigate("/allowance")}
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
                : <></>
            }
        </div>
    );
};

export default AllowanceForm;