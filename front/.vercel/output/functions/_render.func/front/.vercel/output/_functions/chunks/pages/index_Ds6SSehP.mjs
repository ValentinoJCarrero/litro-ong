/* empty css                          */
import { e as createComponent, r as renderTemplate, m as maybeRenderHead, i as renderComponent, h as createAstro, g as addAttribute, j as Fragment, k as renderHead, l as renderSlot, A as AstroError, n as UnknownContentCollectionError, o as renderUniqueStylesheet, p as renderScriptElement, q as createHeadAndContent, u as unescapeHTML } from '../astro_DmDerhnR.mjs';
import 'kleur/colors';
import { jsxs, jsx } from 'react/jsx-runtime';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { prependForwardSlash } from '@astrojs/internal-helpers/path';
import { $ as $$Image } from './generic_C4tyC8DR.mjs';
import 'clsx';
/* empty css                          */
/* empty css                          */
/* empty css                          */
/* empty css                          */
/* empty css                          */
import pLimit from 'p-limit';

const logoIcon = new Proxy({"src":"/_astro/Logo.DETFKczI.svg","width":187,"height":78,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/SoyHenry/pf Litro/litro-ong/front/src/assets/Logo.svg";
							}
							
							return target[name];
						}
					});

const $$Astro$c = createAstro();
const $$SearchPages = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$SearchPages;
  const { pathname } = Astro2.url;
  console.log(pathname);
  const normalizedPathName = pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  const pages = [
    { name: "QUIENES SOMOS", href: "/aboutMe" },
    { name: "TALLERES", href: "/workshops" },
    { name: "DONDE AYUDAMOS", href: "/communityKitchens", active: normalizedPathName.startsWith("/communityKitchens") },
    { name: "EVENTOS", href: "/events" },
    { name: "NOTICIAS", href: "/news" }
  ].map((page) => ({
    ...page,
    active: page.active ?? normalizedPathName === page.href
  }));
  return renderTemplate`${maybeRenderHead()}<div class="h-full"> <div class="flex h-full w-full items-center justify-between "> ${pages.map(({ name, href, active }, key) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` <a${addAttribute(href, "href")}${addAttribute([
    "text-lg px-3 font-medium text-textPrimary hover:scale-105",
    { " bg-nalLink h-full border-t-8 border-textPrimary flex items-center": active },
    { "text-textPrimary": !active }
  ], "class:list")}${addAttribute(`nav-link-${key}`, "id")}> <span class="z-10">${name}</span> </a> ` })}`)} </div></div>`;
}, "D:/SoyHenry/pf Litro/litro-ong/front/src/components/Navbar/SearchPages/SearchPages.astro", void 0);

const $$Astro$b = createAstro();
const $$ButtonSecondary = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$ButtonSecondary;
  const { title, idEvent } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<button class=" bg-secondary text-textSecondary px-10 py-2 rounded-full text-lg shadow-3xl hover:scale-105 focus:shadow-none font-medium h-min w-min whitespace-nowrap"${addAttribute(idEvent, "id")} data-astro-cid-xk2m32tq>${title}</button> `;
}, "D:/SoyHenry/pf Litro/litro-ong/front/src/components/Buttons/ButtonSecondary.astro", void 0);

const $$Astro$a = createAstro();
const $$ButtonTextPrimary = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$ButtonTextPrimary;
  const { title, idEvent } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<button class=" text-textPrimary px-10 py-2 text-lg hover:scale-105 font-medium h-min w-min whitespace-nowrap"${addAttribute(idEvent, "id")}>${title}</button>`;
}, "D:/SoyHenry/pf Litro/litro-ong/front/src/components/Buttons/ButtonTextPrimary.astro", void 0);

const $$NavbarContainer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="bg-primary w-full h-28 flex flex-row items-center px-10 justify-between shadow-3xl"> <a href="/">${renderComponent($$result, "Image", $$Image, { "src": logoIcon, "alt": "Logo de Un Litro de Leche Alta Gracia" })}</a> ${renderComponent($$result, "SearchPages", $$SearchPages, {})} <div> ${renderComponent($$result, "ButtonSecondary", $$ButtonSecondary, { "title": "Dona" })} ${renderComponent($$result, "ButtonTextPrimary", $$ButtonTextPrimary, { "title": "INGRESAR", "idEvent": "buttonLogin" })}  </div> </div>`;
}, "D:/SoyHenry/pf Litro/litro-ong/front/src/components/Navbar/NavbarContainer.astro", void 0);

const wtpIcon = new Proxy({"src":"/_astro/wtpIconSecondary.B2E8H0Un.svg","width":32,"height":32,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/SoyHenry/pf Litro/litro-ong/front/src/assets/wtpIconSecondary.svg";
							}
							
							return target[name];
						}
					});

const instaIcon = new Proxy({"src":"/_astro/instaIconSecondary.DuZmuVof.svg","width":32,"height":32,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/SoyHenry/pf Litro/litro-ong/front/src/assets/instaIconSecondary.svg";
							}
							
							return target[name];
						}
					});

const faceIcon = new Proxy({"src":"/_astro/faceIconSecondary.fQ36uYLM.svg","width":32,"height":32,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/SoyHenry/pf Litro/litro-ong/front/src/assets/faceIconSecondary.svg";
							}
							
							return target[name];
						}
					});

