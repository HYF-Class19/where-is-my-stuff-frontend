import { useThemeContext } from "./ThemeContext";

export const withDarkMode = (WrappedComponent: React.FC) => {
    const WithDarkMode: React.FC = () => {
        const { isDarkMode } = useThemeContext();

        return (
            <div className={`
                ${isDarkMode ? "dark" : "light"}
            `}>
                <WrappedComponent />
            </div>
        );
    };

    return WithDarkMode;
};