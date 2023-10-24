import React, { useEffect, useRef, useState } from 'react';

const Bubbles = () => {
    const [circles, setCircles] = useState([]);
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Initialiser la taille du canvas
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Générer un cercle aléatoire
        const generateRandomCircle = () => {
            const minRadius = canvas.width * 0.1;
            const maxRadius = canvas.width * 0.2;
            const radius = Math.random() * (maxRadius - minRadius) + minRadius;
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
<<<<<<< HEAD
            const dx = (Math.random() - 0.5) * 1;
            const dy = (Math.random() - 0.5) * 1;
=======
            const dx = (Math.random() - 0.5) * 7;
            const dy = (Math.random() - 0.5) * 7;
>>>>>>> f69f19c643f46b4b7d9666f4d619e6b27e1a2179

            // Choix de la couleur aléatoirement entre '#FADF8B' : '#1C2930'
            const color = Math.random() < 0.5 ? '#FADF8B' : '#1C2930';

            // Créer un dégradé linéaire
            const gradient = ctx.createLinearGradient(x, y - radius, x, y + radius);
            gradient.addColorStop(0, color);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)'); // Transparent vers le bas

            return {
                x,
                y,
                radius,
                dx,
                dy,
                gradient,
            };
        };

        // Animer les cercles
        const animate = () => {
            requestAnimationFrame(animate);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Dessiner les cercles
            circles.forEach(circle => {
                ctx.beginPath();
                ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false);
                ctx.fillStyle = circle.gradient; // Utilisation du dégradé comme couleur de remplissage
                ctx.fill();

                // Déplacer les cercles
                circle.x += circle.dx;
                circle.y += circle.dy;

                // Si un cercle sort du cadre, le remettre de l'autre côté
                if (circle.x + circle.radius < 0) {
                    circle.x = canvas.width + circle.radius;
                } else if (circle.x - circle.radius > canvas.width) {
                    circle.x = -circle.radius;
                }

                if (circle.y + circle.radius < 0) {
                    circle.y = canvas.height + circle.radius;
                } else if (circle.y - circle.radius > canvas.height) {
                    circle.y = -circle.radius;
                }
            });
        };

        // Ajouter un cercle
        const addCircle = () => {
            if (circles.length < 2) {
                const newCircle = generateRandomCircle();
                setCircles(prevCircles => [...prevCircles, newCircle]);
            }
        };

        // Initialiser les cercles
        for (let i = 0; i < 2; i++) {
            addCircle();
        }

        // Lancer l'animation
        animate();
    }, [circles]);

    return (
        <div>
            <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }} />
            {/* Votre contenu React ici */}
        </div>
    );
};

export default Bubbles;
