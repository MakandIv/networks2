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
                "logout": "Log out",
                "submit-login": "Log in",
                "email": "E-mail",
                "email-required": "Email required",
                "email-invalid": "Invalid email",
                "password": "Password",
                "password-required": "Password required",

                "registration": "Registration",
                "submit-reg": "Register",
                "firstName-required": "First name required",
                "lastName-required": "Last name required",
                "gender-required": "Gender required",

                "currentPassword-required": "Current password required",
                "newPassword-required": "New password required",

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

                "name-required": "Name required",
                "number-required": "Number required",
                "profession-required": "Profession required",
                "grade-required": "Grade required",
                "amount-required": "Amount required",
                "article-required": "Article required",

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
                "findStrings_many": "{{count}} records found for your request.",

                "profile": "User Profile",
                "edit": "Edit",
                "edit-profile": "Edit Profile",
                "changePassword": "Change Password",

                "fullName": "Full Name",

                "avatar": "Avatar",
                "firstName": "First Name",
                "lastName": "Last Name",
                "role": "Role",
                "patronymic": "Patronymic",
                "genderLabel": "Gender",
                "gender_male": "Male",
                "gender_female": "Female",
                "gender": "Unknown"

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
                "logout": "Выйти",
                "submit-login": "Войти",
                "email": "Эл. почта",
                "email-required": "Введите адрес эл. почты",
                "email-invalid": "Неверный адрес эл. почты",
                'password': "Пароль",
                "password-required": "Введите пароль",

                "registration": "Регистрация",
                "submit-reg": "Загеристрироваться",
                "firstName-required": "Введите имя",
                "lastName-required": "Веедите фамилию",
                "gender-required": "Укажите пол",

                "currentPassword": "Текущий пароль",
                "newPassword": "Новый пароль",
                "newPasswordConfirm": "Повторите новый пароль",
                "currentPassword-required": "Введите текущий пароль",
                "newPassword-required": "Введите новый пароль",

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

                "name-required": "Введите название",
                "number-required": "Введите номер",
                "profession-required": "Укажите профессию",
                "grade-required": "Введите номер разряда",
                "amount-required": "Введите сумму",
                "article-required": "Введите название",

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
                "findStrings_many": "По вашему запросу найдено {{count}} записей.",

                "profile": "Профиль пользователя",
                "edit": "Редактировать",
                "edit-profile": "Редактирование профиля",
                "changePassword": "Изменить пароль",

                "fullName": "Полное имя",

                "avatar": "Аватар",
                "firstName": "Имя",
                "lastName": "Фамилия",
                "patronymic": "Отчество",
                "role": "Роль",
                "genderLabel": "Пол",
                "gender_male": "Мужской",
                "gender_female": "Женский",
                "gender": "Не задано"
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
