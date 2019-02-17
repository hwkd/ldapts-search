"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ldapts_1 = require("ldapts");
class LdapSearch {
    constructor(args) {
        this.match = (field, pattern, sizeLimit) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.bind(this._dn, this._password);
                const { searchEntries } = yield this.client.search(this._searchBase, {
                    scope: "sub",
                    filter: `${field}=${pattern}`,
                    sizeLimit,
                    attributes: this._attributes,
                });
                return searchEntries;
            }
            catch (error) {
                throw error;
            }
            finally {
                yield this.client.unbind();
            }
        });
        this._url = `ldap://${args.ip}:${args.port}`;
        this._dn = args.dn;
        this._password = args.password;
        this._searchBase = args.searchBase;
        this._attributes = args.attributes;
    }
    static instance(args) {
        if (!LdapSearch._instance) {
            LdapSearch._instance = new LdapSearch(args);
        }
        return LdapSearch._instance;
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
    get client() {
        if (!this._client) {
            this._client = new ldapts_1.Client({
                url: this._url,
                connectTimeout: 3000
            });
        }
        return this._client;
    }
}
exports.default = LdapSearch;
//# sourceMappingURL=index.js.map