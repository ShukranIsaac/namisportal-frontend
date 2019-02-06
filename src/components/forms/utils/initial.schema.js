import { Value } from 'slate';

const InitialSchema = Value.fromJSON({
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
