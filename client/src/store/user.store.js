import {makeAutoObservable} from "mobx";
import { ApiService } from "../service/api.service";

const api = new ApiService();
export default class UserStore {
    constructor () {
        this.checkSession(); 
        makeAutoObservable(this)
    }
    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        console.log("setUser", user)
        this._user = user
        console.log('user', this._user)
    }


    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
    async checkSession() {
        const token = localStorage.getItem('token');
        if (token) {
            this.setIsAuth(true);
            // console.log('tok')
            try {
                const response = await api.getUserInfo(token); // Используем новый метод
                // console.log('response', response);
                this.setUser(response); // Устанавливаем пользователя в store
            } catch (error) {
                console.error('Ошибка при получении информации о пользователе', error);
                this.setIsAuth(false);
            }
        } else {
            this.setIsAuth(false);
            this.setUser({});
        }
    }
    

}