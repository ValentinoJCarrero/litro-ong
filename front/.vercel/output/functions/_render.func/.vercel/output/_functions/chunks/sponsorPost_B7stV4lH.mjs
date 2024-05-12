import { e as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_llN6k2-d.mjs';
import 'kleur/colors';
import 'clsx';

const html = "";

				const frontmatter = {"question":"¿QUIERES AYUDAR CON TU EMPRESA?","title":"Quiero ser Sponsor","description":"Gracias a su ayuda, tendremos los recursos necesarios para continuar nuestra misión y brindar asistencia a quienes más la necesiten. Su apoyo nos permitirá impulsar proyectos que transformarán vidas y brindará nuevas oportunidades a quienes más las precisarán. ¡Juntos, estaremos construyendo un futuro con más esperanza y posibilidades para todos!","image":"src/assets/firma.jpg"};
				const file = "D:/SoyHenry/pf Litro/litro-ong/front/src/content/tips/sponsorPost.md";
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
