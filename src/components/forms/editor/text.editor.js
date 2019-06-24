import React, { Component, Fragment } from 'react';
import { Editor, getEventTransfer  } from 'slate-react';
// import { Field } from 'redux-form';

import isUrl from 'is-url';
import { Icon } from 'react-icons-kit';
import { bold } from 'react-icons-kit/feather/bold';
import { italic } from 'react-icons-kit/feather/italic';
import { code } from 'react-icons-kit/feather/code';
import { list } from 'react-icons-kit/feather/list';
import { underline } from 'react-icons-kit/feather/underline';
import { link2 } from 'react-icons-kit/feather/link2';

import { ic_format_list_numbered } from 'react-icons-kit/md/ic_format_list_numbered';
import { ic_format_quote } from 'react-icons-kit/md/ic_format_quote';
import { BoldMark, ItalicMark } from './index';
import { editor as EditorUtils } from './text.editor.utils';
import { EditorMarkerIcon } from './editor.marker.icon';
import InitialSchema from '../utils/initial.schema';
import { Toolbar, Button } from './format.toolbar';
import { isKeyHotkey } from 'is-hotkey'

/**
 * Define the default node type.
 *
 * @type {String}
 */
const DEFAULT_NODE = 'paragraph'

/**
 * Define hotkey matchers.
 *
 * @type {Function}
 */
const isBoldHotkey = isKeyHotkey('mod+b')
const isItalicHotkey = isKeyHotkey('mod+i')
const isUnderlinedHotkey = isKeyHotkey('mod+u')
const isCodeHotkey = isKeyHotkey('mod+`')

export default class TextEditor extends Component {

	constructor() {
		super();
		/**
		 * initial state
		 */
		this.state = {
			value: InitialSchema,
		};

		this.onMarkClick = this.onMarkClick.bind(this);
		this.onMarkFocus = this.onMarkFocus.bind(this);

	}

	/**
	 * Set the editor's initial content value
	 * On component did mount , update the app's React state with the new editor value.
	 * 
	 */
	componentDidMount() {

		// Create a new serializer instance with our `rules` from above.
		EditorUtils.html.deserialize(this.props.content)

		this.setState({ value: this.props.content });

	}

	/**
	 * On change.update the app's React state with the new editor value.
	 *
	 * @param {Editor} editor
	 */
	handleChange = ({ value }) => {
		
		this.setState({ value });
		// update the parent component
		this.props.editorChange({ value })

	};

	/**
	 * Store a reference to the `editor`.
	 *
	 * @param {Editor} editor
	 */
	ref = editor => {
		this.editor = editor;
	}

	/**
	 * Show a tool tip for the focused mark icon
	 * in the editor view
	 * 
	 * @param {Event} e
	 * @param {*} type
	 * @param {Editor} editor
	 * @param {Function} next
	 */
	onMarkFocus = (e, type, editor, next) => {
		/**
		 * Prevent default event from firing
		 */
		e.preventDefault();

		this.editor.insertText(e.key);

		/**
		 *  Decide what to do based on the key code
		 * 
		 *  Show a tooltip depending on the key in focus...
		 */
		switch (type) {
			case 'bold': {
				return true;
			}
			case 'italic': {
				this.editor.toggleMark('italic');
				return true;
			}

			case 'code': {
				this.editor.toggleMark('code');
				return true;
			}

			case 'list': {
				this.editor.toggleMark('list');
				return true;
			}

			case 'underline': {
				this.editor.toggleMark('underline');
				return true;
			}

			case 'quote': {
				this.editor.toggleMark('quote');
				return true;
			}

			case 'title': {
				this.editor.toggleMark('title');
				return true;
			}

			case 'list-numbered': {
				this.editor.toggleMark('ol');
				return true;
			}

			default: {
				return next();
			}
		}
	};

	/**
	 * Render a mark-toggling toolbar button.
	 *
	 * @param {String} type
	 * @param {String} icon
	 * @return {Element}
	 */
	renderMarkButton = (type, icon) => {
		const isActive = this.hasMark(type)

		return (
			<Button
				active={isActive}
				onMouseDown={event => this.onClickMark(event, type)}
			>
				<Icon>{icon}</Icon>
			</Button>
		)
	}

	/**
	 * Render a block-toggling toolbar button.
	 *
	 * @param {String} type
	 * @param {String} icon
	 * @return {Element}
	 */
	renderBlockButton = (type, icon) => {
		let isActive = this.hasBlock(type)

		if (['numbered-list', 'bulleted-list'].includes(type)) {
			const { value: { document, blocks } } = this.state

			if (blocks.size > 0) {
				const parent = document.getParent(blocks.first().key)
				isActive = this.hasBlock('list-item') && parent && parent.type === type
			}
		}

		return (
			<Button
				active={isActive}
				onMouseDown={event => this.onClickBlock(event, type)}
			>
				<Icon>{icon}</Icon>
			</Button>
		)
	}

