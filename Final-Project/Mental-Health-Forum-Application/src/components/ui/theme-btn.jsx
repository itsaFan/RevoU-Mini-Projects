import { useEffect, useState } from "react";
import { MoonStar, Sun } from "lucide-react";

export default function ThemeBtn() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.classList.toggle("dark", newTheme === "dark");
  };

  useEffect(() => {
    //manual select theme
    const savedTheme = localStorage.getItem("theme");
    //system preference theme
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme("dark");
    }

    document.body.classList.toggle("dark", theme === "dark");

    const themeChangeHanndler = (e) => {
      if (!localStorage.getItem("theme")) {
        const newTheme = e.matches ? "dark" : "light";
        setTheme(newTheme);
        document.body.classList.toggle("dark", e.matches);
      }
    };

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", themeChangeHanndler);

    return () => {
      window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", themeChangeHanndler);
    };
  }, [theme]);

  return (
    <button className="hover:opacity-70 transition duration-300 ease-in-out" type="button" onClick={toggleTheme} title="theme-btn">
      {theme === "dark" ? <MoonStar /> : <Sun />}
    </button>
  );
}
