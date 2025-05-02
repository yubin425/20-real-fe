const oauthLogin = async (provider: string) => {
  window.location.href = process.env.NEXT_PUBLIC_API_URL + `/v1/oauth/${provider}`;
};

export { oauthLogin };
