# OpenSpec for Prati

Install the OpenSpec CLI separately using its official installation instructions. With the CLI available, create a change with `openspec new change "fe-<short-name>" --schema frontend`, then follow the artifact dependencies shown by `openspec status --change "fe-<short-name>"` and the instructions in the frontend schema. Validate with `openspec validate "fe-<short-name>"`. Commands depend on the installed CLI version; consult `openspec --help` if they differ.

After editing the schema, run `openspec schema validate frontend`. The schema requires a UI contract even for changes without visible UI; explain why it does not apply when appropriate. Do not claim CLI validation passed unless it actually ran. The CLI is not bundled with this repository.

Read and reference applicable knowledge and requirement packages before authoring change artifacts. The `specs/` directory is the durable OpenSpec baseline; change deltas live under `changes/` until verified and archived using the CLI workflow. Do not treat draft knowledge or requirements as already-approved behavior.

The setup review and outstanding workflow decision are recorded in [the grill review](../docs/requirements/openspec-workflow-review.md).
