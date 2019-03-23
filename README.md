# ldapts-search ![](https://img.shields.io/travis/hwkd/ldapts-search.svg?style=flat)
Utility to help search through active directory.

Definition:
```
class LdapSearch {
  constructor(params: {
    host: string;
    port: number;
    dn: string;
    password: string;
    searchBase: string;
    attributes?: string[];
  });
  match: (filter: string, sizeLimit?: number | undefined) => Promise<any[]>;
}
```

Example usage:
```
function searchActiveDirectory(name: string): ActiveDirectoryRecord[] {
  const ldapSearch = new LdapSearch({
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
  return await ldapSearch.match(`(&(objectClass=Person)(sAMAccountName=${name}))`);
}
```