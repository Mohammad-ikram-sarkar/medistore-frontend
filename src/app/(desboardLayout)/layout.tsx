import { AppSidebar } from "@/components/sidebarcomponents/app-sidebar";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/sidebarcomponents/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { userService } from "@/service/user.service";
import { redirect } from "next/navigation";

// Force dynamic rendering to avoid build-time data fetching issues
export const dynamic = 'force-dynamic';

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

  try {
    const { data } = await userService.getSession();
    
    // Handle case where no session data is available
    if (!data) {
      redirect('/login');
      return null;
    }

    const renderDashboard = () => {
      // Add null check for data and role
      if (!data || !data.role) {
        return <div className="p-6">
          <p className="text-gray-600">Loading dashboard...</p>
        </div>;
      }

      switch (data.role) {
        case "admin":
          return admin;
        case "customer":
          return customer;
        case "seller":
          return seller;
        default:
          return <div className="p-6">
            <p className="text-red-600">Invalid user role</p>
          </div>;
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
  } catch (error) {
    console.error('Dashboard layout error:', error);
    // During build time or when there's an error, redirect to login
    redirect('/login');
    return null;
  }
}
