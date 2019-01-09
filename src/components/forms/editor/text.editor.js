import React, { Component, Fragment } from 'react';
import { Editor, getEventTransfer  } from 'slate-react';
import isUrl from 'is-url';

import InitialValue from '../utils/initial.value';

import Icon from 'react-icons-kit';
import { bold } from 'react-icons-kit/feather/bold';
import { italic } from 'react-icons-kit/feather/italic';
import { code } from 'react-icons-kit/feather/code';
import { list } from 'react-icons-kit/feather/list';
import { underline } from 'react-icons-kit/feather/underline';
import { link2 } from 'react-icons-kit/feather/link2';

import { ic_title } from 'react-icons-kit/md/ic_title';
import { ic_format_quote } from 'react-icons-kit/md/ic_format_quote';
import { BoldMark, ItalicMark, FormatToolbar } from './index';

export default class TextEditor extends Component {
	/**
	 * initial state
	 */
	state = {
		value: InitialValue,
	};

	/**
	 * On change.update the app's React state with the new editor value.
	 *
	 * @param {Editor} editor
	 */
	onChange = ({ value }) => {
		
		this.setState({ value });

	};

	/**
	 * Store a reference to the `editor`.
	 *
	 * @param {Editor} editor
	 */
	ref = editor => {
		this.editor = editor;
	}

	onKeyDown = (e, editor, next) => {
		/**
		 * Prevent default event from firing
		 */
		e.preventDefault();

		//this.editor.insertText(e.key);

		/**
		 * Check key value, we want all our commands 
		 * to start with the user pressing ctrl, if they don't--we cancel the action.
		 */
		if (e.key != '`' || !e.ctrlKey) return next();

		/**
		 *  Decide what to do based on the key code...
		 */
		switch (e.key) {
			/**
			 * When "b" is pressed, add a "bold" mark to the text. 
			 */
			case 'b': {
				this.editor.toggleMark('bold');
				return true;
			}
			case 'i': {
				this.editor.toggleMark('italic');
				return true;
			}

			case 'c': {
				this.editor.toggleMark('code');
				return true;
			}

			case 'l': {
				this.editor.toggleMark('list');
				return true;
			}

			case 'u': {
				this.editor.toggleMark('underline');
				return true;
			}

			case 'q': {
				this.editor.toggleMark('quote');
				return true;
			}

			case 'h': {
				this.editor.toggleMark('title');
				return true;
			}

			default: {
				return next();
			}
		}
	};

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

			case 'link': {

				const { data } = node;
				const href = data.get('href');

				return (
					<a href={href} {...attributes}>{children}</a>
				);

			}

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
				return (
					<ul {...props.attributes}>
						<li>{props.children}</li>
					</ul>
				);

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
	  
			editor
			  .insertText(text)
			  .moveFocusBackward(text.length)
			  .command(this.wrapLink, href)
		}

		this.onChange(editor);
	};

	renderLinkIcon = (type, icon) => {

		return (
			<button
				onPointerDown={(e) => this.onLinkClick(e, type)}
				className="tooltip-icon-button"
			>
				<Icon icon={icon} />
			</button>
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

		/**
		 *  calling the  onChange method we declared 
		 */
		this.onChange(this.editor);
	};

	renderMarkIcon = (type, icon) => {

		return (
			<button
				onPointerDown={(e) => this.onMarkClick(e, type)}
				className="tooltip-icon-button"
			>
				<Icon icon={icon} />
			</button>
		);

	}

	onPaste = (event, editor, next) => {

		if (editor.value.selection.isCollapsed) return next()
	
		const transfer = getEventTransfer(event)
		const { type, text } = transfer
		if (type != 'text' && type != 'html') return next()
		if (!isUrl(text)) return next()
	
		if (this.hasLinks()) {
		  editor.command(this.unwrapLink)
		}
	
		editor.command(this.wrapLink, text)
	}

	renderMenu = () => {

		return (
			<FormatToolbar>
				{this.renderMarkIcon('title', ic_title)}
				{this.renderMarkIcon('bold', bold)}
				{this.renderMarkIcon('italic', italic)}
				{this.renderMarkIcon('code', code)}
				{this.renderMarkIcon('list', list)}
				{this.renderMarkIcon('underline', underline)}
				{this.renderMarkIcon('quote', ic_format_quote)}
				{this.renderLinkIcon('link', link2)}
			</FormatToolbar>
		);

	}

	render() {
		return (
			<Fragment>
				{
					this.renderMenu()
				}
				<Editor
					placeholder="Enter text..."
					readOnly={false}
					autoCorrect={true}
					value={this.state.value}
					onChange={this.onChange}
					ref={this.ref}
					onKeyDown={this.onKeyDown}
					renderMark={this.renderMark}
					renderNode={this.renderNode}
					onPaste={this.onPaste}
				/>
			</Fragment>
		);
	}
}
