import type { NamespaceInteractionsTranslation } from "../../i18n-types";

const it_interactions: NamespaceInteractionsTranslation = {
	settings: {
		news: {
			enabled: "Gli aggiornamenti verranno inviati in {channel}.",
			not_enabled: "Gli aggiornamenti non sono abilitati per questo server.",
			disabled: "Gli aggiornamenti non verranno più inviati in {channel}.",
		},
		locale: {
			success: "Il locale è stato impostato {locale}.",
		},
	},
	miscellaneous: {
		no_permissions: "Non ho la permissione di leggere o inviare messaggi in {channel}.",
		no_results: "Nessun risltuato trovato.",
		no_results_for: 'Nessun risulato trovato per "{query}".',
	},
};

export default it_interactions;
