"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import withGuest from "@/middlewares/withGuest";

function AuthLayout({
    children
}: {
    children: React.ReactNode
}) {
    const { setTheme, theme } = useTheme();
    const renderThemeToggleButton = () => (
        <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
            {theme === 'light' ? (
                <Moon className="h-5 w-5" />
            ) : (
                <Sun className="h-[1.5rem] w-[1.3rem]" />
            )}
            <span className="sr-only">Changer le thème</span>
        </Button>
    );

    return (
        <main className="flex h-screen items-center justify-center">
            {renderThemeToggleButton()}
            {children}
        </main>
    );
}

export default withGuest(AuthLayout);
