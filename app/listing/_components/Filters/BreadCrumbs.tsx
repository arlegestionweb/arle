import Link from "next/link";

export type TBreadCrumb = {
  label: string;
  href: string;
  param: string;
};

type BreadCrumbsProps = {
  breadCrumbs: TBreadCrumb[];
};
const BreadCrumbs = ({ breadCrumbs }: BreadCrumbsProps) => {
  return (
    <section className=" flex items-center">
    <ul className="flex gap-2 items-center ">
      <li>
        <Link href={"/listing"} scroll={false}>
          Productos 
          {breadCrumbs.length > 0 && " >"} 
        </Link>
      </li>
      {breadCrumbs.map((crumb, index) => (
        <li key={crumb.param} className="flex items-center gap-1 capitalize">
          <Link href={`/listing${crumb.href}`} scroll={false}>
            {crumb.label.toLowerCase()} {index < breadCrumbs.length - 1 ? ' >' : ''}

          </Link>
        </li>
      ))}
    </ul>
  </section>
  );
};

export default BreadCrumbs;