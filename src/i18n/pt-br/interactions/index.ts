import type { NamespaceInteractionsTranslation } from '../../i18n-types';

const pt_br_interactions: NamespaceInteractionsTranslation = {
	settings: {
		news: {
			enabled: 'As notícias agora serão enviadas em {channel}.',
			not_enabled: 'As notícias não estão ativadas para este servidor.',
			disabled: 'As notícias não serão mais enviadas em {channel}.'
		},
		locale: {
			success: 'O idioma foi definido para {locale}.'
		}
	},
	miscellaneous: {
		no_permissions: 'Não tenho permissão para visualizar ou enviar mensagens em {channel}.',
		no_results: 'Nenhum resultado encontrado.',
		no_results_for: 'Nenhum resultado encontrado para "{query}".'
	}
};

export default pt_br_interactions;
