interface HeroVideoProps {
  src?: string;
  fallbackImage?: string;
}

export function HeroVideo({ src, fallbackImage }: HeroVideoProps) {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {src ? (
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={fallbackImage}
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <div
          className="w-full h-full bg-gradient-to-br from-navy-900 via-background to-navy-800"
          style={{
            backgroundImage: fallbackImage ? `url(${fallbackImage})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}
      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-background/60" />
    </div>
  );
}