import { expect } from "chai";
import { stub, fake } from "sinon";
import LdapSearch from "./index";

describe("LdapSearch", function() {
  const config = Object.freeze({
    dn: "dn=test",
    ip: "0.0.0.0",
    port: 1234,
    password: "password",
    searchBase: "dn=some,sb=searchbase"
  });

  it("sets instance variables", function() {
    const instance = LdapSearch.instance(config);
    expect(instance.url).to.equal(`ldap://${config.ip}:${config.port}`);
    expect(instance.dn).to.equal(config.dn);
    expect(instance.password).to.equal(config.password);
    expect(instance.searchBase).to.equal(config.searchBase);
  });

  it("is singleton instance", async function() {
    const instance_1 = LdapSearch.instance(config);
    const instance_2 = LdapSearch.instance(config);
    expect(instance_1).to.equal(instance_2);
  });

  it("has singleton ldap client", function() {
    const instance_1 = LdapSearch.instance(config);
    const instance_2 = LdapSearch.instance(config);
    expect(instance_1.client).to.equal(instance_2.client);
  });

  it("should search ldap", async function() {
    const ldapSearch = LdapSearch.instance(config),
      fakeBind = fake(),
      fakeSearch = fake.returns({
        searchEntries: [
          {
            sAMAccountName: "john.doe"
          }
        ]
      }),
      fakeUnbind = fake();

    stub(ldapSearch, "client").value({
      bind: fakeBind,
      search: fakeSearch,
      unbind: fakeUnbind
    });

    const results = await ldapSearch.match("sAMAccountName", "john.doe");
    expect(fakeBind.calledOnceWithExactly(config.dn, config.password));
    expect(fakeSearch.calledOnceWithExactly(config.searchBase));
    expect(fakeUnbind.calledOnce);
    expect(results).to.have.length(1);
    expect(results[0])
      .to.have.ownProperty("sAMAccountName")
      .that.equals("john.doe");
  });
});
