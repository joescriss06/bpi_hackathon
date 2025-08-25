<%-- 
    Document   : index
    Created on : 08 24, 25, 4:39:05 PM
    Author     : Dodge Lapis
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AiB Banking</title>
        <link rel="stylesheet" href="css/index.css">
    </head>
    <body>
        <header class="header">
            <div class="logo">
                <div>
                    <div class="logo-text">AiB</div>
                    <div class="logo-subtext">ALL IN<br>BANKING</div>
                </div>
            </div>
            <nav class="nav-links">
                <a href='aboutus.jsp'>ABOUT US</a>
                <a href="#" onclick="showAlert('Help & Support')">HELP & SUPPORT</a>
                <button class="login-btn" type="button" onclick="window.location.href = 'login.jsp'">LOGIN</button>
            </nav>
        </header>

        <div class="hero">
            <div class="hero-content">
                <h1>
                    “Find your product. <br>
                    Start your savings. <br>
                    Stay protected and let’s get started.”
                </h1>
                <a href="login.jsp" class="btn-get-started">Get Started</a>

            </div>
        </div>

        <section class="aib-intro">
            <h2>Welcome to AiB Banking</h2>
            <p>
                At AiB, we believe in making financial services accessible, simple, 
                and secure for everyone. Whether you're starting your first savings 
                account, planning investments, or looking for financial support, 
                we are here to help.
            </p>
        </section>

        <footer>
            <p>&copy; 2025 AiB Banking. All rights reserved.</p>
        </footer>

    </body>
</html>
