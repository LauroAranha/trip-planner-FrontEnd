export const getCurrentUserInformation = () => {
    return JSON.parse(sessionStorage.getItem('currentUserInfo'));
};

export const getCurrentUserToken = sessionStorage.getItem('userToken');
