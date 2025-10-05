import searchHistory from "@data/chatHistory";
import { format, isToday, isYesterday, parseISO, subDays } from "date-fns";

const useHistory = () => {
  // Sort and group history
  const today = new Date();
  const thirtyDaysAgo = subDays(today, 30);

  const groupedHistory = {
    today: searchHistory.filter((item) => isToday(parseISO(item.timestamp))),
    yesterday: searchHistory.filter((item) =>
      isYesterday(parseISO(item.timestamp))
    ),
    last30Days: searchHistory.filter(
      (item) =>
        parseISO(item.timestamp) >= thirtyDaysAgo &&
        !isToday(parseISO(item.timestamp)) &&
        !isYesterday(parseISO(item.timestamp))
    ),
    earlier: searchHistory.filter(
      (item) => parseISO(item.timestamp) < thirtyDaysAgo
    ),
  };
  return {groupedHistory, historyCount : searchHistory.length};
};

export default useHistory;
