import { e as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_DmDerhnR.mjs';
import 'kleur/colors';
import 'clsx';

const html = "";

				const frontmatter = {"title":"NUEVO TALLER","subtitle":"Taller de Jardinería","href":"http://localhost:4321/","imagen":"src/assets/jardineria.jpeg","calendar":"Mayo 11, 2024, Sábado","location":"Alta Gracia, Córdoba","description":"La ONG que trabaja incansablemente para empoderar y enriquecer las vidas de los niños presenta con entusiasmo su último proyecto: el lanzamiento de un emocionante taller de jardinería. Con un compromiso renovado de nutrir tanto el cuerpo como el espíritu de los jóvenes, este taller ofrece una oportunidad única para que los niños exploren el mundo natural que los rodea y desarrollen un vínculo significativo con la tierra.\nBajo la guía experta de voluntarios dedicados, los niños tienen la oportunidad de sumergirse en la maravilla de la jardinería, aprendiendo habilidades prácticas mientras cultivan plantas, flores y vegetales. Este taller no solo fomenta la conexión con la naturaleza, sino que también promueve valores de responsabilidad, paciencia y cuidado del medio ambiente.\nEl lanzamiento del taller de jardinería marca otro hito emocionante en los esfuerzos de la ONG para proporcionar experiencias educativas y enriquecedoras que ayuden a los niños a alcanzar su máximo potencial. Con el apoyo continuo de la comunidad, este taller promete sembrar semillas de crecimiento y esperanza en el corazón de cada niño participante."};
				const file = "D:/SoyHenry/pf Litro/litro-ong/front/src/content/notices/nuevoTaller.md";
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
