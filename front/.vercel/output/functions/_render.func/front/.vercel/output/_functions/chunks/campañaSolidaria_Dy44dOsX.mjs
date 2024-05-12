import { e as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_DmDerhnR.mjs';
import 'kleur/colors';
import 'clsx';

const html = "";

				const frontmatter = {"title":"CAMPAÑA SOLIDARIA","subtitle":"Colecta de Alimentos","href":"http://localhost:4321/","imagen":"src/assets/milk.webp","calendar":"Mayo 10, 2024, Viernes","location":"Alta Gracia, Córdoba","description":"¡Es hora de unirse y extender una mano amiga a aquellos que más lo necesitan! La ONG está emocionada de anunciar el lanzamiento de su última campaña solidaria: una colecta de alimentos destinada a apoyar a las familias vulnerables de Alta Gracia, Córdoba.\nCon el objetivo de brindar alivio inmediato a aquellos que enfrentan dificultades alimenticias, esta campaña busca reunir una variedad de alimentos no perecederos, desde granos básicos hasta productos enlatados y alimentos infantiles. Cada contribución, por pequeña que parezca, marca una diferencia significativa en la vida de aquellos que luchan por satisfacer sus necesidades más básicas.\nLa campaña solidaria no solo ofrece la oportunidad de proporcionar alimentos nutritivos a quienes los necesitan desesperadamente, sino que también refleja la solidaridad y el apoyo comunitario que son fundamentales para construir un mundo más justo y compasivo.\n¡Únete a nosotros en esta noble causa!"};
				const file = "D:/SoyHenry/pf Litro/litro-ong/front/src/content/notices/campañaSolidaria.md";
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
