import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Home from "@/pages/home";
import EditPage from "@/pages/edit";
import ProfilePage from "@/pages/profile";
import TermsPage from "@/pages/terms";
import PrivacyPage from "@/pages/privacy";
import NotFound from "@/pages/not-found";

/* ================= ROUTER ================= */

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/edit" component={EditPage} />

      {/* 🔥 UNIQUE PROFILE LINK */}
      <Route path="/:username" component={ProfilePage} />

      <Route path="/terms" component={TermsPage} />
      <Route path="/privacy" component={PrivacyPage} />

      <Route component={NotFound} />
    </Switch>
  );
}

/* ================= APP ================= */

export default function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Router />
    </TooltipProvider>
  );
}
