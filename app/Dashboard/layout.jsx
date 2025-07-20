// app/Dashboard/layout.tsx

import Sidebar from './Sidebar';


export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
    
      <Sidebar />
     
      
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
