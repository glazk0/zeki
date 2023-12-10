import { BaseTranslation } from "../../i18n-types";

const it_discord = {
  settings: {
    name: 'settings',
    description: 'Accedi e gestisci le impostazioni del tuo server.',
  },
  ['settings.locale']: {
    name: 'locale',
    description: 'Cambia le impostazioni della lingua utilizzata nel tuo server.',
  },
  ['settings.locale.value']: {
    name: 'value',
    description: 'Specifica la lingua preferita nel tuo server.',
  },
  ['settings.news']: {
    name: 'news',
    description: 'Controlla le impostazioni degli aggiornamenti nel tuo server.',
  },
  ['settings.news.enable']: {
    name: 'enable',
    description: 'Attiva la funzione aggiornamenti nel tuo server.',
  },
  ['settings.news.enable.channel']: {
    name: 'channel',
    description: 'Scegli il canale dove verranno pubblicati gli aggiornamenti.',
  },
  ['settings.news.disable']: {
    name: 'disable',
    description: 'Disattiva la funzione aggiornamenti nel tuo server.',
  },
  help: {
    name: 'help',
    description: "Mostra un elenco completo dei comandi disponibili di Zeki.",
  },
  about: {
    name: 'about',
    description: 'Mostra informazioni dettagliate su Zeki.',
  },
  quest: {
    name: 'quest',
    description: 'Cerca i quest e informazioni correlate.',
  },
  'quest.query': {
    name: 'query',
    description: 'Quale quest stai cercando?',
  },
  villager: {
    name: 'villager',
    description: 'Trova informazioni su specifici abitanti del villaggio.',
  },
  'villager.query': {
    name: 'query',
    description: 'Quale abitante del villaggio stai cercando?',
  },
  recipe: {
    name: 'recipe',
    description: 'Cerca le ricette artigianali e i dettagli di lavorazione.',
  },
  'recipe.query': {
    name: 'query',
    description: 'Che ricetta stai cercando?',
  },
  'recipe.amount': {
    name: 'amount',
    description: 'Specifica la quantità degli oggetti da creare.',
  },
  item: {
    name: 'item',
    description: 'Cerca l'oggetto e i dettagli correlati.',
  },
  'item.query': {
    name: 'query',
    description: 'Quale oggetto stai cercando?',
  },
  weekly: {
    name: 'weekly',
    description: 'Ritrova le preferenze settimanali e regali ricercati dagli abitanti di villaggio.',
  },
  bundle: {
    name: 'bundle',
    description: 'Cerca informazioni sui bundle e sui loro contenuti.',
  },
  'bundle.query': {
    name: 'query',
    description: 'Quale bundle stai cercando?',
  },
  accomplishment: {
    name: 'accomplishment',
    description: 'Cerca informazioni e dettagli sui traguardi.',
  },
  'accomplishment.query': {
    name: 'query',
    description: 'Quale traguardo stai cercando?',
  },
} satisfies BaseTranslation;

export default it_discord;
