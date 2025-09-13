import defineEleventyConfig from '11ty.ts'
import { wikilinksPlugin } from './lib/wikilinks'
import 'tsx/esm'
import { renderToStaticMarkup } from 'react-dom/server'
import EleventyVitePlugin from '@11ty/eleventy-plugin-vite'
import { defineConfig as defineViteConfig } from 'vite'
import path from 'path'
import { execSync } from 'child_process'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineEleventyConfig((eleventyConfig) => {
  eleventyConfig.addPassthroughCopy('clientsidejs')
  eleventyConfig.addPassthroughCopy('components')
  eleventyConfig.addPassthroughCopy('lib')
  eleventyConfig.addPassthroughCopy('css')
  eleventyConfig.addPlugin(wikilinksPlugin)
  eleventyConfig.addTemplateFormats('11ty.jsx,11ty.tsx')
  eleventyConfig.addExtension(['11ty.jsx', '11ty.ts', '11ty.tsx'], {
    key: '11ty.js',
    compile: function () {
      return async function (data: string) {
        let content = await this.defaultRenderer(data)
        return renderToStaticMarkup(content)
      }
    },
  })
  eleventyConfig.on('eleventy.after', () => {
    execSync('npm run pagefind:index')
  })
  eleventyConfig.addPlugin(EleventyVitePlugin, {
    viteOptions: defineViteConfig({
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './'),
        },
      },
      plugins: [
        viteStaticCopy({
          targets: [
            { src: 'linkMap.json', dest: '.' },
            { src: 'pagefind', dest: '.' },
          ],
        }),
      ],
    }),
  })

  return {
    ...eleventyConfig,
    dir: {
      input: 'content',
      output: '_site',
    },
  }
})
