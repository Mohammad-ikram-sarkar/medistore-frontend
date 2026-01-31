import { AppSidebar } from "@/components/sidebarcomponents/app-sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/sidebarcomponents/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { userService } from "@/service/user.service";





export default async function DashboardLayout({
  children,
  admin,
  customer,
  seller,
}: {
  children: React.ReactNode;
  admin: React.ReactNode;
  customer: React.ReactNode;
  seller: React.ReactNode;
}) {

 const {data} =await userService.getSession()
 
//  console.log(data)
  const renderDashboard = () => {
  switch (data.role) {
    case "admin":
      return admin;
    case "customer":
      return customer;
    case "seller":
      return seller;
    default:
      return null;
  }
};
  
  return (
    
    
   
     
    <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar user={data} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            {/* <BreadcrumbList>
             
              <BreadcrumbSeparator className="hidden md:block" />
            
            </BreadcrumbList> */}
          </Breadcrumb>
        </header>
          {renderDashboard()}
      </SidebarInset>
    </SidebarProvider>
      
     
    
       
   
  );
}