const $$Rrss = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="flex"> <a href="https://api.whatsapp.com/send/?phone=543547563484&text&type=phone_number&app_absent=0">${renderComponent($$result, "Image", $$Image, { "src": wtpIcon, "alt": "icono Rrss Whatsapp", "class": "mr-3" })}</a> <a href="https://www.instagram.com/ellitroag/">${renderComponent($$result, "Image", $$Image, { "src": instaIcon, "alt": "icono Rrss Instagram", "class": "mx-3" })}</a> <a href="https://www.facebook.com/UnLitroDeLecheXMesXAltaGracia?locale=es_LA">${renderComponent($$result, "Image", $$Image, { "src": faceIcon, "alt": "icono Rrss Facebook", "class": "ml-3" })}</a> </div>`;
}, "D:/SoyHenry/pf Litro/litro-ong/front/src/components/Rrss/Rrss.astro", void 0);

const InputNewslatter = () => {
  return /* @__PURE__ */ jsxs("div", { className: "h-16 w-[30rem] text-lg", children: [
    /* @__PURE__ */ jsx("input", { type: "text", className: "h-full w-2/3 rounded-l-3xl border border-textTertiary text-textTertiary font-medium placeholder:font-light placeholder:text-textParagraph p-5 focus-visible:outline ", placeholder: "Escribe tu mail" }),
    /* @__PURE__ */ jsx("button", { className: "bg-textTertiary text-textPrimary h-full w-1/3 rounded-r-3xl hover:text-xl", children: "Subscribir" })
  ] });
};

const $$FooterContainer = createComponent(($$result, $$props, $$slots) => {
  const pagesHomeFooter = [
    { name: "Quienes Somos", href: "/aboutMe" },
    { name: "Talleres", href: "/workshops" },
    { name: "Donde Ayudamos", href: "/communityKitchens" },
    { name: "Eventos", href: "/events" },
    { name: "Noticias", href: "/news" }
  ];
  const pagesLinksFooter = [
    { name: "Quiero ser Socio", href: "/" },
    { name: "Quiero ser Voluntario", href: "/" },
    { name: "Quiero ser Sponsor", href: "/" }
  ];
  const pagesLoginFooter = [
    { name: "Ingresar", href: "/" },
    { name: "Registrarse", href: "/" }
  ];
  return renderTemplate`${maybeRenderHead()}<div class="h-[30rem] bg-backgroundGrey w-full relative bottom-0 text-textTertiary"> <div class="flex flex-row w-full h-full p-10"> <div class="w-1/2 flex flex-col p-10"> <div class="h-4/5 flex flex-row"> <div class="w-1/3 h-full"> <h5 class="text-xl font-semibold">Inicio</h5> <ul class="flex flex-col justify-between"> ${pagesHomeFooter.map(({ name, href }, key) => renderTemplate`<li class="my-3"> <a${addAttribute(href, "href")}${addAttribute(`footer-link-${key}`, "id")}>${name}</a> </li>`)} </ul> </div> <div class="w-1/3 h-full"> <h5 class="text-xl font-semibold">Links</h5> <ul class="flex flex-col justify-between"> ${pagesLinksFooter.map(({ name, href }, key) => renderTemplate`<li class="my-3"> <a${addAttribute(href, "href")}${addAttribute(`footer-link-${key}`, "id")}>${name}</a> </li>`)} </ul> </div> <div class="w-1/3 h-full"> <h5 class="text-xl font-semibold">¿No Ingresaste?</h5> <ul class="flex flex-col justify-between"> ${pagesLoginFooter.map(({ name, href }, key) => renderTemplate`<li class="my-3"> <a${addAttribute(href, "href")}${addAttribute(`footer-link-${key}`, "id")}>${name}</a> </li>`)} </ul> </div> </div> <div class="h-1/5 flex  items-end"> ${renderComponent($$result, "Rrss", $$Rrss, {})} </div> </div> <div class="p-10 flex flex-col justify-between"> <div class="w-1/2"> <h4 class="text-2xl font-semibold mb-10">Subscribite al Newslatter</h4> ${renderComponent($$result, "InputNewslatter", InputNewslatter, {})} </div> <div> <h5 class="text-xl font-semibold">Realizado en Soy Henry</h5> <p>Esta Pagina esta Realizado por Simon G. Flores - Miguel Tapia - Lucas Di Fulvio - 
                Valentino Joel Carrero - Nicolas Addamo - Julian Magallanes
<br>Version N° 1.01.01
</p> </div> </div> </div> </div>`;
}, "D:/SoyHenry/pf Litro/litro-ong/front/src/components/Footer/FooterContainer.astro", void 0);

const $$Astro$9 = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body> ${renderComponent($$result, "NavbarContainer", $$NavbarContainer, {})} ${renderSlot($$result, $$slots["default"])} <div class="relative bottom-0"> ${renderComponent($$result, "FooterContainer", $$FooterContainer, {})} </div> </body></html>`;
}, "D:/SoyHenry/pf Litro/litro-ong/front/src/layouts/Layout.astro", void 0);

const $$Index$8 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Quienes Somos - Un Litro Alta Gracia." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> <h1>hola soy el quiene somos</h1> </main> ` })}`;
}, "D:/SoyHenry/pf Litro/litro-ong/front/src/pages/aboutMe/index.astro", void 0);

const $$file$8 = "D:/SoyHenry/pf Litro/litro-ong/front/src/pages/aboutMe/index.astro";
const $$url$8 = "/aboutMe";

