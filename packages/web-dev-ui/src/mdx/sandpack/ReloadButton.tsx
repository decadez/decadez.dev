export interface ReloadButtonProps {
  onReload: () => void;
}

export function ReloadButton({ onReload }: ReloadButtonProps) {
  return (
    <button
      className="ui-sandpack-action"
      onClick={onReload}
      title="Reload sandbox"
      type="button"
    >
      <span aria-hidden="true" className="ui-sandpack-action-icon">
        ↻
      </span>
      <span>Reload</span>
    </button>
  );
}
