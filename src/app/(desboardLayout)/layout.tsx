import React from 'react';

export default function DashboardLayout({
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
  return (
    <div>
      {children}
      {admin}
      {customer}
      {seller}
    </div>
  );
}
