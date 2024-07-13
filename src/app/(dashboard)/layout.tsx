"use client"

import DashboardLayout from "@/components/dashboard/dashboard-layout";

export default function ApplicationLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return <DashboardLayout>{children}</DashboardLayout>
}