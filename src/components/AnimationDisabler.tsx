import { useEffect, useState } from "react";

export default function AnimationDisabler() {
    const [isAnimationsDisabled, setIsAnimationsDisabled] = useState<boolean>(() => {
        return localStorage.getItem('disableAnimations') === 'true';
    });

    useEffect(() => {
        if (isAnimationsDisabled) {
            document.body.classList.add('disable-animations');
            localStorage.setItem('disableAnimations', 'true');
        } else {
            document.body.classList.remove('disable-animations');
            localStorage.setItem('disableAnimations', 'false');
        }
    }, [isAnimationsDisabled]);
    
    const toggleAnimations = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsAnimationsDisabled(e.target.checked)
    }

    return <div className="animOff">Вимкнути анімаціі<input type={"checkbox"} id={"disableAnimationsToggle"} checked={isAnimationsDisabled} onChange={(e) => toggleAnimations(e)}></input></div>
}