import { Folder, LayoutGrid, LucideIcon, MessageCircle, Search, User } from "lucide-react";

type Submenu = {
    href: string,
    label: string;
    active: boolean;
}

type Menu = {
    href: string;
    label: string;
    active: boolean;
    icon: LucideIcon;
    submenus: Submenu[];
}

type Group = {
    groupLabel: string;
    menus: Menu[];
}

export function getMenuList(pathname: string): Group[] {
    return [
        {
            groupLabel: "",
            menus: [
                {
                    href: "/dashboard",
                    label: "Tableau de bord",
                    active: pathname.includes("/dashboard"),
                    icon: LayoutGrid,
                    submenus: [],
                }
            ]
        },
        {
            groupLabel: "Général",
            menus: [
                {
                    href: "",
                    label: "Projets",
                    active: pathname.includes("/projects"),
                    icon: Folder,
                    submenus: [
                        {
                            href: "/projects",
                            label: "Mes projets",
                            active: pathname === "/projects"
                        },
                        {
                            href: "/projects/new",
                            label: "Créer un projet",
                            active: pathname === "/projects/new"
                        }
                    ]
                },
                {
                    href: "/messages",
                    label: "Messages",
                    active: pathname.includes("/messages"),
                    icon: MessageCircle,
                    submenus: [],
                },
                {
                    href: "/search",
                    label: "Rechercher",
                    active: pathname.includes("/search"),
                    icon: Search,
                    submenus: [],
                }
            ]
        },
        {
            groupLabel: "Paramètres",
            menus: [
                {
                    href: "/account",
                    label: "Mon compte",
                    active: pathname.includes("/account"),
                    icon: User,
                    submenus: [],
                }
            ]
        }
    ]
}