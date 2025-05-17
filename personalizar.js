#!/usr/bin/env node

/**
 * Script de Adaptación de Landing Page
 *
 * Este script te permite personalizar automáticamente la landing page con los datos de tu empresa.
 *
 * Uso:
 * 1. Configura los datos en la sección "CONFIGURACIÓN"
 * 2. Ejecuta el script: node personalizar.js
 * 3. Se generará una versión personalizada de tu landing page
 */

const fs = require("fs");
const path = require("path");

// -------------------------------------------------------------------------
// CONFIGURACIÓN: PERSONALIZA ESTOS DATOS CON TU INFORMACIÓN
// -------------------------------------------------------------------------

const datosEmpresa = {
  // Información básica
  nombre: "Blueprintfy", // Reemplaza "Pixa" en toda la página
  eslogan: "From idea to software", // Reemplaza el eslogan principal
  descripcion:
    "Una descripción detallada de tu empresa y los servicios que ofreces a tus clientes.",

  // SEO y metadatos
  metaTitle: "Blueprintfy - Tu empresa de software", // Título para SEO
  metaDescription:
    "Blueprintfy es una empresa dedicada a ofrecer soluciones de software personalizadas para tus necesidades.", // Descripción para SEO

  // Contacto
  email: "contacto@tuempresa.com",
  telefono: "+123456789",
  direccion: "Tu dirección física",

  // Redes sociales (URLs completas)
  redesSociales: {
    github: "https://github.com/tuempresa",
    twitter: "https://twitter.com/tuempresa",
    linkedin: "https://linkedin.com/company/tuempresa",
  },
};

// -------------------------------------------------------------------------
// FUNCIONES DE ADAPTACIÓN
// -------------------------------------------------------------------------

// Obtener la ruta del archivo HTML
const HTML_FILE = path.join(__dirname, "index.html");
const BACKUP_FILE = path.join(__dirname, "index.html.backup");

// Crear una copia de seguridad del archivo original
function crearBackup() {
  console.log("📂 Creando copia de seguridad...");
  try {
    const contenido = fs.readFileSync(HTML_FILE, "utf8");
    fs.writeFileSync(BACKUP_FILE, contenido);
    console.log('✅ Backup creado correctamente como "index.html.backup"');
    return contenido;
  } catch (error) {
    console.error("❌ Error al crear backup:", error.message);
    process.exit(1);
  }
}

// Personalizar el contenido HTML
function personalizarHTML(contenido) {
  console.log("🔄 Personalizando landing page...");

  let htmlModificado = contenido;

  // Reemplazar nombre de la empresa
  htmlModificado = htmlModificado.replace(/Pixa/g, datosEmpresa.nombre);

  // Reemplazar título y meta descripción
  htmlModificado = htmlModificado.replace(
    /<title>All your AI models in one place - Try Pixa Playground<\/title>/,
    `<title>${datosEmpresa.metaTitle}</title>`
  );

  htmlModificado = htmlModificado.replace(
    /<meta name="description" content="Get all your AI models and tools in one place" \/>/,
    `<meta name="description" content="${datosEmpresa.metaDescription}" />`
  );

  // Reemplazar eslogan principal
  htmlModificado = htmlModificado.replace(
    /<span class=""> All your AI models <\/span>/,
    `<span class=""> ${datosEmpresa.eslogan} </span>`
  );

  // Reemplazar descripción principal
  htmlModificado = htmlModificado.replace(
    /Your all in one AI companion\. generate Images, videos, codes, docs, debug your web apps all with Pixa's interface\./,
    datosEmpresa.descripcion
  );

  // Reemplazar información de contacto
  if (datosEmpresa.email) {
    htmlModificado = htmlModificado.replace(
      /contacto@techsolutions\.com/g,
      datosEmpresa.email
    );
  }

  if (datosEmpresa.telefono) {
    htmlModificado = htmlModificado.replace(
      /\+123456789/g,
      datosEmpresa.telefono
    );
  }

  if (datosEmpresa.direccion) {
    htmlModificado = htmlModificado.replace(
      /Calle Principal 123, Ciudad/g,
      datosEmpresa.direccion
    );
  }

  // Reemplazar enlaces de redes sociales
  Object.entries(datosEmpresa.redesSociales).forEach(([red, url]) => {
    if (url) {
      const pattern = new RegExp(
        `href="https://(www\\.)?${red}\\.com/[^"]*"`,
        "g"
      );
      htmlModificado = htmlModificado.replace(pattern, `href="${url}"`);
    }
  });

  return htmlModificado;
}

// Guardar el HTML modificado
function guardarHTML(htmlModificado) {
  try {
    fs.writeFileSync(HTML_FILE, htmlModificado);
    console.log("✅ Landing page personalizada correctamente");
  } catch (error) {
    console.error("❌ Error al guardar el archivo:", error.message);
    process.exit(1);
  }
}

// -------------------------------------------------------------------------
// EJECUCIÓN PRINCIPAL
// -------------------------------------------------------------------------

console.log("🚀 Iniciando personalización de landing page...");

// Verificar si el archivo existe
if (!fs.existsSync(HTML_FILE)) {
  console.error(`❌ No se encontró el archivo ${HTML_FILE}`);
  console.log(
    "👉 Asegúrate de ejecutar este script en la misma carpeta que el archivo index.html"
  );
  process.exit(1);
}

// Crear backup y obtener contenido
const contenidoOriginal = crearBackup();

// Personalizar el HTML
const htmlModificado = personalizarHTML(contenidoOriginal);

// Guardar los cambios
guardarHTML(htmlModificado);

console.log("\n✨ Proceso completado exitosamente");
console.log(
  "📝 Algunos elementos más específicos como imágenes, características, planes de precio, etc."
);
console.log(
  "   necesitan ser modificados manualmente. Consulta la guía para más detalles."
);
console.log(
  "\n👀 Abre el archivo index.html en tu navegador para ver los cambios"
);
