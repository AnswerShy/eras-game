'use client'
import { useEffect } from "react";

export default function EnviromentScript() {
    useEffect(() => {
        if (localStorage.getItem("disableAnimations") === "true") {
            document.body.classList.add("disable-animations");
            localStorage.setItem("disableAnimations", "true");
        } else {
            document.body.classList.remove("disable-animations");
            localStorage.setItem("disableAnimations", "false");
        }
    }, []);
    
    useEffect(() => {
        if (localStorage.getItem("themeSwitched") === "true") {
            document.body.classList.add("dark");
            localStorage.setItem("themeSwitched", "true");
        }
        else {
            document.body.classList.remove("dark");
            localStorage.setItem("themeSwitched", "false");
        }
    }, []);
}
