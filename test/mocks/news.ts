export function mockGetNewsList(limit = 10, sort?: 'popular' | 'latest') {
  const sortParam = sort ? `&sort=${sort}`: '';
  cy.intercept('GET', `${Cypress.env('API_URL')}/v1/news?limit=${limit}${sortParam}`, {
    statusCode: 200,
    body: {
      data: {
        items: [
          {
            "id": 10,
            "title": "최신 뉴스1",
            "tag": "뉴스",
            "commentCount": 10,
            "todayViewCount": 0,
            "imageUrl": null,
          },
          {
            "id": 9,
            "title": "최신 뉴스2",
            "tag": "뉴스",
            "commentCount": 9,
            "todayViewCount": 0,
            "imageUrl": null,
            "createdAt": "2025.05.15 09:37:43"
          }
        ],
      },
    },
  }).as('GET-News');
}
