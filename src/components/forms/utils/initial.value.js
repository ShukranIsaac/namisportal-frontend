import { Value } from 'slate';

const initialValue = Value.fromJSON({
	"document": {
	  "nodes": [
			{
				"object": "block",
				"type": "paragraph",
				"nodes": [
					{
						"object": "text",
						"leaves": [
							{
								"text":
								"In addition to block nodes, you can create inline nodes, like "
							}
						]
					},
					{
						"object": "inline",
						"type": "link",
						"data": {
							"href": "https://en.wikipedia.org/wiki/Hypertext"
						},
						"nodes": [
							{
								"object": "text",
								"leaves": [
									{
										"text": "hyperlinks"
									}
								]
							}
						]
					},
					{
						"object": "text",
						"leaves": [
							{
								"text": "!"
							}
						]
					}
				]
			},
			{
				"object": "block",
				"type": "paragraph",
				"nodes": [
					{
						"object": "text",
						"leaves": [
							{
								"text": "This example shows hyperlinks in action. It features two ways to add links. You can either add a link via the toolbar icon above, or if you want in on a little secret, copy a URL to your keyboard and paste it while a range of text is selected."
							}
						]
					}
				]
			}
	  ]
	}
});

export default initialValue;
