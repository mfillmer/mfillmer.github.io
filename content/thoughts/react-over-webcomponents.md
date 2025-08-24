# React vs Webcomponents

When using a static site generator like [Eleventy](eleventy.md), it is not an obvious choice to also use a JS-Framework to build the site. I first tried to just use what eleventy already offers out of the box, like full page navigation, Markdown, CSS, Templating and client side JS and fulltext search via [[pagefind]] (which is just great).

But especially the JavaScript part gets messy real quickly, if it is not organized in a thoughtful manner.
Typically, you want to organize your JS inside components nowadays, and [[Webcomponents]] are a convenient way of doing so, as they are widely available and rely on plain JavaScript. [There is also a Plugin for Webcomponents for eleventy](https://www.11ty.dev/docs/languages/webc/).

So I built some webcomponents, mainly for the pagefind part and a specific [[Graph View]], but I was also planning to play with [[Atomic Design]] Patterns and technologies like [[shadcn]]. I soon noticed some drawbacks, which weren't critical, but in sum made the experience with webcomponents unpleasant. Some of those points involved the lack of a local npm packages, which broke support for things like syntax highlighting or tailwind intellisense. Those would have surely been fixable, but I had no pressure on building this site and thus decided to try to get react with eleventy to work.

And long story short, it worked.

First, I switched the templating language in eleventy from Nunjucks to React with Typescript, which worked very well out of the box. [The docs are also quite helpful here](https://www.11ty.dev/docs/languages/jsx/).

Next, I tried to make the client side work. After some tinkering with the eleventy docs and youtube videos, I found that the [Vite Plugin for Eleventy](https://www.11ty.dev/docs/server-vite/) was everything I need. As far as I am understanding it right now, it post processes the content that elevnety built and transforms various file formats to their browser readable counterparts.
React files that live on the client just need to be passed through to the build folder, and the vite plugin will transform them to plain JavaScript and even create bundles that are linked on the corresponding pages.

Afterwards, I quickly noticed some benefits in comparison to webcomponents:
With React

- I can quickly extract components, which makes refactoring easy
- I have the familiar IDE support that I am used to as a software developer
- I can write less code, as JSX is really compact
- I can use the same components for server and client side rendering
- I benefit from the extensive ecosystem of plugins

So, in conclusion, I am really happy trying this out and I also got to know the built system of eleventy a lot better.
If you are reading this and also want to implement react support within eleventy, I recommend you to have a look at the eleventy.config file as well as the build scripts inside the package.json file.
