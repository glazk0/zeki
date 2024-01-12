import type { NamespaceInteractionsTranslation } from "../../i18n-types";

const zh_hant_interactions: NamespaceInteractionsTranslation = {
	settings: {
		news: {
			enabled: "新聞現在將會發送到 {channel}。",
			not_enabled: "此伺服器未啟用新聞。",
			disabled: "新聞將不再發送到 {channel}。",
		},
		locale: {
			success: "語言設定已更改為 {locale}。",
		},
	},
	miscellaneous: {
		no_permissions: "我沒有權限查看或在 {channel} 發送訊息。",
		no_results: "找不到結果。",
		no_results_for: '找不到 "{query}" 的結果。',
	},
};

export default zh_hant_interactions;
