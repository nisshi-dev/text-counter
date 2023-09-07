import type { PlasmoCSConfig } from "plasmo"
import cssText from "data-text:~style.css"
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~components/ui/card";

export const config: PlasmoCSConfig = {
  matches: ["http://*/*", "https://*/*", "<all_urls>"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const Tooltip = () => {
  const [selectedText, setSelectedText] = useState<string>("");
  const [popupPosition, setPopupPosition] = useState({ left: "0px", top: "0px" });
  const [characterCount, setCharacterCount] = useState<number>(0);

  useEffect(() => {
    const handleMouseUp = (event) => {
      const selected = window.getSelection().toString();
      setSelectedText(selected);
      setCharacterCount(0)

      if (selected) {
        const rect = window.getSelection().getRangeAt(0).getBoundingClientRect();

        const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;

        setPopupPosition({
          left: `${rect.left + scrollLeft}px`,
          top: `${rect.bottom + scrollTop}px`
        });
      }
    };

    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    setCharacterCount(message.characterCount);
  });

  if (characterCount === 0) return null;

  return (
    <Card
      style={{ position: "absolute", left: popupPosition.left, top: popupPosition.top }}
      className="whitespace-nowrap bg-white"
      >
      <CardContent>
        {`Character Count: ${characterCount}`}
      </CardContent>
    </Card>
  )
}

export default Tooltip