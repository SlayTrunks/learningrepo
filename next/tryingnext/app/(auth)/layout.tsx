import {ReactNode} from "react"
export default function RootLayout({children}:{children:ReactNode})
{  return (
    <html lang="en">
      <body
      >
      <div>header</div>
        {children}
      <div>footer</div>
      </body>
    </html>
  );
}
