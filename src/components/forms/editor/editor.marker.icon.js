import React from 'react';
import { Icon } from 'react-icons-kit';

export const EditorMarkerIcon = ({ 
    type, 
    icon, 
    onMarkClick, 
    onMarkFocus,
    hasMark,
    onLinkClick,
}) => {
    // console.log(icon)
    return (
        <button
            active={ hasMark(type) }
            onClick={ (e) => onMarkClick(e, type) }
            onPointerDown={(e) => onLinkClick(e, type)}
            onFocus={ (e) => onMarkFocus(e, type) }
            className="tooltip-icon-button"
        >
            <Icon icon={icon} />
        </button>
    );

}