import { EleventyConfig } from '11ty.ts'
import { buildLinkMap, LinkMap } from './buildLinkMap'
import { writeToAssets } from './utils'
import { wikilinksTransformer } from './wikilinksTransformer'

export const wikilinksPlugin = (config: EleventyConfig, options = {}) => {
  let linkMap: LinkMap = {}
  config.addCollection('linkMap', (collectionsApi) => {
    linkMap = buildLinkMap(
      collectionsApi.getAll().filter((item) => item.inputPath.match(/\.md$/g)),
    )
    writeToAssets(linkMap)
    return linkMap
  })

  config.addTransform('wikilinks', wikilinksTransformer())

  return config
}
