import Link from "next/link";
type BreadCrumbsProps = {
  filters: string[];
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};
const BreadCrumbs = ({ filters, searchParams }: BreadCrumbsProps) => {
  return (
    <ul className="flex mt-2">
      {filters?.map((filter, index) => (
        <li
          key={filter}
          className={`${
            index >= 1 ? "ml-2" : ""
          } flex items-center gap-2 text-sm`}
        >
          {!searchParams[filter] ? <></> : `${filter}:`}
          <Link href={`?${filter}=${searchParams[filter]}`}>
            {searchParams[filter]}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default BreadCrumbs;
