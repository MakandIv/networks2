import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "../../axios";
import * as yup from "yup";
import {Formik} from "formik";
import {Button, Input} from "../../components";
import contains from "validator/es/lib/contains";

const ProfessionForm = () => {
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
                navigate("/profession/create")
            }
            axios.get(`/profession/${id}`, {headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}})
                .then(({data}) => {
                    setData(data);
                })
                .catch((error) => {
                    console.warn(error);
                    setError(error.response.data.message)
                })
        }
    }, [navigate, id, pathname])

    const saveProfession = (values) => {
        const data = {
            name: values.name,
        }
        if (contains(pathname, "edit")) {
            axios
                .put(`/profession/${id}`, data, {headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}})
                .then(() => {
                    navigate('/profession')
                })
                .catch((error) => {
                    console.warn(error);
                    setError(error.response.data.message)
                })
        } else {
            axios
                .post(`/profession`, data, {headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}})
                .then(() => {
                    navigate('/profession')
                })
                .catch((error) => {
                    console.warn(error);
                    setError(error.response.data.message)
                })
        }
    }

    const validationSchema = yup.object().shape({
        name: yup.string().typeError(t('type-error')).required(t('name-required')),
    })

    return (
        <div style={{width: "20em", margin: "auto"}}>
            <div className='title'>
                <h2>{!id ? t("add-profession") : t('edit-profession')}</h2>
                <hr/>
            </div>
            {data || !contains(pathname, "edit") ?
                <Formik
                    initialValues={{
                        name: data?.name
                    }}
                    validateOnBlur
                    onSubmit={(values) => saveProfession(values)}
                    validationSchema={validationSchema}>
                    {
                        ({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit}) => (
                            <form className='container'>
                                <Input
                                    type={`text`}
                                    name={'name'}
                                    label={t('profession-name')}
                                    required
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}/>

                                {touched.name && errors.name &&
                                    <div className="error"><span>{errors.name}</span></div>}

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
                                        onClick={() => navigate("/profession")}
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

export default ProfessionForm;