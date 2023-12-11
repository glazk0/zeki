import type { BaseTranslation } from "../../i18n-types";

const en_interactions: BaseTranslation = {
	settings: {
		news: {
			enabled: "News will now be sent in {channel}.",
			not_enabled: "News are not enabled for this server.",
			disabled: "News will no longer be sent in {channel}.",
		},
		locale: {
			success: "The locale has been set to {locale}.",
		},
	},
	miscellaneous: {
		no_permissions: "I don't have the permission to view or send messages in {channel}.",
		no_results: "No results found.",
		no_results_for: 'No results found for "{query}".',
	},
};

export default en_interactions;
