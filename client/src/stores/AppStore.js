import {makeAutoObservable} from "mobx"
import Cookies from 'js-cookie';
import {BASE_API, TEXT_AUTH} from "../consts";

class Store {
    constructor() {
        makeAutoObservable(this)
    }

    value = 0
    textAuth = TEXT_AUTH
    isOpenModal = false
    isOpenLoginModal = false
    login = ''
    password = ''
    isAuth = false
    data = []
    openFormModal = false
    openAbout = false
    message = 'нет данных'
    hasFilters = false
    errorName = false
    typeSign = ''
    time = ''
    badLogin = false
    countries = []

    formData = {
        family: '',
        name: '',
        surname: '',
        sex: '',
        country: {
            label: '',
            phone: '',
            code: ''
        },
        age: 1,
        food: {
            traditional: false,
            dietician: false,
            vegan: false
        }
    }

    regForm = {}

    setOpenFormModal = (value) => {
        this.clearForm()
        this.openFormModal = value
    }

    setOpenModal = (value, typeSign) => {
        if (!typeSign) {
            this.textAuth = TEXT_AUTH
            this.badLogin = false
        }
        this.isOpenModal = value
        this.typeSign = typeSign
    }

    setReg = (field, value) => {
        this.regForm = {...this.regForm, [field]: value}
    }

    clearData = () => {
        Cookies.set('csrftoken', '')
        this.isAuth = false
        this.data = []
        this.login = ''
        this.password = ''
    }

    clearForm = () => {
        this.formData.name = ''
        this.formData.family = ''
        this.formData.surname = ''
        this.formData.sex = ''
        this.formData.country = ''
        this.formData.age = 1
        this.formData.food.traditional = false
        this.formData.food.dietician = false
        this.formData.food.vegan = false
    }

    auth = async () => {
        this.badLogin = false
        try {
            const response = await fetch(`${BASE_API}${this.typeSign}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRFToken': Cookies.get('csrftoken'),
                },
                body: new URLSearchParams(this.regForm).toString(),
            });

            const result = await response.json();

            if (result.status === 201) {
                Cookies.set('csrftoken', result.token);
                this.setOpenModal(false);
            } else if (result.status === 200 && result.token) {
                this.setOpenModal(false);
                Cookies.set('csrftoken', result.token);
                this.login = result.username || ''
                this.isAuth = true;
            } else {
                Cookies.set('csrftoken', '');
                this.badLogin = true
            }

            this.setTextAuth(result.message);
        } catch (error) {
            console.error(error);
            this.data = [];
        }
    }

    reloadPageWindow() {
        window.location.reload();
    }

    logout = () => {
        this.setTextAuth(TEXT_AUTH)
        fetch(`${BASE_API}logout/`, {method: 'POST',})
            .then((res) => res.json())
            .then(() => {
                    this.clearData()
                }
            ).then(this.reloadPageWindow)
    }

    loadData = (withFilters) => {
        fetch(`${BASE_API}form/`,)
            .then((res) => res.json())
            .then((result) => {
                    this.data = result.data
                    this.time = result.time
                    this.message = result.message
                    this.hasFilters = withFilters
                }
            )
    }

    loadAbout = (value) => {
        this.openAbout = value
    }
    onChangeFamily = (value) => this.formData.family = value;
    onChangeName = (value) => this.formData.name = value;
    onChangeSurame = (value) => this.formData.surname = value;
    onChangeSex = (value) => {
        this.formData.sex = value
    }
    onChangeAge = (event) => {
        this.formData.age = event.target.value;
    }
    onChangeCountry = (value) => this.formData.country = value;
    onChangeFood = (event) => {
        this.formData.food = {...this.formData.food, [event.target.name]: event.target.checked,}
    }

    sendForm = () => {
        fetch(`${BASE_API}form/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },

            body: JSON.stringify(this.formData)
        })
            .then((res) => res.json())
            .then(() => {
                this.setOpenFormModal(false)
                this.loadData(this.hasFilters || false)
            })

    }

    setTextAuth = (value) => {
        this.textAuth = value
    }

    setErrorName = (value) => {
        this.errorName = value
    }
}

export const apiStore = new Store()