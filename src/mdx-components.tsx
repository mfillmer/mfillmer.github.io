import { useMDXComponents as _useMDXComponents } from "nextra-theme-blog";

const themeComponents = _useMDXComponents();

export function useMDXComponents(
  components?: Parameters<typeof _useMDXComponents>
) {
  return {
    ...themeComponents,
    ...components,
  };
}
