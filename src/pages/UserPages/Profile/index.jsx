import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import styles from "./Profile.module.css";
import FileImg from "../../../components/FileImg";
import {Button} from "../../../components";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const {t} = useTranslation()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {avatarId, fastName, firstName, patronymic, email, role, gender} = useSelector((state) => state.user)

    return (
        <div className={styles.profileBlock}>
            <h2>{t("profile")}</h2>
            <div className={styles.avatar}>
                <FileImg avatarId={avatarId}/>
            </div>
            <div>
                <p>{t("email")}: <b>{email}</b></p>
                <hr/>
                <p>{t("fullName")}: <b>{fastName || ""} {firstName || ""} {patronymic || ""}</b></p>
                <hr/>
                <p>{t("role")}: {t(role)}</p>
                <hr/>
                <p>{t("genderLabel")}: {t("gender", {context: gender.toLowerCase()})}</p>
                <hr/>
            </div>
            <Button onClick={() => navigate("edit")}>{t("edit")}</Button>
            <Button onClick={() => navigate("password")}>{t("changePassword")}</Button>
            <Button onClick={() => {localStorage.clear(); dispatch({type: "RESET_DATA"}); navigate("/login")}}>{t("logout")}</Button>
        </div>
    );
};

export default Profile;