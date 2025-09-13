export interface EleventyDirectories {
  input: string
  includes: string
  layouts: string
  data: string
  output: string
}

export interface EleventyEnv {
  // Assuming env can have various properties, or you can specify them if known
  [key: string]: any
}

export interface Eleventy {
  version: string
  generator: string
  env: EleventyEnv
  directories: EleventyDirectories
}

export interface PackageJsonScripts {
  [key: string]: string
}

export interface PackageJsonRepository {
  type: string
  url: string
}

export interface PackageJsonBugs {
  url: string
}

export interface PackageJsonDependencies {
  [key: string]: string
}

export interface PackageJsonDevDependencies {
  [key: string]: string
}

export interface PackageJson {
  name: string
  version: string
  main: string
  scripts: PackageJsonScripts
  repository: PackageJsonRepository
  keywords: string[]
  author: string
  license: string
  bugs: PackageJsonBugs
  homepage: string
  description: string
  dependencies: PackageJsonDependencies
  devDependencies: PackageJsonDevDependencies
}

export interface Page {
  inputPath: string
  fileSlug: string
  filePathStem: string
  outputFileExtension: string
  templateSyntax: string
  date: Date
  rawInput: any // Specify a more precise type if known
  url: string
  outputPath: string
}

type Collections = Record<string, any>

export interface EleventyData {
  content: string
  layout: string
  title: string
  eleventy: Eleventy
  pkg: PackageJson
  page: Page
  collections: Collections
}
