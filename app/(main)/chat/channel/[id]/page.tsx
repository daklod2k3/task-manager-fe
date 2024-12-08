"use client";
import { sendChannelMessage } from "@/action/Message";
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
import { usePeople } from "@/hooks/use-people";
import { useToast } from "@/hooks/use-toast";
import useUser from "@/hooks/use-user";
import { cn, getUserId } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBrowserClient } from "@supabase/ssr";
import { Hash, Loader2, Send } from "lucide-react";
import { Suspense, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

function ChatMessage({ message }: { message: Tables<"channel_message"> }) {
  const date = new Date(message.created_at);
  const now = new Date();
  // if (date.getFullYear() == date.getFullYear() && date.getMonth() == now.getMonth() && date.getDate() == now.getDate())
  // if (date.toDateString() == now.toDateString())
  const scrollRef = useChatScroll(message);

  return (
    <div ref={scrollRef} className={cn("flex items-start gap-2 p-4")}>
      <MyAvatar user={message.created_by_navigation} />
      <div>
        <div className={cn("flex items-center gap-2")}>
          <span className="text-sm font-semibold">
            {message.created_by_navigation?.name}
          </span>
          <span className="text-xs text-gray-500">
            {date.toDateString() == now.toDateString()
              ? date.toLocaleTimeString()
              : date.toLocaleString()}
          </span>
        </div>
        <p
          className={cn(
            "mt-1 w-fit break-all rounded-[18px] bg-primary px-4 py-1 text-white",
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
  const {
    data: channel,
    mutate,
    isLoading,
  } = useChannel<Tables<"channels">>({
    id: id,
    includes: "Department,ChannelMessages.CreatedByNavigation",
  });
  const messages = channel?.channel_messages;
  console.log(messages);

  const sendMessSchema = z.object({
    channel_id: z.string(),
    created_by: z.string(),
    content: z.string(),
  });

  const { data: user } = useUser({});

  const { toast } = useToast();
  const [sendLoading, setSendLoading] = useState(false);
  const scrollRef = useChatScroll(messages);

  const form = useForm<z.infer<typeof sendMessSchema>>({
    resolver: zodResolver(sendMessSchema),
    defaultValues: {
      channel_id: id,
      created_by: "a2766a49-b01f-4a7a-8b60-8e3627a33c22",
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
        { event: "INSERT", schema: "public", table: "channel_message" },
        (payload) => {
          mutate();
          console.log(payload);
        },
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "channel_message" },
        (payload) => mutate(),
      )
      .subscribe();
    // Listen for changes to our users
    const userListener = supabase
      .channel("public:users")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "channel_message" },
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
    const res = await sendChannelMessage(data);
    console.log(res);

    if (res.error) {
      toast({
        title: "Send message failed",
        description: res.error || "Unknown error",
        variant: "destructive",
      });
    }
    form.reset();
    await mutate();
    setSendLoading(false);
  };

  if (isLoading) return <Loading />;

  if (!(channel && messages))
    return <span className="font-bold text-red-500">Unknown error</span>;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="border-b p-4 text-primary shadow-lg">
        <h1 className="text-xl font-semibold">
          {channel?.department?.name || channel.name}
        </h1>
      </header>

      <div className="flex h-full min-h-0 flex-col">
        <ScrollArea className="flex-grow bg-white" ref={scrollRef}>
          <Suspense fallback={<div>Loading messages...</div>}>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
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
                        disabled={!Boolean(user?.id)}
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
