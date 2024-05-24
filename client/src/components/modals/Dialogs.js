import React, {useEffect} from 'react';
import {apiStore} from "../../stores/AppStore";
import {
    Autocomplete, Box,
    Button, Checkbox, Dialog,
    DialogTitle,
    FormControl,
    FormControlLabel, FormGroup,
    FormLabel,
    Radio,
    RadioGroup,
    TextField, Typography
} from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {observer} from "mobx-react-lite";
import DialogActions from "@mui/material/DialogActions";
import {aboutText, BASE_API, COUNTRIES} from "../../consts";

function Dialogs() {

    useEffect(() => {
        if (apiStore.formData.name !== '') {
            apiStore.setErrorName(false)
            return
        }
        apiStore.setErrorName(true)

    }, [apiStore.formData.name])

    useEffect(() => {
        if (apiStore.openFormModal && apiStore.countries.length === 0) {
            fetchData();
        }
    }, [apiStore.openFormModal])

    const fetchData = async () => {
        try {
            const response = await fetch(BASE_API + 'country/');
            const data = await response.json();
            apiStore.countries = data
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <>
            <Dialog open={apiStore.openFormModal} onClose={() => apiStore.setOpenFormModal(false)}
            >
                <DialogTitle>Анкета</DialogTitle>
                <DialogContent>
                    {/*<DialogContentText><Box>Заполните форму для сохранения данных на сервере</Box></DialogContentText>*/}
                    <Box component="section" sx={{p: 1}}>
                        <TextField fullWidth id="family" label="Фамилия" variant="outlined"
                                   onChange={(event) => apiStore.onChangeFamily(event.target.value)}/>
                    </Box>

                    <Box component="section" sx={{p: 1}}>

                        <TextField fullWidth id="name" label="Имя" variant="outlined" required
                                   error={apiStore.errorName}
                                   onChange={(event) => apiStore.onChangeName(event.target.value)}/>
                    </Box>

                    <Box component="section" sx={{p: 1}}>
                        <TextField fullWidth id="surname" label="Отчество" variant="outlined"
                                   onChange={(event) => apiStore.onChangeSurame(event.target.value)}/>
                    </Box>
                    <Box component="section" sx={{p: 1}}>
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Пол</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                                value={apiStore.formData.sex}
                                onChange={(event, value) => {
                                    apiStore.onChangeSex(value)
                                }}

                            >
                                <FormControlLabel value="female" control={<Radio/>} label="Жен."/>
                                <FormControlLabel value="male" control={<Radio/>} label="Муж."/>
                            </RadioGroup>
                        </FormControl>
                    </Box>

                    <Box component="section" sx={{p: 1}}>
                        <Autocomplete
                            id="country-select-demo"
                            sx={{width: 300}}
                            options={apiStore.countries}
                            autoHighlight
                            getOptionLabel={(option) => option.label || ''}
                            isOptionEqualToValue={(option, value) => option.code === value.code}
                            renderOption={(props, option) => (
                                <Box component="li" sx={{'& > img': {mr: 2, flexShrink: 0}}} {...props} key={option.id}>
                                    <img
                                        loading="lazy"
                                        width="20"
                                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                        alt=""
                                    />
                                    {option.label} ({option.code}){option.phone}
                                </Box>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Выберите страну проживания"
                                    inputProps={{
                                        ...params.inputProps,
                                    }}
                                />
                            )}
                            onChange={(event, value) => {
                                apiStore.onChangeCountry(value);
                            }}
                        />
                    </Box>

                    <Box component="section" sx={{p: 1}}>
                        <TextField type="number"
                                   label="Ваш возраст"
                                   InputProps={{
                                       inputProps: {min: 0}
                                   }}
                                   value={apiStore.formData.age}
                                   onChange={(event) => apiStore.onChangeAge(event)}
                        />
                    </Box>

                    <Box component="section" sx={{p: 1}}>
                        <FormControl sx={{m: 3}} component="fieldset" variant="standard">
                            <FormLabel component="legend">Какую еду предпочтитаете</FormLabel>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={apiStore.formData.food.traditional}
                                                  onChange={(event) => apiStore.onChangeFood(event)}
                                                  name="traditional"/>
                                    }
                                    label="Традиционная"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={apiStore.formData.food.dietician}
                                                  onChange={apiStore.onChangeFood} name="dietician"/>
                                    }
                                    label="Диетическая"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={apiStore.formData.food.vegan}
                                                  onChange={apiStore.onChangeFood}
                                                  name="vegan"/>
                                    }
                                    label="Вегетарианская"
                                />
                            </FormGroup>
                        </FormControl>
                    </Box>
                    `
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => apiStore.setOpenFormModal(false)}>Отмена</Button>
                    <Button type="submit" onClick={apiStore.sendForm} disabled={apiStore.errorName}>Отправить</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={apiStore.isOpenModal} onClose={() => apiStore.setOpenModal(false)}>
                <DialogTitle>Регистрация</DialogTitle>
                <DialogContent>
                    <DialogContentText color={apiStore.badLogin ? 'red' : 'black'}>{apiStore.textAuth}</DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin='dense'
                        id='login'
                        name='login'
                        label='Логин'
                        type='text'
                        fullWidth
                        variant='standard'
                        onChange={(event) => apiStore.setReg('username', event.target.value)}
                    />
                    {apiStore.typeSign === 'register' ?
                        <TextField
                            hidden={apiStore.typeSign === 'login'}
                            required
                            margin='dense'
                            id='email'
                            name='email'
                            label='Email'
                            type='email'
                            fullWidth
                            variant='standard'
                            onChange={(event) => apiStore.setReg('email', event.target.value)}
                        />
                        : null
                    }
                    <TextField
                        required
                        margin='dense'
                        id='password'
                        name='password'
                        label='Пароль'
                        type='password'
                        fullWidth
                        variant='standard'
                        onChange={(event) => apiStore.setReg('password', event.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => apiStore.setOpenModal(false)}>Отмена</Button>
                    <Button type='submit' onClick={apiStore.auth}
                        // disabled={apiStore.errorLogin || apiStore.errorPassword}
                    >
                        Войти
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={apiStore.openAbout} onClose={() => apiStore.loadAbout(false)}>
                <DialogTitle>О приложении</DialogTitle>
                <DialogContent>
                    <Typography variant={'subtitle2'}>
                        {aboutText}
                    </Typography>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default observer(Dialogs);