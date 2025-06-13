// Initialize all animations on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeTopBar();
    initializeWatchingEye();
    initializeScrollIndicator();
});

function initializeAnimations() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate counters
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.expertise-card, .stat, .contact-detail, .mention-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Initialize other features
    initializeCursorTrail();
    initializeNavigation();
    initializeFormHandling();
    initializeMentionFeed();
}

// Animated Counter
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (target >= 1000000) {
            element.textContent = (current / 1000000).toFixed(1) + 'M+';
        } else if (target >= 1000) {
            element.textContent = (current / 1000).toFixed(0) + 'K+';
        } else {
            element.textContent = Math.floor(current) + (target === 99 ? '%' : '+');
        }
    }, 16);
}

// Cursor Trail Effect
function initializeCursorTrail() {
    const trail = [];
    const trailLength = 20;
    
    // Create trail elements
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(102, 126, 234, ${0.8 - i * 0.04});
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transition: all 0.1s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function updateTrail() {
        trail.forEach((dot, index) => {
            const delay = index * 2;
            setTimeout(() => {
                dot.style.left = mouseX + 'px';
                dot.style.top = mouseY + 'px';
            }, delay);
        });
        requestAnimationFrame(updateTrail);
    }
    
    updateTrail();
}

// Smooth Navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active nav link highlighting
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Form Handling
function initializeFormHandling() {
    const form = document.querySelector('.contact-form');
    const submitBtn = document.querySelector('.btn-submit');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Animate button
            submitBtn.style.transform = 'scale(0.95)';
            submitBtn.innerHTML = 'Processing...';
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = 'Monitoring Started! ✓';
                submitBtn.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';
                
                setTimeout(() => {
                    form.reset();
                    submitBtn.innerHTML = `
                        Start Monitoring
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="5" y1="12" x2="19" y2="12"/>
                            <polyline points="12,5 19,12 12,19"/>
                        </svg>
                    `;
                    submitBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                    submitBtn.style.transform = 'scale(1)';
                }, 2000);
            }, 1500);
        });
    }
}

// Live Mention Feed Animation
function initializeMentionFeed() {
    const mentionItems = document.querySelectorAll('.mention-item');
    const sources = ['Twitter', 'News', 'Reddit', 'LinkedIn', 'YouTube', 'Instagram'];
    const mentions = [
        'New mention detected in trending topic...',
        'Article published with personality reference...',
        'Discussion started in community forum...',
        'Video uploaded mentioning target...',
        'Social media post gaining traction...',
        'News article shared multiple times...',
        'Comment thread discussing personality...',
        'Blog post featuring detailed analysis...'
    ];

    function updateMentionFeed() {
        mentionItems.forEach((item, index) => {
            setTimeout(() => {
                const sourceEl = item.querySelector('.mention-source');
                const textEl = item.querySelector('.mention-text');
                const timeEl = item.querySelector('.mention-time');
                
                // Random data
                const randomSource = sources[Math.floor(Math.random() * sources.length)];
                const randomMention = mentions[Math.floor(Math.random() * mentions.length)];
                const randomTime = Math.floor(Math.random() * 60) + 1;
                
                // Animate update
                item.style.transform = 'translateX(-10px)';
                item.style.opacity = '0.7';
                
                setTimeout(() => {
                    sourceEl.textContent = randomSource;
                    textEl.textContent = randomMention;
                    timeEl.textContent = randomTime + 's ago';
                    
                    item.style.transform = 'translateX(0)';
                    item.style.opacity = '1';
                }, 200);
                
            }, index * 500);
        });
    }

    // Update feed every 8 seconds
    setInterval(updateMentionFeed, 8000);
}

// Button Hover Effects
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn-primary, .cta-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Card Hover Effects
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.expertise-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateX(5deg)';
            this.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0deg)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-elements .element');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Top Bar Functionality
