"use client";

import DashboardLayout from "@/components/dashboard/dashboard-layout";
import withAuth from "@/middlewares/withAuth";

function ApplicationLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return <DashboardLayout>{children}</DashboardLayout>;
}

export default withAuth(ApplicationLayout);
