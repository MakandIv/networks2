import React from 'react';
import {useTranslation} from "react-i18next";

const Delete = ({name}) => {
    const {t} = useTranslation()

    return (
        <div>
            <p>{t("deleteConfirm", {name: name})}</p>
        </div>
    );
};

export default Delete;