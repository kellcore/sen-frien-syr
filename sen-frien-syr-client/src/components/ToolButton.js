import React from 'react';
// materialui
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';


export default ({ children, onClick, tip, btnClassName, tipClassName }) => (
    <Tooltip title={tip} className={tipClassName}>
        <IconButton onClick={onClick} className={btnClassName}>
            {children}
            {/* children will be the icon rendered inside the button */}
        </IconButton>
    </Tooltip>
)

// this is a functional component
// we can just do parentheses because we don't need to process any logic here