	/**
	 * When a block button is clicked, toggle the block type.
	 *
	 * @param {Event} event
	 * @param {String} type
	 */
	onClickBlock = (event, type) => {
		event.preventDefault()

		const { editor } = this
		const { value } = editor
		const { document } = value

		// Handle everything but list buttons.
		if (type !== 'bulleted-list' && type !== 'numbered-list') {
			const isActive = this.hasBlock(type)
			const isList = this.hasBlock('list-item')

			if (isList) {
				editor
				.setBlocks(isActive ? DEFAULT_NODE : type)
				.unwrapBlock('bulleted-list')
				.unwrapBlock('numbered-list')
			} else {
				editor.setBlocks(isActive ? DEFAULT_NODE : type)
			}
		} else {
			// Handle the extra wrapping required for list buttons.
			const isList = this.hasBlock('list-item')
			const isType = value.blocks.some(block => {
				return !!document.getClosest(block.key, parent => parent.type === type)
			})

			if (isList && isType) {
				editor.setBlocks(DEFAULT_NODE)
				.unwrapBlock('bulleted-list')
				.unwrapBlock('numbered-list')
			} else if (isList) {
				editor
				.unwrapBlock(type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list')
				.wrapBlock(type)
			} else {
				editor.setBlocks('list-item').wrapBlock(type)
			}
		}
	}

	/**
	 * Render a Slate node.
	 *
	 * @param {Object} props
	 * @param {Editor} editor
	 * @param {Function} next
	 * @return {Element}
	 */
	renderNode = (props, editor, next) => {
		
		const { attributes, children, node } = props;

		switch (node.type) {
			case 'link': 
				return <a href={node.data.get('href')} {...attributes}>{children}</a>
			case 'block-quote':
				return <blockquote {...attributes}>{children}</blockquote>
			case 'list':
				return <ul {...attributes}>{children}</ul>
			case 'heading-one':
				return <h1 {...attributes}>{children}</h1>
			case 'heading-two':
				return <h2 {...attributes}>{children}</h2>
			case 'list-item':
				return <li {...attributes}>{children}</li>
			case 'numbered-list':
				return <ol {...attributes}>{children}</ol>
			default: {
				return next();
			}
		}
	};

	renderMark = (props, editor, next) => {

		switch (props.mark.type) {
			case 'bold':
				return <BoldMark {...props} />;

			case 'italic':
				return <ItalicMark {...props} />;

			case 'code':
				return <code {...props.attributes}>{props.children}</code>;

			case 'list':
				return (<ul {...props.attributes}><li>{props.children}</li></ul>);

			case 'list-numbered':
				return (<ol {...props.attributes}><li>{props.children}</li></ol>);

			case 'underline':
				return <u {...props.attributes}>{props.children}</u>;

			case 'quote':
				return <blockquote {...props.attributes}>{props.children}</blockquote>;

			case 'title':
				return <h1 {...props.attributes}>{props.children}</h1>;

			default: {
				return next();
			}
		}

	};

	/**
	 * Check whether the current selection has a link in it.
	 *
	 * @return {Boolean} hasLinks
	 */
	hasLinks = () => {
		const { value } = this.state;
		return value.inlines.some((inline) => inline.type === 'link');
	};

	/**
	 * A change helper to standardize wrapping links.
	 *
	 * @param {Editor} editor
	 * @param {String} href
	 */
	wrapLink = (editor, href) => {
		editor.wrapInline({
			type: 'link',
			data: { href },
		});

		//editor.collapseToEnd();
		editor.moveToEnd();
	};

	/**
	 * A change helper to standardize unwrapping links.
	 *
	 * @param {Editor} editor
	 */
	unwrapLink = (editor) => editor.unwrapInline('link');

	/**
	 * When clicking a link, if the selection has a link in it, remove the link.
	 * Otherwise, add a new link with an href and text.
	 *
	 * @param {Event} event
	 */
	onLinkClick = (e) => {
		/**
		 *  disabling browser default behavior like page refresh, etc 
		 */
		e.preventDefault();

		const { editor } = this;
		const { value } = editor;
		const hasLinks = this.hasLinks();

		if (hasLinks) {

			editor.command(this.unwrapLink);
			
		} else if (value.selection.isExpanded) {
			const href = window.prompt('Enter the URL of the link:');

			if (href === null) {
				return;
			}

			if(href.length > 0) {
				editor.command(this.wrapLink, href);
			} 

		} else {
			const href = window.prompt('Enter the URL of the link:')

			if (href === null) {
			  return
			}
	  
			const text = window.prompt('Enter the text for the link:')
	  
			if (text === null) {
			  return
			}
	  
			editor.insertText(text).moveFocusBackward(text.length).command(this.wrapLink, href)
		}

		this.handleChange(editor);

	};

	renderLinkIcon = (type, icon) => {

		return (
			<Button
				onPointerDown={(e) => this.onLinkClick(e, type)}
				className="tooltip-icon-button"
			>
				<Icon icon={icon} />
			</Button>
		);

	};

	onMarkClick = (e, type) => {
		/**
		 *  disabling browser default behavior like page refresh, etc 
		 */
		e.preventDefault();

		/**
		 * applying the formatting on the selected text which the desired formatting
		 */
		this.editor.toggleMark(type);
		console.log(EditorUtils.html.serialize(this.editor.value))
		this.handleChange(this.editor);

	};

	/**
	 * Check if the current selection has a mark with `type` in it.
	 *
	 * @param {String} type
	 * @return {Boolean}
	 */
	hasMark = type => {
		const { value } = this.state
		return value.activeMarks.some(mark => mark.type === type)
	}

	/**
	 * Check if the any of the currently selected blocks are of `type`.
	 *
	 * @param {String} type
	 * @return {Boolean}
	 */
	hasBlock = type => {
		const { value } = this.state
		return value.blocks.some(node => node.type === type)
	}

	onPaste = (event, editor, next) => {

		if (editor.value.selection.isCollapsed) return next();
	
		const transfer = getEventTransfer(event);

		const { type, text } = transfer;

		if (type !== 'text' && type !== 'html') return next();

		if (!isUrl(text)) return next();
	
		if (this.hasLinks()) editor.command(this.unwrapLink);
	
		editor.command(this.wrapLink, text);
	}

	/**
	 * On key down, if it's a formatting command toggle a mark.
	 *
	 * @param {Event} event
	 * @param {Editor} editor
	 * @return {Change}
	 */
	onKeyDown = (event, editor, next) => {
		let mark

		if (isBoldHotkey(event)) {
			mark = 'bold'
		} else if (isItalicHotkey(event)) {
			mark = 'italic'
		} else if (isUnderlinedHotkey(event)) {
			mark = 'underlined'
		} else if (isCodeHotkey(event)) {
			mark = 'code'
		} else {
			return next()
		}

		event.preventDefault()
		editor.toggleMark(mark)
	}

	renderMenu = () => {

		return (
			<Toolbar>

				{/* <EditorMarkerIcon 
					type='bold' icon={ bold } 
					onMarkClick={ this.onMarkClick } 
					onMarkFocus={ this.onMarkFocus } 
					hasMark={ this.hasMark }
				/>

				<EditorMarkerIcon 
					type='italic' icon={ italic } 
					onMarkClick={ this.onMarkClick } 
					onMarkFocus={ this.onMarkFocus }
					hasMark={ this.hasMark } 
				/>

				<EditorMarkerIcon 
					type='underline' icon={ underline } 
					onMarkClick={ this.onMarkClick } 
					onMarkFocus={ this.onMarkFocus } 
					hasMark={ this.hasMark }
				/>

				<EditorMarkerIcon 
					type='code' icon={ code } 
					onMarkClick={ this.onMarkClick } 
					onMarkFocus={ this.onMarkFocus } 
					hasMark={ this.hasMark }
				/>
				
				<EditorMarkerIcon 
					type='quote' icon={ ic_format_quote } 
					onMarkClick={ this.onMarkClick } 
					onMarkFocus={ this.onMarkFocus } 
					hasMark={ this.hasMark }
				/> */}

				<EditorMarkerIcon 
					type='link' icon={ link2 } 
					onMarkClick={ this.onMarkClick } 
					onMarkFocus={ this.onMarkFocus } 
					onLinkClick={ this.onLinkClick }
					hasMark={ this.hasMark }
				/>

				{/* <EditorMarkerIcon 
					type='list-numbered' icon={ ic_format_list_numbered } 
					onMarkClick={ this.onMarkClick } 
					onMarkFocus={ this.onMarkFocus } 
					hasMark={ this.hasMark }
				/>

				<EditorMarkerIcon 
					type='list' icon={ list } 
					onMarkClick={ this.onMarkClick } 
					onMarkFocus={ this.onMarkFocus } 
					hasMark={ this.hasMark }
				/> */}
				{/* {this.renderMarkButton('bold', bold)}
				{this.renderMarkButton('italic', italic)}
				{this.renderMarkButton('underlined', underline)}
				{this.renderMarkButton('code', code)}
				{this.renderBlockButton('block-quote', ic_format_quote)}
				{this.renderBlockButton('numbered-list', ic_format_list_numbered)}
				{this.renderBlockButton('bulleted-list', list)} */}
			</Toolbar>
		);

	}

	render() {

		const { name } = this.props;

		return (
			<Fragment>
				{
					this.renderMenu()
				}
				
				<div className="margin-fix">
					<Editor
						id={name}
						spellCheck
						autoFocus
						placeholder={`${ "Hint: use editor controls above to style your content..."}`}
						value={this.state.value}
						onChange={this.handleChange}
						ref={this.ref}
						// onKeyDown={this.onKeyDown}
						renderMark={this.renderMark}
						renderNode={this.renderNode}
						onPaste={this.onPaste}
					/>
				</div>
			</Fragment>
		);
	}

}