function initializeTopBar() {
    // Google Login Button
    const googleLoginBtn = document.querySelector('.google-login-btn');
    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', function() {
            // Simulate Google login
            this.innerHTML = `
                <svg width="18" height="18" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
                    <path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2" fill="none"/>
                </svg>
                Signing in...
            `;
            this.style.opacity = '0.7';
            
            setTimeout(() => {
                this.innerHTML = `
                    <svg width="18" height="18" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Sign in with Google
                `;
                this.style.opacity = '1';
            }, 2000);
        });
    }

    // Social Links Analytics
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Watching Eye Functionality
function initializeWatchingEye() {
    const eye = document.getElementById('watchingEye');
    const pupil = eye?.querySelector('.pupil');
    const eyeInner = eye?.querySelector('.eye-inner');
    
    console.log('Initializing eye...', { eye, pupil, eyeInner });
    
    if (!eye || !pupil || !eyeInner) {
        console.log('Eye elements not found!');
        return;
    }
    
    console.log('Eye elements found successfully!');
    
    // Добавляем стиль для лучшего взаимодействия
    eye.style.cursor = 'pointer';
    eye.style.zIndex = '1000';
    eye.style.pointerEvents = 'auto'; // Убеждаемся, что события мыши работают
    
    console.log('Eye styles applied:', {
        cursor: eye.style.cursor,
        zIndex: eye.style.zIndex,
        pointerEvents: eye.style.pointerEvents
    });
    
    let mouseX = 0;
    let mouseY = 0;
    let eyeX = 0;
    let eyeY = 0;
    let animationId;
    let lastScrollY = 0;
    let velocity = 0;
    let targetX = 88;
    let targetY = 18;
    let currentX = 88;
    let currentY = 18;
    let lastMoveTime = Date.now();
    let randomOffset = { x: 0, y: 0 };
    let breathingPhase = 0;
    let autonomousTarget = { x: 88, y: 18 };
    let lastAutonomousMove = Date.now();
    let isResting = false;
    let restStartTime = 0;
    let explorationMode = 'patrol'; // patrol, rest, investigate, escape
    let lastUserActivity = Date.now();
    let lastEscapeTime = 0; // Время последнего убегания
    let escapeCooldown = 2000; // Перезарядка 2 секунды для стабильности
    
    // Проверяем мобильное устройство
    const isMobile = () => window.innerWidth <= 768;
    
    // Зоны патрулирования для автономного движения
    const getPatrolZones = () => {
        if (isMobile()) {
            return [
                { x: 85, y: 15, zone: 'top-right', priority: 'high' },
                { x: 15, y: 20, zone: 'top-left', priority: 'medium' },
                { x: 30, y: 45, zone: 'center-left', priority: 'high' },
                { x: 70, y: 50, zone: 'center-right', priority: 'medium' },
                { x: 25, y: 75, zone: 'bottom-left', priority: 'low' },
                { x: 75, y: 80, zone: 'bottom-right', priority: 'medium' },
                { x: 50, y: 85, zone: 'bottom-center', priority: 'high' }
            ];
        } else {
            return [
                { x: 88, y: 18, zone: 'top-right', priority: 'high' },
                { x: 12, y: 25, zone: 'top-left', priority: 'high' },
                { x: 25, y: 35, zone: 'upper-left', priority: 'medium' },
                { x: 75, y: 40, zone: 'upper-right', priority: 'medium' },
                { x: 15, y: 55, zone: 'middle-left', priority: 'low' },
                { x: 85, y: 60, zone: 'middle-right', priority: 'medium' },
                { x: 35, y: 75, zone: 'lower-left', priority: 'medium' },
                { x: 70, y: 80, zone: 'lower-right', priority: 'high' },
                { x: 45, y: 90, zone: 'bottom-center', priority: 'high' },
                { x: 60, y: 30, zone: 'observation-post', priority: 'special' }
            ];
        }
    };
    
    // Зоны для следования за скроллом
    const getScrollZones = () => {
        if (isMobile()) {
            return [
                { x: 85, y: 15, scroll: 0, zone: 'top-right' },
                { x: 30, y: 45, scroll: 0.5, zone: 'center-left' },
                { x: 50, y: 85, scroll: 1.0, zone: 'bottom-center' }
            ];
        } else {
            return [
                { x: 88, y: 18, scroll: 0, zone: 'top-right' },
                { x: 25, y: 35, scroll: 0.3, zone: 'top-left' },
                { x: 70, y: 60, scroll: 0.7, zone: 'bottom-right' },
                { x: 45, y: 90, scroll: 1.0, zone: 'bottom-center' }
            ];
        }
    };
    
    // Добавляем живость - случайные небольшие отклонения
    function addRandomness(baseX, baseY, intensity = 1) {
        const time = Date.now() * 0.001;
        const randomX = Math.sin(time * 0.7 + baseX * 0.1) * 3 * intensity;
        const randomY = Math.cos(time * 0.5 + baseY * 0.1) * 2 * intensity;
        
        return {
            x: baseX + randomX,
            y: baseY + randomY
        };
    }
    
    // Плавная инерция для естественного движения
    function applyInertia(current, target, speed = 0.02) {
        return current + (target - current) * speed;
    }
    
    // Интерполяция между двумя точками
    function lerp(start, end, factor) {
        return start + (end - start) * factor;
    }
    

    
    // Выбираем новую точку для автономного патрулирования
    function selectNewPatrolTarget() {
        const zones = getPatrolZones();
        const currentTime = Date.now();
        
        // Исключаем текущую зону для разнообразия
        const availableZones = zones.filter(zone => 
            Math.abs(zone.x - autonomousTarget.x) > 10 || 
            Math.abs(zone.y - autonomousTarget.y) > 10
        );
        
        // Выбираем зону в зависимости от приоритета и случайности
        let selectedZone;
        const rand = Math.random();
        
        if (rand < 0.4) {
            // 40% - высокий приоритет
            const highPriorityZones = availableZones.filter(z => z.priority === 'high');
            selectedZone = highPriorityZones[Math.floor(Math.random() * highPriorityZones.length)] || availableZones[0];
        } else if (rand < 0.7) {
            // 30% - средний приоритет
            const mediumPriorityZones = availableZones.filter(z => z.priority === 'medium');
            selectedZone = mediumPriorityZones[Math.floor(Math.random() * mediumPriorityZones.length)] || availableZones[0];
        } else if (rand < 0.9) {
            // 20% - любая зона
            selectedZone = availableZones[Math.floor(Math.random() * availableZones.length)];
        } else {
            // 10% - специальная позиция наблюдения
            const specialZones = availableZones.filter(z => z.priority === 'special');
            selectedZone = specialZones[Math.floor(Math.random() * specialZones.length)] || availableZones[0];
        }
        
        return selectedZone;
    }
    
    // Вычисляем цель на основе скролла
    function calculateScrollTarget(scrollProgress) {
        const zones = getScrollZones();
        
        let currentZone = zones[0];
        let nextZone = zones[1];
        
        for (let i = 0; i < zones.length - 1; i++) {
            if (scrollProgress >= zones[i].scroll && scrollProgress <= zones[i + 1].scroll) {
                currentZone = zones[i];
                nextZone = zones[i + 1];
                break;
            }
        }
        
        if (scrollProgress >= zones[zones.length - 1].scroll) {
            const lastZone = zones[zones.length - 1];
            return addRandomness(lastZone.x, lastZone.y, 0.8);
        }
        
        const segmentProgress = (scrollProgress - currentZone.scroll) / 
                               (nextZone.scroll - currentZone.scroll);
        const curveProgress = segmentProgress * segmentProgress * (3 - 2 * segmentProgress);
        
        const baseX = lerp(currentZone.x, nextZone.x, curveProgress);
        const baseY = lerp(currentZone.y, nextZone.y, curveProgress);
        
        return addRandomness(baseX, baseY, 0.5);
    }
    
    // Определяем режим поведения глаза (без привязки к скроллу)
    function updateBehaviorMode() {
        const currentTime = Date.now();
        const timeSinceLastMove = currentTime - lastAutonomousMove;
        
        // Если в режиме отдыха
        if (isResting) {
            if (currentTime - restStartTime > (3000 + Math.random() * 4000)) {
                isResting = false;
                explorationMode = 'patrol';
            }
            return;
        }
        
        // Если пора двигаться к новой точке (еще больше увеличил интервалы для плавности)
        if (timeSinceLastMove > (6000 + Math.random() * 8000)) {
            if (Math.random() < 0.25) {  // 25% шанс на отдых
                isResting = true;
                restStartTime = currentTime;
                explorationMode = 'rest';
            } else {
                explorationMode = 'patrol';
                const newTarget = selectNewPatrolTarget();
                autonomousTarget.x = newTarget.x;
                autonomousTarget.y = newTarget.y;
                lastAutonomousMove = currentTime;
            }
        }
    }
    
    // Обновляем позицию глаза
    function updateEyePosition() {
        const eyeRect = eye.getBoundingClientRect();
        eyeX = eyeRect.left + eyeRect.width / 2;
        eyeY = eyeRect.top + eyeRect.height / 2;
    }
    
    // Плавное автономное движение глаза (без привязки к скроллу)
    function updateEyeMovement() {
        const currentTime = Date.now();
        
        // Обновляем режим поведения
        updateBehaviorMode();
        
        // Определяем цель в зависимости от режима
        let currentTarget;
        switch (explorationMode) {
            case 'rest':
                // В режиме отдыха остаемся на месте с очень мягким дрейфом
                currentTarget = addRandomness(autonomousTarget.x, autonomousTarget.y, 0.2);
                break;
            case 'escape':
                // В режиме убегания движемся быстрее к цели
                currentTarget = addRandomness(autonomousTarget.x, autonomousTarget.y, 0.3);
                break;
            case 'patrol':
            default:
                currentTarget = addRandomness(autonomousTarget.x, autonomousTarget.y, 0.5);
                break;
        }
        
        // Очень плавное обновление целевой позиции
        if (currentTime - lastMoveTime > 120 || 
            Math.abs(currentTarget.x - targetX) > 2 || 
            Math.abs(currentTarget.y - targetY) > 2) {
            
            targetX = currentTarget.x;
            targetY = currentTarget.y;
            lastMoveTime = currentTime;
        }
        
        // Еще более плавная инерция для естественного движения
        let inertiaSpeed = 0.008; // Еще больше уменьшил для максимальной плавности
        if (explorationMode === 'rest') {
            inertiaSpeed = 0.003; // Очень медленно в режиме отдыха
        } else if (explorationMode === 'escape') {
            inertiaSpeed = 0.025; // Быстрее убегаем от курсора
        }
        
        currentX = applyInertia(currentX, targetX, inertiaSpeed);
        currentY = applyInertia(currentY, targetY, inertiaSpeed);
        
        // Более плавное дыхание
        breathingPhase += explorationMode === 'rest' ? 0.01 : 0.015;
        const breathingIntensity = explorationMode === 'rest' ? 0.6 : 0.9;
        const breathingX = Math.sin(breathingPhase * 0.6) * 0.8 * breathingIntensity;
        const breathingY = Math.cos(breathingPhase * 0.4) * 0.5 * breathingIntensity;
        
        // Финальная позиция
        const finalX = currentX + breathingX;
        const finalY = currentY + breathingY;
        
        eye.style.left = `${finalX}%`;
        eye.style.top = `${finalY}%`;
        
        // Мягкое органичное вращение всего глаза
        let rotationBase = Math.sin(breathingPhase * 0.2) * 2; // Уменьшил базовое вращение
        if (explorationMode === 'patrol') {
            rotationBase += Math.sin(breathingPhase * 0.08) * 5; // Уменьшил вращение в патруле
        } else if (explorationMode === 'rest') {
            rotationBase += Math.sin(breathingPhase * 0.03) * 1; // Минимальное вращение в покое
        }
        
        // Добавляем поворот в сторону курсора для всего глаза
        const deltaX = mouseX - (window.innerWidth * finalX / 100);
        const deltaY = mouseY - (window.innerHeight * finalY / 100);
        const mouseAngle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
        const mouseInfluence = Math.min(1, Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 200);
        rotationBase += mouseAngle * 0.08 * mouseInfluence; // Поворот всего глаза к курсору
        
        // Тонкие микро-движения
        const microX = Math.sin(breathingPhase * 1.1) * 0.2;
        const microY = Math.cos(breathingPhase * 0.9) * 0.15;
        
        eye.style.transform = `translateX(calc(-50% + ${microX}px)) translateY(calc(-50% + ${microY}px)) rotate(${rotationBase}deg)`;
        
        // Мягкое пульсирующее свечение
        let pulseBase = 0.6 + Math.sin(breathingPhase * 0.9) * 0.12;
        if (explorationMode === 'patrol') {
            pulseBase += Math.sin(breathingPhase * 0.3) * 0.08;
        }
        
        const glowIntensity = Math.min(0.9, pulseBase);
        const blur = 8 + Math.sin(breathingPhase * 0.5) * 3;
        eye.style.filter = `drop-shadow(0 ${blur}px ${blur * 1.5}px rgba(102, 126, 234, ${glowIntensity}))`;
        
        updateEyePosition();
    }
    
    // Главный цикл жизни глаза - работает постоянно
    function eyeLifeCycle() {
        updateEyeMovement();
        requestAnimationFrame(eyeLifeCycle);
    }
    
    // Улучшенное отслеживание мыши с повышенной чувствительностью
    function animateEyeTracking() {
        // Повышенная внимательность к курсору
        let attentionBase = Math.sin(breathingPhase * 0.08) * 0.3 + 0.8; // Увеличил базовую внимательность
        if (explorationMode === 'rest') {
            attentionBase *= 0.6; // Меньше снижение в режиме отдыха
        } else if (explorationMode === 'patrol') {
            attentionBase *= 0.95; // Почти максимальная внимательность в патруле
        } else if (explorationMode === 'investigate') {
            attentionBase = 1.0; // Максимальная внимательность при исследовании
        }
        
        const curiosity = Math.max(0.3, attentionBase); // Убрал влияние velocity на внимательность
        
        const deltaX = mouseX - eyeX;
        const deltaY = mouseY - eyeY;
        const angle = Math.atan2(deltaY, deltaX);
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        // Улучшенные параметры движения зрачка
        const maxDistance = 10 + Math.sin(breathingPhase * 0.3) * 4; // Увеличил диапазон движения
        const responsiveness = curiosity * (0.8 + Math.sin(breathingPhase * 0.15) * 0.2); // Повысил отзывчивость
        const normalizedDistance = Math.min(maxDistance, distance / 20) * responsiveness; // Уменьшил делитель для большей чувствительности
        
        // Уменьшенная задержка для более отзывчивого поведения
        const lagFactor = 0.04 + (explorationMode === 'rest' ? 0.06 : 0); // Убрал влияние velocity
        const inaccuracy = Math.sin(breathingPhase * 0.4) * 0.15; // Уменьшил неточность
        const moveX = Math.cos(angle + inaccuracy) * normalizedDistance * (1 - lagFactor);
        const moveY = Math.sin(angle + inaccuracy) * normalizedDistance * (1 - lagFactor);
        
        // Более выраженное органичное вращение зрачка
        const naturalPupilRotation = Math.sin(breathingPhase * 0.7) * 3;
        const mouseRotation = (angle * 180 / Math.PI) * 0.025 * curiosity; // Значительно увеличил поворот за курсором
        const totalPupilRotation = naturalPupilRotation + mouseRotation;
        
        eyeInner.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${totalPupilRotation}deg)`;
        
        animationId = requestAnimationFrame(animateEyeTracking);
    }
    
    // События (убрал обработку скролла)
    window.addEventListener('resize', updateEyePosition);
    
    // Улучшенное отслеживание мыши
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        lastUserActivity = Date.now();
        
        // Убрал отладку mousemove для предотвращения дерганья
        
        if (!animationId) {
            animateEyeTracking();
        }
    });
    
    // Функция плавного "убегания" глаза с перезарядкой
    function smoothEscapeFromCursor() {
        const currentTime = Date.now();
        
        // Проверяем, прошло ли достаточно времени с последнего убегания
        if (currentTime - lastEscapeTime < escapeCooldown) {
            console.log('Eye escape on cooldown, ignoring...');
            return; // Игнорируем, если перезарядка еще не закончилась
        }
        
        console.log('Eye escaping from cursor!');
        lastEscapeTime = currentTime; // Обновляем время последнего убегания
        
        const newTarget = selectNewPatrolTarget();
        console.log('New target:', newTarget);
        
        // Плавный переход - только устанавливаем новую цель
        targetX = newTarget.x;
        targetY = newTarget.y;
        autonomousTarget.x = newTarget.x;
        autonomousTarget.y = newTarget.y;
        
        lastAutonomousMove = currentTime;
        
        // Визуальные эффекты испуга с плавным переходом
        eye.style.opacity = '1';
        eye.style.transition = 'transform 0.2s ease-out';
        eye.style.transform = 'translateX(-50%) translateY(-50%) scale(0.9)';
        
        // Переходим в режим быстрого убегания
        explorationMode = 'escape';
        
        // Возврат к нормальному размеру
        setTimeout(() => {
            eye.style.transform = 'translateX(-50%) translateY(-50%) scale(1)';
        }, 200);
        
        // Через секунду возвращаемся к обычному патрулированию
        setTimeout(() => {
            if (explorationMode === 'escape') {
                explorationMode = 'patrol';
            }
        }, 1000);
    }
    
    // Добавляем только один обработчик для избежания дублирования
    console.log('Adding event listener to eye...');
    
    let isMouseOverEye = false; // Флаг для отслеживания состояния
    
    eye.addEventListener('mouseenter', (e) => {
        if (!isMouseOverEye) {
            console.log('🎯 Mouse entered eye area!');
            isMouseOverEye = true;
            smoothEscapeFromCursor();
        }
    });
    
    eye.addEventListener('mouseleave', (e) => {
        console.log('🎯 Mouse left eye area!');
        isMouseOverEye = false;
        eye.style.opacity = '0.85';
        const currentTransform = eye.style.transform.replace(/ scale\([^)]*\)/g, '');
        eye.style.transform = currentTransform;
    });
    
    // Проверяем, что события добавлены
    console.log('Event listener added to eye element');
    
    // Дополнительный обработчик клика для тестирования
    eye.addEventListener('click', () => {
        console.log('Eye clicked!');
        smoothEscapeFromCursor();
    });
    
    // Инициализация постоянной жизни глаза
    eyeLifeCycle();
    animateEyeTracking();
}

// Scroll Indicator Functionality
function initializeScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (!scrollIndicator) return;
    
    // Hide indicator when user scrolls
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        if (scrolled > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.transform = 'translateX(-50%) translateY(20px)';
        } else {
            scrollIndicator.style.opacity = '0.6';
            scrollIndicator.style.transform = 'translateX(-50%) translateY(0)';
        }
    });
    
    // Smooth scroll to next section when clicked
    scrollIndicator.addEventListener('click', () => {
        const featuresSection = document.querySelector('#features');
        if (featuresSection) {
            featuresSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
    
    // Add cursor pointer
    scrollIndicator.style.cursor = 'pointer';
}

// Add CSS for active nav links and cursor trail
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #667eea !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
    .cursor-trail {
        position: fixed;
        width: 4px;
        height: 4px;
        background: rgba(102, 126, 234, 0.6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: cursorTrail 1s ease-out forwards;
    }
    @keyframes cursorTrail {
        0% {
            opacity: 1;
            transform: scale(1);
            background: rgba(102, 126, 234, 0.6);
        }
        50% {
            background: rgba(168, 202, 186, 0.4);
        }
        100% {
            opacity: 0;
            transform: scale(0);
            background: rgba(118, 75, 162, 0.3);
        }
    }
`;
document.head.appendChild(style);

// Navigation scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (nav) {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (nav) {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.backdropFilter = 'blur(30px)';
            nav.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.backdropFilter = 'blur(20px)';
            nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        }
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.expertise-card, .stat, .contact-detail');
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease';
        observer.observe(el);
    });
});

