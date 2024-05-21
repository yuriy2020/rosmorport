import {makeAutoObservable} from "mobx"
import Cookies from 'js-cookie';
import {BASE_API} from "../consts";

class Store {
    constructor() {
        makeAutoObservable(this)
    }

    value = 0
    textAuth = 'Для авторизации введите логин и пароль'
    isOpenModal = false
    isOpenLoginModal = false
    login = ''
    password = ''
    isAuth = Boolean(Cookies.get('csrftoken'))
    token = Cookies.get('csrftoken')
    text = []
    openFormModal = false
    message = 'нет данных'
    hasFilters = false
    errorName = false
    errorLogin = false
    errorPassword = false
    typeSign = ''

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
        this.isOpenModal = value
        this.typeSign = typeSign
    }
    // setOpenLoginModal = (value) => {
    //     this.isOpenLoginModal = value
    // }
    setReg = (field, value) => {
        this.regForm = {...this.regForm, [field]: value}
        console.log(this.regForm)
    }
    // setPassword = (password) => {
    //     this.password = password
    // }

    clearData = () => {
        Cookies.set('csrftoken','')
        this.isAuth = false
        this.text = []
    }

    clearForm = () => {
        this.formData.name = ''
        this.formData.family = ''
        this.formData.surname = ''
        this.formData.sex = ''
        this.formData.country.label = ''
        this.formData.country.phone = ''
        this.formData.country.code = ''
        this.formData.age = 1
        this.formData.food.traditional = false
        this.formData.food.dietician = false
        this.formData.food.vegan = false
    }

    auth = async () => {
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
                this.isAuth = true;
            } else {
                Cookies.set('csrftoken', '');
            }

            this.setTextAuth(result.message);
        } catch (error) {
            console.error(error);
            this.text = [];
        }
    }

    reloadPageWindow() {
        window.location.reload();
    }

    logout = () => {
        this.setTextAuth('Для авторизации введите логин и пароль')
        fetch(`${BASE_API}logout/`)
            .then((res) => res.json())
            .then(() => {
                    this.isAuth = false
                    this.clearData()
                    this.text = []

                }
            ).then(this.reloadPageWindow)
    }

    loadData = (id) => {
        fetch(`${BASE_API}otchet?id=${id}`)
            .then((res) => res.json())
            .then((result) => {
                    this.text = result.data
                    this.message = result.message
                    this.hasFilters = result.hasFilters
                }
            )
    }

    loadAbout = () => {
        apiStore.text = []
        fetch(`${BASE_API}about/`)
            .then((res) => res.json())
            .then((result) => {
                    this.message = result.data
                }
            )
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
            .then((result) => {
                    this.text = result.data
                }
            ).then(() => {
            this.setOpenFormModal(false)
        })
    }

    setTextAuth = (value) => {
        this.textAuth = value
    }

    setErrorName = (value) => {
        this.errorName = value
    }
    setErrorLogin = (value) => {
        this.errorLogin = value
    }
    setErrorPassword = (value) => {
        this.errorPassword = value
    }
}

export const apiStore = new Store()