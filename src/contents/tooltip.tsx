import type { PlasmoCSConfig } from "plasmo"
import { useState } from "react";

export const config: PlasmoCSConfig = {
  matches: ["http://*/*", "https://*/*", "<all_urls>"]
}

const Tooltip = () => {
  const [characterCount, setCharacterCount] = useState(0);

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    setCharacterCount(message.characterCount);
  });

  return <div>{characterCount}</div>
}

export default Tooltip