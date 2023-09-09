export interface AccessToken {
  token_type: 'Bearer';
  expires_in: number;
  access_token: string;
  scope: string;
}

export interface Auth0User {
  created_at: string;
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  identities: [
    {
      provider: string;
      user_id: string;
      connection: string;
      isSocial: boolean;
    },
  ];
  locale: string;
  name: string;
  nickname: string;
  picture: string;
  updated_at: string;
  user_id: string;
  last_ip: string;
  last_login: string;
  logins_count: number;
  user_metadata: Record<string, unknown>;
  app_metadata: {
    credits?: number;
    last_claim_datetime?: string;
  };
}

let accessToken: AccessToken | null = null;
let expirationDate: Date | null = null;
async function getAccessToken() {
  if (
    accessToken &&
    expirationDate &&
    expirationDate.valueOf() > new Date().valueOf()
  ) {
    return accessToken;
  }

  const response = await fetch(
    `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.AUTH0_M2M_CLIENT_ID,
        client_secret: process.env.AUTH0_M2M_CLIENT_SECRET,
        audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`,
        grant_type: 'client_credentials',
      }),
    },
  );

  if (!response.ok) {
    throw new Error('Error getting access token');
  }

  accessToken = (await response.json()) as AccessToken;
  expirationDate = new Date(Date.now() + accessToken.expires_in * 1000);

  return accessToken;
}

export async function getAuth0User(userId: string) {
  const accessToken = await getAccessToken();
  const response = await fetch(
    `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken.access_token}`,
      },
    },
  );

  if (!response.ok) {
    console.error(await response.text());
    throw new Error('Error getting user');
  }

  const user = (await response.json()) as Auth0User;

  return user;
}

interface PatchAuth0UserPayload {
  app_metadata: Record<string, unknown>;
}

export async function patchAuth0User(
  userId: string,
  payload: PatchAuth0UserPayload,
) {
  const accessToken = await getAccessToken();
  const response = await fetch(
    `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}`,
    {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${accessToken.access_token}`,
      },
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    console.error(await response.text());
    throw new Error('Error patching user');
  }

  const user = (await response.json()) as Auth0User;

  return user;
}
