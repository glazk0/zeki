import type { NamespaceInteractionsTranslation } from '../../i18n-types';

const ja_interactions: NamespaceInteractionsTranslation = {
	settings: {
		news: {
			enabled: 'ニュースはこれから {channel} で送信されます。',
			not_enabled: 'このサーバーではニュースが有効になっていません。',
			disabled: 'ニュースはこれから {channel} で送信されなくなります。'
		},
		locale: {
			success: 'ロケールが {locale} に設定されました。'
		}
	},
	miscellaneous: {
		no_permissions: '私は {channel} でメッセージを表示または送信する権限がありません。',
		no_results: '結果が見つかりませんでした。',
		no_results_for: '"{query}" に対する結果は見つかりませんでした。'
	}
};

export default ja_interactions;
