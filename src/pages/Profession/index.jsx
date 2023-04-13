import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import axios from "../../axios";
import Pagination from "../../components/Pagination";
import {useLocation, useNavigate} from "react-router-dom";
import {Button} from "../../components";
import {BiEdit, BiTrash} from "react-icons/bi";

const Profession = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [professions, setProfessions] = useState([]);

    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const page = Number(params.get('page')) || 1;
    const limit = Number(params.get('limit')) || 10;


    useEffect(() => {
        axios.get("/profession/list", {headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}}).then(({data}) => {
            setProfessions(data);
        })
    }, [])

    return (
        <>
            <h2>{t("professions")}</h2>
            <Button onClick={() => navigate("/profession/create")}>{t('add-profession')}</Button>
            <br/>
            <span>{t('findStrings', {count: professions.length })}</span>
            <table>
                <tbody>
                <tr>
                    <th>{t("number-list")}</th>
                    <th>{t("profession")}</th>
                    <th>{t("...")}</th>
                </tr>
                {professions.slice(((page - 1) * limit), page * limit).map((profession, index) => { return (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{profession.name}</td>
                        <td>
                            <div className="td_edit">
                                <BiEdit className="bi-btn" onClick={() => navigate(`/profession/edit?id=${profession.id}`)}/>
                                <BiTrash className="bi-btn" onClick={() => navigate(`/profession/delete?id=${profession.id}`)}/>
                            </div>
                        </td>
                    </tr>
                )
                })}
                </tbody>
            </table>
            <Pagination page={page} numberPages={Math.ceil(professions.length / limit)} limit={limit}/>
        </>
    );
};

export default Profession;