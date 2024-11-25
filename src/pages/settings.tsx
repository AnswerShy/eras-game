import { useEffect, useState } from "react";

export default function SettingsPage() {
    const [isAnimationsDisabled, setIsAnimationsDisabled] = useState<boolean>(() => {
        return localStorage.getItem("disableAnimations") === "true";
    })

    const [isThemeSwitched, setIsThemeSwitched] = useState<boolean>(() => {
        if(localStorage.getItem("themeSwitched")) {
            return localStorage.getItem("themeSwitched") === "true"
        }
        else {
            return true
        }
    })

    useEffect(() => {
        if (isAnimationsDisabled) {
            document.body.classList.add("disable-animations");
            localStorage.setItem("disableAnimations", "true");
        } else {
            document.body.classList.remove("disable-animations");
            localStorage.setItem("disableAnimations", "false");
        }
    }, [isAnimationsDisabled]);

    useEffect(() => {
        if (isThemeSwitched) {
            document.body.classList.add("dark");
            localStorage.setItem("themeSwitched", "true");
        }
        else {
            document.body.classList.remove("dark");
            localStorage.setItem("themeSwitched", "false");
        }
    }, [isThemeSwitched]);

    const toggleAnimations = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(isAnimationsDisabled)
        setIsAnimationsDisabled(e.target.checked);
    };

    const toggleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(isThemeSwitched)
        setIsThemeSwitched(e.target.checked)
    }

    return (
        <div className="settingsPageMenu">
            <div className="settingOption">
                Вимкнути анімаціі
                <input type={"checkbox"} id={"disableAnimationsToggle"} checked={isAnimationsDisabled} onChange={(e) => toggleAnimations(e)} className="checkboxMenu"></input>
            </div>
            <div className="settingOption">
                Темна тема
                <input type={"checkbox"} id={"themeToggle"} checked={isThemeSwitched} onChange={(e) => toggleTheme(e)} className="checkboxMenu"></input>
            </div>
            <a href="/" className="menuBack">В меню</a>
        </div>
    )
}