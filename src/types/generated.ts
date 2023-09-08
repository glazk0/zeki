interface IRootObject {
  search: ISearchItem[];
  villager: IVillagerItem[];
  quest: IQuestItem[];
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
interface IVillagerItem {
  villager: IVillager;
}
interface IVillager {
  key: string;
  persistId?: number;
  entityType?: string;
  name: string;
  isVisibleInUi?: boolean;
  description?: string;
  icon?: string;
  iconFolder: string;
  isVisible?: boolean;
  canAcceptGifts?: boolean;
  friendshipLevelNecessaryForRomance?: number;
  relationshipDifficulty?: string;
  friendshipPoints?: IFriendshipPoints;
  romancePoints?: IRomancePoints;
  giftPreferences?: IGiftPreferencesItem[];
  relationshipLevels?: IRelationshipLevelsItem[];
  obtainable?: boolean;
  weeklyGiftPreferences?: IWeeklyGiftPreferencesItem[];
  addedIn: string;
  type?: string;
  rarity?: string;
  isRomanceable?: boolean;
  newlyAdded?: boolean;
  id?: number;
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
interface IItem {
  key: string;
  name: string;
  icon?: string;
  iconFolder: string;
  rarity?: string;
  category?: string;
  quality?: string;
  value?: IValue;
  newlyAdded?: boolean;
  cost?: ICost;
  mapCoordinates?: IMapCoordinates;
  entityType?: string;
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
interface IValue {
  currency: ICurrency;
  amount: number;
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
interface ICost {
  currency: ICurrency;
  amount: number;
  quantity: number;
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
interface IWeeklyGiftPreferencesItem {
  item: IItem;
  name: string;
  rewardLevel: string;
}
interface IMapCoordinates {
  Village?: IVillage;
  processed: boolean;
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
  mapCoordinates?: IMapCoordinates;
}
interface ICondition {
  type?: string;
  quest?: IQuest;
  dialogueType?: string;
  dialogue?: IDialogue;
  item?: IItem;
  amountRequired?: number;
  tag?: ITag;
  mapCoordinates?: IMapCoordinates;
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
  mapCoordinates?: IMapCoordinates;
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
  entityType?: string;
  requires?: string;
  craftTime?: number;
  timeLimit?: number;
  enabled?: boolean;
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
  mapCoordinates: IMapCoordinates;
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
  newlyAdded?: boolean;
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
  type: string;
  villager?: IVillager;
  newlyAdded?: boolean;
  addedIn: string;
  entityType?: string;
  items?: IItemsItem[];
  recipes?: IRecipesItem[];
  obtainable?: boolean;
  buyCategories?: string[];
  tagRequirements?: ITagRequirements;
  skill?: ISkill;
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
  quests?: IQuestsItem[];
  questStarters?: IQuestStartersItem[];
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
interface IQuestStartersItem {
  key: string;
  name: string;
  description: string;
  icon: string;
  iconFolder: string;
  category: string;
  newlyAdded: boolean;
  addedIn: string;
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
