import React from 'react';

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full min-h-screen">
      {children}
    </section>
  );
} 