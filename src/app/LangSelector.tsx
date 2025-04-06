function LangSelector() {
  return (
    <div className="">
      <select id="languageSelect" className="px-4 py-2 rounded-full bg-pink-100 hover:bg-pink-200">
        <option value="en">English</option>
        <option value="ar">العربية</option>
        <option value="fr">Français</option>
      </select>
    </div>
  )
}
export default LangSelector