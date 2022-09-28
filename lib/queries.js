export const GET_WEBSITE_INFO = `
query Info {
    websiteInformations(first: 1) {
      name
      emailAddress
      phoneNumber
      twitter
      facebook
      instagram
      websiteTitle
      websiteDescription
    }
    categories{
      name
      slug
    }
  }
  `;

export const GET_PORTFOLIO_PAGE_QUERY = `
query PhotosByCategory($slug: String!, $skip: Int) {
  websiteInformations(first: 1) {
    name
    emailAddress
    phoneNumber
    twitter
    facebook
    instagram
    websiteTitle
    websiteDescription
  }
    allCategories: categories{
        name
        slug
      }
    categories(where: {slug: $slug}) {
      name
      description
      photos(first: 10, orderBy: date_DESC, skip: $skip) {
        id
        title
        date
        photo {
          url
          width
          height
        }
      }
    }
    photosConnection(where: {categories_some:{slug:$slug}}){
      pageInfo{
        hasNextPage
        hasPreviousPage
        pageSize
      }
      aggregate{
        count
      }
    }
  }  
`;
