import { useState, useRef, useEffect } from "react";
import { useSendChatMessage, useTextToSpeech } from "@workspace/api-client-react";
import { Send, Bot, User, Volume2, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { Button, Input, Card } from "@/components/ui-elements";

type Message = {
  id: string;
  role: 'user' | 'bot';
  content: string;
  sources?: string[];
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([{
    id: 'welcome',
    role: 'bot',
    content: "Namaste! I am your Legal & Welfare Assistant. You can ask me about government schemes, eligibility, required documents, or your basic legal rights. How can I help you today?"
  }]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const { mutate: sendMessage, isPending: isSending } = useSendChatMessage();
  const { mutate: getAudio, isPending: isAudioLoading } = useTextToSpeech();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isSending) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    sendMessage({ data: { message: userMsg.content, language: 'en' } }, {
      onSuccess: (data) => {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: 'bot',
          content: data.reply,
          sources: data.sources
        }]);
      },
      onError: () => {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: 'bot',
          content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment."
        }]);
      }
    });
  };

  const playAudio = (text: string, msgId: string) => {
    if (playingAudioId) return; // Prevent multiple plays
    setPlayingAudioId(msgId);
    
    getAudio({ data: { text, language: 'en' } }, {
      onSuccess: (data) => {
        const audio = new Audio(`data:${data.mimeType};base64,${data.audioBase64}`);
        audio.onended = () => setPlayingAudioId(null);
        audio.onerror = () => setPlayingAudioId(null);
        audio.play().catch(e => {
          console.error("Audio playback failed", e);
          setPlayingAudioId(null);
        });
      },
      onError: () => {
        setPlayingAudioId(null);
      }
    });
  };

  return (
    <main className="flex-1 pt-24 pb-8 h-screen flex flex-col bg-muted/20">
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col px-4 sm:px-6">
        
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold flex items-center gap-3">
              <Sparkles className="text-primary" /> Legal & Welfare Assistant
            </h1>
            <p className="text-muted-foreground mt-1">Ask questions in plain language.</p>
          </div>
        </div>

        {/* Chat Area */}
        <Card className="flex-1 flex flex-col overflow-hidden border-border/60 shadow-xl shadow-black/5 bg-white mb-6">
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-secondary/10 text-secondary'}`}>
                  {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                </div>
                
                <div className={`max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-2`}>
                  <div className={`p-4 rounded-2xl ${msg.role === 'user' ? 'bg-primary text-white rounded-tr-sm' : 'bg-muted/50 text-foreground border border-border/50 rounded-tl-sm'}`}>
                    <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  </div>
                  
                  {msg.role === 'bot' && (
                    <div className="flex items-center gap-3 px-1">
                      <button 
                        onClick={() => playAudio(msg.content, msg.id)}
                        disabled={playingAudioId !== null && playingAudioId !== msg.id}
                        className="text-xs font-medium text-muted-foreground flex items-center gap-1.5 hover:text-primary transition-colors disabled:opacity-50"
                      >
                        {playingAudioId === msg.id || (isAudioLoading && playingAudioId === msg.id) ? (
                          <Loader2 size={14} className="animate-spin text-primary" />
                        ) : (
                          <Volume2 size={14} />
                        )}
                        Listen
                      </button>
                      
                      {msg.sources && msg.sources.length > 0 && (
                        <div className="text-xs text-muted-foreground border-l border-border pl-3 flex gap-2 items-center">
                          <AlertCircle size={12} />
                          Sources: {msg.sources.join(', ')}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isSending && (
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                  <Bot size={20} />
                </div>
                <div className="bg-muted/50 p-4 rounded-2xl rounded-tl-sm border border-border/50 flex gap-2 items-center">
                  <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce delay-100" />
                  <div className="w-2 h-2 rounded-full bg-primary/80 animate-bounce delay-200" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-border">
            <form onSubmit={handleSubmit} className="relative flex items-center">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question here..."
                className="pr-16 py-4 text-base rounded-full shadow-inner bg-muted/20 border-border/80 focus:bg-white"
                disabled={isSending}
              />
              <Button 
                type="submit" 
                size="sm" 
                className="absolute right-2 rounded-full w-10 h-10 p-0"
                disabled={!input.trim() || isSending}
              >
                {isSending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} className="ml-1" />}
              </Button>
            </form>
            <p className="text-center text-[11px] text-muted-foreground mt-3">
              AI assistant provides general guidance, not formal legal advice. Always verify with official sources.
            </p>
          </div>
        </Card>
      </div>
    </main>
  );
}
