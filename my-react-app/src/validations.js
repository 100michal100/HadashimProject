export const isValidMobilePhone = (mobilePhone) => {
    const phoneRegex = /^(05\d([-]{0,1})\d{7})$/;
    return phoneRegex.test(mobilePhone);
};

export const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^(0\d{1,2}-?\d{7})$/;
    return phoneRegex.test(phoneNumber);
};

export const isValidIsraeliID = (id) => {
    const idRegex = /^[0-9]{9}$/;
    return idRegex.test(id);
};

export const isValidName = (name) => {
    const nameRegex = /^[a-zA-Z\u0590-\u05fe]+$/;
    return nameRegex.test(name);
};

export const isValidDate = (date) => {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    return dateRegex.test(date);
};

export const isValidText = (text) => {
    const textRegex = /^[a-zA-Z]+$/;
    return textRegex.test(text);
};

export const isValidNumber = (number) => {
    const numberRegex = /^[0-9]+$/;
    return numberRegex.test(number);
};