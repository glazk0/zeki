import type { NamespaceInteractionsTranslation } from '../../i18n-types';

const fr_interactions: NamespaceInteractionsTranslation = {
	settings: {
		news: {
			enabled: 'Les actualités sernt envoyées dans {channel}.',
			not_enabled: 'Les actualités ne sont pas activés sur le serveur.',
			disabled: 'Les actualités ne seront plus envoyées dans {channel}.'
		},
		locale: {
			success: 'La langue a été définie sur {locale}.'
		}
	},
	miscellaneous: {
		no_permissions: "Vous n'avez pas la permission de voir ou envoyer des messages dans {channel}.",
		no_results: 'Pas de résultat trouvé.',
		no_results_for: 'Pas de résultat trouvé pour "{query}".'
	}
};

export default fr_interactions;
