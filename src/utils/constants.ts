export const defaultFormConfig = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
};

export const API_TOKEN = "67389a64-087c-4eda-b75c-f45adc0751fc";

export const apiConfig = {
    baseUrl: "https://around-api.es.tripleten-services.com/v1",
    headers: {
        authorization: API_TOKEN,
        "Content-Type": "application/json",
    },
};