const index$8 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index$8,
	file: $$file$8,
	url: $$url$8
}, Symbol.toStringTag, { value: 'Module' }));

const $$Index$7 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Donde Ayudamos - Un Litro Alta Gracia." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> <h1>hola soy el donde ayudamos</h1> </main> ` })}`;
}, "D:/SoyHenry/pf Litro/litro-ong/front/src/pages/communityKitchens/index.astro", void 0);

const $$file$7 = "D:/SoyHenry/pf Litro/litro-ong/front/src/pages/communityKitchens/index.astro";
const $$url$7 = "/communityKitchens";

const index$7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index$7,
	file: $$file$7,
	url: $$url$7
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$8 = createAstro();
const $$ButtonCTA = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$ButtonCTA;
  const { title, idEvent } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<button${addAttribute(`bg-tertiary text-textTertiary px-10 py-2 rounded-full text-lg shadow-3xl hover:scale-105 focus:shadow-none font-medium h-min w-min whitespace-nowrap`, "class")}${addAttribute(idEvent, "id")} data-astro-cid-jeofod6h>${title}</button> `;
}, "D:/SoyHenry/pf Litro/litro-ong/front/src/components/Buttons/ButtonCTA.astro", void 0);

const $$Astro$7 = createAstro();
const $$AsideMenuDasboard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$AsideMenuDasboard;
  const { pathname } = Astro2.url;
  console.log(pathname);
  const normalizedPathName = pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  const pages = [
    { name: "NOTICIAS", href: "/dashboardAdmin", hrefActive: "/dashboardAdmin/newsCreate", active: false },
    { name: "SECCION VOLUNTARIOS", href: "/dashboardAdmin/volunteers" },
    { name: "SECCION SPONSOR", href: "/dashboardAdmin/sponsor", active: normalizedPathName.startsWith("/dashboardAdmin/sponsor") },
    { name: "SECCION MERENDEROS", href: "/" },
    { name: "SECCION TALLERES DE OFICIO", href: "/dashboardAdmin/workshops" },
    { name: "SECCION EVENTOS", href: "/dashboardAdmin/events" },
    { name: "PROPUESTAS RECIBIDAS", href: "/dashboardAdmin/proposals" }
  ].map((page) => ({
    ...page,
    active: normalizedPathName === page.href || normalizedPathName === page.hrefActive
  }));
  return renderTemplate`${maybeRenderHead()}<div class="bg-textPrimary rounded-2xl shadow-3xl h-full flex justify-between flex-col"> <div> <div class=" bg-tertiary py-5 px-10 rounded-t-2xl"> <a href="/">${renderComponent($$result, "Image", $$Image, { "src": logoIcon, "alt": "Logo de Un Litro de Leche Alta Gracia" })}</a> </div> <div class="p-10 w-full text-center"> ${renderSlot($$result, $$slots["default"])} </div> <div class="flex flex-col w-full items-start justify-between p-10"> ${pages.map(({ name, href, active, hrefActive }, key) => (
    // pages.map(({ name, href, active}, key) => (
    renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` <a${addAttribute(href, "href")}${addAttribute([
      "text-sm my-3 font-normal   hover:scale-105 my-4",
      { "h-full text-tertiary flex items-center font-semibold ": active },
      { "text-textTertiary ": !active }
    ], "class:list")}${addAttribute(`nav-link-${key}`, "id")}> <span class="z-10">${name}</span> </a> ` })}`
  ))} </div> </div> <div class="p-10 flex justify-center"> ${renderComponent($$result, "ButtonCTA", $$ButtonCTA, { "title": "Cerrar Sesion", "idEvent": "Logout" })} </div> </div> `;
}, "D:/SoyHenry/pf Litro/litro-ong/front/src/components/AsideMenuDasboard/AsideMenuDasboard.astro", void 0);

const $$Astro$6 = createAstro();
const $$DasboardLayouts = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$DasboardLayouts;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "D:/SoyHenry/pf Litro/litro-ong/front/src/layouts/DasboardLayouts.astro", void 0);

