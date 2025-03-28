"use client"

interface LanguageSelectorProps {
  currentLanguage: string
  onLanguageChange: (lang: string) => void
}

export default function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onLanguageChange("en")}
        className={`px-3 py-1 rounded-md text-sm ${
          currentLanguage === "en"
            ? "bg-pink-500 text-white"
            : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
        }`}
      >
        English
      </button>
      <button
        onClick={() => onLanguageChange("pl")}
        className={`px-3 py-1 rounded-md text-sm ${
          currentLanguage === "pl"
            ? "bg-pink-500 text-white"
            : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
        }`}
      >
        Polski
      </button>
    </div>
  )
}

