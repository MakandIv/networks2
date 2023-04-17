import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {useLocation, useNavigate} from "react-router-dom";
import contains from "validator/es/lib/contains";
import axios from "../../axios";
import * as yup from "yup";
import {Formik} from "formik";
import {Button, Input, Select} from "../../components";

const UserSalaryForm = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [data, setData] = useState();
    const [salaries, setSalaries] = useState([]);
    const [users, setUsers] = useState([]);

    const {search, pathname} = useLocation();
    const params = new URLSearchParams(search);
    const [error, setError] = useState(null);
    const id = Number(params.get('id')) || 0;

    useEffect(() => {
        if (contains(pathname, "edit")) {
            if (id === 0) {
                navigate("/worker_salary/create")
            }
            axios.get(`/user_salary/${id}`, {headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}})
                .then(({data}) => {
                    setData(data);
                })
                .catch((error) => {
                    console.warn(error);
                    setError(error.response.data.message)
                })
        }
    }, [navigate, id, pathname])

    useEffect(() => {
        axios.get("/salary/list", {headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}}).then(({data}) => {
            setSalaries(data);
        })
    }, [])

    useEffect(() => {
        axios.get("/user/list", {headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}}).then(({data}) => {
            setUsers(data);
        })
    }, [])

    const saveWorkerSalary = (values) => {
        const data = {
            salaryId: values.salaryId,
            userId: values.userId,
        }
        if (contains(pathname, "edit")) {
            axios
                .put(`/user_salary/${id}`, data, {headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}})
                .then(() => {
                    navigate('/worker_salary')
                })
                .catch((error) => {
                    console.warn(error);
                    setError(error.response.data.message)
                })
        } else {
            axios
                .post(`/user_salary`, data, {headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}})
                .then(() => {
                    navigate('/worker_salary')
                })
                .catch((error) => {
                    console.warn(error);
                    setError(error.response.data.message)
                })
        }
    }

    const validationSchema = yup.object().shape({
        salaryId: yup.number().typeError(t('type-error')).required(t('salary-required')),
        userId: yup.number().typeError(t('type-error')).required(t('worker-required')),
    })

    return (
        <div style={{width: "20em", margin: "auto"}}>
            <div className='title'>
                <h2>{!id ? t("add-salary") : t('edit-salary')}</h2>
                <hr/>
            </div>
            {salaries && users && (data || !contains(pathname, "edit")) ?
                <Formik
                    initialValues={{
                        salaryId: data?.salaryId,
                        userId: data?.userId,
                    }}
                    validateOnBlur
                    onSubmit={(values) => saveWorkerSalary(values)}
                    validationSchema={validationSchema}>
                    {
                        ({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit}) => (
                            <form className='container'>
                                <Select
                                    name={'salaryId'}
                                    label={t('salaryLabel')}
                                    value={values.salaryId}
                                    onChange={handleChange}
                                    required
                                    onBlur={handleBlur}>
                                    <option value=""></option>
                                    {salaries.map((value) =>
                                        <option key={value.id} value={value.id}
                                                name={value.id}>{value.profession.name} {value.grade} разряда</option>
                                    )}
                                </Select>

                                {touched.salaryId && errors.salaryId &&
                                    <div className="error"><span>{errors.salaryId}</span></div>}

                                <Select
                                    name={'userId'}
                                    label={t('worker')}
                                    value={values.userId}
                                    onChange={handleChange}
                                    required
                                    onBlur={handleBlur}>
                                    <option value=""></option>
                                    {users.map((value) =>
                                        <option key={value.id} value={value.id}
                                                name={value.id}>{value.lastName} {value.firstName}</option>
                                    )}
                                </Select>

                                {touched.userId && errors.userId &&
                                    <div className="error"><span>{errors.userId}</span></div>}

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
                                        onClick={() => navigate("/worker_salary")}
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
                </Formik> : <></>}
        </div>
    );
};

export default UserSalaryForm;