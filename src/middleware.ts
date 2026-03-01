import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const maintenanceHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rautaki | Coming Soon</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      background: #0a0a0a;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 2rem;
    }
    .container {
      text-align: center;
      max-width: 600px;
    }
    .logo {
      font-size: 2.5rem;
      font-weight: 500;
      letter-spacing: 0.05em;
      margin-bottom: 2rem;
      color: #ffffff;
    }
    .line {
      width: 60px;
      height: 2px;
      background: #888;
      margin: 0 auto 2rem;
    }
    .message {
      font-size: 1.25rem;
      font-weight: 300;
      color: #aaaaaa;
      line-height: 1.6;
      margin-bottom: 2rem;
    }
    .contact {
      font-size: 0.95rem;
      color: #666666;
    }
    .contact a {
      color: #aaaaaa;
      text-decoration: none;
    }
    .contact a:hover {
      color: #ffffff;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">RAUTAKI</div>
    <div class="line"></div>
    <p class="message">We are currently updating our website.<br>We will be back shortly.</p>
    <p class="contact">Get in touch: <a href="mailto:hello@rautaki.ch">hello@rautaki.ch</a></p>
  </div>
</body>
</html>`;

export function middleware(request: NextRequest) {
  if (process.env.MAINTENANCE_MODE === "true") {
    // Allow Next.js internal requests to pass through
    if (request.nextUrl.pathname.startsWith("/_next")) {
      return NextResponse.next();
    }

    return new NextResponse(maintenanceHTML, {
      status: 503,
      headers: { "Content-Type": "text/html", "Retry-After": "3600" },
    });
  }

  return NextResponse.next();
}