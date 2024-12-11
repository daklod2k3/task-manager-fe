"use client";
import { sendDirectMessage } from "@/action/Message";
import MyAvatar from "@/components/Avatar";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tables } from "@/entity/database.types";
import useChannel from "@/hooks/use-channel";
import useDirectMessage from "@/hooks/use-direct-message";
import { usePeople } from "@/hooks/use-people";
import { useToast } from "@/hooks/use-toast";
import useUser from "@/hooks/use-user";
import { cn, getUserId } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBrowserClient } from "@supabase/ssr";
import { Loader2, Send } from "lucide-react";
import { Suspense, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

async function getChannels() {
  // In a real app, this would be an API call
  return [
    { id: "general", name: "General" },
    { id: "random", name: "Random" },
    { id: "work", name: "Work Stuff" },
  ];
}

function ChatMessage({
  message,
  to_id,
}: {
  message: Tables<"user_message">;
  to_id: string;
}) {
  const date = new Date(message.created_at);
  const now = new Date();
  // if (date.getFullYear() == date.getFullYear() && date.getMonth() == now.getMonth() && date.getDate() == now.getDate())
  // if (date.toDateString() == now.toDateString())
  const scrollRef = useChatScroll(message);

  return (
    <div
      ref={scrollRef}
      className={cn(
        "flex items-start gap-2 p-4",
        message.to_id == to_id && "flex-row-reverse",
      )}
    >
      <MyAvatar user={message.from} />
      <div>
        <div
          className={cn(
            "flex items-center gap-2",
            message.to_id == to_id && "flex-row-reverse",
          )}
        >
          <span className="text-sm font-semibold">{message.from.name}</span>
          <span className="text-xs text-gray-500">
            {date.toDateString() == now.toDateString()
              ? date.toLocaleTimeString()
              : date.toLocaleString()}
          </span>
        </div>
        <p
          className={cn(
            "mt-1 w-fit break-all rounded-[18px] bg-primary px-4 py-1 text-white",
            message.to_id == to_id && "ml-auto",
          )}
        >
          {message.content}
        </p>
      </div>
    </div>
  );
}

function useChatScroll<T>(
  dep: T,
): React.MutableRefObject<HTMLDivElement | null> {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView(false);
    }
  }, [dep]);
  return ref;
}

export default function ChatPage({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const { data: sender } = usePeople({ id: id, includes: "Role" });

  const {
    data: messages,
    mutate,
    isLoading,
  } = useDirectMessage({
    id: id,
  });

  const sendMessSchema = z.object({
    from_id: z.string(),
    to_id: z.string(),
    content: z.string(),
  });

  // const { data: user } = useUser({});
  const { mutate: mutateList } = useDirectMessage({});

  const { toast } = useToast();
  const [sendLoading, setSendLoading] = useState(false);
  const scrollRef = useChatScroll(messages);

  const form = useForm<z.infer<typeof sendMessSchema>>({
    resolver: zodResolver(sendMessSchema),
    defaultValues: {
      from_id: id,
      to_id: id,
      content: "",
    },
  });

  useEffect(() => {
    const supabase = createClient();
    // Get Channels
    // Listen for new and deleted messages
    const messageListener = supabase
      .channel("public:user_messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "user_message" },
        (payload) => {
          mutate();
          console.log(payload);
        },
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "user_message" },
        (payload) => mutate(),
      )
      .subscribe();
    // Listen for changes to our users
    const userListener = supabase
      .channel("public:users")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "user_message" },
        (payload) => mutate(),
      )
      .subscribe();
    // Listen for new and deleted channels
    // const channelListener = supabase
    //   .channel("public:channels")
    //   .on(
    //     "postgres_changes",
    //     { event: "INSERT", schema: "public", table: "channels" },
    //     (payload) => handleNewChannel(payload.new),
    //   )
    //   .on(
    //     "postgres_changes",
    //     { event: "DELETE", schema: "public", table: "channels" },
    //     (payload) => handleDeletedChannel(payload.old),
    //   )
    //   .subscribe();
    // Cleanup on unmount
    return () => {
      supabase.removeChannel(messageListener);
      supabase.removeChannel(userListener);
      // supabase.removeChannel(supabase.channel(channelListener));
    };
  }, []);

  const onSendMess = async (data: z.infer<typeof sendMessSchema>) => {
    setSendLoading(true);
    const res = await sendDirectMessage(data);
    console.log(res);

    if (res.error) {
      toast({
        title: "Send message failed",
        description: res.error || "Unknown error",
        variant: "destructive",
      });
    }
    form.reset();
    mutateList();
    await mutate();
    setSendLoading(false);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="border-b p-4 text-primary shadow-lg">
        <h1 className="text-xl font-semibold">
          <MyAvatar user={sender} includeInfo />
        </h1>
      </header>

      <div className="flex h-full min-h-0 flex-col">
        <ScrollArea className="flex-grow bg-white" ref={scrollRef}>
          <Suspense fallback={<div>Loading messages...</div>}>
            {messages.map((message) => (
              <ChatMessage to_id={id} key={message.id} message={message} />
            ))}
          </Suspense>
        </ScrollArea>
        <div className="border-t p-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSendMess)}
              className="flex size-full space-x-2"
            >
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        {...field}
                        disabled={sendLoading}
                        className="bg-white"
                        placeholder="Type a message..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">
                {sendLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send message</span>
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
