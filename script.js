document.addEventListener('DOMContentLoaded', () => {

    // ============================
    // ===== CURSOR PERSONALIZADO ==
    // ============================

    const cursor = document.querySelector('.cursor');
    const interactiveElements = document.querySelectorAll(
        'a, button, .skill-card, .project-image, .contact-item, .skill-tag'
    );

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY + window.scrollY;

        cursor.style.left = mouseX + 'px';
        cursor.style.top = e.clientY + 'px';

        document.documentElement.style.setProperty('--cursor-x', mouseX + 'px');
        document.documentElement.style.setProperty('--cursor-y', mouseY + 'px');
    });

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    // ============================
    // ===== BARRA DE SCROLL ======
    // ============================

    const scrollProgress = document.querySelector('.scroll-progress');
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    });

    // =========================================
    // ===== REVEAL ANIMAÇÕES (UNIFICADO) ======
    // =========================================

    const revealElements = document.querySelectorAll('.reveal, .project');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // =========================================
    // ===== EFEITO HEADER AO SCROLL ===========
    // =========================================

    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        header.style.background =
            window.scrollY > 100
                ? 'rgba(29, 29, 31, 0.9)'
                : 'rgba(0, 0, 0, 0.8)';
    });

    // =========================================
    // ===== ÍCONES LUCIDE =====================
    // =========================================

    lucide.createIcons();

    // =========================================
    // ===== SCROLL SUAVE EM ÂNCORAS ===========
    // =========================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // =========================================
    // ===== EFEITO 3D NAS IMAGENS DE PROJETO ==
    // =========================================

    document.querySelectorAll('.project-image').forEach(img => {
        img.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateX = (y - rect.height / 2) / 20;
            const rotateY = (x - rect.width / 2) / -20;
            this.style.transform =
                `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        img.addEventListener('mouseleave', function () {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });

    // =========================================
    // ===== DELAY ESCALONADO NOS CARDS ========
    // =========================================

    document.querySelectorAll('.skill-card').forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.1}s`;
    });


    
    // =========================================
    // ===== TYPEWRITER NO SUBTÍTULO ===========
    // =========================================


const subtitle = document.querySelector('.hero .subtitle');
if (subtitle) {
    // 1. Guarda o texto original do HTML para saber o que digitar.
    const originalText = subtitle.textContent.trim();

    // O elemento no HTML já está ocupando o espaço correto,
    // mas está invisível por causa do CSS (opacity: 0 e color: transparent).

    // 2. Define o delay para começar depois da animação do H1.
    const startDelay = 1500; // 1.5 segundos

    setTimeout(() => {
        // 3. Torna o elemento visível e define a cor final do texto.
        subtitle.style.opacity = '1';
        subtitle.style.transform = 'translateY(0)';
        subtitle.style.color = '#86868b';

        // 4. LIMPA o texto original (que estava transparente).
        //    Esta é a correção crucial para evitar a duplicação.
        subtitle.textContent = '';

        // 5. Inicia a função de digitação no elemento agora VAZIO.
        let i = 0;
        const typingSpeed = 70;

        const typeWriter = () => {
            if (i < originalText.length) {
                subtitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, typingSpeed);
            }
        };

        // Um pequeno delay para a transição de fade-in terminar antes da digitação.
        setTimeout(typeWriter, 500);

    }, startDelay);
}


});
