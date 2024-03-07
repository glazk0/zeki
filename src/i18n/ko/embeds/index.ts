import { NamespaceEmbedsTranslation } from "../../i18n-types";

const ko_embeds: NamespaceEmbedsTranslation = {
	help: {
		title: "{username}의 명령어",
		description: "여기에는 제 모든 명령어 목록이 있습니다. Discord에서 `/`을 입력하면 목록을 볼 수도 있습니다.",
	},
	about: {
		description: "{username}은(는) https://paliapedia.com에 연결된 직관적이고 사용자 친화적인 Discord 봇으로, {developers}에 의해 만들어졌습니다.",
		statistics_name: "통계",
		statistics_value: "서버: {servers}\n사용자: {users}",
		debug_name: "Debug",
		debug_value: "Shards: {shards}\nShardID: {shardId}",
	},
	item: {
		category: "카테고리",
		rarity: "희귀도",
		quality: "품질",
		cost: "비용",
		value: "가치",
		sold_at: "판매처",
		crafted_by: "제작자",
		gathered_from: "획득처",
		quest_reward_from: "퀘스트 보상",
		attached_to: "부착됨",
		obtained_by_reading: "읽어서 얻음",
		reward_from: "보상",
		obtained_from: "획득처",
		ingredient_for_recipe: "레시피 재료",
		needed_for_quest: "퀘스트에 필요",
		contains_item: "아이템 포함",
	},
	quest: {
		starts_with: "시작 조건",
		requirement: "요구 사항",
		requirements: "요구 사항",
		branching_goals: "다음 중 {count}개를 완료하세요",
		turn_in: "제출",
		quest_return: "퀘스트 반환",
		reward: "보상",
		rewards: "보상",
		friendship_points: "{villager}과(와)의 우정 포인트 x{amount}",
		romance_points: "{villager}과(와)의 로맨스 포인트 x{amount}",
		mail_message: "{villager}의 편지",
		visit_from: "{villager}의 방문",
	},
	recipe: {
		cost: "비용",
		craft_time: "제작 시간",
		required_ingredients: "필요한 재료",
		produces: "생산물",
		sold_at: "판매처",
		vendors: "상인",
		gatherables: "채집 가능 아이템",
		mail: "우편",
		recipes: "레시피",
	},
	villager: {
		gift_preferences: "선물 선호도",
		weekly_wants: "주간 원하는 것",
		relationship: "{type} 레벨 {level} - {levelName} (필요한 값: {requiredValue})",
	},
	weekly_wants: {
		title: "주간 원하는 것 로테이션",
		description: "{date}의 주간 원하는 것 로테이션이 이제 사용 가능합니다! 전체 주간 원하는 것 목록은 {url}에서 확인할 수 있습니다.",
	},
	miscellaneous: {
		see_more: "{count}개 더 보기...",
		no_data: "데이터 없음.",
	},
};

export default ko_embeds;