const initialValues = {
  title: "",
  subtitle: "",
  primaryImage: null,
  secundaryImage: null,
  tertiaryImage: null,
  description: ""
};
const validate = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = "El Titulo es requerido";
  } else if (values.title.length < 10) {
    errors.title = "El titulo debe tener minimo 10 caracteres";
  } else if (values.title.length > 40) {
    errors.title = "El titulo debe tener maximo 40 caracteres";
  }
  if (!values.subtitle) {
    errors.subtitle = "El subtitulo es requerido";
  } else if (values.subtitle.length < 10) {
    errors.subtitle = "El subtitulo debe tener minimo 10 caracteres";
  } else if (values.subtitle.length > 40) {
    errors.subtitle = "El subtitulo debe tener maximo 30 caracteres";
  }
  if (!values.description) {
    errors.description = "La descripcion es requerida";
  } else if (values.description.length < 100) {
    errors.description = "La descripcion  debe tener minimo 100 caracteres";
  } else if (values.description.length > 800) {
    errors.description = "La descripcion  debe tener maximo 800 caracteres";
  }
  return errors;
};
const FormNewsFormik = () => /* @__PURE__ */ jsx(
  Formik,
  {
    initialValues,
    validate,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
    },
    children: /* @__PURE__ */ jsxs(Form, { className: "text-sm text-textParagraph h-full", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "title", className: "font-medium my-2 ", children: "Titulo" }),
        /* @__PURE__ */ jsx(Field, { type: "text", name: "title", placeholder: "Titulo de la noticia", className: "rounded-md boder-backgroundGrey border placeholder:text-textParagraph px-3 py-2 focus-visible:outline focus-visible:text-textTertiary" }),
        /* @__PURE__ */ jsx(ErrorMessage, { name: "title", component: "p" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "title", className: "font-medium my-2 ", children: "Subtitulo" }),
        /* @__PURE__ */ jsx(Field, { type: "text", name: "subtitle", placeholder: "Subtitulo de la noticia", className: "rounded-md boder-backgroundGrey border placeholder:text-textParagraph px-3 py-2 focus-visible:outline focus-visible:text-textTertiary" }),
        /* @__PURE__ */ jsx(ErrorMessage, { name: "subtitle" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "image", className: "font-medium my-2 ", children: "Foto Principal" }),
        /* @__PURE__ */ jsx(Field, { type: "file", name: "primaryImage", className: "rounded-md boder-backgroundGrey border placeholder:text-textParagraph px-3 py-2 focus-visible:outline focus-visible:text-textTertiary" }),
        /* @__PURE__ */ jsx(ErrorMessage, { name: "primaryImage" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "image", className: "font-medium my-2 ", children: "Foto secundaria 1" }),
        /* @__PURE__ */ jsx(Field, { type: "file", name: "secondaryImage", className: "rounded-md boder-backgroundGrey border placeholder:text-textParagraph px-3 py-2 focus-visible:outline focus-visible:text-textTertiary" }),
        /* @__PURE__ */ jsx(ErrorMessage, { name: "secondaryImage" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "image", className: "font-medium my-2 ", children: "Foto secundaria 2" }),
        /* @__PURE__ */ jsx(Field, { type: "file", name: "tertiaryImage", className: "rounded-md boder-backgroundGrey border placeholder:text-textParagraph px-3 py-2 focus-visible:outline focus-visible:text-textTertiary" }),
        /* @__PURE__ */ jsx(ErrorMessage, { name: "tertiaryImage" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-1/3", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "description", className: "font-medium my-2 ", children: "Descripcion" }),
        /* @__PURE__ */ jsx(Field, { as: "textarea", name: "description", placeholder: "Describe la noticia", className: "h-full rounded-md boder-backgroundGrey border placeholder:text-textParagraph px-3 py-2 focus-visible:outline focus-visible:text-textTertiary" }),
        /* @__PURE__ */ jsx(ErrorMessage, { name: "description" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "my-3 w-full flex justify-end", children: [
        /* @__PURE__ */ jsx("a", { href: "/dashboardAdmin", className: "bg-secondary text-textSecondary px-10 py-1 rounded-full text-lg shadow-3xl hover:scale-105 focus:shadow-none font-medium h-min w-min whitespace-nowrap mx-6", children: "Anterior" }),
        /* @__PURE__ */ jsx("button", { type: "submit", className: "bg-primary text-textPrimary px-10 py-1 rounded-full text-lg shadow-3xl hover:scale-105 focus:shadow-none font-medium h-min w-min whitespace-nowrap", children: "Agregar" })
      ] })
    ] })
  }
);

const $$Index$6 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "DasboardLayouts", $$DasboardLayouts, { "title": "DashboardAdmin - Un Litro Alta Gracia." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-row h-screen bg-secondary"> <div class="w-1/3 h-full pl-14 py-10"> ${renderComponent($$result2, "AsideMenuDasboard", $$AsideMenuDasboard, {}, { "default": ($$result3) => renderTemplate`<h3 class="text-3xl font-medium text-tertiary">Menu de Control</h3>` })} </div> <div class="2-m h-full  w-full px-14 py-10 flex flex-col "> <div class="shadown-3xl rounded-xl bg-textPrimary shadow-3xl p-10 h-full"> <h4 class="text-2xl font-medium text-tertiary mb-10 w-full text-end">Noticias</h4>  ${renderComponent($$result2, "FormNewsFormik", FormNewsFormik, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/SoyHenry/pf Litro/litro-ong/front/src/components/Forms/FormNewsFormik", "client:component-export": "default" })} </div> </div> </div> ` })}`;
}, "D:/SoyHenry/pf Litro/litro-ong/front/src/pages/dashboardAdmin/newsCreate/index.astro", void 0);

const $$file$6 = "D:/SoyHenry/pf Litro/litro-ong/front/src/pages/dashboardAdmin/newsCreate/index.astro";
const $$url$6 = "/dashboardAdmin/newsCreate";

const index$6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index$6,
	file: $$file$6,
	url: $$url$6
}, Symbol.toStringTag, { value: 'Module' }));

const $$Index$5 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "DasboardLayouts", $$DasboardLayouts, { "title": "DashboardAdmin - Un Litro Alta Gracia." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-row h-screen bg-secondary"> <div class="w-1/3 h-full pl-14 py-10"> ${renderComponent($$result2, "AsideMenuDasboard", $$AsideMenuDasboard, {}, { "default": ($$result3) => renderTemplate`<h3 class="text-3xl font-medium text-tertiary">Menu de Control</h3>` })} </div> <div> <h1>hola</h1> </div> </div> ` })}`;
}, "D:/SoyHenry/pf Litro/litro-ong/front/src/pages/dashboardAdmin/volunteers/index.astro", void 0);

