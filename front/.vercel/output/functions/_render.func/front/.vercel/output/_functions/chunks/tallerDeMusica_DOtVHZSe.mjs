import { e as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_DmDerhnR.mjs';
import 'kleur/colors';
import 'clsx';

const html = "";

				const frontmatter = {"title":"NUEVO TALLER","subtitle":"Taller de Música","href":"http://localhost:4321/","imagen":"src/assets/MUSICA.webp","calendar":"Mayo 12, 2024, Domingo","location":"Alta Gracia, Córdoba","Subtítulo":"Taller de Música","Fecha":"Mayo 12, 2024, Domingo","Ubicación":"Alta Gracia, Córdoba","description":"¡La melodía de la oportunidad suena una vez más en Alta Gracia, Córdoba! La ONG se complace en anunciar el lanzamiento de su tan esperado taller de música, una iniciativa que busca armonizar las vidas de los jóvenes a través del poder transformador de la música.\nCon una sinfonía de instrumentos y un coro de voces entusiastas, este taller ofrece a los niños la oportunidad de explorar y cultivar su amor por la música. Desde la percusión hasta las cuerdas, desde la teoría musical hasta la improvisación, cada nota tocada es una expresión de creatividad y pasión.\nBajo la dirección de talentosos músicos locales y el apoyo de dedicados voluntarios, este taller no solo busca desarrollar habilidades musicales, sino también fomentar la confianza, la disciplina y el trabajo en equipo entre los participantes.\nÚnete a nosotros en esta emocionante sinfonía de posibilidades mientras celebramos el poder universal de la música para inspirar, sanar y unir corazones."};
				const file = "D:/SoyHenry/pf Litro/litro-ong/front/src/content/notices/tallerDeMusica.md";
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
