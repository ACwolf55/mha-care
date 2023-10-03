import React,{useEffect} from 'react';
import { Box, ChatComposer,
    ChatBookend, ChatBookendItem, ChatBubble, ChatEvent, ChatLogger, ChatMessage,
     ChatMessageMeta, ChatMessageMetaItem, useChatLogger, ChatLog } from "@twilio-paste/core";
import { SendButtonPlugin } from './send-button';
import { ClearEditorPlugin } from "@twilio-paste/lexical-library";
import { $getRoot, EditorState, RootNode } from "lexical";
import NavWarning from './nav-warning';

const ChatDialog = () => {


  const {chats, push} = useChatLogger(
    {
      content: (
        <ChatBookend>
          <ChatBookendItem>Today</ChatBookendItem>
          <ChatBookendItem>
              <strong>Chat Started</strong>- 2:46 PM
          </ChatBookendItem>
        </ChatBookend>
      ),
    },
    //insert nav warning comp
    {
      variant: 'inbound',
      content: (
        <NavWarning />
      )
    },
    //first inbound msg
    {
      variant: 'inbound',
      content: (
        <ChatMessage variant="inbound">
          <ChatBubble>
            INSERT FIRST MSG HERE
          </ChatBubble>
            <ChatMessageMetaItem>
              2:46 PM
            </ChatMessageMetaItem>
        </ChatMessage>
      )
    },
    //first outbound msg
    {
      variant: 'outbound',
      content: (
        <ChatMessage variant="outbound">
          <ChatBubble>
            INSERT RESPONSE HERE
          </ChatBubble>
          <ChatMessageMeta aria-label="said by you at 4:27 PM">
          <ChatMessageMetaItem>
                    2:47 PM
          </ChatMessageMetaItem>
        </ChatMessageMeta>
        </ChatMessage>
      ),
    }, 
  );

const [message, setMessage] = React.useState('');
const [mounted, setMounted] = React.useState(false);
const loggerRef = React.useRef<HTMLDivElement>(null);
const scrollerRef = React.useRef<HTMLDivElement>(null);


useEffect(() => {
  setMounted(true);
}, []);


useEffect(() => {
  if (!mounted || !loggerRef.current) return;
  scrollerRef.current?.scrollTo({top:
  loggerRef.current.scrollHeight, behavior: 'smooth'});
},
[chats, mounted]);

// composer change of state
const handleComposerChange = (editorState: { read: (arg0: () => void) => void; }) => {
  editorState.read(() => {
    const text = $getRoot().getTextContent();
    // Perform operations with the editor state synchronously here
    // For example, you can update the component state or perform other logic based on the editor content.
  });
};

// submit message push to createNewMessage
const submitMessage = () => {
  if (message === '') return;
  push(createNewMessage(message));
};

  return (
    <>
      <p>chat</p>
    <Box>
      <Box ref={scrollerRef} overflowX="hidden" overflowY="scroll" maxHeight="size60" tabIndex={0}>
      <ChatLogger ref={loggerRef} chats={chats} />
      </Box>
      <Box
        borderStyle="solid"
        borderWidth="borderWidth0"
        borderTopWidth="borderWidth10"
        borderColor="colorBorderWeak"
        display="flex"
        flexDirection="row"
        columnGap="space30"
        paddingX="space70"
        paddingTop="space50"
      >
      <ChatComposer
          maxHeight="size20"
          config={{
            namespace: 'foo',
            onError: (e) => {
              throw e;
            },
          }}
          ariaLabel="Message"
          placeholder="Type here..."
          onChange={handleComposerChange}
        >
          <ClearEditorPlugin />
          <SendButtonPlugin onClick={submitMessage} />
        </ChatComposer>
      </Box>
    </Box>
    </>
  )
}
export default ChatDialog

function createNewMessage(message: string): import("@twilio-paste/core").PartialIDChat {
  throw new Error('Function not implemented.');
}