const $$file$5 = "D:/SoyHenry/pf Litro/litro-ong/front/src/pages/dashboardAdmin/volunteers/index.astro";
const $$url$5 = "/dashboardAdmin/volunteers";

const index$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index$5,
	file: $$file$5,
	url: $$url$5
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$5 = createAstro();
const $$ButtonCTASmall = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$ButtonCTASmall;
  const { title, idEvent } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<button${addAttribute(`bg-tertiary text-textTertiary px-10 py-1 rounded-full text-lg shadow-3xl hover:scale-105 focus:shadow-none font-medium h-min w-min whitespace-nowrap`, "class")}${addAttribute(idEvent, "id")} data-astro-cid-ms5cq5xw>${title}</button> `;
}, "D:/SoyHenry/pf Litro/litro-ong/front/src/components/Buttons/ButtonCTASmall.astro", void 0);

const $$Astro$4 = createAstro();
const $$ButtonPrimarySmall = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$ButtonPrimarySmall;
  const { title, idEvent } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<button class="bg-primary text-textPrimary px-10 py-1 rounded-full text-lg shadow-3xl hover:scale-105 focus:shadow-none font-medium h-min w-min whitespace-nowrap"${addAttribute(idEvent, "id")} data-astro-cid-3mnhuwuq>${title}</button> `;
}, "D:/SoyHenry/pf Litro/litro-ong/front/src/components/Buttons/ButtonPrimarySmall.astro", void 0);

const $$Index$4 = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "DasboardLayouts", $$DasboardLayouts, { "title": "DashboardAdmin - Un Litro Alta Gracia." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-row h-screen bg-secondary"> <div class="w-1/3 h-full pl-14 py-10"> ${renderComponent($$result2, "AsideMenuDasboard", $$AsideMenuDasboard, {}, { "default": ($$result3) => renderTemplate`<h3 class="text-3xl font-medium text-tertiary">Menu de Control</h3>` })} </div> <div class="2-m h-full  w-full px-14 py-10 flex flex-col "> <div class="shadown-3xl rounded-xl bg-textPrimary shadow-3xl p-10 h-full flex flex-col justify-between"> <h4 class="text-2xl font-medium text-tertiary mb-10 w-full text-end">Seccion Noticias</h4> <ul>  </ul> <div class="w-full flex justify-center"> <a href="/dashboardAdmin/newsCreate">${renderComponent($$result2, "ButtonCTASmall", $$ButtonCTASmall, { "title": "Agregar Noticia" })}</a> </div> </div> <div class="w-full flex justify-center mt-6"> <a href="/dashboardAdmin/volunteers">${renderComponent($$result2, "ButtonPrimarySmall", $$ButtonPrimarySmall, { "title": "Siguiente" })}</a> </div> </div> </div> ` })}`;
}, "D:/SoyHenry/pf Litro/litro-ong/front/src/pages/dashboardAdmin/index.astro", void 0);

const $$file$4 = "D:/SoyHenry/pf Litro/litro-ong/front/src/pages/dashboardAdmin/index.astro";
const $$url$4 = "/dashboardAdmin";

const index$4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index$4,
	file: $$file$4,
	url: $$url$4
}, Symbol.toStringTag, { value: 'Module' }));

const $$Index$3 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Eventos - Un Litro Alta Gracia." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> <h1>hola soy el eventos</h1> </main> ` })}`;
}, "D:/SoyHenry/pf Litro/litro-ong/front/src/pages/events/index.astro", void 0);

const $$file$3 = "D:/SoyHenry/pf Litro/litro-ong/front/src/pages/events/index.astro";
const $$url$3 = "/events";

const index$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index$3,
	file: $$file$3,
	url: $$url$3
}, Symbol.toStringTag, { value: 'Module' }));

const $$Index$2 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Noticias - Un Litro Alta Gracia." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> <h1>hola soy el noticias</h1> </main> ` })}`;
}, "D:/SoyHenry/pf Litro/litro-ong/front/src/pages/news/index.astro", void 0);

const $$file$2 = "D:/SoyHenry/pf Litro/litro-ong/front/src/pages/news/index.astro";
const $$url$2 = "/news";

const index$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index$2,
	file: $$file$2,
	url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const $$Index$1 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Talleres - Un Litro Alta Gracia." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> <h1>hola soy el talleres</h1> </main> ` })}`;
}, "D:/SoyHenry/pf Litro/litro-ong/front/src/pages/workshops/index.astro", void 0);

const $$file$1 = "D:/SoyHenry/pf Litro/litro-ong/front/src/pages/workshops/index.astro";
const $$url$1 = "/workshops";

const index$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index$1,
	file: $$file$1,
	url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const COPIAimgPortada = new Proxy({"src":"/_astro/COPIAimgPortada.DZIs7x1G.jpg","width":1280,"height":557,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/SoyHenry/pf Litro/litro-ong/front/src/assets/COPIAimgPortada.jpg";
							}
							
							return target[name];
						}
					});

