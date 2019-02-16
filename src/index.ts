import { Client } from "ldapts";

export namespace Params {
  export interface LdapSearch {
    ip: string;
    port: number;
    dn: string;
    password: string;
    searchBase: string;
  }
}

export default class LdapSearch {
  private static _instance: LdapSearch;
  private _client: Client;
  private _url: string;
  private _dn: string;
  private _password: string;
  private _searchBase: string;

  public static instance(args: Params.LdapSearch) {
    if (!LdapSearch._instance) {
      LdapSearch._instance = new LdapSearch(args);
    }
    return LdapSearch._instance;
  }

  private constructor(args: Params.LdapSearch) {
    this._url = `ldap://${args.ip}:${args.port}`;
    this._dn = args.dn;
    this._password = args.password;
    this._searchBase = args.searchBase;
  }

  get url() {
    return this._url;
  }

  get dn() {
    return this._dn;
  }

  get password() {
    return this._password;
  }

  get searchBase() {
    return this._searchBase;
  }

  get client(): Client {
    if (!this._client) {
      this._client = new Client({
        url: this._url,
        connectTimeout: 3000
      });
    }
    return this._client;
  }

  // TODO: Write unit test
  async match(field: string, pattern: string): Promise<any> {
    try {
      await this.client.bind(this._dn, this._password);
      const { searchEntries } = await this.client.search(this._searchBase, {
        scope: "sub",
        filter: `${field}=${pattern}`
      });
      return searchEntries;
    } catch (error) {
      throw error;
    } finally {
      await this.client.unbind();
    }
  }
}
