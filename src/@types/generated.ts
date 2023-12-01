export interface IRootObject {
	search: ISearchItem[];
	"weekly-wants": IWeeklyWantsItem[];
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
export interface ISearchItem {
	key: string;
	name: string;
	type: string;
	icon: string;
	iconFolder: string;
	iconSize: number;
	newlyAdded: boolean;
}
export interface IWeeklyWantsItem {
	version?: number;
	entries?: IEntriesItem[];
	currentTime?: number;
	nextMonday?: number;
	item?: IItem;
	name?: string;
	rewardLevel?: string;
}
export interface IEntriesItem {
	villager: IVillager;
	weeklyWants: IWeeklyWantsItem[];
}
export interface IVillager {
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
export interface IItem {
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
export interface ICost {
	currency: ICurrency;
	amount: number;
	quantity: number;
}
export interface ICurrency {
	key: string;
	name: string;
	icon: string;
	type?: string;
	iconFolder: string;
	newlyAdded: boolean;
	addedIn: string;
}
export interface IValue {
	currency: ICurrency;
	amount: number;
}
export interface INowItem {
	limitedEvents: any[];
	fishs: IFishsItem[];
}
export interface IFishsItem {
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
export interface IVillagerItem {
	villager: IVillager;
}
export interface IFriendshipPoints {
	0: number;
	1: number;
	2: number;
	3: number;
	4: number;
}
export interface IRomancePoints {
	0: number;
	1: number;
	2: number;
	3: number;
	4: number;
}
export interface IGiftPreferencesItem {
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
export interface ITagsItem {
	key: string;
	name: string;
	nameNumbered: string;
	icon?: string;
	generated?: boolean;
}
export interface IRelationshipLevelsItem {
	level: number;
	type: string;
	requiredValue: number;
	levelName: string;
	levelDescription?: string;
}
export interface IQuestsItem {
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
export interface IWeeklyGiftPreferencesItem {
	item: IItem;
	name: string;
	rewardLevel: string;
}
export interface IMapCoordinates {
	Village?: IVillage;
	processed?: boolean;
	AZ1?: IAZ1;
	null?: {
		key: null;
		coords: ICoordsItem[];
	};
	Events?: IEvents;
}
export interface IVillage {
	key: string;
	coords: ICoordsItem[];
	title: string;
	tiles: string;
}
export interface ICoordsItem {
	x: number;
	y: number;
	z: number;
	title: string;
	map: string | null;
}
export interface IAZ1 {
	key: string;
	coords: ICoordsItem[];
	title: string;
	tiles: string;
}
export interface IBundleItem {
	bundle: IBundle;
}
export interface IBundle {
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
export interface IRewardsItem {
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
export interface ITag {
	key: string;
	name: string;
	nameNumbered: string;
	generated?: boolean;
	icon?: string;
}
export interface ISubBundlesItem {
	name: string;
	requiredItems: IRequiredItemsItem[];
	rewards: IRewardsItem[];
}
export interface IRequiredItemsItem {
	item: IItem;
	amount: number;
	starQuality: number;
}
export interface IRecipe {
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
export interface IQuestItem {
	quest: IQuest;
	status?: string;
	step?: number;
}
export interface IQuest {
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
export interface IStepsItem {
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
export interface IGoalsItem {
	condition?: ICondition | null;
	description?: string;
	showCountType: string;
	hide: boolean;
	mapCoordinates?: IMapCoordinates;
}
export interface ICondition {
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
export interface ITurnInDialogue {
	dialogue?: IDialogue;
}
export interface IDialogue {
	key: string;
	name: string;
	icon: string;
	iconFolder: string;
	villager: IVillager;
	text?: string;
	newlyAdded: boolean;
	addedIn: string;
}
export interface IStarters {
	dialogues?: IDialoguesItem[];
	quests?: IQuestsItem[];
	items?: IItemsItem[];
	mailMessages?: IMailMessagesItem[];
	books?: IBooksItem[];
	fishs?: IFishsItem[];
}
export interface IDialoguesItem {
	key: string;
	name: string;
	icon: string;
	iconFolder: string;
	villager: IVillager;
	newlyAdded: boolean;
	addedIn: string;
	text?: string;
}
export interface ISubConditionsItem {
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
export interface IPlayerTag {
	key: string;
	name: string;
	nameNumbered: string;
	generated: boolean;
}
export interface ISources {
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
export interface IItemsItem {
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
export interface IMailMessage {
	key: string;
	name: string;
	icon?: string;
	iconFolder: string;
	newlyAdded: boolean;
	addedIn: string;
}
export interface IMailMessagesItem {
	key: string;
	name: string;
	icon?: string;
	iconFolder: string;
	newlyAdded: boolean;
	addedIn: string;
}
export interface IBranchingGoalsItem {
	goals: IGoalsItem[];
	rewards?: IRewardsItem[];
}
export interface IPlayerTagRequirementsItem {
	tag: ITag;
	min: number;
	max: number;
}
export interface IBooksItem {
	key: string;
	name: string;
	icon: string;
	iconFolder: string;
	mapCoordinates?: IMapCoordinates;
	newlyAdded: boolean;
	addedIn: string;
}
export interface ICreatureTag {
	key: string;
	name: string;
	nameNumbered: string;
	generated?: boolean;
}
export interface IStartRewardsItem {
	type: string;
	item?: IItem;
	starQuality?: boolean;
	amount: number;
	tag?: ITag;
	operation?: string;
}
export interface IItemTag {
	key: string;
	name: string;
	nameNumbered: string;
	icon?: string;
	generated?: boolean;
}
export interface IFishLootTableEntriesItem {
	fishLoot: IFishLoot;
	chance: IChance;
}
export interface IFishLoot {
	key: string;
	name: string;
	waterType: string;
	mapCoordinates?: IMapCoordinates;
	newlyAdded: boolean;
	addedIn: string;
	baits?: IBaitsItem[];
}
export interface IChance {
	fishKey: string;
	timeOfDay: ITimeOfDay;
	requirements?: IRequirements;
	weigth: number;
	rate: number;
}
export interface ITimeOfDay {
	periods: string[];
}
export interface IRequirements {
	playerTag?: IPlayerTagItem[];
	weather?: string[];
	quest?: IQuestItem[];
	items?: IItemsItem[];
	timeOfDay?: ITimeOfDay;
	recipe?: IRecipeItem[];
	accomplishment?: string[];
}
export interface IPlayerTagItem {
	tag: string;
	min: number;
	max: number;
}
export interface IBaitsItem {
	key: string;
	name: string;
	icon: string;
	iconFolder: string;
	rarity: string;
	category: string;
	quality: string;
	newlyAdded: boolean;
}
export interface ICreature {
	key: string;
	name: string;
	newlyAdded: boolean;
	addedIn: string;
}
export interface IEvents {
	key: string;
	coords: ICoordsItem[];
	title: string;
	tiles: string;
}
export interface ISkill {
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
export interface IStore {
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
export interface IBundlesItem {
	key: string;
	name: string;
	icon: string;
	iconFolder: string;
	type: string;
	newlyAdded: boolean;
	addedIn: string;
}
export interface IStoresItem {
	key: string;
	name: string;
	type: string;
	newlyAdded: boolean;
	addedIn: string;
	icon?: string;
	iconFolder?: string;
	villager?: IVillager;
}
export interface IItemItem {
	item: IItem;
}
export interface INameLocalized {
	de?: string;
	en?: string;
	es?: string;
	fr?: string;
	it?: string;
}
export interface IDescriptionLocalized {
	de?: string;
	en?: string;
	es?: string;
	fr?: string;
	it?: string;
}
export interface IConsumeRewardsItem {
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
export interface IRequiredFor {
	books?: IBooksItem[];
	recipes?: IRecipesItem[];
	accomplishments?: IAccomplishmentsItem[];
	quests?: IQuestsItem[];
	questStarters?: IQuestStartersItem[];
	fishs?: IFishsItem[];
}
export interface IGatherablesItem {
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
export interface IRecipesItem {
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
export interface IAccomplishmentsItem {
	key: string;
	icon: string;
	iconFolder: string;
	name: string;
	category?: string;
}
export interface IQuestStartersItem {
	key: string;
	name: string;
	description: string;
	icon: string;
	iconFolder: string;
	category: string;
	addedIn: string;
	newlyAdded: boolean;
}
export interface IGardenBuffLocalized {
	de?: string;
	en: string;
	es: string;
	fr?: string;
	it: string;
}
export interface IHarvestItem {
	item: IItem | string;
	harvestAmount: number;
	boostAmount: number;
}
export interface ILootBundle {
	key: string;
	lootPools: ILootPoolsItem[];
	newlyAdded: boolean;
	addedIn: string;
}
export interface ILootPoolsItem {
	key: string;
	loots: ILootsItem[];
}
export interface ILootsItem {
	weight: number;
	requirements: IRequirements;
	item?: IItem;
	itemAmount: number;
	qualityStars: number;
	dropChance: number;
}
export interface IRecipeItem {
	recipe: IRecipe;
}
export interface IOutputItem {
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
export interface IIngredientsItem {
	type: string;
	quantity: number;
	item?: IItem;
	tagReplaced?: boolean;
	tag?: ITag;
}
export interface IValueBasedProductionItem {
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
export interface ISkillItem {
	skill: ISkill;
}
export interface IStoreItem {
	store: IStore;
}
export interface ITagRequirements {
	timeOfDay?: ITimeOfDay;
	playerTag?: IPlayerTagItem[];
}
export interface IPurchaseLimits {
	tag: ITag;
	min: number;
	max: number;
}
export interface ICostTableItem {
	quantity: number;
	amount: number;
}
export interface IAdditionalCostsItem {
	item: IItem;
	amount: number;
}
export interface IAccomplishmentItem {
	accomplishment: IAccomplishment;
}
export interface IAccomplishment {
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
export interface IUnlockedDescriptionLocalized {
	de?: string;
	en?: string;
	es?: string;
	fr?: string;
	it?: string;
}
export interface IRequirement {
	type: string;
	items?: IItemsItem[];
	amount?: number | null;
	quest?: IQuest;
	currency?: ICurrency;
	creatures?: number[];
	vital?: string;
	tag?: ITag;
}
export interface IGatherableItem {
	gatherable: IGatherable;
}
export interface IGatherable {
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
