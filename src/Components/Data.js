const Data = (props) => {
  return (
    <div className="data-panel">
      <h3 className="data-panel-label">{props.label}</h3>
      <p>{props.children}</p>
    </div>
  );
};

export { Data };
