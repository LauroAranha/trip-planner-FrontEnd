export const getCurrentUserInformation = () => {
    return JSON.parse(sessionStorage.getItem('currentUserInfo'));
};

export const getCurrentUserToken = () => {
    return sessionStorage.getItem('userToken');
};
