import { EleventyConfig } from '11ty.ts'
import { buildLinkMap } from './buildLinkMap'
import { writeToAssets } from './utils'
import {
  removeFileExtensionsFromLinks,
  wikilinksTransformer,
} from './wikilinksTransformer'
import { LinkMap } from './types'

export const wikilinksPlugin = (config: EleventyConfig) => {
  let linkMap: LinkMap = {}
  config.addCollection('linkMap', (collectionsApi) => {
    linkMap = buildLinkMap(
      collectionsApi.getAll().filter((item) => item.inputPath.match(/\.md$/g)),
    )
    writeToAssets(linkMap)
    return linkMap
  })

  config.addTransform('wikilinks', wikilinksTransformer())
  config.addTransform('fileExtensions', removeFileExtensionsFromLinks)

  return config
}
