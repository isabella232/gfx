define([
	"dojo/_base/lang",
	"dojo/_base/window",
	"dojo/_base/sniff",
	"dojo/dom"
], function(lang, win, has, dom){
	return {
		_createElementNS: function(ns, nodeType){
			// summary:
			//		Internal helper to deal with creating elements that
			//		are namespaced.  Mainly to get SVG markup output
			//		working on IE.
			if(win.doc.createElementNS){
				return win.doc.createElementNS(ns, nodeType);
			}else{
				return win.doc.createElement(nodeType);
			}
		},

		_setAttributeNS: function(node, ns, attr, value){
			if(node.setAttributeNS){
				return node.setAttributeNS(ns, attr, value);
			}else{
				return node.setAttribute(attr, value);
			}
		},

		_createTextNode: function(text){
			return win.doc.createTextNode(text);
		},

		_createFragment: function(){
			return win.doc.createDocumentFragment();
		},

		xmlns: {
			xlink: "http://www.w3.org/1999/xlink",
			svg: "http://www.w3.org/2000/svg"
		},

		getRef: function(name){
			// summary:
			//		looks up a node by its external name
			// name: String
			//		an SVG external reference
			// returns:
			//      returns a DOM Node specified by the name argument or null
			if(!name || name == "none") return null;
			if(name.match(/^url\(#.+\)$/)){
				return dom.byId(name.slice(5, -1));	// Node
			}
			// alternative representation of a reference
			if(name.match(/^#dojoUnique\d+$/)){
				// we assume here that a reference was generated by gfx
				return dom.byId(name.slice(1));	// Node
			}
			return null;	// Node
		},

		dasharray: {
			solid: "none",
			shortdash: [4, 1],
			shortdot: [1, 1],
			shortdashdot: [4, 1, 1, 1],
			shortdashdotdot: [4, 1, 1, 1, 1, 1],
			dot: [1, 3],
			dash: [4, 3],
			longdash: [8, 3],
			dashdot: [4, 3, 1, 3],
			longdashdot: [8, 3, 1, 3],
			longdashdotdot: [8, 3, 1, 3, 1, 3]
		},

		// Mouse/Touch event
		fixTarget: function(event, gfxElement){
			// summary:
			//		Adds the gfxElement to event.gfxTarget if none exists. This new
			//		property will carry the GFX element associated with this event.
			// event: Object
			//		The current input event (MouseEvent or TouchEvent)
			// gfxElement: Object
			//		The GFX target element
			if(!event.gfxTarget){
				if(has("ios") && event.target.wholeText){
					// Workaround iOS bug when touching text nodes
					event.gfxTarget = event.target.parentElement.__gfxObject__;
				}else{
					event.gfxTarget = event.target.__gfxObject__;
				}
			}
			return true;
		}
	};
});