const $$CarruselFromHome = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="relative my-3"> <div class="absolute inset-0"${addAttribute({
    backgroundImage: `linear-gradient(to right, rgba(255, 255, 255,0.99) 35%, transparent 100%)`
  }, "style")}></div> <img${addAttribute(COPIAimgPortada.src, "src")} alt="laimagen" class="w-full object-cover bg-cover bg-center h-full"${addAttribute({ backgroundImage: `url(${COPIAimgPortada.src})` }, "style")}> <div class="absolute inset-0 top-24 left-44 flex flex-col gap-16"> <div> <h1 class="text-6xl font-bold mb-3">Nuestra Misión</h1> <h2 class="text-2xl w-3/5 font-medium">Estamos permanentemente activos para reducir las desigualdades socioeconómicas existentes en la sociedad.</h2> </div> <div> ${renderComponent($$result, "ButtonCTA", $$ButtonCTA, { "title": "M\xE1s sobre Nosotros" })} </div> </div> </div>`;
}, "D:/SoyHenry/pf Litro/litro-ong/front/src/components/fromHome/CarruselFromHome/CarruselFromHome.astro", void 0);

const $$Astro$3 = createAstro();
const $$ButtonCTAMedium = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$ButtonCTAMedium;
  const { title, idEvent } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<button${addAttribute(`bg-tertiary flex flex-row items-center text-textTertiary pl-8 pr-14 py-2 rounded-full text-lg shadow-3xl hover:scale-105 focus:shadow-none font-medium h-min w-min whitespace-nowrap gap-4`, "class")}${addAttribute(idEvent, "id")} data-astro-cid-6gzcwyet> ${title} ${renderSlot($$result, $$slots["default"])} </button> `;
}, "D:/SoyHenry/pf Litro/litro-ong/front/src/components/Buttons/ButtonCTAMedium.astro", void 0);

const click = new Proxy({"src":"/_astro/click.cC7qlsXy.svg","width":24,"height":25,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/SoyHenry/pf Litro/litro-ong/front/src/assets/click.svg";
							}
							
							return target[name];
						}
					});

const $$Astro$2 = createAstro();
const $$CartitaPrueba = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$CartitaPrueba;
  const { title, description, question, image } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<article class=" mb-2"> <div class="bg-secondary p-6 flex flex-row items-center justify-around"> <div class="w-1/2 m-2 flex flex-col gap-5"> <h3 class="  text-textTertiary text-2xl font-semibold tracking-widest">${question}</h3> <h3 class="text-4xl font-bold  text-textTertiary"> ${title} </h3> <p class=" text-base font-normal text-textParagraph"> ${description} </p> ${renderComponent($$result, "ButtonCTAMedium", $$ButtonCTAMedium, { "title": `Conocer m\xE1s` }, { "default": ($$result2) => renderTemplate` <img${addAttribute(click.src, "src")} alt="click" class=" "> ` })} </div> <div> <img${addAttribute(image, "src")}${addAttribute(title, "alt")} class="h-96 rounded-2xl"> </div> </div> </article>`;
}, "D:/SoyHenry/pf Litro/litro-ong/front/src/components/CartitaPrueba.astro", void 0);

function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1)
      continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
const cacheEntriesByCollection = /* @__PURE__ */ new Map();
function createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport
}) {
  return async function getCollection(collection, filter) {
    let type;
    if (collection in contentCollectionToEntryMap) {
      type = "content";
    } else if (collection in dataCollectionToEntryMap) {
      type = "data";
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Ensure a collection directory with this name exists.`
      );
      return [];
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap[collection] : dataCollectionToEntryMap[collection]
    );
    let entries = [];
    if (!Object.assign({"BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": undefined, "ASSETS_PREFIX": undefined}, { _: process.env._ })?.DEV && cacheEntriesByCollection.has(collection)) {
      entries = [...cacheEntriesByCollection.get(collection)];
    } else {
      const limit = pLimit(10);
      entries = await Promise.all(
        lazyImports.map(
          (lazyImport) => limit(async () => {
            const entry = await lazyImport();
            return type === "content" ? {
              id: entry.id,
              slug: entry.slug,
              body: entry.body,
              collection: entry.collection,
              data: entry.data,
              async render() {
                return render({
                  collection: entry.collection,
                  id: entry.id,
                  renderEntryImport: await getRenderEntryImport(collection, entry.slug)
                });
              }
            } : {
              id: entry.id,
              collection: entry.collection,
              data: entry.data
            };
          })
        )
      );
      cacheEntriesByCollection.set(collection, entries);
    }
    if (typeof filter === "function") {
      return entries.filter(filter);
    } else {
      return entries;
    }
  };
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function")
    throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object")
    throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function")
      throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object")
      throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const contentDir = '/src/content/';

const contentEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/notices/campañaSolidaria.md": () => import('../campañaSolidaria_rG457WzD.mjs'),"/src/content/notices/nuevoTaller.md": () => import('../nuevoTaller_Cu84dK4l.mjs'),"/src/content/notices/tallerDeMusica.md": () => import('../tallerDeMusica_D0h2LiWI.mjs'),"/src/content/sponsors/becerra.md": () => import('../becerra_DwvryOf2.mjs'),"/src/content/sponsors/cosag.md": () => import('../cosag_DHEvgY5z.mjs'),"/src/content/sponsors/evi.md": () => import('../evi_rVpYStcU.mjs'),"/src/content/sponsors/farmacia.md": () => import('../farmacia_DLgOs9jV.mjs'),"/src/content/sponsors/jalisco.md": () => import('../jalisco_CP4PeSnp.mjs'),"/src/content/tips/primerPost.md": () => import('../primerPost_B4dtFbzU.mjs'),"/src/content/tips/segundoPost.md": () => import('../segundoPost_DBdkv0Tk.mjs'),"/src/content/tips/sponsorPost.md": () => import('../sponsorPost_cumcsZ-E.mjs')});
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = /* #__PURE__ */ Object.assign({});
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {"sponsors":{"type":"content","entries":{"becerra":"/src/content/sponsors/becerra.md","farmacia":"/src/content/sponsors/farmacia.md","cosag":"/src/content/sponsors/cosag.md","evi":"/src/content/sponsors/evi.md","jalisco":"/src/content/sponsors/jalisco.md"}},"notices":{"type":"content","entries":{"nuevotaller":"/src/content/notices/nuevoTaller.md","tallerdemusica":"/src/content/notices/tallerDeMusica.md","campañasolidaria":"/src/content/notices/campañaSolidaria.md"}},"tips":{"type":"content","entries":{"primerpost":"/src/content/tips/primerPost.md","segundopost":"/src/content/tips/segundoPost.md","sponsorpost":"/src/content/tips/sponsorPost.md"}}};

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/notices/campañaSolidaria.md": () => import('../campañaSolidaria_CBjdKA7m.mjs'),"/src/content/notices/nuevoTaller.md": () => import('../nuevoTaller_C_4hY1p-.mjs'),"/src/content/notices/tallerDeMusica.md": () => import('../tallerDeMusica_mm2Y87aE.mjs'),"/src/content/sponsors/becerra.md": () => import('../becerra_CfuUevqg.mjs'),"/src/content/sponsors/cosag.md": () => import('../cosag_DE6nHGhP.mjs'),"/src/content/sponsors/evi.md": () => import('../evi_CGF6MFuK.mjs'),"/src/content/sponsors/farmacia.md": () => import('../farmacia_LcHIkjFH.mjs'),"/src/content/sponsors/jalisco.md": () => import('../jalisco_C36QSEJ4.mjs'),"/src/content/tips/primerPost.md": () => import('../primerPost_DcAfbcTH.mjs'),"/src/content/tips/segundoPost.md": () => import('../segundoPost_DdvkWbKo.mjs'),"/src/content/tips/sponsorPost.md": () => import('../sponsorPost_CG_NF6UJ.mjs')});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
});

const $$SectionInformation = createComponent(async ($$result, $$props, $$slots) => {
  const posts = await getCollection("tips");
  return renderTemplate`${maybeRenderHead()}<section> ${posts.map((post) => renderTemplate`${renderComponent($$result, "CartitaPrueba", $$CartitaPrueba, { "image": post.data.image, "title": post.data.title, "question": post.data.question, "description": post.data.description })}`)} </section>`;
}, "D:/SoyHenry/pf Litro/litro-ong/front/src/components/fromHome/SectionInformation/SectionInformation.astro", void 0);

const $$SectionTalleresDisponibles = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="my-8"> <div class=" flex items-center justify-around m-1"> <div class=" w-2/5 m-2 flex flex-col justify-center gap-5"> <h3 class="  text-textTertiary text-2xl font-semibold tracking-widest">TALLERES DISPONIBLES</h3> <h3 class="text-4xl font-bold  text-textTertiary">En esta sección podrás ver que cosas puedes aprender en El Litro y Online</h3> </div> ${renderComponent($$result, "ButtonCTAMedium", $$ButtonCTAMedium, { "title": `Conocer m\xE1s` }, { "default": ($$result2) => renderTemplate` <img${addAttribute(click.src, "src")} alt="click"> ` })} </div> </section>`;
}, "D:/SoyHenry/pf Litro/litro-ong/front/src/components/fromHome/SectionTalleresDisponibles/SectionTalleresDisponibles.astro", void 0);

const calendarIcon = new Proxy({"src":"/_astro/calendarIcon.DJr8Nwhb.svg","width":24,"height":24,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/SoyHenry/pf Litro/litro-ong/front/src/assets/calendarIcon.svg";
							}
							
							return target[name];
						}
					});

const locationIcon = new Proxy({"src":"/_astro/locationIcon.BlRN_PCn.svg","width":24,"height":24,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/SoyHenry/pf Litro/litro-ong/front/src/assets/locationIcon.svg";
							}
							
							return target[name];
						}
					});

const cursorIcon = new Proxy({"src":"/_astro/cursorIcon.M8-9hAAP.svg","width":21,"height":21,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/SoyHenry/pf Litro/litro-ong/front/src/assets/cursorIcon.svg";
							}
							
							return target[name];
						}
					});

const rectangle = new Proxy({"src":"/_astro/rectangleCard.dFn9G49O.svg","width":409,"height":433,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/SoyHenry/pf Litro/litro-ong/front/src/assets/rectangleCard.svg";
							}
							
							return target[name];
						}
					});

const $$Astro$1 = createAstro();
const $$CardMedium = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$CardMedium;
  const { href, title, subtitle, calendar, location } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="h-[30rem] w-[25rem] list-none rounded-3xl  shadow-3xl hover:shadow-4xl"> <!-- <div class="h-96 w-80 rounded-3xl shadow-3xl hover:shadow-4xl"> --> <!-- <a href={href}> --> ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Image", $$Image, { "src": rectangle, "alt": "fondo card", "class": "relative bottom-80 z-0" })} <div class=" relative bottom-[32rem] z-20 "> <div class="m-9 "> <h6 class="font-semibold"> ${title} </h6> <p class="mb-3"> ${subtitle} </p> <div class="flex"> ${renderComponent($$result, "Image", $$Image, { "src": calendarIcon, "alt": "icono calendario" })} <p class="font-semibold m-1">${calendar}</p> </div> <div class="flex"> ${renderComponent($$result, "Image", $$Image, { "src": locationIcon, "alt": "icono ubicacion" })} <p class="font-semibold m-1">${location}</p> </div> </div> <div class="flex justify-end relative bottom-8  m-4 "> ${renderComponent($$result, "Image", $$Image, { "src": cursorIcon, "alt": "icono cursor" })} <h6 class="font-semibold m-4">Clickea para ver mas</h6> </div> </div> <!-- </a> --> </div>`;
}, "D:/SoyHenry/pf Litro/litro-ong/front/src/components/Cards/CardMedium.astro", void 0);

