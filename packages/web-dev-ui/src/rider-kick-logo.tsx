export type RiderKickLogoProps = {
  spriteSrc: string;
  className?: string;
};

export function RiderKickLogo({
  spriteSrc,
  className = "",
}: RiderKickLogoProps) {
  return (
    <span className={`web-dev-ui-rider-kick ${className}`} aria-hidden="true">
      <span
        style={{
          backgroundImage: `url("${spriteSrc}")`,
        }}
      />
    </span>
  );
}
