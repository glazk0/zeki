import { NamespaceInteractionsTranslation } from '../../i18n-types';

const ko_interactions: NamespaceInteractionsTranslation = {
	settings: {
		news: {
			enabled: '{channel}에서 뉴스가 이제 전송됩니다.',
			not_enabled: '이 서버에서는 뉴스가 활성화되어 있지 않습니다.',
			disabled: '{channel}에서 뉴스가 더 이상 전송되지 않습니다.'
		},
		locale: {
			success: '로캘이 {locale}(으)로 설정되었습니다.'
		}
	},
	miscellaneous: {
		no_permissions: '{channel}에서 메시지를 보거나 전송할 권한이 없습니다.',
		no_results: '결과를 찾을 수 없습니다.',
		no_results_for: '"{query}"에 대한 결과를 찾을 수 없습니다.'
	}
};

export default ko_interactions;
