import Link from "next/link";

const getStartNumber = (pageInfo) => {
  if (pageInfo.pageNumber === 1) return 1;
  return pageInfo.skip + 1;
};

const getEndNumber = (pageInfo) => {
  if (pageInfo.pageNumber === 1)
    return pageInfo.totalCount < 10 ? pageInfo.totalCount : 10;
  return pageInfo.totalCount > pageInfo.skip + 10
    ? Number(pageInfo.skip + 10)
    : Number(pageInfo.totalCount);
};

export default function Pagination({ pageInfo, topOrBottomBorder = "top" }) {
  const startNumber = getStartNumber(pageInfo);
  const endNumber = getEndNumber(pageInfo);
  console.log(endNumber);
  console.log(pageInfo);
  return (
    <nav
      className={`flex items-center justify-between py-10 ${
        topOrBottomBorder === "top"
          ? "mt-10 border-t border-gray-200"
          : topOrBottomBorder === "none"
          ? undefined
          : "mb-10 border-b border-gray-200"
      }`}
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{startNumber}</span> to{" "}
          <span className="font-medium">{endNumber}</span> of{" "}
          <span className="font-medium">{pageInfo.totalCount}</span> results
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        {pageInfo && (
          <Link href={`/portfolio/${pageInfo.slug}/${pageInfo.pageNumber - 1}`}>
            <a
              className={`relative ml-3 inline-flex items-center border px-4 py-2 text-sm font-medium ${
                pageInfo.pageNumber === 1
                  ? "pointer-events-none border-gray-100 bg-gray-50 text-gray-400"
                  : "cursor-pointer  border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Previous
            </a>
          </Link>
        )}

        {pageInfo && (
          <Link href={`/portfolio/${pageInfo.slug}/${pageInfo.pageNumber + 1}`}>
            <a
              className={`relative ml-3 inline-flex items-center border px-4 py-2 text-sm font-medium ${
                pageInfo.totalCount <= endNumber
                  ? "pointer-events-none border-gray-100 bg-gray-50 text-gray-400"
                  : "cursor-pointer  border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Next
            </a>
          </Link>
        )}
      </div>
    </nav>
  );
}
