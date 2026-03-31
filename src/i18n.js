import { initReactI18next } from "react-i18next";
import i18next from "i18next";
import LanguagePT from "./locales/pt-br/translation.json";
import LanguageEN from "./locales/en/translation.json";

i18next.use(initReactI18next).init({
  lng: "pt",
  fallbackLng: "en",
  resources: {
    en: {
      translation: LanguageEN,
    },
    pt: {
      translation: LanguagePT,
    },
  },
});

export default i18next;
