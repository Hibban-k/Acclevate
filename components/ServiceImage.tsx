'use client';

const fallbackImage = '/images/heroes/hero-services.png';
const fallbackAlt = 'Architectural detail of a modern office building';

function showFallback(image: HTMLImageElement) {
    if (image.getAttribute('src') !== fallbackImage) {
        image.src = fallbackImage;
        if (image.alt) image.alt = fallbackAlt;
    }
}

interface ServiceImageProps {
    src?: string;
    alt: string;
    className?: string;
    priority?: boolean;
}

export default function ServiceImage({ src, alt, className, priority = false }: ServiceImageProps) {
    return (
        // CMS images may use external hosts; a native image also supports a local fallback.
        // eslint-disable-next-line @next/next/no-img-element
        <img
            ref={(image) => {
                // A server-rendered image may fail before React attaches its error handler.
                if (image?.complete && image.naturalWidth === 0) showFallback(image);
            }}
            src={src || fallbackImage}
            alt={src || !alt ? alt : fallbackAlt}
            className={className}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onError={(event) => showFallback(event.currentTarget)}
        />
    );
}
