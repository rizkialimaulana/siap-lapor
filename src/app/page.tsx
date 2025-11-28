"use client";

import { FieldDataInputForm } from "@/components/common/field-data-input-form";
import { MainDashboard } from "@/components/common/main-dashboard";
import { UserManagement } from "@/components/common/user-management";
import { ValidationModule } from "@/components/common/validation-module";
import { Layout } from "@/components/layouts/layout";
import { useState } from "react";

export default function Home() {
  const [currentView, setCurrentView] = useState<
    "dashboard" | "input" | "validation" | "users"
  >("dashboard");

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return (
          <MainDashboard onNavigateToInput={() => setCurrentView("input")} />
        );
      case "input":
        return <FieldDataInputForm />;
      case "validation":
        return <ValidationModule />;
      case "users":
        return <UserManagement />;
      default:
        return (
          <MainDashboard onNavigateToInput={() => setCurrentView("input")} />
        );
    }
  };
  return (
    <Layout currentView={currentView} onNavigate={setCurrentView}>
      {renderView()}
    </Layout>
  );
}
