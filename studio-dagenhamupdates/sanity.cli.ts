import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'y30qsdcf',
    dataset: 'production'
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
  typegen: {
    enabled: true,
    path: '../site/src/**/*.{ts,tsx}',
    schema: 'schema.json',
    generates: '../site/sanity.types.ts',
    overloadClientMethods: true,
  },
})
