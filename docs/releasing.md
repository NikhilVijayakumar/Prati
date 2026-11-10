# npm release

The intended package is `@nikhilvijayakumar/prati`. Confirm ownership of the npm scope and package availability before publishing. The first release requires an authenticated npm account with permission to publish to that scope; the guide's initial manual publish is needed before configuring a trusted publisher on an existing package. Build and validate before publishing; published versions cannot be overwritten.

After the first publication, configure an npm trusted publisher for GitHub owner `NikhilVijayakumar`, repository `Prati`, workflow `publish.yml`, and environment `npm`. Allow direct `npm publish` in npm's trusted publisher settings. Create and protect the matching GitHub environment according to repository policy. New trusted publisher configurations expire if their first successful publish does not occur within two days. See [npm trusted publishing](https://docs.npmjs.com/trusted-publishers/).

Merge the reviewed version and matching lockfile, create and push a matching `v<version>` tag according to repository policy. The workflow validates, tests, builds and publishes using OIDC. Verify the registry version and install it in a clean consumer. Do not assume a tag or workflow succeeds without checking its result.

Existing imports can change to `@nikhilvijayakumar/prati`, or an npm alias can retain `prati`: `npm install prati@npm:@nikhilvijayakumar/prati`. Commit the consumer lockfile.
