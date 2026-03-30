import { initReactI18next } from "react-i18next";
import i18next from "i18next";

i18next.use(initReactI18next).init({
  lng: "pt",
  fallbackLng: "en",
  resources: {
    en: {
      translation: { welcome: "Welcome to Petize Challenge!" },
    },
    pt: {
      translation: { welcome: "Bem-vindo ao Desafio Petize!" },
    },
  },
});

export default i18next;
