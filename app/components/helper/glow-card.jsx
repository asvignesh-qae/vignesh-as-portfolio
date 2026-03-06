"use client"

import { useEffect } from 'react';

const GlowCard = ({ children , identifier}) => {
  useEffect(() => {
    const CONTAINER = document.querySelector(`.glow-container-${identifier}`);
    const CARDS = document.querySelectorAll(`.glow-card-${identifier}`);

    const CONFIG = {
      proximity: 40,
      spread: 80,
      blur: 12,
      gap: 32,
      vertical: false,
      opacity: 0,
    };

    // Cache bounds so getBoundingClientRect() is never called in the hot path.
    // Defer reads via rAF so they never happen synchronously after a DOM write.
    let boundsCache = [];
    let boundsRafId = null;
    const refreshBounds = () => {
      if (boundsRafId) return;
      boundsRafId = requestAnimationFrame(() => {
        boundsRafId = null;
        boundsCache = Array.from(CARDS).map((card) => card.getBoundingClientRect());
      });
    };
    // Defer initial read to rAF so layout is settled before we measure
    boundsRafId = requestAnimationFrame(() => {
      boundsRafId = null;
      boundsCache = Array.from(CARDS).map((card) => card.getBoundingClientRect());
    });

    const resizeObserver = new ResizeObserver(refreshBounds);
    CARDS.forEach((card) => resizeObserver.observe(card));
    window.addEventListener('scroll', refreshBounds, { passive: true });

    // Throttle pointer updates to one per animation frame
    let rafId = null;
    let lastX = 0;
    let lastY = 0;

    const UPDATE = (event) => {
      lastX = event.x;
      lastY = event.y;
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        for (let i = 0; i < CARDS.length; i++) {
          const CARD = CARDS[i];
          const CARD_BOUNDS = boundsCache[i];
          if (!CARD_BOUNDS) continue;

          if (
            lastX > CARD_BOUNDS.left - CONFIG.proximity &&
            lastX < CARD_BOUNDS.left + CARD_BOUNDS.width + CONFIG.proximity &&
            lastY > CARD_BOUNDS.top - CONFIG.proximity &&
            lastY < CARD_BOUNDS.top + CARD_BOUNDS.height + CONFIG.proximity
          ) {
            CARD.style.setProperty('--active', 1);
          } else {
            CARD.style.setProperty('--active', CONFIG.opacity);
          }

          const CARD_CENTER = [
            CARD_BOUNDS.left + CARD_BOUNDS.width * 0.5,
            CARD_BOUNDS.top + CARD_BOUNDS.height * 0.5,
          ];

          let ANGLE =
            (Math.atan2(lastY - CARD_CENTER[1], lastX - CARD_CENTER[0]) * 180) / Math.PI;
          ANGLE = ANGLE < 0 ? ANGLE + 360 : ANGLE;

          CARD.style.setProperty('--start', ANGLE + 90);
        }
      });
    };

    document.body.addEventListener('pointermove', UPDATE);

    const RESTYLE = () => {
      CONTAINER.style.setProperty('--gap', CONFIG.gap);
      CONTAINER.style.setProperty('--blur', CONFIG.blur);
      CONTAINER.style.setProperty('--spread', CONFIG.spread);
      CONTAINER.style.setProperty('--direction', CONFIG.vertical ? 'column' : 'row');
    };

    RESTYLE();

    return () => {
      document.body.removeEventListener('pointermove', UPDATE);
      window.removeEventListener('scroll', refreshBounds);
      resizeObserver.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      if (boundsRafId) cancelAnimationFrame(boundsRafId);
    };
  }, [identifier]);

  return (
    <div className={`glow-container-${identifier} glow-container`}>
      <article className={`glow-card glow-card-${identifier} h-fit cursor-pointer border border-[#2a2e5a] transition-all duration-300 relative bg-[#101123] text-gray-200 rounded-xl hover:border-transparent w-full`}>
        <div className="glows"></div>
        {children}
      </article>
    </div>
  );
};

export default GlowCard;
