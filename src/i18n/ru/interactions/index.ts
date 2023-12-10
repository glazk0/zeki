import type { BaseTranslation } from '../../i18n-types';

const ru_interactions = {
    settings: {
      news: {
        enabled: 'Новости теперь будут поступать в {channel}.',
        not_enabled: 'Новости не включены для этого сервера.',
        disabled: 'Новости отключены от {channel}.',
      },
      locale: {
        success: 'Локаль настроена на {locale}.',
      },
    },
    miscellaneous: {
      no_permissions:
        "У меня нет разрешения на просмотр или отправку сообщений в {channel}.",
      no_results: 'Не найдено результатов.',
      no_results_for: 'Не найдено результатов для "{query}".',
    },
} satisfies BaseTranslation;

export default ru_interactions;
