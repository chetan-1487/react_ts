import "./globals.css";
import ReduxProvider from "./ReduxProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{backgroundColor:"skyblue"}}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
