
        // Add smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Add scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe feature cards
        document.querySelectorAll('.feature-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(card);
        });

        // Add hover effect to phone mockup
        const phoneMockup = document.querySelector('.phone-mockup');
        phoneMockup.addEventListener('mouseenter', () => {
            phoneMockup.style.transform = 'scale(1.05) translateY(-10px)';
        });
        phoneMockup.addEventListener('mouseleave', () => {
            phoneMockup.style.transform = 'scale(1) translateY(0)';
        });
        document.getElementById("loginBtn").addEventListener("click", function() {
             window.location.href = "login.html";
        });