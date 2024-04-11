export default function BreadCrumb(props) {
  const listado = props.categorias.map((objs, index) =>
    <li key={index}>{objs} {index !== (props.categorias.length - 1) ? '>' : ''}</li>
  )
  return (
    <div>
      <ul className="search-categorias">
        {listado}
      </ul>
    </div>
  );
}
