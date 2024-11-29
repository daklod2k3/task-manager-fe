import { Button } from "@/components/ui/button";
import { ReactNode, FC } from "react";
import { Trash, Plus } from "lucide-react";

const LoadIcon: FC<{ name: string, className?: string }> = ({ name,className }) => {
  switch (name) {
    case "trash":
      return <Trash className={className}/>;
    case "plus":
      return <Plus className={className}/>;
    default:
      return null;
  }
};

function ButtonIcon({ 
    nameIcon = "default",
    classNameBtn = "",
    classNameIcon = "", 
    variant = "default", 
    label, 
    onClick 
  }:{
    nameIcon?: "trash" | "plus" | "default" ;
    classNameBtn?: string;
    classNameIcon?: string;
    label?: ReactNode;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" ,
    onClick?: () => void;
  }) {

  return (
    <Button type="button" variant={variant} onClick={onClick} className={classNameBtn}>
      <LoadIcon name={nameIcon} className={classNameIcon}/>
      {label}
    </Button>
  );
};

export default ButtonIcon;
