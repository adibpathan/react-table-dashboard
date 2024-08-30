import React from "react";
import Table from "./components/Table/Table";
import "./App.css"; // Import global styles or layout-specific styles here
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import CreateForm from "./components/Table/CreateForm";

const App: React.FC = () => {
  return (
      <Tabs defaultValue="create">
        <TabsList className="bg-slate-100">
          <TabsTrigger value="create">Create</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        <TabsContent value="create">
          <CreateForm/>
        </TabsContent>
        <TabsContent value="account" style={{marginTop: "40px"}}><Table/></TabsContent>
      </Tabs>
  );
};

export default App;
