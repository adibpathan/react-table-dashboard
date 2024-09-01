import React from "react";
import Table from "./components/Table/Table";
import "./App.css"; // Import global styles or layout-specific styles here
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import CreateForm from "./components/Table/CreateForm";

const App: React.FC = () => {
  return (
    <Tabs defaultValue="create" className="p-4">
      <TabsList className="bg-slate-100 rounded-md flex space-x-2 p-1 w-max mx-auto">
        <TabsTrigger
          value="create"
          className="w-auto px-3 py-1 text-sm font-medium text-gray-700 rounded-lg transition-colors 
          hover:bg-slate-200 focus-visible:bg-slate-300
          data-[state=active]:bg-blue-500 data-[state=active]:text-white"
        >
          Create
        </TabsTrigger>
        <TabsTrigger
          value="account"
          className="w-auto px-3 py-1 text-sm font-medium text-gray-700 rounded-lg transition-colors 
          hover:bg-slate-200 focus-visible:bg-slate-300
          data-[state=active]:bg-blue-500 data-[state=active]:text-white"
        >
          Account
        </TabsTrigger>
      </TabsList>
      <TabsContent value="create" className="mt-4">
        <CreateForm />
      </TabsContent>
      <TabsContent value="account" className="mt-10">
        <Table />
      </TabsContent>
    </Tabs>
  );
};

export default App;




