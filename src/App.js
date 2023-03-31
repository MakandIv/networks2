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

                "login": "Log in",
                "submit-login": "Log in",
                "email": "E-mail",
                "email-required": "Email required",
                "email-invalid": "Invalid email",
                "password": "Password",
                "password-required": "Password required",
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

                "login": "Вход",
                "submit-login": "Войти",
                "email": "Эл. почта",
                "email-required": "Введите адрес эл. почты",
                "email-invalid": "Неверный адрес эл. почты",
                'password': "Пароль",
                "password-required": "Введите пароль",
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
