import React from 'react';
import { Icon } from 'react-icons-kit';

export const EditorMarkerIcon = ({ 
    type, 
    icon, 
    onMarkClick, 
    onMarkFocus 
}) => {

    return (
        <button
            onPointerDown={(e) => onMarkClick(e, type)}
            onFocus={ (e) => onMarkFocus(e, type) }
            className="tooltip-icon-button"
        >
            <Icon icon={icon} />
        </button>
    );

}