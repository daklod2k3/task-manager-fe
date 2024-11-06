import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { Suspense } from "react";

async function getChannels() {
  // In a real app, this would be an API call
  return [
    { id: "general", name: "General" },
    { id: "random", name: "Random" },
    { id: "work", name: "Work Stuff" },
  ];
}

async function getMessages(channelId: string) {
  // In a real app, this would be an API call
  return [
    {
      id: "1",
      user: "Alice",
      content: "Hey everyone!",
      timestamp: "2023-09-24T10:00:00Z",
    },
    {
      id: "2",
      user: "Bob",
      content: "Hi Alice!",
      timestamp: "2023-09-24T10:01:00Z",
    },
    {
      id: "3",
      user: "Charlie",
      content: "How's it going?",
      timestamp: "2023-09-24T10:02:00Z",
    },
  ];
}

function ChatMessage({
  message,
}: {
  message: { user: string; content: string; timestamp: string };
}) {
  return (
    <div className="mb-4 flex items-start space-x-4">
      <Avatar>
        <AvatarImage
          src={`/placeholder.svg?height=40&width=40`}
          alt={message.user}
        />
        <AvatarFallback>{message.user[0]}</AvatarFallback>
      </Avatar>
      <div>
        <div className="flex items-center space-x-2">
          <span className="font-semibold">{message.user}</span>
          <span className="text-xs text-gray-500">
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
        </div>
        <p className="mt-1">{message.content}</p>
      </div>
    </div>
  );
}

function ChatArea({ channelId }: { channelId: string }) {
  return (
    <div className="flex h-full flex-col">
      <ScrollArea className="flex-grow bg-white p-4">
        <Suspense fallback={<div>Loading messages...</div>}>
          <ChatMessages channelId={channelId} />
        </Suspense>
      </ScrollArea>
      <div className="border-t p-4">
        <form className="flex space-x-2">
          <Input className="bg-white" placeholder="Type a message..." />
          <Button type="submit">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  );
}

async function ChatMessages({ channelId }: { channelId: string }) {
  const messages = await getMessages(channelId);
  return (
    <>
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
    </>
  );
}

export default async function ChatPage() {
  const channels = await getChannels();
  const defaultChannel = channels[0];

  return (
    <div className="flex h-full flex-col">
      <header className="border-b p-4 text-primary shadow">
        <h1 className="text-xl font-semibold">#{defaultChannel.name}</h1>
      </header>
      <ChatArea channelId={defaultChannel.id} />
    </div>
  );
}
