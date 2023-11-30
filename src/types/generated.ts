interface IRootObject {
  search: ISearchItem[];
  'weekly-wants': IWeeklyWantsItem[];
  now: INowItem[];
  villager: IVillagerItem[];
  bundle: IBundleItem[];
  quest: IQuestItem[];
  item: IItemItem[];
  recipe: IRecipeItem[];
  skill: ISkillItem[];
  store: IStoreItem[];
  accomplishment: IAccomplishmentItem[];
  gatherable: IGatherableItem[];
}
interface ISearchItem {
  key: string;
  name: string;
  type: string;
  icon: string;
  iconFolder: string;
  iconSize: number;
  newlyAdded: boolean;
}
interface IWeeklyWantsItem {
  version?: number;
  entries?: IEntriesItem[];
  currentTime?: number;
  nextMonday?: number;
  item?: IItem;
  name?: string;
  rewardLevel?: string;
}
interface IEntriesItem {
  villager: IVillager;
  weeklyWants: IWeeklyWantsItem[];
}
interface IVillager {
  key: string;
  name: string;
  icon?: string;
  iconFolder: string;
  newlyAdded: boolean;
  id?: number;
  addedIn: string;
  persistId?: number;
  entityType?: string;
  isVisibleInUi?: boolean;
  description?: string;
  isVisible?: boolean;
  canAcceptGifts?: boolean;
  friendshipLevelNecessaryForRomance?: number;
  relationshipDifficulty?: string;
  friendshipPoints?: IFriendshipPoints;
  romancePoints?: IRomancePoints;
  giftPreferences?: IGiftPreferencesItem[];
  relationshipLevels?: IRelationshipLevelsItem[];
  quests?: IQuestsItem[];
  obtainable?: boolean;
  weeklyGiftPreferences?: IWeeklyGiftPreferencesItem[];
  type?: string;
  rarity?: string;
  isRomanceable?: boolean;
}
interface IItem {
  key: string;
  name: string;
  icon?: string;
  iconFolder: string;
  rarity?: string;
  category?: string;
  cost?: ICost;
  value?: IValue;
  newlyAdded: boolean;
  quality?: string;
  mapCoordinates?: IMapCoordinates;
  entityType?: string;
  nameLocalized?: INameLocalized;
  description?: string;
  descriptionLocalized?: IDescriptionLocalized;
  rarityNumber?: number;
  canBePlaced?: boolean;
  canBeConsumed?: boolean;
  addedIn?: string;
  obtainable?: boolean;
  type?: string;
  tags?: ITagsItem[];
  maxStackSize?: number;
  consumeRewards?: IConsumeRewardsItem[];
  autoConsumed?: boolean;
  sources?: ISources;
  buyable?: boolean;
  requiredFor?: IRequiredFor;
  canBeSoldTo?: string[];
  sellable?: boolean;
  gardenBuff?: string;
  gardenBuffLocalized?: IGardenBuffLocalized;
  harvestItem?: IHarvestItem;
  plantSize?: string;
  buffSize?: number;
  growthDays?: number;
  maxHarvests?: number;
  reharvestDays?: number;
  storageCapacity?: number;
}
interface ICost {
  currency: ICurrency;
  amount: number;
  quantity: number;
}
interface ICurrency {
  key: string;
  name: string;
  icon: string;
  type?: string;
  iconFolder: string;
  newlyAdded: boolean;
  addedIn: string;
}
interface IValue {
  currency: ICurrency;
  amount: number;
}
interface INowItem {
  limitedEvents: any[];
  fishs: IFishsItem[];
}
interface IFishsItem {
  key: string;
  item?: IItem;
  timeOfDay?: string[];
  locations?: string[];
  baits?: string[];
  timed?: boolean;
  weather?: string[];
  fishLootTableEntries?: IFishLootTableEntriesItem[];
  newlyAdded?: boolean;
  addedIn?: string;
}
interface IVillagerItem {
  villager: IVillager;
}
interface IFriendshipPoints {
  0: number;
  1: number;
  2: number;
  3: number;
  4: number;
}
interface IRomancePoints {
  0: number;
  1: number;
  2: number;
  3: number;
  4: number;
}
interface IGiftPreferencesItem {
  item?: IItem;
  persistId: number;
  tags: ITagsItem[];
  isDefault: boolean;
  rewardLevel: string;
  rewardLevelNumber: number;
  isRomantic: boolean;
  rewardPoints: number;
  rewardLevelIfInappropriate: string;
  preferenceWeight: number;
  isAlwaysOn: boolean;
  difficultyGrouping: string;
  goldValueMinimum: number;
  goldValueMaximum: number;
}
interface ITagsItem {
  key: string;
  name: string;
  nameNumbered: string;
  icon?: string;
  generated?: boolean;
}
interface IRelationshipLevelsItem {
  level: number;
  type: string;
  requiredValue: number;
  levelName: string;
  levelDescription?: string;
}
interface IQuestsItem {
  key: string;
  name: string;
  description: string;
  icon: string;
  iconFolder: string;
  category: string;
  villager?: IVillager;
  addedIn: string;
  newlyAdded: boolean;
}
interface IWeeklyGiftPreferencesItem {
  item: IItem;
  name: string;
  rewardLevel: string;
}
interface IMapCoordinates {
  Village?: IVillage;
  processed?: boolean;
  AZ1?: IAZ1;
  null?: {
    key: null;
    coords: ICoordsItem[];
  };
  Events?: IEvents;
}
interface IVillage {
  key: string;
  coords: ICoordsItem[];
  title: string;
  tiles: string;
}
interface ICoordsItem {
  x: number;
  y: number;
  z: number;
  title: string;
  map: string | null;
}
interface IAZ1 {
  key: string;
  coords: ICoordsItem[];
  title: string;
  tiles: string;
}
interface IBundleItem {
  bundle: IBundle;
}
interface IBundle {
  key: string;
  name: string;
  entityType: string;
  type: string;
  icon: string;
  iconFolder: string;
  rewards: IRewardsItem[];
  subBundles: ISubBundlesItem[];
  addedIn: string;
  obtainable: boolean;
  newlyAdded: boolean;
}
interface IRewardsItem {
  type?: string;
  tag?: ITag;
  amount?: number;
  operation?: string;
  item?: IItem;
  starQuality?: boolean;
  recipe?: IRecipe;
  currency?: ICurrency;
  villager?: IVillager;
  playerTagRequirements?: IPlayerTagRequirementsItem[];
  mailMessage?: IMailMessage | string;
  quest?: IQuest;
}
interface ITag {
  key: string;
  name: string;
  nameNumbered: string;
  generated?: boolean;
  icon?: string;
}
interface ISubBundlesItem {
  name: string;
  requiredItems: IRequiredItemsItem[];
  rewards: IRewardsItem[];
}
interface IRequiredItemsItem {
  item: IItem;
  amount: number;
  starQuality: number;
}
interface IRecipe {
  key: string;
  item?: IItem;
  name: string;
  icon: string;
  iconFolder: string;
  rarity?: string;
  category?: string;
  alwaysAvailable: boolean;
  newlyAdded: boolean;
  addedIn: string;
  quality?: string;
  cost?: ICost;
  entityType?: string;
  requires?: string;
  craftTime?: number;
  timeLimit?: number;
  enabled?: boolean;
  nameLocalized?: INameLocalized;
  description?: string;
  descriptionLocalized?: IDescriptionLocalized;
  rarityNumber?: number;
  outputItem?: IOutputItem;
  outputQuantity?: number;
  allowedCrafters?: string[] | (string | null)[];
  showInCarousel?: boolean;
  visible?: boolean;
  persistId?: number;
  ingredients?: IIngredientsItem[];
  steps?: IStepsItem[];
  sources?: ISources;
  obtainable?: boolean;
  type?: string;
  requiredFor?: IRequiredFor;
  valueBasedProduction?: IValueBasedProductionItem[];
}
interface IQuestItem {
  quest: IQuest;
  status?: string;
  step?: number;
}
interface IQuest {
  key: string;
  entityType?: string;
  name: string;
  description: string;
  icon: string;
  iconFolder: string;
  category: string;
  enabled?: boolean;
  persistId?: number;
  steps?: IStepsItem[];
  starters?: IStarters;
  villager?: IVillager;
  addedIn: string;
  obtainable?: boolean;
  newlyAdded: boolean;
  type?: string;
  isAccomplishment?: boolean;
  startRewards?: IStartRewardsItem[];
}
interface IStepsItem {
  overrideDescription?: string;
  goals?: IGoalsItem[];
  rewards?: IRewardsItem[];
  turnInDialogue?: ITurnInDialogue;
  overrideQuestReturnText?: string;
  hasBranchingGoals?: boolean;
  minBranchingGoalsRequired?: number;
  maxBranchingGoalsAllowed?: number;
  branchingGoals?: IBranchingGoalsItem[];
  type?: string;
  itemIndex?: number;
  startType?: string;
}
interface IGoalsItem {
  condition?: ICondition | null;
  description?: string;
  showCountType: string;
  hide: boolean;
  mapCoordinates?: IMapCoordinates;
}
interface ICondition {
  type?: string;
  quest?: IQuest;
  dialogueType?: string;
  dialogue?: IDialogue;
  item?: IItem;
  amountRequired?: number;
  starQuality?: boolean;
  subConditions?: ISubConditionsItem[];
  playerTag?: IPlayerTag;
  tag?: ITag;
  mapCoordinates?: IMapCoordinates;
  sources?: ISources;
  mailMessage?: IMailMessage;
  villager?: IVillager;
  releaseMethod?: number;
  currency?: ICurrency;
  acquireMethod?: number;
  items?: IItemsItem[];
  books?: IBooksItem[];
  dialogues?: IDialoguesItem[];
  hasUpperLimit?: boolean;
  upperLimit?: number;
  recipe?: IRecipe;
  creatureTag?: ICreatureTag;
  itemTag?: IItemTag;
  deductOnComplete?: boolean;
  quests?: IQuestsItem[];
  minimumRarity?: string;
  creature?: ICreature;
  tags?: ITagsItem[];
  skill?: ISkill;
}
interface ITurnInDialogue {
  dialogue?: IDialogue;
}
interface IDialogue {
  key: string;
  name: string;
  icon: string;
  iconFolder: string;
  villager: IVillager;
  text?: string;
  newlyAdded: boolean;
  addedIn: string;
}
interface IStarters {
  dialogues?: IDialoguesItem[];
  quests?: IQuestsItem[];
  items?: IItemsItem[];
  mailMessages?: IMailMessagesItem[];
  books?: IBooksItem[];
  fishs?: IFishsItem[];
}
interface IDialoguesItem {
  key: string;
  name: string;
  icon: string;
  iconFolder: string;
  villager: IVillager;
  newlyAdded: boolean;
  addedIn: string;
  text?: string;
}
interface ISubConditionsItem {
  type?: string;
  dialogueType?: string;
  dialogue?: IDialogue;
  playerTag?: IPlayerTag;
  item?: IItem;
  starQuality?: boolean;
  dialogues?: IDialoguesItem[];
  tag?: ITag;
  gatherables?: string[];
  quest?: IQuest;
}
interface IPlayerTag {
  key: string;
  name: string;
  nameNumbered: string;
  generated: boolean;
}
interface ISources {
  slidingPuzzle?: string[];
  mailMessages?: IMailMessagesItem[];
  bundles?: string[] | IBundlesItem[];
  stores?: IStoresItem[];
  dialogues?: IDialoguesItem[];
  gatherables?: IGatherablesItem[];
  recipes?: IRecipesItem[];
  fishs?: IFishsItem[];
  items?: IItemsItem[];
  quests?: IQuestsItem[];
  accomplishments?: IAccomplishmentsItem[];
  books?: IBooksItem[];
}
interface IItemsItem {
  key?: string;
  name?: string;
  icon?: string;
  iconFolder?: string;
  category?: string;
  mapCoordinates?: IMapCoordinates;
  newlyAdded?: boolean;
  rarity?: string;
  cost?: ICost;
  value?: IValue;
  quality?: string;
  item?: IItem | string;
  amount?: number;
  starQuality?: boolean;
  requirements?: IRequirements;
  purchaseLimits?: IPurchaseLimits;
  costTable?: ICostTableItem[];
  additionalCosts?: IAdditionalCostsItem[];
}
interface IMailMessage {
  key: string;
  name: string;
  icon?: string;
  iconFolder: string;
  newlyAdded: boolean;
  addedIn: string;
}
interface IMailMessagesItem {
  key: string;
  name: string;
  icon?: string;
  iconFolder: string;
  newlyAdded: boolean;
  addedIn: string;
}
interface IBranchingGoalsItem {
  goals: IGoalsItem[];
  rewards?: IRewardsItem[];
}
interface IPlayerTagRequirementsItem {
  tag: ITag;
  min: number;
  max: number;
}
interface IBooksItem {
  key: string;
  name: string;
  icon: string;
  iconFolder: string;
  mapCoordinates?: IMapCoordinates;
  newlyAdded: boolean;
  addedIn: string;
}
interface ICreatureTag {
  key: string;
  name: string;
  nameNumbered: string;
  generated?: boolean;
}
interface IStartRewardsItem {
  type: string;
  item?: IItem;
  starQuality?: boolean;
  amount: number;
  tag?: ITag;
  operation?: string;
}
interface IItemTag {
  key: string;
  name: string;
  nameNumbered: string;
  icon?: string;
  generated?: boolean;
}
interface IFishLootTableEntriesItem {
  fishLoot: IFishLoot;
  chance: IChance;
}
interface IFishLoot {
  key: string;
  name: string;
  waterType: string;
  mapCoordinates?: IMapCoordinates;
  newlyAdded: boolean;
  addedIn: string;
  baits?: IBaitsItem[];
}
interface IChance {
  fishKey: string;
  timeOfDay: ITimeOfDay;
  requirements?: IRequirements;
  weigth: number;
  rate: number;
}
interface ITimeOfDay {
  periods: string[];
}
interface IRequirements {
  playerTag?: IPlayerTagItem[];
  weather?: string[];
  quest?: IQuestItem[];
  items?: IItemsItem[];
  timeOfDay?: ITimeOfDay;
  recipe?: IRecipeItem[];
  accomplishment?: string[];
}
interface IPlayerTagItem {
  tag: string;
  min: number;
  max: number;
}
interface IBaitsItem {
  key: string;
  name: string;
  icon: string;
  iconFolder: string;
  rarity: string;
  category: string;
  quality: string;
  newlyAdded: boolean;
}
interface ICreature {
  key: string;
  name: string;
  newlyAdded: boolean;
  addedIn: string;
}
interface IEvents {
  key: string;
  coords: ICoordsItem[];
  title: string;
  tiles: string;
}
interface ISkill {
  key: string;
  name: string;
  icon: string;
  iconFolder: string;
  store: IStore;
  villager?: IVillager;
  category: string;
  newlyAdded: boolean;
  addedIn: string;
  entityType?: string;
  type?: string;
  currency?: ICurrency;
  levelToDisplayCurrency?: number;
  xpRequiredPerLevel?: string;
  description?: string;
  obtainable?: boolean;
}
interface IStore {
  key: string;
  name: string;
  icon?: string;
  iconFolder?: string;
  type: string;
  villager?: IVillager;
  newlyAdded: boolean;
  addedIn: string;
  entityType?: string;
  items?: IItemsItem[];
  recipes?: IRecipesItem[];
  obtainable?: boolean;
  buyCategories?: string[];
  tagRequirements?: ITagRequirements;
  skill?: ISkill;
}
interface IBundlesItem {
  key: string;
  name: string;
  icon: string;
  iconFolder: string;
  type: string;
  newlyAdded: boolean;
  addedIn: string;
}
interface IStoresItem {
  key: string;
  name: string;
  type: string;
  newlyAdded: boolean;
  addedIn: string;
  icon?: string;
  iconFolder?: string;
  villager?: IVillager;
}
interface IItemItem {
  item: IItem;
}
interface INameLocalized {
  de?: string;
  en?: string;
  es?: string;
  fr?: string;
  it?: string;
}
interface IDescriptionLocalized {
  de?: string;
  en?: string;
  es?: string;
  fr?: string;
  it?: string;
}
interface IConsumeRewardsItem {
  type: string;
  currency?: ICurrency | string;
  amount?: number;
  item?: IItem;
  starQuality?: boolean;
  tag?: ITag;
  operation?: string;
  recipe?: IRecipe;
  lootBundle?: ILootBundle;
  mailMessage?: IMailMessage;
  villager?: IVillager;
}
interface IRequiredFor {
  books?: IBooksItem[];
  recipes?: IRecipesItem[];
  accomplishments?: IAccomplishmentsItem[];
  quests?: IQuestsItem[];
  questStarters?: IQuestStartersItem[];
  fishs?: IFishsItem[];
}
interface IGatherablesItem {
  key: string;
  name: string;
  type: string;
  skill: ISkill;
  newlyAdded: boolean;
  addedIn: string;
  rarity?: string;
  icon?: string;
  iconFolder?: string;
}
interface IRecipesItem {
  key?: string;
  item?: IItem;
  name?: string;
  icon?: string;
  iconFolder?: string;
  rarity?: string;
  category?: string;
  quality?: string;
  alwaysAvailable?: boolean;
  newlyAdded?: boolean;
  addedIn?: string;
  cost?: ICost;
  recipe?: IRecipe;
  requirements?: IRequirements;
}
interface IAccomplishmentsItem {
  key: string;
  icon: string;
  iconFolder: string;
  name: string;
  category?: string;
}
interface IQuestStartersItem {
  key: string;
  name: string;
  description: string;
  icon: string;
  iconFolder: string;
  category: string;
  addedIn: string;
  newlyAdded: boolean;
}
interface IGardenBuffLocalized {
  de?: string;
  en: string;
  es: string;
  fr?: string;
  it: string;
}
interface IHarvestItem {
  item: IItem | string;
  harvestAmount: number;
  boostAmount: number;
}
interface ILootBundle {
  key: string;
  lootPools: ILootPoolsItem[];
  newlyAdded: boolean;
  addedIn: string;
}
interface ILootPoolsItem {
  key: string;
  loots: ILootsItem[];
}
interface ILootsItem {
  weight: number;
  requirements: IRequirements;
  item?: IItem;
  itemAmount: number;
  qualityStars: number;
  dropChance: number;
}
interface IRecipeItem {
  recipe: IRecipe;
}
interface IOutputItem {
  key: string;
  name: string;
  icon: string;
  iconFolder: string;
  rarity?: string;
  category?: string;
  quality?: string;
  value?: IValue;
  newlyAdded: boolean;
  cost?: ICost;
}
interface IIngredientsItem {
  type: string;
  quantity: number;
  item?: IItem;
  tagReplaced?: boolean;
  tag?: ITag;
}
interface IValueBasedProductionItem {
  isValid: boolean;
  key: string;
  entityType: string;
  name: string;
  nameLocalized: INameLocalized;
  description: string;
  descriptionLocalized: IDescriptionLocalized;
  icon: string;
  iconFolder: string;
  maxStackSize: number;
  category: string;
  rarity: string;
  rarityNumber: number;
  quality: string;
  canBePlaced: boolean;
  canBeConsumed: boolean;
  cost: ICost;
  value: IValue;
  gardenBuff?: string;
  gardenBuffLocalized?: IGardenBuffLocalized;
}
interface ISkillItem {
  skill: ISkill;
}
interface IStoreItem {
  store: IStore;
}
interface ITagRequirements {
  timeOfDay?: ITimeOfDay;
  playerTag?: IPlayerTagItem[];
}
interface IPurchaseLimits {
  tag: ITag;
  min: number;
  max: number;
}
interface ICostTableItem {
  quantity: number;
  amount: number;
}
interface IAdditionalCostsItem {
  item: IItem;
  amount: number;
}
interface IAccomplishmentItem {
  accomplishment: IAccomplishment;
}
interface IAccomplishment {
  key: string;
  icon: string;
  iconFolder: string;
  nameLocalized: INameLocalized;
  name: string;
  descriptionLocalized: IDescriptionLocalized;
  description: string;
  unlockedDescriptionLocalized: IUnlockedDescriptionLocalized;
  unlockedDescription?: string;
  requirement?: IRequirement;
  rewards: IRewardsItem[];
  obtainable: boolean;
  type: string;
  group?: string;
  tier?: number;
  category?: string;
}
interface IUnlockedDescriptionLocalized {
  de?: string;
  en?: string;
  es?: string;
  fr?: string;
  it?: string;
}
interface IRequirement {
  type: string;
  items?: IItemsItem[];
  amount?: number | null;
  quest?: IQuest;
  currency?: ICurrency;
  creatures?: number[];
  vital?: string;
  tag?: ITag;
}
interface IGatherableItem {
  gatherable: IGatherable;
}
interface IGatherable {
  key: string;
  entityType: string;
  mapCoordinates?: IMapCoordinates;
  items: IItemsItem[];
  skill: ISkill;
  name: string;
  description?: string;
  icon?: string;
  iconFolder?: string;
  type: string;
  rarity?: string;
  rarityNumber: number;
  creature?: ICreature;
  starQualityChance?: number;
  finalRewardsLootBundle?: string;
  isGatherable: boolean;
  addedIn: string;
  newlyAdded: boolean;
  obtainable?: boolean;
  requirements?: IRequirements;
  vitalRewardsLootBundle?: string;
  lootPerVitalAmount?: number;
  defaultItem?: string;
}