const $$Astro = createAstro();
const $$ButtonCTAPlus = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ButtonCTAPlus;
  const { title, idEvent } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<button${addAttribute(`bg-tertiary text-3xl text-textTertiary p-8 m-0 rounded-full shadow-fulls hover:scale-105 focus:shadow-none`, "class")}${addAttribute(idEvent, "id")} data-astro-cid-z5jcuhcx> ${title} ${renderSlot($$result, $$slots["default"])} </button> `;
}, "D:/SoyHenry/pf Litro/litro-ong/front/src/components/Buttons/ButtonCTAPlus.astro", void 0);

const more = new Proxy({"src":"/_astro/more.C9sSVEmS.svg","width":24,"height":24,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/SoyHenry/pf Litro/litro-ong/front/src/assets/more.svg";
							}
							
							return target[name];
						}
					});

const $$SectionUltimasNoticias = createComponent(async ($$result, $$props, $$slots) => {
  const noticias = await getCollection("notices");
  return renderTemplate`${maybeRenderHead()}<section class="my-20"> <h3 class=" m-10  text-textTertiary text-2xl font-semibold tracking-widest">ULTIMAS NOTICIAS</h3> <div class=" flex flex-col gap-12 items-center justify-center"> <div class=" flex flex-row gap-10 items-center justify-center m-2"> ${noticias.map((noticia) => renderTemplate`${renderComponent($$result, "CardMedium", $$CardMedium, { "title": noticia.data.title, "subtitle": noticia.data.subtitle, "href": noticia.data.href, "calendar": noticia.data.calendar, "location": noticia.data.location }, { "default": ($$result2) => renderTemplate` <img${addAttribute(noticia.data.imagen, "src")} alt="image" class=" h-80 w-full object-cover rounded-3xl"> ` })}`)} </div> ${renderComponent($$result, "ButtonCTAPlus", $$ButtonCTAPlus, {}, { "default": ($$result2) => renderTemplate` <img${addAttribute(more.src, "src")} alt="click"> ` })} </div> </section>`;
}, "D:/SoyHenry/pf Litro/litro-ong/front/src/components/fromHome/SectionUltimasNoticias/SectionUltimasNoticias.astro", void 0);

const $$CardSponsor = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="h-48 p-2 w-48 shadow-3xl hover:shadow-4xl rounded-3xl items-center justify-center content-center"> ${renderSlot($$result, $$slots["default"])} </div>`;
}, "D:/SoyHenry/pf Litro/litro-ong/front/src/components/Cards/CardSponsor.astro", void 0);

const $$SectionSponsors = createComponent(async ($$result, $$props, $$slots) => {
  const sponsorsList = await getCollection("sponsors");
  return renderTemplate`${maybeRenderHead()}<div> <h3 class=" m-10  text-textTertiary text-2xl font-semibold tracking-widest">NUESTROS SPONSORS</h3> <div class="gap-5 h-48 flex flex-row items-center justify-center my-20"> ${sponsorsList.map((sponsorUnit) => renderTemplate`${renderComponent($$result, "CardSponsor", $$CardSponsor, {}, { "default": ($$result2) => renderTemplate` <img${addAttribute(sponsorUnit.data.logo, "src")}${addAttribute(sponsorUnit.data.name, "alt")} class="rounded-xl"> ` })}`)} </div> </div>`;
}, "D:/SoyHenry/pf Litro/litro-ong/front/src/components/fromHome/SectionSponsors/SectionSponsors.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Inicio - Un Litro Alta Gracia." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "CarruselFromHome", $$CarruselFromHome, {})} ${renderComponent($$result2, "SectionInformation", $$SectionInformation, {})} ${renderComponent($$result2, "SectionTalleresDisponibles", $$SectionTalleresDisponibles, {})} ${renderComponent($$result2, "SectionUltimasNoticias", $$SectionUltimasNoticias, {})} ${renderComponent($$result2, "SectionSponsors", $$SectionSponsors, {})} </main> ` })}`;
}, "D:/SoyHenry/pf Litro/litro-ong/front/src/pages/index.astro", void 0);

const $$file = "D:/SoyHenry/pf Litro/litro-ong/front/src/pages/index.astro";
const $$url = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { index$7 as a, index$6 as b, index$5 as c, index$4 as d, index$3 as e, index$2 as f, index$1 as g, index as h, index$8 as i };
