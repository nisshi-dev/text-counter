import type { PlasmoCSConfig } from "plasmo"
import cssText from "data-text:~style.css"
import { useState } from "react";

export const config: PlasmoCSConfig = {
  matches: ["http://*/*", "https://*/*", "<all_urls>"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const Tooltip = () => {
  const [characterCount, setCharacterCount] = useState(0);

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    setCharacterCount(message.characterCount);
  });

  return <div className="text-red-500">{characterCount}</div>
}

export default Tooltip