import { e as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_llN6k2-d.mjs';
import 'kleur/colors';
import 'clsx';

const html = "";

				const frontmatter = {"name":"COSAG","href":"http://localhost:4321/","logo":"src/assets/cosag.png"};
				const file = "D:/SoyHenry/pf Litro/litro-ong/front/src/content/sponsors/cosag.md";
				const url = undefined;
				function rawContent() {
					return "";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
