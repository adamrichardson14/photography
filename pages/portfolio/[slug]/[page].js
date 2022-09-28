import Image from "next/future/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Container from "../../../components/Container";
import Footer from "../../../components/Footer";
import Modal from "../../../components/Modal";
import Nav from "../../../components/Nav";
import Pagination from "../../../components/Pagination";
import { GET_PORTFOLIO_PAGE_QUERY } from "../../../lib/queries";
import { fetchData } from "../../../lib/utils";

const calculateSkip = (params) => {
  if (!params.page) return 0;
  if (Number(params.page) === 1) return 0;
  const skip = (Number(params.page) - 1) * 10;
  return Number(skip);
};

const getPageNumber = (params) => {
  if (!params.page) return 1;
  return Number(params.page);
};

export const getStaticPaths = () => {
  // Get all categories
  // Get all pages of the categories
  // Add to array
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const skipNumber = calculateSkip(params);
  const pageNumber = getPageNumber(params);

  const { allCategories, categories, photosConnection, websiteInformations } =
    await fetchData(GET_PORTFOLIO_PAGE_QUERY, {
      slug: params.slug,
      skip: skipNumber,
    });

  const totalPages = Math.ceil(photosConnection.aggregate.count / 10);

  return {
    props: {
      allCategories,
      categories,
      photosConnection,
      websiteInfo: websiteInformations[0],
      pageInfo: {
        pageNumber: Number(pageNumber),
        totalPages: Number(totalPages),
        totalCount: Number(photosConnection.aggregate.count),
        skip: Number(skipNumber),
        slug: params.slug,
      },
    },
  };
};

export default function PortfolioSlugPage({
  allCategories,
  categories,
  photosConnection,
  pageInfo,
  websiteInfo,
}) {
  const router = useRouter();

  console.log({ allCategories, categories, photosConnection });
  const [open, setOpen] = useState(true);
  const [currentImage, setCurrentImage] = useState(undefined);

  if (router.isFallback) return <h1>Loading...</h1>;
  const images = categories[0].photos;
  return (
    <div>
      <div className="relative w-screen h-52 lg:h-20">
        <Nav info={websiteInfo} />
      </div>

      <Container className="">
        <div className="mt-5 text-2xl font-thin">{categories[0].name}</div>
        <div className="mt-1 text-sm text-gray-600">
          {categories[0].description}
        </div>
        <div className="flex xl:block xl:absolute xl:left-40 xl:top-[274px]">
          <div className="flex flex-wrap leading-8 xl:flex-col xl:space-y-5 text-right mt-10 xl:mt-0 space-x-5 xl:space-x-0">
            {allCategories.map((category) => (
              <Link key={category.slug} href={`/portfolio/${category.slug}/1`}>
                <a
                  className={`${
                    router.asPath.includes(category.slug)
                      ? "bg-gray-200 text-gray-600 pointer-events-none"
                      : undefined
                  } text-base sm:text-xl xl:text-2xl leading-4 tracking-wider font-medium`}
                >
                  {category.name}
                </a>
              </Link>
            ))}
          </div>
        </div>
        <Pagination pageInfo={pageInfo} topOrBottomBorder="none" />
        <div className="auto grid grid-flow-dense auto-rows-[300px] grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {images &&
            images.map((image, index) => (
              <button
                onClick={() => {
                  setCurrentImage(image);
                  setOpen(true);
                }}
                key={image.id}
                className={`h-full w-full ${
                  index === 2 && "col-span-1 md:col-span-2"
                } ${index === 5 && "col-span-1 md:row-span-2"} ${
                  index === 4 && "col-span-1 md:row-span-2 lg:col-span-3"
                } ${
                  index === 9 &&
                  "col-span-1 row-span-1 md:col-span-2 md:row-span-2"
                } ${index === 1 && "col-span-1 md:row-span-2"} ${
                  index === 6 && "col-span-1 md:row-span-2 lg:col-span-3"
                } ${index === 8 && "col-span-1 md:row-span-2"}`}
              >
                <Image
                  src={image.photo.url}
                  width={image.photo.width}
                  height={image.photo.height}
                  alt={image.name}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
        </div>
        <Pagination pageInfo={pageInfo} topOrBottomBorder="top" />
      </Container>
      <Modal open={open} setOpen={setOpen} image={currentImage} />
      <Footer info={websiteInfo} />
    </div>
  );
}
