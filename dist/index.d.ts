import { Client } from "ldapts";
export declare namespace Params {
    interface LdapSearch {
        ip: string;
        port: number;
        dn: string;
        password: string;
        searchBase: string;
        attributes?: string[];
    }
}
export default class LdapSearch {
    private static _instance;
    private _client;
    private _url;
    private _dn;
    private _password;
    private _searchBase;
    private _attributes?;
    static instance(args: Params.LdapSearch): LdapSearch;
    constructor(args: Params.LdapSearch);
    readonly url: string;
    readonly dn: string;
    readonly password: string;
    readonly searchBase: string;
    readonly client: Client;
    match: (field: string, pattern: string, sizeLimit?: number | undefined) => Promise<any>;
}
