import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import axios from "../../axios";
import Pagination from "../../components/Pagination";
import {useLocation, useNavigate} from "react-router-dom";
import {Button, Input} from "../../components";
import {BiEdit, BiTrash} from "react-icons/bi";
import {RequiredAdminRight} from "../../utilities";

const Workshop = () => {
    const {t} = useTranslation();
    const [workshops, setWorkshops] = useState([]);
    const navigate = useNavigate();
    const [sorted, setSorted] = useState({field: t('number-list'), direction: 'ASC'})
    const [searchValue, setSearchValue] = useState("");

    const {search} = useLocation();
    const params = new URLSearchParams(search);
    const page = Number(params.get('page')) || 1;
    const limit = Number(params.get('limit')) || 10;


    useEffect(() => {
        axios.get("/workshop/list" + (searchValue ? `?search=${searchValue}` : ""), {headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}}).then(({data}) => {
            setWorkshops(data);
        })
    }, [searchValue])

    const sorting = (field) => {
        if (workshops) {
            if (sorted.field === field && sorted.direction === 'ASC') {
                if (field === 'boss') {
                    setWorkshops(workshops.sort((a, b) => {
                        if (!a[field]?.lastName) {
                            return 1
                        } else if (!b[field]?.lastName) {
                            return -1;
                        } else if (a[field].lastName > b[field].lastName) {
                            return -1;
                        } else if (a[field].lastName < b[field].lastName) {
                            return 1;
                        } else {
                            if (a[field].firstName > b[field].firstName) {
                                return -1;
                            } else if (a[field].firstName < b[field].firstName) {
                                return 1;
                            } else {
                                return 0;
                            }
                        }
                    }))
                } else {
                    setWorkshops(workshops.sort((a, b) => {
                        if (a[field] > b[field]) {
                            return -1;
                        } else if (a[field] < b[field]) {
                            return 1;
                        } else {
                            return 0;
                        }
                    }))
                }
                setSorted({field: field, direction: 'DESC'})
            } else {
                if (field === 'boss') {
                    setWorkshops(workshops.sort((a, b) => {
                        if (!a[field]?.lastName) {
                            return -1
                        } else if (!b[field]?.lastName) {
                            return 0;
                        } else if (a[field].lastName < b[field].lastName) {
                            return -1;
                        } else if (a[field].lastName > b[field].lastName) {
                            return 1;
                        } else {
                            if (a[field].firstName < b[field].firstName) {
                                return -1;
                            } else if (a[field].firstName > b[field].firstName) {
                                return 1;
                            } else {
                                return 0;
                            }
                        }
                    }))
                } else {
                    setWorkshops(workshops.sort((a, b) => {
                        if (a[field] < b[field]) {
                            return -1;
                        } else if (a[field] > b[field]) {
                            return 1;
                        } else {
                            return 0;
                        }
                    }))
                }
                setSorted({field: field, direction: 'ASC'})
            }
        }
    }

    return (
        <>
            <h2>{t("workshops")}</h2>
            <div className="page">
                <div className="filters">
                    <h3>{t('filters')}</h3>
                    <Input
                        label={t('search') + ` "${t('workshop-name')}"`}
                        value={searchValue}
                        onChange={((e) => setSearchValue(e.target.value))}
                    />
                </div>
                <div>
                    <RequiredAdminRight><Button
                        onClick={() => navigate("/workshop/create")}>{t('add-workshop')}</Button></RequiredAdminRight>
                    <br/>
                    <span>{t('findStrings', {count: workshops.length})}</span>
                    <table>
                        <tbody>
                        <tr>
                            <th>{t("number-list")}</th>
                            <th className="clickable" onClick={() => sorting("name")}>{t("workshop-name")}</th>
                            <th className="clickable" onClick={() => sorting("number")}>{t("workshop-number")}</th>
                            <th className="clickable" onClick={() => sorting("boss")}>{t("boss")}</th>
                            <th>{t("schedule")}</th>
                            <RequiredAdminRight>
                                <th>{t("...")}</th>
                            </RequiredAdminRight>
                        </tr>
                        {workshops.slice(((page - 1) * limit), page * limit).map((workshop, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{workshop.name}</td>
                                    <td>{workshop.number}</td>
                                    <td>{workshop.boss?.lastName || "-"} {workshop.boss?.firstName || ""}</td>
                                    <td>{workshop.schedule}</td>
                                    <RequiredAdminRight>
                                        <td>
                                            <div className="td_edit">
                                                <BiEdit className="bi-btn"
                                                        onClick={() => navigate(`/workshop/edit?id=${workshop.id}`)}/>
                                                <BiTrash className="bi-btn"
                                                         onClick={() => navigate(`/workshop/delete?id=${workshop.id}`)}/>
                                            </div>
                                        </td>
                                    </RequiredAdminRight>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    <Pagination page={page} numberPages={Math.ceil(workshops.length / limit)} limit={limit}/>
                </div>
            </div>
        </>
    );
};

export default Workshop;