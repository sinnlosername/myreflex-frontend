import {Button, Col, Layout, Select, Row} from "antd";
import classes from "./Footer.module.less";
import React from "react";
import {useTranslation} from "../../shared/i18n";

export const Footer = () => {
  const {t, translationInfo, updateTranslations} = useTranslation();

  return (
    <Layout.Footer className={classes.footer}>
      <Row>
        <Col span={6}>
          <Select defaultValue={translationInfo.currentLanguage.code} size={"small"}
                  className={classes.languageSelect}
                  onChange={newValue => {
                    translationInfo.currentLanguage = translationInfo.getLanguage(newValue);
                    updateTranslations();
                  }}>
            {translationInfo.languages.map(language => {
              return (<Select.Option key={language.code} value={language.code}>{language.name}</Select.Option>)
            })}
          </Select>
        </Col>
        <Col span={12}>
          © {new Date().getFullYear()} - {t("reflexDevTeam")}
        </Col>
        <Col span={6}>
          <Button className={classes.footerDiscordLink} type="link" href="https://g.reflex.rip/api-docs"
                  target="_blank">{t("apiDocumentation")}</Button>
          <Button className={classes.footerDiscordLink} type="link" href="https://g.reflex.rip/discord"
            target="_blank">Discord</Button>
        </Col>
      </Row>
    </Layout.Footer>
  )
}