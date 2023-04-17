import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import axios from "../../axios";
import Pagination from "../../components/Pagination";
import {useLocation, useNavigate} from "react-router-dom";
import {Button, Input} from "../../components";
import {BiEdit, BiTrash} from "react-icons/bi";
import {RequiredAdminRight} from "../../utilities";

const Profession = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [professions, setProfessions] = useState([]);
    const [sorted, setSorted] = useState({field: t('number-list'), direction: 'ASC'})
    const [searchValue, setSearchValue] = useState("");

    const {search} = useLocation();
    const params = new URLSearchParams(search);
    const page = Number(params.get('page')) || 1;
    const limit = Number(params.get('limit')) || 10;

    useEffect(() => {
        axios.get("/profession/list" + (searchValue ? `?search=${searchValue}`: ""), {headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}}).then(({data}) => {
            setProfessions(data);
        })
    }, [searchValue])

    const sorting = (field) => {
        if (sorted.field === field && sorted.direction === 'ASC') {
            setProfessions(professions.sort((a, b) => {
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
            setProfessions(professions.sort((a, b) => {
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

    return (
        <>
            <h2>{t("professions")}</h2>
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
                        onClick={() => navigate("/profession/create")}>{t('add-profession')}</Button></RequiredAdminRight>
                    <br/>
                    <span>{t('findStrings', {count: professions.length})}</span>
                    <table>
                        <tbody>
                        <tr>
                            <th>{t("number-list")}</th>
                            <th className="clickable" onClick={(e) => sorting("name")}>{t("profession")}</th>
                            <RequiredAdminRight>
                                <th>{t("...")}</th>
                            </RequiredAdminRight>
                        </tr>
                        {professions.slice(((page - 1) * limit), page * limit).map((profession, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{profession.name}</td>
                                    <RequiredAdminRight>
                                        <td>
                                            <div className="td_edit">
                                                <BiEdit className="bi-btn"
                                                        onClick={() => navigate(`/profession/edit?id=${profession.id}`)}/>
                                                <BiTrash className="bi-btn"
                                                         onClick={() => navigate(`/profession/delete?id=${profession.id}`)}/>
                                            </div>
                                        </td>
                                    </RequiredAdminRight>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    <Pagination page={page} numberPages={Math.ceil(professions.length / limit)} limit={limit}/>
                </div>
            </div>
        </>
    );
};

export default Profession;