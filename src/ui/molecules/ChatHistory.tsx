import { useConversationHistory } from "@src/hooks/useChatAPI";
import useGroupHistory from "@src/hooks/useGroupHistory";
import { IConversationHistory } from "@src/lib/chat-service";
import { format, parseISO } from "date-fns";
import { SimpleErrorUI } from "../atoms/errorUI";
import { useConversationContext } from "@src/contexts/ConversationContext";
import { useSidebar } from "@src/contexts/SidebarContext";
import Link from 'next/link'
// Function to format UTC timestamp
const formatTimestamp = (utcTimestamp: string) => {
  const date = parseISO(utcTimestamp); // Parse UTC timestamp
  return format(date, "h:mm a"); // e.g., "11:45 PM"
};

// Function to format full date for older entries
const formatFullDate = (utcTimestamp: string) => {
  const date = parseISO(utcTimestamp);
  return format(date, "MMM d, yyyy, h:mm a"); // e.g., "Sep 28, 2025, 2:15 PM"
};

const SearchSection = ({
  title,
  items,
}: {
  title: string;
  items: IConversationHistory[];
}) => {

  const {
    closeSidebar,
 
  } = useSidebar();


  if (!items.length) return null;
  return (
    <div className="mb-6 font-nunito text-gray-700 dark:text-zinc-200 "
    
    >
      <h4 className="text-sm font-semibold mb-2">{title}</h4>
      <div className="space-y-1">
        {items.map((item, index) => (
          <Link key={index}
          href={`/chat/${item.conversationId}`} className="text-sm cursor-pointer"
        //   onClick={closeSidebar}
          >
            <span className="block truncate">
              {item.lastUserMessage.substring(0, 50)}
            </span>
            <span className="block text-gray-400 text-xs">
              {title === "Earlier"
                ? formatFullDate(item.updatedAt)
                : formatTimestamp(item.updatedAt)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};


const LoadingChatHistoryUI =  () => <div className="mb-6 font-nunito text-gray-700 dark:text-zinc-200">
<div className="text-sm font-semibold mb-2">
  {/* Skeleton for title */}
  <div className="h-4 bg-gray-300 dark:bg-zinc-700 rounded w-1/4 animate-pulse"></div>
</div>
<div className="space-y-1">
  {/* Skeleton items */}
  {Array.from({ length: 3 }).map((_, index) => (
    <div key={index} className="text-sm">
      {/* Skeleton for message text */}
      <div className="h-4 bg-gray-200 dark:bg-zinc-600 rounded w-full mb-1 animate-pulse"></div>
      {/* Skeleton for timestamp */}
      <div className="h-3 bg-gray-200 dark:bg-zinc-600 rounded w-1/3 animate-pulse"></div>
    </div>
  ))}
</div>
</div>
export const ChatHistory = () => {

    const { 
        data , isLoading, error 
    } = useConversationHistory(); 
  
    const { groupedHistory, historyCount } = useGroupHistory(data||[]);
    
    if (isLoading) {
    return <LoadingChatHistoryUI />;
  }

  if (error) {
    return (
      <SimpleErrorUI
        message={
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (error as any)?.response?.data?.message ||
          "Error loading history, kindly try again later."
        }
      />
    );
  }
  if (!data) {
    return <SimpleErrorUI message="No history data available." />;
  }


  return (
    <div className="">
      {/* chat history */}
      <p className="font-semibold text-gray-700 dark:text-zinc-300 font-nunito">
        Chat History
      </p>

      <div className="mt-4 px-2 h-[58vh] overflow-y-scroll glass-scrollbar ">
        <SearchSection title={"Today"} items={groupedHistory.today} />
        <SearchSection title={"Yesterday"} items={groupedHistory.yesterday} />
        <SearchSection
          title={"Last 30 Days"}
          items={groupedHistory.last30Days}
        />
        <SearchSection title={"Earlier"} items={groupedHistory.earlier} />
        {!historyCount && (
          <p className="text-gray-600  my-4">
            No search history yet.
          </p>
        )}
      </div>
    </div>
  );
};
