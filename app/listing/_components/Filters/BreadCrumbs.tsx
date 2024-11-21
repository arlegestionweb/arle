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
    <section className="flex overflow-x-scroll max-w-[100%] scrollbar-hide">
      <ul className="flex gap-2 items-center">
        {breadCrumbs.length > 0 &&
        (<li className="flex items-center gap-1 capitalize">
          <Link href={"/listing"} scroll={false} className="whitespace-nowrap font-inter font-light text-gray-700 text-sm hover:underline underline-offset-2">
            {"Productos >"}
          </Link>
        </li>
        )}
        {breadCrumbs.map((crumb, index) => (
          <li key={crumb.param} className="flex items-center gap-1 capitalize">
            <Link href={`/listing${crumb.href}`} scroll={false} className="whitespace-nowrap font-inter font-light text-gray-700 text-sm hover:underline underline-offset-2">
              {crumb.label.replace(" AND "," & ").toLowerCase()} {index < breadCrumbs.length - 1 ? ' >' : ''}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default BreadCrumbs;