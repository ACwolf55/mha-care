import { Button } from "@twilio-paste/button";
import { Box } from "@twilio-paste/box";
import { SendIcon } from "@twilio-paste/icons/esm/SendIcon";
import { CLEAR_EDITOR_COMMAND, useLexicalComposerContext } from "@twilio-paste/lexical-library";

export const SendButtonPlugin = ({onClick}: {onClick: () => void}): JSX.Element => {
    // get the editor from the composer context
    const [editor] = useLexicalComposerContext();
  
    // an event handler called from custom UI can the interact with the editor to perform certain actions
    const handleSend = (): void => {
      onClick();
      editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
    };
  
    return (
      <Box position="absolute" top="space30" right="space30">
        <Button variant="primary_icon" size="reset" onClick={handleSend}>
          <SendIcon decorative={false} title="Send message" />
        </Button>
      </Box>
    );
  };
  