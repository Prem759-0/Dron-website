# 🚁 Astro Drone - Cinematic Product Website

Welcome to the **Astro Drone** repository! This is a premium, hyper-realistic, scroll-driven single-page application (SPA) built to showcase the world's most advanced consumer drone.

## 🎨 Design & Colors (Aesthetics)
The visual identity of this project is deeply inspired by the physical drone itself, utilizing a cinematic, high-contrast dark theme:

*   **Matte Titanium-Gray (`#030303` to `#151515`)**: The core background and surface colors, providing a sleek, professional, and cinematic canvas.
*   **Safety-Orange (`#ff5a00`)**: The primary accent color used for critical highlights, the most popular pricing tier, and primary Call-to-Action (CTA) buttons. Matches the drone's physical accents.
*   **Cyan (`#00e5ff`)**: The secondary accent color used for icons, checkmarks, and technological feature highlights (like the front light ring of the drone).
*   **Cinematic Effects**: The UI heavily utilizes **glassmorphism** (frosted glass panels), **animated film grain** overlays, and **radial vignettes** to ensure text readability over bright footage.

## 🌊 User Flows (Scroll & Chart Flows)
The website is designed as a continuous, story-driven scroll experience using GSAP ScrollTrigger and a custom `<canvas>` rendering engine.

1.  **Hero Initiation Flow (Frames 1–120):**
    *   **Preloader:** A cinematic loading screen ensures all heavy image assets are cached before the user begins scrolling.
    *   **Scroll Sequence:** As the user scrolls down, the background canvas scrubs forward through the drone's flight (forest to waterfall). Scrolling up rewinds the footage.
    *   **Milestone Overlays:** Key features ("Omnidirectional Obstacle Avoidance", "IP55 Weather Sealed") fade and slide into view at precise scroll percentages.
2.  **Feature Deep-Dive Flow:**
    *   **Spec Strip:** Count-up animations trigger as the user reaches the core specifications.
    *   **Flight Modes:** Interactive, glowing hover cards explain the neural-network-powered flight modes.
    *   **Portability:** A split-screen layout demonstrating the foldable design.
3.  **Secondary Action Flow (Frames 121–240):**
    *   **Lazy-Loaded Sequence:** A second scroll sequence scrubs through a canyon run and cliff climb.
    *   **Horizon Breakout:** Ends with the drone hovering above the clouds at sunrise, transitioning into the final conversion sections.
4.  **Conversion Flow:**
    *   Generational comparison table.
    *   Interactive pricing tiers with an "Ambient Glow" highlighting the premium Cinematic Combo.
    *   Accordion-style FAQ and standard footer.

## 🛠️ Technology Stack
*   **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Static Export enabled)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Animations:** [GSAP](https://gsap.com/) & ScrollTrigger
*   **Icons:** [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

To run this project locally on your machine:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to experience the site.

## 📦 Deployment (Vercel)
This project is configured for seamless deployment on Vercel. 
*   **Static Export:** The project is configured with `output: "export"` in `next.config.ts`. Running `npm run build` will generate an `out` folder containing pure HTML/CSS/JS files that can be hosted anywhere.
*   **Vercel CLI:** You can instantly deploy by running `npx vercel` in your terminal.
