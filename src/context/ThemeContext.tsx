import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
    isDarkMode: false,
    toggleDarkMode: () => { },
});

const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(
        () => localStorage.getItem("isDarkMode") === "true"
    );

    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem("isDarkMode", String(newMode));
            return newMode;
        });
    };

    useEffect(() => {
        const body = document.querySelector("body");
        const toggleMode = document.querySelector(".toggle");
        body?.classList.toggle("dark", isDarkMode);
        toggleMode?.classList.toggle("active", isDarkMode);
    }, [isDarkMode]);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

const useThemeContext = () => useContext(ThemeContext);

export { ThemeContextProvider, useThemeContext };
