import { Client } from "ldapts";

export namespace Params {
  export interface LdapSearch {
    ip: string;
    port: number;
    dn: string;
    password: string;
    searchBase: string;
    attributes?: string[];
  }
}

export default class LdapSearch {
  private static _instance: LdapSearch;
  private _url: string;
  private _dn: string;
  private _password: string;
  private _searchBase: string;
  private _attributes?: string[];

  public static instance(args: Params.LdapSearch) {
    if (!LdapSearch._instance) {
      LdapSearch._instance = new LdapSearch(args);
    }
    return LdapSearch._instance;
  }

  constructor(args: Params.LdapSearch) {
    this._url = `ldap://${args.ip}:${args.port}`;
    this._dn = args.dn;
    this._password = args.password;
    this._searchBase = args.searchBase;
    this._attributes = args.attributes;
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

  client(): Client {
    return new Client({
      url: this._url,
      connectTimeout: 3000
    });
  }

  match = async (filter: string, sizeLimit?: number): Promise<any> => {
    let client;
    try {
      client = this.client();
      await client.bind(this._dn, this._password);
      const { searchEntries } = await client.search(this._searchBase, {
        scope: "sub",
        filter,
        sizeLimit,
        attributes: this._attributes,
      });
      return searchEntries;
    } catch (error) {
      throw error;
    } finally {
      await client.unbind();
    }
  }
}
