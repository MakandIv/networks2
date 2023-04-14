import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import axios from "../../axios";
import Pagination from "../../components/Pagination";
import {useLocation, useNavigate} from "react-router-dom";
import {Button} from "../../components";
import {BiEdit, BiTrash} from "react-icons/bi";
import {RequiredAdminRight} from "../../utilities";

const Workshop = () => {
    const {t} = useTranslation();
    const [workshops, setWorkshops] = useState([]);
    const navigate = useNavigate();

    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const page = Number(params.get('page')) || 1;
    const limit = Number(params.get('limit')) || 10;


    useEffect(() => {
        axios.get("/workshop/list", {headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}}).then(({data}) => {
            setWorkshops(data);
        })
    }, [])

    return (
        <>
            <h2>{t("workshops")}</h2>
            <RequiredAdminRight><Button onClick={() => navigate("/workshop/create")}>{t('add-workshop')}</Button></RequiredAdminRight>
            <br/>
            <span>{t('findStrings', {count: workshops.length })}</span>
            <table>
                <tbody>
                    <tr>
                        <th>{t("number-list")}</th>
                        <th>{t("workshop-name")}</th>
                        <th>{t("workshop-number")}</th>
                        <th>{t("boss")}</th>
                        <th>{t("schedule")}</th>
                        <RequiredAdminRight><th>{t("...")}</th></RequiredAdminRight>
                    </tr>
                    {workshops.slice(((page - 1) * limit), page * limit).map((workshop, index) => { return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{workshop.name}</td>
                            <td>{workshop.number}</td>
                            <td>{workshop.boss?.lastName || "null"} {workshop.boss?.firstName || ""}</td>
                            <td>{workshop.schedule}</td>
                            <RequiredAdminRight><td>
                                <div className="td_edit">
                                    <BiEdit className="bi-btn" onClick={() => navigate(`/workshop/edit?id=${workshop.id}`)}/>
                                    <BiTrash className="bi-btn" onClick={() => navigate(`/workshop/delete?id=${workshop.id}`)}/>
                                </div>
                            </td></RequiredAdminRight>
                        </tr>
                    )
                    })}
                </tbody>
            </table>
            <Pagination page={page} numberPages={Math.ceil(workshops.length / limit)} limit={limit}/>
        </>
    );
};

export default Workshop;