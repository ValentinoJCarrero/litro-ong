import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import './chunks/astro_llN6k2-d.mjs';
import 'clsx';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const path = toPath(params);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"const n=document.getElementById(\"buttonLogin\");n?.addEventListener(\"click\",()=>{window.location.href=\"https://litro-ong.onrender.com/login\"});\n"}],"styles":[{"type":"external","src":"/_astro/index.C8BXgcvi.css"},{"type":"inline","content":"@import\"https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap\";button[data-astro-cid-xk2m32tq]:focus{filter:brightness(95%)}html{box-sizing:border-box;font-family:Montserrat}*,*:before,*:after{box-sizing:inherit}body,h1,h2,h3,h4,h5,h6,p{margin:0;padding:0}ul,ol{margin:0;padding:0;list-style:none}img{max-width:100%;height:auto}a{text-decoration:none;color:inherit}button{border:0;padding:0;margin:0;outline:0;cursor:pointer}\n"}],"routeData":{"route":"/aboutme","isIndex":true,"type":"page","pattern":"^\\/aboutMe\\/?$","segments":[[{"content":"aboutMe","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/aboutMe/index.astro","pathname":"/aboutMe","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"const n=document.getElementById(\"buttonLogin\");n?.addEventListener(\"click\",()=>{window.location.href=\"https://litro-ong.onrender.com/login\"});\n"}],"styles":[{"type":"external","src":"/_astro/index.C8BXgcvi.css"},{"type":"inline","content":"@import\"https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap\";button[data-astro-cid-xk2m32tq]:focus{filter:brightness(95%)}html{box-sizing:border-box;font-family:Montserrat}*,*:before,*:after{box-sizing:inherit}body,h1,h2,h3,h4,h5,h6,p{margin:0;padding:0}ul,ol{margin:0;padding:0;list-style:none}img{max-width:100%;height:auto}a{text-decoration:none;color:inherit}button{border:0;padding:0;margin:0;outline:0;cursor:pointer}\n"}],"routeData":{"route":"/communitykitchens","isIndex":true,"type":"page","pattern":"^\\/communityKitchens\\/?$","segments":[[{"content":"communityKitchens","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/communityKitchens/index.astro","pathname":"/communityKitchens","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"function t(){return console.log(\"hola\"),Astro.redirect(\"/302\")}const e=document.getElementById(\"Logout\");e?.addEventListener(\"click\",t);\n"}],"styles":[{"type":"external","src":"/_astro/index.C8BXgcvi.css"},{"type":"inline","content":"@import\"https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap\";html{box-sizing:border-box;font-family:Montserrat}*,*:before,*:after{box-sizing:inherit}body,h1,h2,h3,h4,h5,h6,p{margin:0;padding:0}ul,ol{margin:0;padding:0;list-style:none}img{max-width:100%;height:auto}a{text-decoration:none;color:inherit}button{border:0;padding:0;margin:0;outline:0;cursor:pointer}\nbutton[data-astro-cid-jeofod6h]:focus{filter:brightness(95%)}\n"}],"routeData":{"route":"/dashboardadmin/newscreate","isIndex":true,"type":"page","pattern":"^\\/dashboardAdmin\\/newsCreate\\/?$","segments":[[{"content":"dashboardAdmin","dynamic":false,"spread":false}],[{"content":"newsCreate","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dashboardAdmin/newsCreate/index.astro","pathname":"/dashboardAdmin/newsCreate","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"function t(){return console.log(\"hola\"),Astro.redirect(\"/302\")}const e=document.getElementById(\"Logout\");e?.addEventListener(\"click\",t);\n"}],"styles":[{"type":"external","src":"/_astro/index.C8BXgcvi.css"},{"type":"inline","content":"@import\"https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap\";html{box-sizing:border-box;font-family:Montserrat}*,*:before,*:after{box-sizing:inherit}body,h1,h2,h3,h4,h5,h6,p{margin:0;padding:0}ul,ol{margin:0;padding:0;list-style:none}img{max-width:100%;height:auto}a{text-decoration:none;color:inherit}button{border:0;padding:0;margin:0;outline:0;cursor:pointer}\nbutton[data-astro-cid-jeofod6h]:focus{filter:brightness(95%)}\n"}],"routeData":{"route":"/dashboardadmin/volunteers","isIndex":true,"type":"page","pattern":"^\\/dashboardAdmin\\/volunteers\\/?$","segments":[[{"content":"dashboardAdmin","dynamic":false,"spread":false}],[{"content":"volunteers","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dashboardAdmin/volunteers/index.astro","pathname":"/dashboardAdmin/volunteers","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"function t(){return console.log(\"hola\"),Astro.redirect(\"/302\")}const e=document.getElementById(\"Logout\");e?.addEventListener(\"click\",t);\n"}],"styles":[{"type":"external","src":"/_astro/index.C8BXgcvi.css"},{"type":"inline","content":"button[data-astro-cid-ms5cq5xw]:focus{filter:brightness(95%)}button[data-astro-cid-3mnhuwuq]:focus{filter:brightness(95%)}\nbutton[data-astro-cid-jeofod6h]:focus{filter:brightness(95%)}\n@import\"https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap\";html{box-sizing:border-box;font-family:Montserrat}*,*:before,*:after{box-sizing:inherit}body,h1,h2,h3,h4,h5,h6,p{margin:0;padding:0}ul,ol{margin:0;padding:0;list-style:none}img{max-width:100%;height:auto}a{text-decoration:none;color:inherit}button{border:0;padding:0;margin:0;outline:0;cursor:pointer}\n"}],"routeData":{"route":"/dashboardadmin","isIndex":true,"type":"page","pattern":"^\\/dashboardAdmin\\/?$","segments":[[{"content":"dashboardAdmin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dashboardAdmin/index.astro","pathname":"/dashboardAdmin","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"const n=document.getElementById(\"buttonLogin\");n?.addEventListener(\"click\",()=>{window.location.href=\"https://litro-ong.onrender.com/login\"});\n"}],"styles":[{"type":"external","src":"/_astro/index.C8BXgcvi.css"},{"type":"inline","content":"@import\"https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap\";button[data-astro-cid-xk2m32tq]:focus{filter:brightness(95%)}html{box-sizing:border-box;font-family:Montserrat}*,*:before,*:after{box-sizing:inherit}body,h1,h2,h3,h4,h5,h6,p{margin:0;padding:0}ul,ol{margin:0;padding:0;list-style:none}img{max-width:100%;height:auto}a{text-decoration:none;color:inherit}button{border:0;padding:0;margin:0;outline:0;cursor:pointer}\n"}],"routeData":{"route":"/events","isIndex":true,"type":"page","pattern":"^\\/events\\/?$","segments":[[{"content":"events","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/events/index.astro","pathname":"/events","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"const n=document.getElementById(\"buttonLogin\");n?.addEventListener(\"click\",()=>{window.location.href=\"https://litro-ong.onrender.com/login\"});\n"}],"styles":[{"type":"external","src":"/_astro/index.C8BXgcvi.css"},{"type":"inline","content":"@import\"https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap\";button[data-astro-cid-xk2m32tq]:focus{filter:brightness(95%)}html{box-sizing:border-box;font-family:Montserrat}*,*:before,*:after{box-sizing:inherit}body,h1,h2,h3,h4,h5,h6,p{margin:0;padding:0}ul,ol{margin:0;padding:0;list-style:none}img{max-width:100%;height:auto}a{text-decoration:none;color:inherit}button{border:0;padding:0;margin:0;outline:0;cursor:pointer}\n"}],"routeData":{"route":"/news","isIndex":true,"type":"page","pattern":"^\\/news\\/?$","segments":[[{"content":"news","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/news/index.astro","pathname":"/news","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"const n=document.getElementById(\"buttonLogin\");n?.addEventListener(\"click\",()=>{window.location.href=\"https://litro-ong.onrender.com/login\"});\n"}],"styles":[{"type":"external","src":"/_astro/index.C8BXgcvi.css"},{"type":"inline","content":"@import\"https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap\";button[data-astro-cid-xk2m32tq]:focus{filter:brightness(95%)}html{box-sizing:border-box;font-family:Montserrat}*,*:before,*:after{box-sizing:inherit}body,h1,h2,h3,h4,h5,h6,p{margin:0;padding:0}ul,ol{margin:0;padding:0;list-style:none}img{max-width:100%;height:auto}a{text-decoration:none;color:inherit}button{border:0;padding:0;margin:0;outline:0;cursor:pointer}\n"}],"routeData":{"route":"/workshops","isIndex":true,"type":"page","pattern":"^\\/workshops\\/?$","segments":[[{"content":"workshops","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/workshops/index.astro","pathname":"/workshops","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"const n=document.getElementById(\"buttonLogin\");n?.addEventListener(\"click\",()=>{window.location.href=\"https://litro-ong.onrender.com/login\"});\n"}],"styles":[{"type":"external","src":"/_astro/index.C8BXgcvi.css"},{"type":"inline","content":"button[data-astro-cid-jeofod6h]:focus{filter:brightness(95%)}\n@import\"https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap\";button[data-astro-cid-xk2m32tq]:focus{filter:brightness(95%)}html{box-sizing:border-box;font-family:Montserrat}*,*:before,*:after{box-sizing:inherit}body,h1,h2,h3,h4,h5,h6,p{margin:0;padding:0}ul,ol{margin:0;padding:0;list-style:none}img{max-width:100%;height:auto}a{text-decoration:none;color:inherit}button{border:0;padding:0;margin:0;outline:0;cursor:pointer}\nbutton[data-astro-cid-6gzcwyet]:focus{filter:brightness(95%)}button[data-astro-cid-z5jcuhcx]:focus{filter:brightness(95%)}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"redirect","isIndex":false,"route":"/dasboardadmin","pattern":"^\\/dasboardAdmin\\/?$","segments":[[{"content":"dasboardAdmin","dynamic":false,"spread":false}]],"params":[],"component":"/dasboardAdmin","pathname":"/dasboardAdmin","prerender":false,"redirect":"/","redirectRoute":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}},"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["D:/SoyHenry/pf Litro/litro-ong/front/src/pages/aboutMe/index.astro",{"propagation":"none","containsHead":true}],["D:/SoyHenry/pf Litro/litro-ong/front/src/pages/communityKitchens/index.astro",{"propagation":"none","containsHead":true}],["D:/SoyHenry/pf Litro/litro-ong/front/src/pages/events/index.astro",{"propagation":"none","containsHead":true}],["D:/SoyHenry/pf Litro/litro-ong/front/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["D:/SoyHenry/pf Litro/litro-ong/front/src/pages/news/index.astro",{"propagation":"none","containsHead":true}],["D:/SoyHenry/pf Litro/litro-ong/front/src/pages/workshops/index.astro",{"propagation":"none","containsHead":true}],["D:/SoyHenry/pf Litro/litro-ong/front/src/pages/dashboardAdmin/index.astro",{"propagation":"none","containsHead":true}],["D:/SoyHenry/pf Litro/litro-ong/front/src/pages/dashboardAdmin/newsCreate/index.astro",{"propagation":"none","containsHead":true}],["D:/SoyHenry/pf Litro/litro-ong/front/src/pages/dashboardAdmin/volunteers/index.astro",{"propagation":"none","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["D:/SoyHenry/pf Litro/litro-ong/front/src/components/fromHome/SectionInformation/SectionInformation.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["D:/SoyHenry/pf Litro/litro-ong/front/src/components/fromHome/SectionSponsors/SectionSponsors.astro",{"propagation":"in-tree","containsHead":false}],["D:/SoyHenry/pf Litro/litro-ong/front/src/components/fromHome/SectionUltimasNoticias/SectionUltimasNoticias.astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astrojs-manifest":"manifest_Bj05d3-L.mjs","D:/SoyHenry/pf Litro/litro-ong/front/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_BkR_XoPb.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_4F7ALDiy.mjs","\u0000@astro-page:src/pages/aboutMe/index@_@astro":"chunks/index_DtxXaWZU.mjs","\u0000@astro-page:src/pages/communityKitchens/index@_@astro":"chunks/index_CmB3dnEa.mjs","\u0000@astro-page:src/pages/dashboardAdmin/newsCreate/index@_@astro":"chunks/index_CTj3O5Yt.mjs","\u0000@astro-page:src/pages/dashboardAdmin/volunteers/index@_@astro":"chunks/index_DamdtVEG.mjs","\u0000@astro-page:src/pages/dashboardAdmin/index@_@astro":"chunks/index_DiRd4gur.mjs","\u0000@astro-page:src/pages/events/index@_@astro":"chunks/index_BFzIDg-F.mjs","\u0000@astro-page:src/pages/news/index@_@astro":"chunks/index_DmgJ4v9O.mjs","\u0000@astro-page:src/pages/workshops/index@_@astro":"chunks/index_Di_PM1t8.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_D-DKUndA.mjs","D:/SoyHenry/pf Litro/litro-ong/front/src/content/notices/campañaSolidaria.md?astroContentCollectionEntry=true":"chunks/campañaSolidaria_rG457WzD.mjs","D:/SoyHenry/pf Litro/litro-ong/front/src/content/notices/nuevoTaller.md?astroContentCollectionEntry=true":"chunks/nuevoTaller_Cu84dK4l.mjs","D:/SoyHenry/pf Litro/litro-ong/front/src/content/notices/tallerDeMusica.md?astroContentCollectionEntry=true":"chunks/tallerDeMusica_D0h2LiWI.mjs","D:/SoyHenry/pf Litro/litro-ong/front/src/content/sponsors/becerra.md?astroContentCollectionEntry=true":"chunks/becerra_DwvryOf2.mjs","D:/SoyHenry/pf Litro/litro-ong/front/src/content/sponsors/cosag.md?astroContentCollectionEntry=true":"chunks/cosag_DHEvgY5z.mjs","D:/SoyHenry/pf Litro/litro-ong/front/src/content/sponsors/evi.md?astroContentCollectionEntry=true":"chunks/evi_rVpYStcU.mjs","D:/SoyHenry/pf Litro/litro-ong/front/src/content/sponsors/farmacia.md?astroContentCollectionEntry=true":"chunks/farmacia_DLgOs9jV.mjs","D:/SoyHenry/pf Litro/litro-ong/front/src/content/sponsors/jalisco.md?astroContentCollectionEntry=true":"chunks/jalisco_CP4PeSnp.mjs","D:/SoyHenry/pf Litro/litro-ong/front/src/content/tips/primerPost.md?astroContentCollectionEntry=true":"chunks/primerPost_B4dtFbzU.mjs","D:/SoyHenry/pf Litro/litro-ong/front/src/content/tips/segundoPost.md?astroContentCollectionEntry=true":"chunks/segundoPost_DBdkv0Tk.mjs","D:/SoyHenry/pf Litro/litro-ong/front/src/content/tips/sponsorPost.md?astroContentCollectionEntry=true":"chunks/sponsorPost_cumcsZ-E.mjs","D:/SoyHenry/pf Litro/litro-ong/front/src/content/notices/campañaSolidaria.md?astroPropagatedAssets":"chunks/campañaSolidaria_B-3mUD02.mjs","D:/SoyHenry/pf Litro/litro-ong/front/src/content/notices/nuevoTaller.md?astroPropagatedAssets":"chunks/nuevoTaller_DPL1XvO6.mjs","D:/SoyHenry/pf Litro/litro-ong/front/src/content/notices/tallerDeMusica.md?astroPropagatedAssets":"chunks/tallerDeMusica_DpmiV67b.mjs","D:/SoyHenry/pf Litro/litro-ong/front/src/content/sponsors/becerra.md?astroPropagatedAssets":"chunks/becerra_CqdrYWvV.mjs","D:/SoyHenry/pf Litro/litro-ong/front/src/content/sponsors/cosag.md?astroPropagatedAssets":"chunks/cosag_DQP9kWXC.mjs","D:/SoyHenry/pf Litro/litro-ong/front/src/content/sponsors/evi.md?astroPropagatedAssets":"chunks/evi_ClhEM6K0.mjs","D:/SoyHenry/pf Litro/litro-ong/front/src/content/sponsors/farmacia.md?astroPropagatedAssets":"chunks/farmacia_CsFs-lrL.mjs","D:/SoyHenry/pf Litro/litro-ong/front/src/content/sponsors/jalisco.md?astroPropagatedAssets":"chunks/jalisco_ClbYzYwe.mjs","D:/SoyHenry/pf Litro/litro-ong/front/src/content/tips/primerPost.md?astroPropagatedAssets":"chunks/primerPost_DSEWn56a.mjs","D:/SoyHenry/pf Litro/litro-ong/front/src/content/tips/segundoPost.md?astroPropagatedAssets":"chunks/segundoPost_D8TK9igj.mjs","D:/SoyHenry/pf Litro/litro-ong/front/src/content/tips/sponsorPost.md?astroPropagatedAssets":"chunks/sponsorPost_Cu7I4Xlc.mjs","D:/SoyHenry/pf Litro/litro-ong/front/src/content/notices/campañaSolidaria.md":"chunks/campañaSolidaria_aT_ef1tw.mjs","D:/SoyHenry/pf Litro/litro-ong/front/src/content/notices/nuevoTaller.md":"chunks/nuevoTaller_DZicWQPA.mjs","D:/SoyHenry/pf Litro/litro-ong/front/src/content/notices/tallerDeMusica.md":"chunks/tallerDeMusica_CEgJloM_.mjs","D:/SoyHenry/pf Litro/litro-ong/front/src/content/sponsors/becerra.md":"chunks/becerra_BtnhjXCL.mjs","D:/SoyHenry/pf Litro/litro-ong/front/src/content/sponsors/cosag.md":"chunks/cosag_CuhcMOfg.mjs","D:/SoyHenry/pf Litro/litro-ong/front/src/content/sponsors/evi.md":"chunks/evi_dmh0yM3m.mjs","D:/SoyHenry/pf Litro/litro-ong/front/src/content/sponsors/farmacia.md":"chunks/farmacia_eHgQKvbN.mjs","D:/SoyHenry/pf Litro/litro-ong/front/src/content/sponsors/jalisco.md":"chunks/jalisco_Bdq7P5i7.mjs","D:/SoyHenry/pf Litro/litro-ong/front/src/content/tips/primerPost.md":"chunks/primerPost_Dihsgazg.mjs","D:/SoyHenry/pf Litro/litro-ong/front/src/content/tips/segundoPost.md":"chunks/segundoPost_jK51Jl_D.mjs","D:/SoyHenry/pf Litro/litro-ong/front/src/content/tips/sponsorPost.md":"chunks/sponsorPost_B7stV4lH.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.243k6fRo.js","/astro/hoisted.js?q=1":"_astro/hoisted.CKTylefu.js","D:/SoyHenry/pf Litro/litro-ong/front/src/components/Forms/FormNewsFormik":"_astro/FormNewsFormik.6L_ypGT9.js","@astrojs/react/client.js":"_astro/client.J7s0XX1m.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/vectorIcon.BRuvuf-u.svg","/_astro/Logo.DETFKczI.svg","/_astro/click.cC7qlsXy.svg","/_astro/more.C9sSVEmS.svg","/_astro/COPIAimgPortada.DZIs7x1G.jpg","/_astro/calendarIcon.DJr8Nwhb.svg","/_astro/locationIcon.BlRN_PCn.svg","/_astro/rectangleCard.dFn9G49O.svg","/_astro/cursorIcon.M8-9hAAP.svg","/_astro/wtpIconSecondary.B2E8H0Un.svg","/_astro/instaIconSecondary.DuZmuVof.svg","/_astro/faceIconSecondary.fQ36uYLM.svg","/_astro/index.C8BXgcvi.css","/favicon.svg","/_astro/client.J7s0XX1m.js","/_astro/FormNewsFormik.6L_ypGT9.js","/_astro/index.DhYZZe0J.js"],"buildFormat":"directory","checkOrigin":false});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest };
