import config from "../config/config";
import {Client, Databases, ID, Storage, Query } from "appwrite"

export class Service{
    client = new Client()
    databases;
    storage;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)
            this.databases = new Databases(this.client);
            this.storage = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId, 
                config.appwriteCollectionId, 
                ID.unique(),
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Error:: Faild to create post", error)
        }
    }

    async updatePost(id = ID.unique(), {title, slug, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                id,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
                )
        } catch (error) {
            console.log("Error:: can't update the post", error);
        }
    }

    async deletePost({title, slug, content, featuredImage, status,}){
        try {
            return await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                ID.unique(),
            );
            return true;
        } catch (error) {
            console.log("Error:: can't delete the post", error);
            return false;
        }
    }
    
    async getPost(){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                ID.unique(),
            )
        } catch (error) {
            console.log("Error:: can't get the post", error)
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Error:: can't get the posts", error);
            return false;
        }
    }

    async uploadFile(file){
        try {
            return await this.storage,createFile(
                config.appwriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("Error:: can't upload file", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            return await this.storage.deleteFile(
                config.appwriteBucketId,
                fileId,
            )
            return true
        } catch (error) {
            console.log("Error:: Can't delete the file", error);
            return false
        }
    }

    filePreview(fileId){
        return this.storage.getFilePreview(
            config.appwriteBucketId,
            fileId,)
    }
}

const service = new Service()