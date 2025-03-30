"use client"

// --- Imports ---
import { createContext, useContext, useState, useEffect, type ReactNode } from "react" // Added useEffect
// Import the main translations object
import { translations } from "@/lib/translations"; // Ensure this path is correct

// --- Types ---
type Language = {
  code: string
  name: string
}

type LanguageContextType = {
  currentLanguage: Language
  setLanguage: (code: string) => void
  t: (key: string) => string
}

// --- Constants ---
// Define available languages, Polish is now at index 1
const languages: Language[] = [
  { code: "en", name: "English" },
  { code: "pl", name: "Polski" },
  //{ code: "de", name: "Deutsch" }, // Temporarily disabled
  //{ code: "fr", name: "Français" }, // Temporarily disabled
  //{ code: "es", name: "Español" },  // Temporarily disabled
]

// --- Context Definition ---
const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// --- Provider Component ---
export function LanguageProvider({ children }: { children: ReactNode }) {
  // --- State: Default to Polish (index 1) ---
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[1])

  // --- ADDED: Effect to check localStorage on initial load ---
  useEffect(() => {
    const savedLangCode = localStorage.getItem("preferredLanguage");
    if (savedLangCode) {
      // Find the language object corresponding to the saved code
      const savedLang = languages.find(lang => lang.code === savedLangCode);
      // If found (meaning it's still an active language), set it as current
      if (savedLang) {
        setCurrentLanguage(savedLang);
      }
      // If not found (e.g., 'de' was saved but is now disabled),
      // the default from useState ('pl') will remain active.
    }
    // No else needed, as useState sets the 'pl' default if nothing is found
  }, []); // Empty dependency array runs only once on mount

  // --- Function to change the language AND save preference ---
  const setLanguage = (code: string) => {
    const language = languages.find((lang) => lang.code === code)
    if (language) {
      setCurrentLanguage(language)
      localStorage.setItem("preferredLanguage", code); // <-- Save preference
    }
  }

  // --- Translation Function (corrected version from previous steps) ---
  const t = (key: string): string => {
    const langTranslations = translations[currentLanguage.code as keyof typeof translations];

    if (!langTranslations) {
      console.warn(`Language '${currentLanguage.code}' not found in translations object.`);
      return key;
    }

    const directValue = (langTranslations as any)[key];
    if (typeof directValue === 'string') {
      return directValue;
    }

    const keys = key.split('.');
    if (keys.length > 1) {
        let result: any = langTranslations;
        for (const k of keys) {
          result = result?.[k];
          if (result === undefined) {
             break;
          }
        }
        if (typeof result === 'string') {
          return result;
        }
    }
    return key; // Fallback
  };
  // --- End Translation Function ---

  // Provide the context value
  return <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>{children}</LanguageContext.Provider>
}

// --- Custom Hook ---
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}