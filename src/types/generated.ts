interface IRootObject {
  search: ISearchItem[];
  item: IItemItem[];
  quest: IQuestItem[];
  villager: IVillagerItem[];
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
}
interface IItemItem {
  item: IItem;
}
interface IItem {
  key: string;
  name: string;
  description?: string;
  icon?: string;
  iconFolder: string;
  category?: string;
  rarityNumber?: number;
  canBePlaced?: boolean;
  craftable?: boolean;
  gatherable?: boolean;
  buyable?: boolean;
  obtainable?: boolean;
  canBeSoldTo?: string[];
  addedIn?: string;
  type?: string;
  tags?: ITagsItem[];
  maxStackSize?: number;
  rarity?: string;
  cost?: ICost;
  sources?: ISources;
  value?: IValue;
  quality?: string;
  sourceOf?: ISourceOf;
  mapCoordinates?: IMapCoordinatesItem[];
  storageCapacity?: number;
  purchaseLimits?: IPurchaseLimits;
  costTable?: ICostTableItem[];
  metadata?: IMetadata;
}
interface ITagsItem {
  key: string;
  name: string;
  nameNumbered: string;
  generated?: boolean;
  icon?: string;
}
interface ICost {
  currency: ICurrency;
  amount: number;
  quantity: number;
  minAmount?: number;
  maxAmount?: number;
}
interface ICurrency {
  key: string;
  name: string;
  icon: string;
  type?: string;
  iconFolder: string;
  addedIn: string;
}
interface ISources {
  stores?: IStoresItem[];
  dialogues?: IDialoguesItem[];
  gatherables?: IGatherablesItem[];
  mailMessages?: IMailMessagesItem[];
  recipes?: IRecipesItem[];
  interactables?: string[];
  items?: IItemsItem[];
  books?: IBooksItem[];
}
interface IStoresItem {
  key: string;
  name: string;
  type: string;
  villager?: IVillager;
  addedIn: string;
}
interface IVillager {
  key: string;
  name: string;
  icon?: string;
  iconFolder: string;
  addedIn: string;
  isVisibleInUi?: boolean;
  description?: string;
  isVisible?: boolean;
  canAcceptGifts?: boolean;
  friendshipLevelNecessaryForRomance?: number;
  relationshipDifficulty?: string;
  giftPreferences?: IGiftPreferencesItem[];
  relationshipLevels?: IRelationshipLevelsItem[];
  type?: string;
  rarity?: string;
  isRomanceable?: boolean;
}
interface IDialoguesItem {
  key: string;
  name: string;
  iconFolder: string;
  villager: IVillager;
  icon?: string;
  addedIn?: string;
  text?: string;
}
interface IValue {
  currency: ICurrency;
  amount: number;
}
interface IGatherablesItem {
  key: string;
  name: string;
  type?: string;
  skill: ISkill;
  addedIn: string;
  rarity?: string;
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
  addedIn: string;
  type?: string;
  currency?: ICurrency;
  levelToDisplayCurrency?: number;
  xpRequiredPerLevel?: string;
  description?: string;
}
interface IStore {
  key: string;
  name: string;
  type: string;
  villager?: IVillager;
  addedIn: string;
  items?: IItemsItem[];
  recipes?: IRecipesItem[];
  buyCategories?: string[];
  tagRequirements?: ITagRequirements;
  skill?: ISkill;
  sourceOf?: ISourceOf;
}
interface IMailMessagesItem {
  key: string;
  name: string;
  icon?: string;
  iconFolder: string;
  addedIn: string;
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
  addedIn?: string;
  cost?: ICost;
  recipe?: IRecipe;
  requirements?: IRequirements;
}
interface ISourceOf {
  items?: IItemsItem[];
  recipes?: IRecipesItem[];
}
interface IItemsItem {
  key?: string;
  name?: string;
  icon?: string;
  iconFolder?: string;
  category?: string;
  mapCoordinates?: IMapCoordinatesItem[];
  rarity?: string;
  item?: IItem;
  requirements?: IRequirements;
  purchaseLimits?: IPurchaseLimits;
  costTable?: ICostTableItem[];
  additionalCosts?: IAdditionalCostsItem[];
  cost?: ICost;
  quality?: string;
}
interface IMapCoordinatesItem {
  type: string;
  name: string;
  map: string;
  location: ILocation;
}
interface ILocation {
  X: number;
  Y: number;
  Z: number;
}
interface IPurchaseLimits {
  tag: ITag;
  min: number;
  max: number;
}
interface ITag {
  key: string;
  name: string;
  nameNumbered: string;
  generated?: boolean;
  icon?: string;
}
interface ICostTableItem {
  quantity: number;
  amount: number;
}
interface IMetadata {
  name: string;
}
interface IBooksItem {
  key: string;
  name: string;
  addedIn: string;
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
  steps?: IStepsItem[];
  starters?: IStarters;
  startable?: boolean;
  addedIn: string;
  type?: string;
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
}
interface ICondition {
  type: string;
  quest?: IQuest;
  dialogueType?: string;
  dialogue?: IDialogue;
  item?: IItem;
  amountRequired?: number;
  playerTag?: IPlayerTag;
  hasUpperLimit?: boolean;
  upperLimit?: number;
  mailMessage?: IMailMessage;
  villager?: IVillager;
  currency?: ICurrency;
  acquireMethod?: number;
  recipe?: IRecipe;
  creatureTag?: ICreatureTag;
  itemTag?: IItemTag;
  deductOnComplete?: boolean;
  releaseMethod?: number;
  subConditions?: ISubConditionsItem[];
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
  mail?: string;
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
  addedIn?: string;
}
interface IStarters {
  dialogues?: IDialoguesItem[];
  items?: IItemsItem[];
  mailMessages?: IMailMessagesItem[];
  books?: IBooksItem[];
}
interface IPlayerTag {
  key: string;
  name: string;
  nameNumbered: string;
  generated: boolean;
}
interface IMailMessage {
  key: string;
  name: string;
  icon: string;
  iconFolder: string;
  addedIn: string;
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
  addedIn: string;
  requires?: string;
  craftTime?: number;
  timeLimit?: number;
  enabled?: boolean;
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
  entityType?: string;
  description?: string;
  rarityNumber?: number;
  type?: string;
  buyable?: boolean;
  gatherable?: boolean;
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
interface ISubConditionsItem {
  type: string;
  item?: IItem;
  amountRequired?: number;
  playerTag?: IPlayerTag;
  quest?: IQuest;
  dialogueType?: string;
  dialogue?: IDialogue;
}
interface ICreature {
  key: string;
  name: string;
  addedIn: string;
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
  levelDescription: string;
}
interface IRecipeItem {
  recipe?: IRecipe;
}
interface IOutputItem {
  key: string;
  name: string;
  icon: string;
  iconFolder: string;
  rarity?: string;
  category?: string;
  quality?: string;
  cost?: ICost;
}
interface IIngredientsItem {
  type: string;
  quantity: number;
  item?: IItem;
  tagReplaced?: boolean;
  tag?: ITag;
}
interface ISkillItem {
  skill: ISkill;
}
interface IStoreItem {
  store: IStore;
}
interface IRequirements {
  timeOfDay?: ITimeOfDay;
  playerTag?: IPlayerTagItem[];
  recipe?: IRecipeItem[];
  accomplishment?: string[];
  quest?: IQuestItem[];
}
interface ITimeOfDay {
  periods: number;
}
interface ITagRequirements {
  timeOfDay?: ITimeOfDay;
  playerTag?: IPlayerTagItem[];
}
interface IPlayerTagItem {
  tag: string;
  min: number;
  max: number;
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
  items: IItemsItem[];
  skill: ISkill;
  name: string;
  description?: string;
  icon?: string;
  iconFolder?: string;
  rarity?: string;
  rarityNumber: number;
  creature?: ICreature;
  starQualityChance?: number;
  starQualityGatherable?: string;
  finalRewardsLootBundle?: string;
  type?: string;
  addedIn: string;
  requirements?: IRequirements;
  vitalRewardsLootBundle?: string;
  lootPerVitalAmount?: number;
  defaultItem?: string;
}
