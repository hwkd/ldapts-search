# ldapts-search ![](https://img.shields.io/travis/hwkd/ldapts-search.svg?style=flat)
Utility to help search through active directory.

Definition:
```
class LdapSearch<Result> {
  constructor(params: {
    host: string;
    port: number;
    dn: string;
    password: string;
    searchBase: string;
    attributes?: string[];
  });
  match: (filter: string, sizeLimit?: number | undefined) => Promise<Result[]>;
}
```

Example usage:
```
type Result = {
  sAMAccountName: string;
  name: string;
  dn: string;
};

const ldapSearch = new LdapSearch<Result>({
  dn: "dn=test",
  host: "0.0.0.0",
  port: 1234,
  password: "password",
  searchBase: "dn=some,cn=searchbase",
  attributes: [
    "sAMAccountName",
    "name",
    "dn"
  ]
});

export function searchActiveDirectory(name: string): ActiveDirectoryRecord[] {
  return await ldapSearch.match(`(&(objectClass=Person)(sAMAccountName=${name}))`); // returns Result[]
}
```