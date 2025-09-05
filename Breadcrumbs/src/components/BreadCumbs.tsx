import { Link, useLocation } from "react-router-dom";

function BreadCumbs() {
  const { pathname } = useLocation();
  const pathNames = pathname.split("/").filter((x) => x);
  console.log(pathNames);

  let breadCrumbPath = "";
  return (
    <div className="breadcrumbs">
      <Link to={"/"}>Home</Link>
      {pathNames.map((name, index) => {
        breadCrumbPath += `/${name}`;
        const isLast = index === pathNames.length - 1;
        return isLast ? (
          <span>/ {name}</span>
        ) : (
          <span>
            {" "}
            / <Link to={breadCrumbPath}> {name}</Link>
          </span>
        );
      })}
    </div>
  );
}

export default BreadCumbs;
