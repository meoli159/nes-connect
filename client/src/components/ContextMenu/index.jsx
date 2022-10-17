import "./style.css";

export function ContextMenu({ point }) {
  return (
    <div
      style={{ left: `${point.x}px`, top: `${point.y}px` , padding:"5px 5px 5px 5px"}}
      className="ContextMenu"
    >
      
        <button className="transfer-owner">
          Transfer Owner
        </button>

        <div className="separator-10"></div>

        <button className="kick-user">
          Kick User
        </button>

    </div>
  );
}