// Parallax effect for floating elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.element');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Cursor trail effect
document.addEventListener('mousemove', (e) => {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    document.body.appendChild(cursor);
    
    setTimeout(() => {
        cursor.remove();
    }, 1000);
});



// Smooth reveal animation for hero content
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(50px)';
        heroContent.style.transition = 'all 1.2s ease';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
});

// Golden ratio animation enhancement
const goldenRatio = document.querySelector('.golden-ratio');
if (goldenRatio) {
    let rotationSpeed = 1;
    
    setInterval(() => {
        rotationSpeed += 0.001;
        goldenRatio.style.animationDuration = `${20 / rotationSpeed}s`;
    }, 100);
}

// Smooth number counting animation
function animateNumbers() {
    const numbers = document.querySelectorAll('.stat-number');
    
    numbers.forEach(numberElement => {
        const finalNumber = parseInt(numberElement.textContent);
        let currentNumber = 0;
        const increment = finalNumber / 50;
        
        const timer = setInterval(() => {
            currentNumber += increment;
            
            if (currentNumber >= finalNumber) {
                numberElement.textContent = finalNumber + '+';
                clearInterval(timer);
            } else {
                numberElement.textContent = Math.floor(currentNumber);
            }
        }, 50);
    });
}

// Trigger number animation when in view
const numberObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            numberObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.philosophy-stats');
if (statsSection) {
    numberObserver.observe(statsSection);
}

console.log('✨ NEXUS - Premium digital solutions loaded successfully!'); 