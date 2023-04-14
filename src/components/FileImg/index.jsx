import React, {useEffect, useState} from 'react';
import axios from "../../axios";

const FileImg = ({value = '', setValue = () => {}, avatarId = Number() || null}) => {
    const [avatar, setAvatar] = useState("");

    useEffect(() => {
        if (avatarId) {
            axios.get(`/files/${avatarId}`, {
                responseType: 'blob',
                headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}
            }).then(({data}) => {
                const url = window.URL.createObjectURL(data);
                setAvatar(url);
                if (setAvatar) setValue(url);
            })
        }
    }, [avatarId])

    return <img src={value || avatar || "https://cdn-icons-png.flaticon.com/512/18/18601.png"} alt={String(avatarId)}/>
};

export default FileImg;