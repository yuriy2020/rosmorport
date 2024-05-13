import {makeAutoObservable} from "mobx"
import Cookies from 'js-cookie';
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
    isAuth = sessionStorage.getItem('isAuth') === 'true'
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

    setOpenFormModal = (value) => {
        this.clearForm()
        this.openFormModal = value
    }

    setOpenModal = (value, typeSign) => {
        this.isOpenModal = value
        this.typeSign = typeSign
    }
    setOpenLoginModal = (value) => {
        this.isOpenLoginModal = value
    }
    setLogin = (login) => {
        this.login = login
    }
    setPassword = (password) => {
        this.password = password
    }

    clearData = () => {
        sessionStorage.setItem('token', "")
        sessionStorage.setItem('login', "")
        sessionStorage.setItem('isAuth', 'false');
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

    auth = () => {

        fetch(`http://localhost:8000/${this.typeSign}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken':Cookies.get('csrftoken'),
            },
            body: JSON.stringify({
                email: this.login,
                password: this.password
            }),
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    if (result.status === 201) {
                        sessionStorage.setItem('token', result.token);
                        // this.text = result.data.text || [];
                        // this.isAuth = true;
                        this.setOpenModal(false);
                    } else if (result.status === 200) {
                        const localToken = sessionStorage.getItem('token');
                        if (localToken === result.token) {
                            this.setOpenModal(false);
                            this.isAuth = true;
                            sessionStorage.setItem('isAuth', 'true');
                        }else{
                            sessionStorage.setItem('isAuth', 'false');
                        }
                    }
                    this.setTextAuth(result.message);
                })
            .catch((error) => {
                console.log(error)
                this.text = []
            });
    }

    reloadPageWindow() {
        window.location.reload();
    }

    logout = () => {
        this.setTextAuth('Для авторизации введите логин и пароль')
        fetch(`http://localhost:8000/logout`)
            .then((res) => res.json())
            .then(() => {
                    this.isAuth = false
                    this.clearData()
                    this.text = []

                }
            ).then(this.reloadPageWindow)
    }

    loadData = (id) => {
        fetch(`http://localhost:8000/otchet?id=${id}`)
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
        fetch(`http://localhost:8000/about/`)
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
        fetch(`http://localhost:8000/form`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
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