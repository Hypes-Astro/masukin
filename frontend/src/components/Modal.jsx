import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";

const Modal = () => {
  return (
    <Popover>
      <PopoverHandler>
        <Button>Popover</Button>
      </PopoverHandler>
      <PopoverContent>
        This is a very beautiful popover, show some love.
      </PopoverContent>
    </Popover>
  );
};

export default Modal;
