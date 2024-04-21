const express = require('express')
const router = express.Router()
const path = require('path')
let fs = require('fs')
const data = require('../data.js');
const {log} = require("debug");

let isAuth = false


router.post('/auth', function (req, res, next) {
    // фиктивная авторизация
    if (req.body.login === 'qqq' && req.body.password === 'www') {
        isAuth = true
        res.status(200).json({
            message: 'Авторизация успешная',
            status: true,
            token: '123token',
            isAuth: isAuth,
            data: data.text1
        });
    } else {
        isAuth = false
        res.status(401).json({message: 'Неверные логин или пароль', status: false, token: '', isAuth: isAuth});
    }
})

router.get('/logout', function (req, res, next) {
    isAuth = false
    res.status(200).json({message: 'Выход успешный', status: false, token: '', isAuth: false});
})

router.get('/otchet', function (req, res, next) {
    if (isAuth) {
        const id = req.query.id
        if (id === '2') {
            res.status(200).json({data: data.form, hasFilters: false,  message: data.text2})
        } else if (id === '3') {
            res.status(200).json({data: data.form, hasFilters: true, message: data.text3});
        } else if (id === '4') {
            res.status(200).json({data: [], hasFilters: false, message: data.text4});
        } else {
            res.status(200).json({data: [], hasFilters: false, message: 'Данные не найдены'});
        }
    }
})

router.post('/form', function (req, res, next) {
    // Обработка данных формы
    const item = {...req.body, id: new Date().getTime()}
    data.form = [...data.form, item]
    res.status(200).json({success: true, data: data.form});

})

router.get('/about', function (req, res, next) {
    if (isAuth) {
        res.status(200).json({data: data.text1});
    }
})


module.exports = router
