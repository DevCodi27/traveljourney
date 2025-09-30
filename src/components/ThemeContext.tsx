import { createContext,useState,type ReactNode } from "react";

type ThemeContextType = {
    theme:"light"|"dark"; 
    toggleTheme: ()=> void;
}

export const ThemeContext = createContext<ThemeContextType>({
    theme:"light",
    toggleTheme:()=>{}
})

type Props = {children:ReactNode};

export const ThemeProvider = ({children}:Props)=>{
    const [theme,setTheme] = useState<"light" | "dark">("light");

    const toggleTheme=()=>{
        setTheme(theme === "light"?"dark":"light");
    };

    return (
        <ThemeContext.Provider value={{theme,toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};