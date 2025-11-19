// ===== محرك الكم النيكسس المتقدم =====

class QuantumNexusEngine {
    constructor() {
        this.particleSystem = [];
        this.quantumState = { x: 0, y: 0, z: 0 };
        this.init();
    }

    init() {
        this.buildQuantumEnvironment();
        this.initializeParticleSystem();
        this.setupQuantumInteractions();
        this.startQuantumLoop();
    }

    buildQuantumEnvironment() {
        const hero = document.querySelector('#main-content');
        if (!hero) return;

        // طبقة الكون الكمي
        const universe = document.createElement('div');
        universe.className = 'quantum-universe';
        hero.appendChild(universe);

        // شبكة الفضاء-الزمن
        const grid = document.createElement('div');
        grid.className = 'spacetime-grid';
        hero.appendChild(grid);

        // نوى الطاقة الكمية
        for (let i = 0; i < 3; i++) {
            const core = document.createElement('div');
            core.className = 'quantum-core';
            hero.appendChild(core);
        }

        // موجات الكم
        const waveContainer = document.createElement('div');
        waveContainer.className = 'quantum-wave';
        for (let i = 0; i < 4; i++) {
            const pulse = document.createElement('div');
            pulse.className = 'wave-pulse';
            waveContainer.appendChild(pulse);
        }
        hero.appendChild(waveContainer);

        // تأثير الانكسار الكمي
        const refraction = document.createElement('div');
        refraction.className = 'quantum-refraction';
        hero.appendChild(refraction);

        // جسيمات الكم
        this.createQuantumParticles();
    }

    createQuantumParticles() {
        const hero = document.querySelector('#main-content');
        if (!hero) return;

        const container = document.createElement('div');
        container.style.cssText = `
            position: absolute;
            inset: 0;
            pointer-events: none;
            z-index: 5;
        `;

        for (let i = 0; i < 120; i++) {
            const particle = document.createElement('div');
            particle.className = 'quantum-particle';
            particle.style.cssText = `
                left: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 15}s;
                animation-duration: ${Math.random() * 10 + 15}s;
            `;
            container.appendChild(particle);
            this.particleSystem.push(particle);
        }

        hero.appendChild(container);
    }

    initializeParticleSystem() {
        this.particleSystem.forEach((particle, index) => {
            particle.dataset.index = index;
            particle.dataset.vx = (Math.random() - 0.5) * 2;
            particle.dataset.vy = (Math.random() - 0.5) * 2;
            particle.dataset.vz = (Math.random() - 0.5) * 2;
        });
    }

    setupQuantumInteractions() {
        this.enhanceElements();
        this.setupMouseTracking();
        this.setupClickEffects();
    }

    enhanceElements() {
        // تحسين العناوين
        const titles = document.querySelectorAll('h1, h2, .text-6xl, .text-8xl');
        titles.forEach(title => {
            title.classList.add('quantum-nexus-title', 'quantum-spectrum');
        });

        // تحسين البطاقات
        const cards = document.querySelectorAll('.supreme-card, .hologram-card, .bg-white\\/5');
        cards.forEach(card => {
            card.classList.add('quantum-card');
        });

        // تحسين الأزرار
        const buttons = document.querySelectorAll('button, .supreme-button, .hologram-button');
        buttons.forEach(button => {
            button.classList.add('quantum-button');
        });
    }

    setupMouseTracking() {
        const hero = document.querySelector('#main-content');
        if (!hero) return;

        hero.addEventListener('mousemove', (e) => {
            this.handleQuantumTracking(e);
        });
    }

    handleQuantumTracking(e) {
        const rect = e.target.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        this.quantumState = { x, y, z: Math.sin(Date.now() * 0.001) };

        // تحديث نوى الطاقة
        const cores = document.querySelectorAll('.quantum-core');
        cores.forEach((core, index) => {
            const offsetX = (x - 0.5) * 40;
            const offsetY = (y - 0.5) * 40;
            const rotateX = (y - 0.5) * 50;
            const rotateY = (x - 0.5) * 50;
            const rotateZ = this.quantumState.z * 30;

            core.style.transform = `
                translateX(${offsetX}px) 
                translateY(${offsetY}px) 
                translateZ(${40 + index * 30}px)
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg)
                rotateZ(${rotateZ}deg)
            `;
        });
    }

    setupClickEffects() {
        const hero = document.querySelector('#main-content');
        if (!hero) return;

        hero.addEventListener('click', (e) => {
            this.createQuantumBurst(e);
        });
    }

    createQuantumBurst(e) {
        const burst = document.createElement('div');
        burst.style.cssText = `
            position: fixed;
            top: ${e.clientY}px;
            left: ${e.clientX}px;
            width: 150px;
            height: 150px;
            background: radial-gradient(circle, 
                rgba(0,255,255,0.8) 0%, 
                rgba(255,0,255,0.6) 30%, 
                rgba(0,255,0,0.4) 60%, 
                transparent 100%);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: quantumBurst 1.2s ease-out;
            pointer-events: none;
            z-index: 10000;
            box-shadow: 0 0 60px rgba(0,255,255,0.8);
        `;

        document.body.appendChild(burst);

        const style = document.createElement('style');
        style.textContent = `
            @keyframes quantumBurst {
                0% {
                    transform: translate(-50%, -50%) scale(0);
                    opacity: 1;
                }
                50% {
                    transform: translate(-50%, -50%) scale(1.5);
                    opacity: 0.8;
                }
                100% {
                    transform: translate(-50%, -50%) scale(3);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        setTimeout(() => burst.remove(), 1200);
    }

    startQuantumLoop() {
        const animate = () => {
            this.updateQuantumParticles();
            this.updateQuantumState();
            requestAnimationFrame(animate);
        };
        animate();
    }

    updateQuantumParticles() {
        const time = Date.now() * 0.001;
        
        this.particleSystem.forEach((particle, index) => {
            const vx = parseFloat(particle.dataset.vx);
            const vy = parseFloat(particle.dataset.vy);
            const vz = parseFloat(particle.dataset.vz);

            const x = Math.sin(time + index) * vx * 5;
            const y = Math.cos(time + index * 0.5) * vy * 5;
            const z = Math.sin(time * 0.5 + index) * vz * 3;

            particle.style.transform = `translate(${x}px, ${y}px) translateZ(${z}px)`;
        });
    }

    updateQuantumState() {
        const time = Date.now() * 0.001;
        this.quantumState.z = Math.sin(time) * 0.5;
    }
}

// تهيئة محرك الكم
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.quantumNexus = new QuantumNexusEngine();
        console.log('⚛️ Quantum Nexus Engine Initialized');
    }, 1000);
});

// تنظيف عند مغادرة الصفحة
window.addEventListener('beforeunload', () => {
    if (window.quantumNexus) {
        console.log('⚛️ Quantum Nexus Engine Terminated');
    }
});