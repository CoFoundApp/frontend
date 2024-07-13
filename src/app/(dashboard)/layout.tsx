"use client"

import DashboardLayout from "@/components/dashboard/dashboard-layout";
import useAuth from "@/hooks/use-auth";

export default function ApplicationLayout({
    children
}: {
    children: React.ReactNode;
}) {
    useAuth();
    return <DashboardLayout>{children}</DashboardLayout>
}