"use client";
import Script from "next/script";
import React from "react";

const languages = [
  { label: "English", value: "en", src: "https://flagcdn.com/h60/us.png" },
  { label: "French", value: "fr", src: "https://flagcdn.com/h60/fr.png" },
  { label: "Arabic", value: "ar", src: "" },
  // Add additional languages as needed
];


const includedLanguages = languages.map(lang => lang.value).join(",");

function googleTranslateElementInit() {
  //@ts-ignore
  new window.google.translate.TranslateElement({
    pageLanguage: "auto", includedLanguages
  }, "google_translate_element");

}

export function GoogleTranslate({ prefLangCookie }: { prefLangCookie: string }) {

  const [langCookie, setLangCookie] = React.useState(decodeURIComponent(prefLangCookie));

  React.useEffect(() => {
    //@ts-ignore
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  const onChange = (value: string) => {
    const lang = "/en/" + value;
    console.log("value : ", value);

    setLangCookie(lang);
    const element = document.querySelector(".goog-te-combo");
    //@ts-ignore
    element.value = value || "en";
    //@ts-ignore
    element.dispatchEvent(new Event("change"));
  };

  return (
    <div className="">
      <div id="google_translate_element" style={{ visibility: "hidden", width: "1px", height: "1px" }}></div>
      <LanguageSelector onChange={onChange} value={langCookie} />
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </div>
  );
};
//@ts-ignore
function LanguageSelector({ onChange, value }) {
  const langCookie = value.split("/")[2];
  return (
    <div className="">
      <select onChange={_ => onChange(_.target.value)} id="languageSelect" className="px-4 py-2 rounded-full bg-pink-100 hover:bg-pink-200">
        {languages.map((it) => (
          <option key={it.value} value={it.value}>{it.label}</option>
        ))}
      </select>
    </div>
  );
}

