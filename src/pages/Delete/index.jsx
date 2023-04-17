import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {useLocation, useNavigate} from "react-router-dom";
import {Button} from "../../components";
import axios from "../../axios";

const Delete = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [error, setError] = useState("")

    const { search, pathname } = useLocation();
    const params = new URLSearchParams(search);
    const type = pathname.slice(1).split("/")[0] === 'worker_salary' ? 'user_salary' : pathname.slice(1).split("/")[0];
    const id = Number(params.get('id'));

    useEffect(() => {
        if (id) {
            axios
                .get(`/${type}/${id}`, {headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}})
                .then(({data}) => {
                    setData(data)
                })
                .catch((error) => {
                    console.warn(error)
                    setError(error.response.data.message)
                })
        } else {
            setError(t("no-id"))
        }
    }, [id])

    const deleteRequest = () => {
        if (id) {
            axios
                .delete(`/${type}/${id}`, {headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}})
                .then(() => navigate(-1))
                .catch((error) => {
                    setError(error.response.data.message)
                })
        } else {
            setError(t("no-id"))
        }
    }

    const objectJoin = (obj) => {
        if (typeof obj === "object" && obj !== null) {
            return Object.entries(obj).map((entry) => entry[0] === 'id' ? "" : objectJoin(entry[1])).join(" ")
        } else {
            return obj;
        }
    }

    return (
        <div>
            <h2>{t("deleteConfirm", {name: t(type)})}</h2>
            <b>{data ? data.id + " " + objectJoin(data) : ""}</b>
            <br/>
            <br/>
            <Button onClick={deleteRequest}>{t('delete')}</Button>
            <Button onClick={() => navigate(-1)}>{t('cancel')}</Button>
            <br/>
            <span>{error}</span>
        </div>
    );
};

export default Delete;