import config from "../config/config";
import {Client, Account, ID } from "appwrite"

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)
            this.account = new Account(this.client)
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), password, name)
            if (userAccount) {
                return this.login({email, password});
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login(email, password){
        try {
            await this.account.createEmailSession({email, password})
        } catch (error) {
            throw error;
        }
    }
    async getCurrentUser(){
        try {
            const getUser = await this.account.get();
            if (getUser) {
                return getUser;
            } else {
                console.log("Can't get the user", error);
            }
        } catch (error) {
            throw error;
        }
    }
    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Can't Logout the user due to some issue", error);
        }
    }
}

const authService = new AuthService();

export default authService