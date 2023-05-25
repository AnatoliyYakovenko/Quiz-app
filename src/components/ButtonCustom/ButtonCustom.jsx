import { Button } from '@mui/material';

export const ButtonCustom =({onClick, variant, children})=>{
    
    return(<Button 
        type ="button"
        onClick={onClick}
        variant={variant} 
        >{children}</Button>)
}

