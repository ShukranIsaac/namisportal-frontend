import React from 'react';
import Html from 'slate-html-serializer';

/**
 * What if you want to save the content as HTML?
 * we need to add the Html serializer. And to do that, 
 * we need to tell it a bit about the schema we plan on using. For this example,
 *  we'll work with a schema that has a few different parts:
 * 		
 * 		1. A paragraph block.
 * 		2. A code block for code samples.
 * 		3. A quote block for quotes...
 * 		4. And bold, italic and underline formatting.
 * 
 * By default, the Html serializer knows nothing about our schema, just like Slate itself. 
 * To fix this, we need to pass it a set of rules. 
 * Each rule defines how to serialize and deserialize a Slate object.
 * 
 * To start, let's create rules with a deserialize amd serialize functions for paragraph blocks.
 * 
 * @author Isaac S. Mwakabira
 * 
 */
export const editor = (() => {

    // Refactor block tags into a dictionary for cleanliness.
    const BLOCK_TAGS = {
        p: 'paragraph',
        blockquote: 'quote',
        pre: 'code',
    }

    // Add a dictionary of mark tags.
    const MARK_TAGS = {
        em: 'italic',
        strong: 'bold',
        u: 'underline',
    }

    const rules = [
        {
            deserialize(el, next) {
                const type = BLOCK_TAGS[el.tagName.toLowerCase()]
                if (type) {
    
                    return {
                        object: 'block',
                        type: type,
                        data: {
                            className: el.getAttribute('class'),
                        },
                        nodes: next(el.childNodes),
                    }
    
                }
            },
            serialize(obj, children) {
                if (obj.object === 'block') {
                    switch (obj.type) {
                        case 'code':
                            return (
                                <pre>
                                    <code>{children}</code>
                                </pre>
                            )
                        case 'paragraph':
                            return <p className={obj.data.get('className')}>{children}</p>
                        case 'quote':
                            return <blockquote>{children}</blockquote>
                        default:
                            return;
                    }
                } else {
                    switch (obj.type) {
                        case 'link':
                            return (<a href={obj.data.get('href')} className={obj.data.get('className')}>
                                {children}
                            </a>);
                        default:
                            return;
                    }
                }
            },
        },
        // Add a new rule that handles marks...
        {
            deserialize(el, next) {
                const type = MARK_TAGS[el.tagName.toLowerCase()]
                if (type) {
                    return {
                        object: 'mark',
                        type: type,
                        nodes: next(el.childNodes),
                    }
                }
            },
            serialize(obj, children) {
                if (obj.object === 'mark') {
                    switch (obj.type) {
                        case 'bold':
                            return <strong>{children}</strong>
                        case 'italic':
                            return <em>{children}</em>
                        case 'underline':
                            return <u>{children}</u>
                        default:
                            return
                    }
                }
            },
        },
    ]

    // Create a new serializer instance with our `rules` from above.
    const html = new Html({ rules });

    const keys = ['Escape', 'Tab', 'CapsLock', 'Shift', 'Control', 'Alt', 'Backspac', 'ArrowDown', 'ArrowUp', 
        'ArrowRight', 'ArrowLeft', 'Enter', 'Delete', 'Insert', 'AudioVolume', 'MuteAudio', 'VolumeDown', 
        'AudioVolumeUp', 'Unidentified', 'MediaPlayPause', 'MediaStop', 'MediaTrackPrevious', 'MediaTrackNext', '`'
    ]

    const isKey = (key) => keys.find(k => key === k);

    return { html, isKey };

})();