import React from "react";
import styled from '@emotion/styled';

const FormatToolbar = (props) => {
	// <div className="format-toolbar">{props.children}</div>
	return (
		<div>{props.children}</div>
	);

};

export const Button = styled(({ className, ...rest }) => {
  return <span className={`material-icons ${className}`} {...rest} />
})`
  cursor: pointer;
  color: ${props =>
    props.reversed
      ? props.active ? 'white' : '#aaa'
      : props.active ? 'black' : '#ccc'};
`

export const Icon = styled(({ className, ...rest }) => {
  return <span className={`material-icons ${className}`} {...rest} />
})`
  font-size: 18px;
  vertical-align: text-bottom;
`

export const Menu = styled('div')`
  & > * {
    display: inline-block;
  }
  & > * + * {
    margin-left: 15px;
  }
`

export const Toolbar = styled(Menu)`
  position: relative;
  padding: 1px 18px 17px;
  margin: 0 -20px;
  border-bottom: 2px solid #eee;
  margin-bottom: 20px;
`

export default FormatToolbar;
