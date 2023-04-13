import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import axios from "../../axios";
import * as yup from "yup";
import {Formik} from "formik";
import {Button, Input} from "../../components";

const ProfessionForm = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const saveProfession = (values) => {
        const data = {
            name: values.name,
        }
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

    const validationSchema = yup.object().shape({
        name: yup.string().typeError(t('type-error')).required(t('name-required')),
    })

    return (
        <div style={{width: "20em", margin: "auto"}}>
            <div className='title'>
                <h3>{t("add-profession")}</h3>
                <hr/>
            </div>
            <Formik
                initialValues={{
                    profession: ''
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
                                value={values.article}/>

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
        </div>
    );
};

export default ProfessionForm;