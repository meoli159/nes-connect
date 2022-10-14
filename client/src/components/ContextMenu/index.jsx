import "./style.css";

export function ContextMenu({ point }) {
  return (
    <div
      style={{ left: `${point.x}px`, top: `${point.y}px` , padding:"0 0 0 7px"}}
      className="ContextMenu"
    >
      <ul>
        <li>Transfer Owner</li>
        <li>Kick User</li>
      </ul>
    </div>
  );
}
