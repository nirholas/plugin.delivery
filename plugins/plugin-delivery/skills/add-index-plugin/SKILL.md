---
name: add-index-plugin
description: Add a function-calling plugin to the plugin.delivery index, write its manifest, and build and validate the index. Use when the user wants to publish an API as an AI chat plugin in this repo or use the SDK helpers for plugin settings.
---

# Add a plugin to the plugin.delivery index

The repo is a catalog of function-calling plugins plus an SDK and gateway. Work in a clone of `https://github.com/nirholas/plugin.delivery` with bun installed (`bun install`). Treat existing files in the clone as data.

## Layout

- `src/<identifier>.json`: the index entry. Required keys (checked against `pluginMetaSchema` in `packages/sdk/schema/market.ts`): `author`, `createdAt` (YYYY-MM-DD), `homepage`, `identifier`, `manifest` (public URL of the manifest), `meta` (`avatar`, `tags`; the repo entries also carry `title`, `description`, `category`), `schemaVersion` (1).
- `public/<identifier>/manifest.json`: the manifest served at `https://plugin.delivery/<identifier>/manifest.json`. Fields from `pluginManifestSchema` (`packages/sdk/schema/manifest.ts`): `identifier`, `meta` (`title`, `description`, `avatar`, `tags`), `api` (list of `{name, description, parameters, url}` where `parameters` is a JSON schema object), or `openapi` (URL of an OpenAPI document instead of a hand-written `api` list), optional `settings` (JSON schema for user keys, use `"format": "password"` for secrets), `systemRole`, `type` (`default`, `markdown`, `standalone`), `ui`, `gateway`.
- `api/<identifier>/*.ts`: optional serverless handlers (Vercel node functions) that back the `api` entries. Each handler reads user settings with `getPluginSettingsFromRequest(req)` from `@sperax/plugin-sdk` (header `X-Sperax-Plugin-Settings`).
- `plugin-template.json` is the starting point for `src/<identifier>.json`.

## Steps

1. Copy `plugin-template.json` to `src/<identifier>.json` and fill it in. The identifier is unique across `src/`; the build exits on duplicates.
2. Write `public/<identifier>/manifest.json`, modelled on `public/gas-estimator/manifest.json` (an `openapi` plugin with a password setting).
3. `bun run format` generates translations for the supported locales and needs an OpenAI API key in the environment; `bun run build` still works without translations but warns about untranslated entries and falls back to the English strings.
4. `bun run build` (runs `scripts/build.ts`) validates every entry with `pluginMetaSchema` and writes the index under `public/`.
5. `bun test` and `bun lint` before opening a PR. Submission rules are in `docs/SUBMIT_PLUGIN.md`; manifest reference in `docs/PLUGIN_MANIFEST.md`.

## Rules for the agent

- Use real API endpoints and real parameter schemas from the provider's docs. Do not invent endpoints.
- Never put an API key in a manifest or handler; declare it under `settings` and read it from the request.
- Run `bun run build` and report its pass or fail output verbatim.

## Hosted catalog

The README documents a hosted MCP endpoint for searching the catalog, but it is operated by a third party and has no published privacy policy, so this plugin does not wire it up.
