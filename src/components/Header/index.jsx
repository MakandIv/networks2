import {Link} from "react-router-dom";
import {BiNetworkChart} from "react-icons/bi";
import {useTranslation} from "react-i18next";
import styles from './Header.module.css';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import axios from "../../axios";

const Header = () => {
    const {t} = useTranslation()
    const {firstName, lastName, role, avatarId} = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const [avatar, setAvatar] = useState("");

    useEffect(() => {
        axios.get("/user", {headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}}).then(({data}) => {
            dispatch({type: "SET_DATA", ...data});
        })
    }, [dispatch])

    useEffect(() => {
        if (avatarId) {
            axios.get(`/files/${avatarId}`, {
                responseType: 'blob',
                headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}
            }).then(({data}) => {
                const url = window.URL.createObjectURL(data);
                setAvatar(url);
            })
        }
    }, [avatarId])


    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link to="/" className={styles.link}>
                    <BiNetworkChart/>
                    <div className={styles.info}>
                        <b>{t('title-app')}</b>
                        <span>{t('by-author')}</span>
                    </div>
                </Link>
                <ul>
                    <li><Link to="workshop" className={styles.link}>{t('workshops')}</Link></li>
                    <li><Link to="profession" className={styles.link}>{t('professions')}</Link></li>
                    <li><Link to="salary" className={styles.link}>{t('salaries')}</Link></li>
                    <li><Link to="allowance" className={styles.link}>{t('allowances')}</Link></li>
                </ul>
                <div style={{margin: "auto"}}></div>
                <Link to="profile" className={styles.link}>
                    <div className={styles.profile}>
                        <b>{firstName} {lastName}</b>
                        <span>{t(`${role}`)}</span>
                    </div>
                    <div className={styles.avatar}>
                        <img src={avatar || "https://cdn-icons-png.flaticon.com/512/18/18601.png"} alt="avatar"/>
                    </div>
                </Link>
            </div>

        </header>
    )
};

export default Header;