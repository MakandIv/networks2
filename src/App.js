import './App.css';
import Routes from './routes'
import i18n from "i18next";
import {initReactI18next} from "react-i18next";

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: {
                "title-app": "Network and Telecommunication",
                "by-author": "By Andrey Makushkin",

                "workshops": "Workshops",
                "professions": "Professions",
                "salaries": "Salaries",
                "allowances": "Allowances",

                "ANON": "Anonymous",
                "USER": "User",
                "ADMIN": "Administrator",

                "save": "Save",
                "cancel": "Cancel",

                "login": "Log in",
                "submit-login": "Log in",
                "email": "E-mail",
                "email-required": "Email required",
                "email-invalid": "Invalid email",
                "password": "Password",
                "password-required": "Password required",

                "number-list": "#",
                "workshop-name": "Name",
                "workshop-number": "Number",
                "boss": "Foreman",
                "schedule": "Schedule",
                "profession": "Profession",
                "profession-name": "Profession Name",
                "amount": "Amount",
                "grade": "Grade",
                "article-allowance": "Article",

                "add-workshop": "Add Workshop",
                "add-salary": "Add Salary",
                "add-allowance": "Add Allowance",
                "add-profession": "Add Profession",

                "edit-workshop": "Edit Workshop",
                "edit-salary": "Edit Salary",
                "edit-allowance": "Edit Allowance",
                "edit-profession": "Edit Profession",

                "findStrings_zero": "No records were found for your request.",
                "findStrings_one": "{{count}} record found for your request.",
                "findStrings_many": "{{count}} records found for your request."

            }
        },
        ru: {
            translation: {
                "title-app": "Сети и Телекоммуникации",
                "by-author": "Макушкин Андрей",

                "workshops": "Цеха",
                "professions": "Профессии",
                "salaries": "Зарплата",
                "allowances": "Надбавки",

                "ANON": "Анонимный",
                "USER": "Пользователь",
                "ADMIN": "Администратор",

                "save": "Сохранить",
                "cancel": "Отмена",

                "login": "Вход",
                "submit-login": "Войти",
                "email": "Эл. почта",
                "email-required": "Введите адрес эл. почты",
                "email-invalid": "Неверный адрес эл. почты",
                'password': "Пароль",
                "password-required": "Введите пароль",

                "number-list": "№",
                "workshop-name": "Название",
                "workshop-number": "Номер",
                "boss": "Начальник цеха",
                "schedule": "Расписание",
                "profession": "Профессия",
                "profession-name": "Название профессии",
                "amount": "Сумма",
                "grade": "Разряд",
                "article-allowance": "Название",

                "add-workshop": "Добавить цех",
                "add-salary": "Добавить зарплату",
                "add-allowance": "Добавить надбавку",
                "add-profession": "Добавить профессию",

                "edit-workshop": "Редактировать цех",
                "edit-salary": "Редактировать зарплату",
                "edit-allowance": "Редактировать надбавку",
                "edit-profession": "Редактировать профессию",

                "findStrings_zero": "По вашему запросу не найдено записей.",
                "findStrings_one": "По вашему запросу найдена {{count}} запись.",
                "findStrings_few": "По вашему запросу найдено {{count}} записи.",
                "findStrings_many": "По вашему запросу найдено {{count}} записей."
            }
        }
    },
    lng: "ru",
    fallbackLng: "en",

    interpolation: {
        escapeValue: false
    }
})

const App = () => (
    <div className="App">
        <Routes/>
    </div>
);

export default App;
