import { e as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_llN6k2-d.mjs';
import 'kleur/colors';
import 'clsx';

const html = "";

				const frontmatter = {"question":"¿QUIERES AYUDAR CON PROYECTOS?","title":"Quiero ser Voluntario/a","description":"Llevarás esperanza y apoyo a comunidades necesitadas. Con tu tiempo y esfuerzo, podemos mejorar vidas y generar un impacto positivo. Además, conocerás a un grupo de personas llenas de energía y compromiso. Organizaremos actividades y eventos para fortalecer nuestros lazos y crear un ambiente amigable y solidario.","image":"src/assets/voluntario.jpg"};
				const file = "D:/SoyHenry/pf Litro/litro-ong/front/src/content/tips/segundoPost.md";
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
