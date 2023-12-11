import type { NamespaceInteractionsTranslation } from '../../i18n-types';

const de_interactions: NamespaceInteractionsTranslation = {
  settings: {
    news: {
      enabled: 'NAchrichten werden jetzt im folgenden Kanal gesendet {channel}.',
      not_enabled: 'Nachrichten sind für diesen Server nicht aktiviert.',
      disabled: 'Nachrichten werden nicht mehr in diesen Kanal {channel} gesendet.',
    },
    locale: {
      success: 'Das Gebietsschema wurde auf {locale} gesetzt.',
    },
  },
  miscellaneous: {
    no_permissions:
      "Ich habe nicht die Berechtigung, Nachrichten in {channel} anzusehen oder zu senden.",
    no_results: 'Keine Ergebnisse gefunden.',
    no_results_for: 'Keine Ergebnisse für "{query}" gefunden.',
  },
};

export default de_interactions;
