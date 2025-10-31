export default function Carets({ field, setSort }) {
  const handleSort = (field, order) => {
    setSort({ orderBy: field, order: order });
  };

  return (
    <>
      <span
        onClick={() => {
          handleSort(field, "asc");
        }}
      >
        <i className="bi bi-caret-up-fill"></i>
      </span>
      <span
        onClick={() => {
          handleSort(field, "desc");
        }}
      >
        <i className="bi bi-caret-down-fill"></i>
      </span>
    </>
  );
}
