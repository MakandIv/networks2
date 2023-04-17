import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import axios from "../../axios";
import Pagination from "../../components/Pagination";
import {useLocation, useNavigate} from "react-router-dom";
import {Button, Input} from "../../components";
import {BiEdit, BiTrash} from "react-icons/bi";
import {RequiredAdminRight} from "../../utilities";

const Salary = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [salaries, setSalaries] = useState([]);
    const [sorted, setSorted] = useState({field: t('number-list'), direction: 'ASC'})
    const [searchValue, setSearchValue] = useState("");

    const {search} = useLocation();
    const params = new URLSearchParams(search);
    const page = Number(params.get('page')) || 1;
    const limit = Number(params.get('limit')) || 10;


    useEffect(() => {
        axios.get("/salary/list" + (searchValue ? `?search=${searchValue}` : ""), {headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}}).then(({data}) => {
            setSalaries(data);
        })
    }, [searchValue])

    const sorting = (field) => {
        if (salaries) {
            if (sorted.field === field && sorted.direction === 'ASC') {
                if (field === 'profession') {
                    setSalaries(salaries.sort((a, b) => {
                        if (a[field].name > b[field].name) {
                            return -1;
                        } else if (a[field].name < b[field].name) {
                            return 1;
                        } else {
                            return 0;
                        }
                    }))
                } else {
                    setSalaries(salaries.sort((a, b) => {
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
                if (field === 'profession') {
                    setSalaries(salaries.sort((a, b) => {
                        if (a[field].name < b[field].name) {
                            return -1;
                        } else if (a[field].name > b[field].name) {
                            return 1;
                        } else {
                            return 0;
                        }
                    }))
                } else {
                    setSalaries(salaries.sort((a, b) => {
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
            <h2>{t("salaries")}</h2>
            <div className="page">
                <div className="filters">
                    <h3>{t('filters')}</h3>
                    <Input
                        label={t('search') + ` "${t('profession')}"`}
                        value={searchValue}
                        onChange={((e) => setSearchValue(e.target.value))}
                    />
                </div>
                <div>
                    <RequiredAdminRight><Button
                        onClick={() => navigate('/salary/create')}>{t('add-salary')}</Button></RequiredAdminRight>
                    <br/>
                    <span>{t('findStrings', {count: salaries.length})}</span>
                    <table>
                        <tbody>
                        <tr>
                            <th>{t("number-list")}</th>
                            <th className="clickable" onClick={() => sorting("profession")}>{t("profession")}</th>
                            <th className="clickable" onClick={() => sorting("amount")}>{t("amount")}</th>
                            <th className="clickable" onClick={() => sorting("grade")}>{t("grade")}</th>
                            <RequiredAdminRight>
                                <th>{t("...")}</th>
                            </RequiredAdminRight>
                        </tr>
                        {salaries.slice(((page - 1) * limit), page * limit).map((salary, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{salary.profession?.name || null}</td>
                                    <td>{salary.amount}</td>
                                    <td>{salary.grade}</td>
                                    <RequiredAdminRight>
                                        <td>
                                            <div className="td_edit">
                                                <BiEdit className="bi-btn"
                                                        onClick={() => navigate(`/salary/edit?id=${salary.id}`)}/>
                                                <BiTrash className="bi-btn"
                                                         onClick={() => navigate(`/salary/delete?id=${salary.id}`)}/>
                                            </div>
                                        </td>
                                    </RequiredAdminRight>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    <Pagination page={page} numberPages={Math.ceil(salaries.length / limit)} limit={limit}/>
                </div>
            </div>
        </>
    );
};

export default Salary;