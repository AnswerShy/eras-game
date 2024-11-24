import { useEffect, useState } from "react";

export default function AnimationDisabler() {
    const [isAnimationsDisabled, setIsAnimationsDisabled] = useState<boolean>(() => {
        return localStorage.getItem("disableAnimations") === "true";
    })

    const [isThemeSwitched, setIsThemeSwitched] = useState<boolean>(() => {
        return localStorage.getItem("themeSwitched") === "true";
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
        } else {
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
        <div className="settings">
            <div className="settingOption">
                Вимкнути анімаціі
                <input type={"checkbox"} id={"disableAnimationsToggle"} checked={isAnimationsDisabled} onChange={(e) => toggleAnimations(e)}></input>
            </div>
            <div className="settingOption">
                Темна тема
                <input type={"checkbox"} id={"themeToggle"} checked={isThemeSwitched} onChange={(e) => toggleTheme(e)}></input>
            </div>
        </div>
        
        
    );
}
