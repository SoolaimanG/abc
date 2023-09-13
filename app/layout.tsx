import "./globals.css";
import { ContextProvider } from "@/Providers/provider";
import Overall from "@/messages/overall";
import AuthProvider from "@/Providers/authProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>
          <AuthProvider>
            <div className="fixed z-40 top-0 right-0 mt-[20px] mr-3 md:mr-10">
              <Overall />
            </div>
            {children}
          </AuthProvider>
        </ContextProvider>
      </body>
    </html>
  );
}
