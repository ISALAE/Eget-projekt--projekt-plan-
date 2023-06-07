/**
 * Result either contains an error object or a session if successfully authenticated.
 */
export type LoginResult =
  | { error: { code: number; data: any }; success?: undefined }
  | { error?: undefined; success: { session: string } };

/**
 * Contains authentication functionality such as registration, login, signout, etc.
 */
export interface Auth {
  /**
   * Authenticates the user and returns a session token or an error object with proper HTTP code.
   * @param form the authentication data submitted by a user. Should include 'username' and 'password'
   */
  login(form: FormData): Promise<LoginResult>;
}


const reuls: LoginResult = {error: {code: 404, data: "shit went wrong fam"}}
const asd: LoginResult = {success: {session: "9213-1823-8723"}}