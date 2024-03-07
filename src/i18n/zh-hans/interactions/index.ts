import type { NamespaceInteractionsTranslation } from "../../i18n-types";

const zh_hans_interactions: NamespaceInteractionsTranslation = {
	settings: {
		news: {
			enabled: "现在将通过 {channel} 发送新闻。",
			not_enabled: "此服务器未启用新闻功能。",
			disabled: "将不再通过 {channel} 发送新闻。",
		},
		locale: {
			success: "语言环境已设置为 {locale}。",
		},
	},
	miscellaneous: {
		no_permissions: "我没有权限查看或发送消息到 {channel}。",
		no_results: "未找到结果。",
		no_results_for: '未找到 "{query}" 的结果。',
	},
};

export default zh_hans_interactions;
