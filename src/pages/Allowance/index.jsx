import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import axios from "../../axios";
import Pagination from "../../components/Pagination";
import {useLocation, useNavigate} from "react-router-dom";
import {Button, Input} from "../../components";
import {BiEdit, BiTrash} from "react-icons/bi";
import {RequiredAdminRight} from "../../utilities";

const Allowance = () => {
    const {t} = useTranslation()
    const [allowances, setAllowances] = useState([]);
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");
    const [sorted, setSorted] = useState({field: t('number-list'), direction: 'ASC'})

    const {search} = useLocation();
    const params = new URLSearchParams(search);
    const page = Number(params.get('page')) || 1;
    const limit = Number(params.get('limit')) || 10;

    useEffect(() => {
        axios.get("/allowance/list" + (searchValue ? `?search=${searchValue}` : ""), {headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}}).then(({data}) => {
            setAllowances(data);
        })
    }, [searchValue])

    const sorting = (field) => {
        if (sorted.field === field && sorted.direction === 'ASC') {
            setAllowances(allowances.sort((a, b) => {
                if (a[field] > b[field]) {
                    return -1;
                } else if (a[field] < b[field]) {
                    return 1;
                } else {
                    return 0;
                }
            }))
            setSorted({field: field, direction: 'DESC'})
        } else {
            setAllowances(allowances.sort((a, b) => {
                if (a[field] < b[field]) {
                    return -1;
                } else if (a[field] > b[field]) {
                    return 1;
                } else {
                    return 0;
                }
            }))
            setSorted({field: field, direction: 'ASC'})
        }
    }

    return (<>
            <h2>{t("allowances")}</h2>
            <div className="page">
                <div className="filters">
                    <h3>{t('filters')}</h3>
                    <Input
                        label={t('search') + ` "${t('article-allowance')}"`}
                        value={searchValue}
                        onChange={((e) => setSearchValue(e.target.value))}
                    />
                </div>
                <div>
                    <RequiredAdminRight><Button
                        onClick={() => navigate("/allowance/create")}>{t('add-allowance')}</Button></RequiredAdminRight>
                    <br/>
                    <span>{t('findStrings', {count: allowances.length})}</span>
                    <table>
                        <tbody>
                        <tr>
                            <th>{t("number-list")}</th>
                            <th className="clickable" onClick={() => sorting("article")}>{t("article-allowance")}</th>
                            <th className="clickable" onClick={() => sorting("amount")}>{t("amount")}</th>
                            <RequiredAdminRight>
                                <th>{t("...")}</th>
                            </RequiredAdminRight>
                        </tr>
                        {allowances.slice(((page - 1) * limit), page * limit).map((allowance, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{allowance.article}</td>
                                    <td>{allowance.amount}</td>
                                    <RequiredAdminRight>
                                        <td>
                                            <div className="td_edit">
                                                <BiEdit className="bi-btn"
                                                        onClick={() => navigate(`/allowance/edit?id=${allowance.id}`)}/>
                                                <BiTrash className="bi-btn"
                                                         onClick={() => navigate(`/allowance/delete?id=${allowance.id}`)}/>
                                            </div>
                                        </td>
                                    </RequiredAdminRight>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    <Pagination page={page} numberPages={Math.ceil(allowances.length / limit)} limit={limit}/>
                </div>
            </div>
        </>
    );
};

export default Allowance;