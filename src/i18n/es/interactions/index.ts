import type { NamespaceInteractionsTranslation } from "../../i18n-types";

const es_interactions: NamespaceInteractionsTranslation = {
	settings: {
		news: {
			enabled: "Las noticias ahora se enviarán en {channel}.",
			not_enabled: "Las noticias no están habilitadas para este servidor.",
			disabled: "Las noticias ya no se enviarán en {channel}.",
		},
		locale: {
			success: "Se ha establecido la configuración regional en {locale}.",
		},
	},
	miscellaneous: {
		no_permissions: "No tengo permisos para ver o enviar mensajes en {channel}.",
		no_results: "No se encontraron resultados.",
		no_results_for: 'No se encontraron resultados para "{query}".',
	},
};

export default es_interactions;
