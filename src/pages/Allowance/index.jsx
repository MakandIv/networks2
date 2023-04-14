import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import axios from "../../axios";
import Pagination from "../../components/Pagination";
import {useLocation, useNavigate} from "react-router-dom";
import {Button} from "../../components";
import {BiEdit, BiTrash} from "react-icons/bi";
import {RequiredAdminRight} from "../../utilities";

const Allowance = () => {
    const {t} = useTranslation()
    const [allowances, setAllowances] = useState([]);
    const navigate = useNavigate();

    const {search} = useLocation();
    const params = new URLSearchParams(search);
    const page = Number(params.get('page')) || 1;
    const limit = Number(params.get('limit')) || 10;

    useEffect(() => {
        axios.get("/allowance/list", {headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}}).then(({data}) => {
            setAllowances(data);
        })
    }, [])

    return (<>
            <h2>{t("allowances")}</h2>
            <RequiredAdminRight><Button onClick={() => navigate("/allowance/create")}>{t('add-allowance')}</Button></RequiredAdminRight>
            <br/>
            <span>{t('findStrings', {count: allowances.length })}</span>
            <table>
                <tbody>
                <tr>
                    <th>{t("number-list")}</th>
                    <th>{t("article-allowance")}</th>
                    <th>{t("amount")}</th>
                    <RequiredAdminRight><th>{t("...")}</th></RequiredAdminRight>
                </tr>
                {allowances.slice(((page - 1) * limit), page * limit).map((allowance, index) => { return (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{allowance.article}</td>
                        <td>{allowance.amount}</td>
                        <RequiredAdminRight><td>
                            <div className="td_edit">
                                <BiEdit className="bi-btn" onClick={() => navigate(`/allowance/edit?id=${allowance.id}`)}/>
                                <BiTrash className="bi-btn" onClick={() => navigate(`/allowance/delete?id=${allowance.id}`)}/>
                            </div>
                        </td></RequiredAdminRight>
                    </tr>
                )
                })}
                </tbody>
            </table>
            <Pagination page={page} numberPages={Math.ceil(allowances.length / limit)} limit={limit}/>
        </>
)
    ;
};

export default Allowance;