import axios from 'axios';

const USER_API_BASE_URL = "54.202.218.249:9501/api/users";

class UserService {

    getUser(){
        return axios.get(USER_API_BASE_URL);
    }

    createUser(users){
        return axios.post(USER_API_BASE_URL, users);
    }

    getUserId(userId){
        return axios.get(USER_API_BASE_URL + '/' + userId);
    }

    updateUser(users, userId){
        return axios.put(USER_API_BASE_URL + '/' + userId, users);
    }

    deleteUser(userId){
        return axios.delete(USER_API_BASE_URL + '/' + userId);
    }
}

export default new UserService()