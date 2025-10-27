import { IConversationHistory } from "@src/lib/chat-service";
import {  isToday, isYesterday, parseISO, subDays } from "date-fns";

const useGroupHistory = (searchHistory:IConversationHistory[]) => {
  // Sort and group history
  const today = new Date();
  const thirtyDaysAgo = subDays(today, 30);

  const groupedHistory = {
    today: searchHistory.filter((item) => isToday(parseISO(item.updatedAt))),
    yesterday: searchHistory.filter((item) =>
      isYesterday(parseISO(item.updatedAt))
    ),
    last30Days: searchHistory.filter(
      (item) =>
        parseISO(item.updatedAt) >= thirtyDaysAgo &&
        !isToday(parseISO(item.updatedAt)) &&
        !isYesterday(parseISO(item.updatedAt))
    ),
    earlier: searchHistory.filter(
      (item) => parseISO(item.updatedAt) < thirtyDaysAgo
    ),
  };
  return {groupedHistory, historyCount : searchHistory.length};
};

export default useGroupHistory;
