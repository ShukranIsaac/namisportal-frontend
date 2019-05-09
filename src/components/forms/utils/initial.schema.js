import { Value } from 'slate';

const InitialSchema = Value.fromJSON({
	"object":"value",
	"document": {
	  "nodes": [
			{
				"object": "block",
				"type": "paragraph",
				"nodes": []
			}
	  ]
	}
});

export default InitialSchema;
