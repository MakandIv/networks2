import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import axios from "../../axios";
import Pagination from "../../components/Pagination";
import {useLocation, useNavigate} from "react-router-dom";
import {Button} from "../../components";
import {BiEdit, BiTrash} from "react-icons/bi";
import {RequiredAdminRight} from "../../utilities";

const Profession = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [salaries, setSalaries] = useState([]);

    const {search} = useLocation();
    const params = new URLSearchParams(search);
    const page = Number(params.get('page')) || 1;
    const limit = Number(params.get('limit')) || 10;


    useEffect(() => {
        axios.get("/user_salary/list", {headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}}).then(({data}) => {
            setSalaries(data);
        })
    }, [])

    return (
        <>
            <h2>{t("worker_salaries")}</h2>
            <Button onClick={() => navigate("/worker_salary/create")}>{t('add-worker-salary')}</Button>
            <br/>
            <span>{t('findStrings', {count: salaries.length})}</span>
            <table>
                <tbody>
                <tr>
                    <th rowSpan={2}>{t("number-list")}</th>
                    <th rowSpan={2}>{t("worker")}</th>
                    <th colSpan={3}>{t("salaries")}</th>
                    <th rowSpan={2}>{t("...")}</th>
                </tr>
                <tr>
                    <th>{t("profession")}</th>
                    <th>{t("amount")}</th>
                    <th>{t("grade")}</th>
                </tr>
                {salaries.slice(((page - 1) * limit), page * limit).map((salary, index) => {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{salary.user.lastName} {salary.user.firstName}</td>
                            {Object.entries(salary.salary).map((entry) => (entry[0] !== 'id') ?
                                <td key={entry[0]}>{typeof entry[1] === 'object' ? entry[1].name : entry[1]}</td> :
                                null)
                            }
                            <td>
                                <div className="td_edit">
                                    <BiEdit className="bi-btn"
                                            onClick={() => navigate(`edit?id=${salary.id}`)}/>
                                    <BiTrash className="bi-btn"
                                             onClick={() => navigate(`delete?id=${salary.id}`)}/>
                                </div>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <Pagination page={page} numberPages={Math.ceil(salaries.length / limit)} limit={limit}/>
        </>
    );
};

export default Profession;