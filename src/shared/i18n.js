import React from "react";
import {useContext} from "react";
import {TranslationContext} from "./context";

export function useTranslation() {
  const contextValue = useContext(TranslationContext);
  const {translationInfo, updateTranslations} = contextValue

  if (translationInfo == null) {
    throw new Error("Translation context unavailable");
  }

  return {
    translationInfo,
    updateTranslations,
    t: (key, ...args) => {
      return translationInfo.getTranslation(key).replace(/{(\d+)}/g, (match, number) => {
        return typeof args[number] != 'undefined' ? args[number] : match;
      });
    },
    attach: (component) => {
      return (
        <TranslationContext.Provider value={contextValue}>
          {component}
        </TranslationContext.Provider>
      )
    }
  }
}

export const Trans = ({component: Component, name}) => {
  const {t} = useTranslation();
  return Component != null ? (<Component>{t(name)}</Component>) : (<>{t(name)}</>);
}

export class TranslationLoader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      translationInfo: null,
    };
  }

  componentDidMount() {
    fetch(this.props.src)
      .then(result => result.json())
      .then(languages => {
        this.setState({
          translationInfo: new TranslationInfo(languages)
        });
      });
  }

  render() {
    return this.state.translationInfo ? (
      <TranslationContext.Provider value={{
        translationInfo: this.state.translationInfo,
        updateTranslations: this.forceUpdate.bind(this)
      }}>
        {this.props.children}
      </TranslationContext.Provider>
    ) : (
      <></>
    )
  }
}

class TranslationInfo {
  constructor(languages) {
    this.languages = languages;
  }

  getTranslation(key) {
    const currentText = this.currentLanguage.keys[key];
    if (currentText != null) return currentText;

    const defaultText = this.defaultLanguage.keys[key];
    if (defaultText != null) return defaultText;

    return "[translation missing - you lazy fool]"
  }

  getLanguage(iso3) {
    return iso3 == null ? null : this.languages.find(lang => lang["iso3"] === iso3);
  }

  get defaultLanguage() {
    return this.languages.find(lang => lang.default === true);
  }

  get currentLanguage() {
    return this.getLanguage(window.localStorage.getItem("language")) ?? this.defaultLanguage;
  }

  set currentLanguage(value) {
    window.localStorage.setItem("language", value["iso3"]);
  }
}