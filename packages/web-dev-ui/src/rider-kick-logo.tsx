export type RiderKickLogoProps = {
  className?: string;
};

export function RiderKickLogo({ className = "" }: RiderKickLogoProps) {
  return (
    <span className={`web-dev-ui-rider-kick ${className}`} aria-hidden="true">
      <span />
    </span>
  );
}
