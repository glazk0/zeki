interface IRootObject {
  search: ISearchItem[];
  quest: IQuestItem[];
  villager: IVillagerItem[];
  item: IItemItem[];
  recipe: IRecipeItem[];
  skill: ISkillItem[];
  store: IStoreItem[];
  gatherable: IGatherableItem[];
}
interface ISearchItem {
  key: string;
  name: string;
  type: string;
  icon?: string;
  iconFolder?: string;
  iconSize?: number;
  newlyAdded: boolean;
}
interface IQuestItem {
  quest: IQuest;
  status?: string;
  step?: number;
}
interface IQuest {
  key: string;
  name: string;
  description: string;
  icon: string;
  iconFolder: string;
  category: string;
  enabled?: boolean;
  persistId?: number;
  steps?: IStepsItem[];
  starters?: IStarters;
  obtainable?: boolean;
  addedIn: string;
  type?: string;
  newlyAdded?: boolean;
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
  mapCoordinates?: IMapCoordinatesItem[];
}
interface ICondition {
  type?: string;
  quest?: IQuest;
  dialogueType?: string;
  dialogue?: IDialogue;
  item?: IItem;
  amountRequired?: number;
  tag?: ITag;
  mapCoordinates?: IMapCoordinatesItem[];
  subConditions?: ISubConditionsItem[];
  playerTag?: IPlayerTag;
  sources?: ISources;
  mailMessage?: IMailMessage;
  villager?: IVillager;
  currency?: ICurrency;
  acquireMethod?: number;
  hasUpperLimit?: boolean;
  upperLimit?: number;
  recipe?: IRecipe;
  creatureTag?: ICreatureTag;
  itemTag?: IItemTag;
  deductOnComplete?: boolean;
  releaseMethod?: number;
  creature?: ICreature;
  tags?: ITagsItem[];
  skill?: ISkill;
}
interface IRewardsItem {
  type: string;
  currency?: ICurrency;
  amount?: number;
  villager?: IVillager;
  item?: IItem;
  tag?: ITag;
  operation?: string;
  playerTagRequirements?: IPlayerTagRequirementsItem[];
  mailMessage?: IMailMessage;
  quest?: IQuest;
  recipe?: IRecipe;
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
interface ITurnInDialogue {
  dialogue?: IDialogue;
}
interface IDialogue {
  key: string;
  name: string;
  icon?: string;
  iconFolder: string;
  villager: IVillager;
  text?: string;
  newlyAdded: boolean;
  addedIn: string;
}
interface IVillager {
  key: string;
  name: string;
  icon?: string;
  iconFolder: string;
  newlyAdded?: boolean;
  addedIn: string;
  isVisibleInUi?: boolean;
  description?: string;
  isVisible?: boolean;
  canAcceptGifts?: boolean;
  friendshipLevelNecessaryForRomance?: number;
  relationshipDifficulty?: string;
  giftPreferences?: IGiftPreferencesItem[];
  relationshipLevels?: IRelationshipLevelsItem[];
  obtainable?: boolean;
  type?: string;
  rarity?: string;
  isRomanceable?: boolean;
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
  icon?: string;
  iconFolder: string;
  villager: IVillager;
  newlyAdded: boolean;
  addedIn: string;
  text?: string;
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
  newlyAdded?: boolean;
  mapCoordinates?: IMapCoordinatesItem[];
  quality?: string;
  description?: string;
  rarityNumber?: number;
  canBePlaced?: boolean;
  obtainable?: boolean;
  addedIn?: string;
  type?: string;
  tags?: ITagsItem[];
  maxStackSize?: number;
  sources?: ISources;
  buyable?: boolean;
  canBeSoldTo?: string[];
  sellable?: boolean;
  requiredFor?: IRequiredFor;
  storageCapacity?: number;
}
interface ICost {
  currency: ICurrency;
  amount: number;
  quantity: number;
}
interface IValue {
  currency: ICurrency;
  amount: number;
}
interface IMapCoordinatesItem {
  map: string;
  location: ILocation;
  outer: string;
}
interface ILocation {
  X: number;
  Y: number;
  Z: number;
}
interface ITag {
  key: string;
  name: string;
  nameNumbered: string;
  generated?: boolean;
  icon?: string;
}
interface ISubConditionsItem {
  type: string;
  dialogueType?: string;
  dialogue?: IDialogue;
  playerTag?: IPlayerTag;
  item?: IItem;
  gatherables?: string[];
  tag?: ITag;
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
  items?: IItemsItem[];
  books?: IBooksItem[];
  quests?: IQuestsItem[];
  levelerConfig?: string[];
  stores?: IStoresItem[];
  dialogues?: IDialoguesItem[];
  gatherables?: IGatherablesItem[];
  recipes?: IRecipesItem[];
  fishs?: IFishsItem[];
  shrineBundles?: string[];
  timedDrops?: string[];
}
interface IQuestsItem {
  key: string;
  name: string;
  description: string;
  icon: string;
  iconFolder: string;
  category: string;
  newlyAdded: boolean;
  addedIn: string;
}
interface IItemsItem {
  key?: string;
  name?: string;
  icon?: string;
  iconFolder?: string;
  category?: string;
  mapCoordinates?: IMapCoordinatesItem[];
  newlyAdded?: boolean;
  rarity?: string;
  cost?: ICost;
  value?: IValue;
  quality?: string;
  item?: IItem;
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
  addedIn?: string;
  metadata?: IMetadata;
}
interface IMailMessagesItem {
  key: string;
  name: string;
  icon?: string;
  iconFolder: string;
  metadata?: IMetadata;
  newlyAdded: boolean;
  addedIn?: string;
}
interface IMetadata {
  name: string;
  type: string;
}
interface IPlayerTagRequirementsItem {
  tag: ITag;
  min: number;
  max: number;
}
interface IBranchingGoalsItem {
  goals: IGoalsItem[];
  rewards: IRewardsItem[];
}
interface IBooksItem {
  key: string;
  name: string;
  metadata: IMetadata;
  newlyAdded: boolean;
}
interface IRecipe {
  key: string;
  item?: IItem;
  name: string;
  icon: string;
  iconFolder: string;
  rarity?: string;
  category?: string;
  quality?: string;
  cost?: ICost;
  newlyAdded?: boolean;
  addedIn?: string;
  metadata?: IMetadata;
  requires?: string;
  craftTime?: number;
  timeLimit?: number;
  enabled?: boolean;
  entityType?: string;
  description?: string;
  rarityNumber?: number;
  outputItem?: IOutputItem;
  outputQuantity?: number;
  allowedCrafters?: string[] | (string | null)[];
  showInCarousel?: boolean;
  visible?: boolean;
  alwaysAvailable?: boolean;
  ingredients?: IIngredientsItem[];
  steps?: IStepsItem[];
  sources?: ISources;
  obtainable?: boolean;
  type?: string;
  valueBasedProduction?: IValueBasedProductionItem[];
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
interface IFishsItem {
  key: string;
  fishLootTableEntries: IFishLootTableEntriesItem[];
  newlyAdded: boolean;
  addedIn: string;
}
interface IFishLootTableEntriesItem {
  fishLoot: IFishLoot;
  chance: IChance;
}
interface IFishLoot {
  key: string;
  name: string;
  waterType: string;
  coords: ICoordsItem[];
  newlyAdded: boolean;
  addedIn: string;
  baits?: IBaitsItem[];
}
interface ICoordsItem {
  outer: string;
  location: ILocation;
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
interface ICreature {
  key: string;
  name: string;
  newlyAdded: boolean;
  addedIn: string;
}
interface ITagsItem {
  key: string;
  name: string;
  nameNumbered: string;
  generated?: boolean;
  icon?: string;
}
interface ISkill {
  key: string;
  name: string;
  icon: string;
  iconFolder: string;
  store: IStore;
  villager?: IVillager;
  category: string;
  newlyAdded?: boolean;
  addedIn: string;
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
  type: string;
  villager?: IVillager;
  newlyAdded?: boolean;
  addedIn: string;
  items?: IItemsItem[];
  recipes?: IRecipesItem[];
  obtainable?: boolean;
  buyCategories?: string[];
  tagRequirements?: ITagRequirements;
  skill?: ISkill;
}
interface IVillagerItem {
  villager: IVillager;
}
interface IGiftPreferencesItem {
  item?: IItem;
  tags: ITagsItem[];
  isDefault: boolean;
  rewardLevel: string;
  rewardLevelNumber: number;
  isRomantic: boolean;
  rewardLevelIfInappropriate: string;
  preferenceWeight: number;
  isAlwaysOn: boolean;
  difficultyGrouping: string;
  goldValueMinimum: number;
  goldValueMaximum: number;
}
interface IRelationshipLevelsItem {
  level: number;
  type: string;
  requiredValue: number;
  levelName: string;
  levelDescription?: string;
}
interface IItemItem {
  item: IItem;
}
interface IStoresItem {
  key: string;
  name: string;
  type: string;
  newlyAdded: boolean;
  addedIn: string;
  villager?: IVillager;
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
  newlyAdded?: boolean;
  addedIn?: string;
  cost?: ICost;
  metadata?: IMetadata;
  recipe?: IRecipe;
  requirements?: IRequirements;
}
interface IRequiredFor {
  recipes?: IRecipesItem[];
}
interface IBaitsItem {
  key: string;
  name: string;
  icon: string;
  iconFolder: string;
  rarity: string;
  category: string;
  quality: string;
  mapCoordinates?: IMapCoordinatesItem[];
  newlyAdded: boolean;
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
  mapCoordinates?: IMapCoordinatesItem[];
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
  name: string;
  description: string;
  icon: string;
  iconFolder: string;
  maxStackSize: number;
  category: string;
  rarity: string;
  rarityNumber: number;
  quality: string;
  canBePlaced: boolean;
  cost: ICost;
  value: IValue;
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
interface IGatherableItem {
  gatherable: IGatherable;
}
interface IGatherable {
  key: string;
  mapCoordinates?: IMapCoordinatesItem[];
  items: IItemsItem[];
  skill: ISkill;
  name: string;
  description?: string;
  icon?: string;
  iconFolder?: string;
  type: string;
  rarity?: string;
  rarityNumber: number;
  starQualityChance?: number;
  finalRewardsLootBundle?: string;
  isGatherable: boolean;
  addedIn: string;
  obtainable?: boolean;
  requirements?: IRequirements;
  vitalRewardsLootBundle?: string;
  lootPerVitalAmount?: number;
  defaultItem?: string;
}
