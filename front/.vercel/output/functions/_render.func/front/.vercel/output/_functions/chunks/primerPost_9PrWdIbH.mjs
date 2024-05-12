import { e as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_DmDerhnR.mjs';
import 'kleur/colors';
import 'clsx';

const html = "";

				const frontmatter = {"question":"¿QUIERES AYUDAR MENSUALMENTE?","title":"Quiero ser Socio/a","description":"Gracias a su donación mensual, podemos continuar nuestra labor para ayudar a las comunidades más vulnerables. Su apoyo nos permite llevar recursos esenciales y crear oportunidades para quienes más lo necesitan. ¡Juntos, estamos construyendo un camino hacia un futuro más equitativo!","image":"src/assets/pibePortada.jpg"};
				const file = "D:/SoyHenry/pf Litro/litro-ong/front/src/content/tips/primerPost.md";
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
