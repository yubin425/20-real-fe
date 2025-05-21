export function mockGetNoticeList(limit = 10) {
  cy.intercept('GET', `${Cypress.env('API_URL')}/v1/notices?limit=${limit}`, {
    statusCode: 200,
    body: {
      data: {
        items: [
          {
            "id": 1,
            "title": "최신 공지1",
            "author": "김세호/풀스택",
            "tag": "뉴스",
            "platform": "디스코드",
            "userRead": true,
            "createdAt": "2025.05.15 09:37:43"
          },
          {
            "id": 1,
            "title": "최신 공지2",
            "author": "김세호/풀스택",
            "tag": "뉴스",
            "platform": "디스코드",
            "userRead": true,
            "createdAt": "2025.05.15 09:37:43"
          }
        ],
      },
    },
  }).as('GET-Notices');
}
