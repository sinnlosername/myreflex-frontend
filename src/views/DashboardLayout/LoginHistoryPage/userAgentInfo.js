import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faChrome, faFirefox, faEdge, faInternetExplorer, faOpera, faSafari,
  faWindows, faApple, faLinux, faAndroid
} from "@fortawesome/free-brands-svg-icons";
import {faGlobe, faDesktop} from "@fortawesome/free-solid-svg-icons";

const fallbackBrowserIcon = () => (<FontAwesomeIcon icon={faGlobe}/>);
const browserIconTable = {
  "chrome": () => (<FontAwesomeIcon icon={faChrome}/>),
  "firefox": () => (<FontAwesomeIcon icon={faFirefox}/>),
  "edge": () => (<FontAwesomeIcon icon={faEdge}/>),
  "internet explorer": () => (<FontAwesomeIcon icon={faInternetExplorer}/>),
  "opera": () => (<FontAwesomeIcon icon={faOpera}/>),
  "safari": () => (<FontAwesomeIcon icon={faSafari}/>)
}

const fallbackOsIcon = () => (<FontAwesomeIcon icon={faDesktop}/>);
const osIconTable = {
  "windows": () => (<FontAwesomeIcon icon={faWindows}/>),
  "macos": () => (<FontAwesomeIcon icon={faApple}/>),
  "linux": () => (<FontAwesomeIcon icon={faLinux}/>),
  "android": () => (<FontAwesomeIcon icon={faAndroid}/>),
  "ios": () => (<FontAwesomeIcon icon={faApple}/>)
}

export const BrowserInfo = ({browser}) => (
  <>
    {(browserIconTable[browser.getBrowserName()?.toLowerCase()] ?? fallbackBrowserIcon)()}
    {"\xa0" + (browser.getBrowserName().length > 0 ? browser.getBrowserName() : browser.getUA())}
    {browser.getBrowserVersion() != null && "\xa0" + browser.getBrowserVersion().split(".")[0]}
  </>
)

export const OsInfo = ({browser}) => (
  <>
    {(osIconTable[browser.getOSName()?.toLowerCase()] ?? fallbackOsIcon)()}
    {"\xa0" + (browser.getOSName().length > 0 ? browser.getOSName() : "Unknown")}
    {browser.getOSVersion() != null && "\xa0" + browser.getOSVersion()}
  </>
)
