/*
Requires AWD.js
*/


AWD.RichText = {
	AngList: null,
	SelectedAction: null,
	SelectedRange: null,
	xHtml: true,
	lang: "en",
	encoding: "iso-8859-1",	
	ButtonType: "limited",
	/*HasDocKeyPress: function(evt){
		var key = (evt.which || evt.charCode || evt.keyCode);
		var stringKey = String.fromCharCode(key).toLowerCase();
	},*/
	AllOtherKeyPress: function(evt){
		var id = evt.target.id;

		if (evt.ctrlKey) {
			var key = String.fromCharCode(evt.charCode).toLowerCase();
			var cmd = '';
			
			switch (key) { //alt key values
				case 'b': 
					cmd = "bold"; 
					break;
				case 'i': 
					cmd = "italic"; 
					break;
				case 'u': 
					cmd = "underline"; 
					break;
			}

			if (cmd) {
				AWD.RichText.RichActions.Command(id, cmd, null);

				evt.preventDefault();
				evt.stopPropagation();
			}
		}

		AWD.RichText.RichActions.SaveHtmlToHidden(id);
	},
	GetDesignObj: function(id){
		var objRich = null;
		var frameId = (id.indexOf('_frame') == -1) ? id + '_frame' : id;
		
		if (AWD.Common.HasDocAll()) {
			objRich = frames[frameId];
		} else {
			objRich = document.getElementById(frameId).contentWindow;
		}	
		
		return objRich
	},
	GetDesignDoc: function(id){
		var objRich = AWD.RichText.GetDesignObj(id);
		var objRichDoc = null;
		
		if(objRich!==null)
			objRichDoc = objRich.document;

		return objRichDoc;
	},
	CanRich: function(){
		if ((document.designMode) || ((window.contentWindow.document) && (window.contentWindow.document.designMode)))
			return true;
		else
			return false;
	},
	RichItems: {
		CssHtml: function(){
			return "";
		}
	},
	RichActions: {
		SaveHtmlToServer: function(id){
			alert("dead method");
		},
		SaveHtmlToHidden: function(id){
			
			var selectorSavedHtml = 'hdn_' + id;
			var objSavedHtml = document.getElementById(selectorSavedHtml);
			var objRich = AWD.RichText.GetDesignDoc(id);
			
			if (objSavedHtml.value == null) objSavedHtml.value = "";
			
			if (AWD.RichText.xHtml)
				objSavedHtml.value = AWD.Common.ConvertToXhtml(objRich.body.innerHTML, AWD.RichText.lang, AWD.RichText.encoding);
			
			var holdValue = AWD.Common.CleanWord(objRich.body.innerHTML, id);
			objSavedHtml.value = holdValue; 
			
			//AWD HACK: add to angular scope if exists by using jquery
			if(AWD.Common.TestExists(AWD.RichText.AngList)){
				AWD.RichText.AngList[id] = holdValue;
			}
			
			//if (stripHTML(objSavedHtml.value.replace("&nbsp;", " ")) == "" &&
			//	objSavedHtml.value.toLowerCase().search("<hr") == -1 &&
			//	objSavedHtml.value.toLowerCase().search("<img") == -1) objSavedHtml.value = "";
		},
		EnableDesignMode: function(id, html, readOnly, holdAng = false){
			var frameHtml = "<html id=\"" + id + "_frame\">";
				frameHtml += "<head>\n";
				frameHtml += AWD.RichText.RichItems.CssHtml();
				frameHtml += "</head>\n";
				frameHtml += "<body>\n";
				frameHtml += html + "\n";
				frameHtml += "</body>\n";
				frameHtml += "</html>";
				
			if(holdAng){
				if(!AWD.Common.TestExists(AWD.RichText.AngList))
					AWD.RichText.AngList = [];
				
				AWD.RichText.AngList[id] = html;
			}
				
			try {
				var objRich = AWD.RichText.GetDesignDoc(id);
				var objSavedHtml = document.getElementById('hdn_' + id);
				
				if(objRich===null)
					return;
	
				objRich.designMode = readOnly ? "Off" : "On";
				
				if (AWD.Common.HasDocAll()) {
					//if(readOnly)
					//	objRich.attachEvent("onkeypress", AWD.RichText.HasDocKeyPress(event)});
				} else {					
					if (!readOnly)
						objRich.addEventListener("keypress", AWD.RichText.AllOtherKeyPress, true);
				}
	
				objRich.open();
				objRich.write(frameHtml);
				objRich.close();		
				
				AWD.RichText.RichActions.SaveHtmlToHidden(id);
				
			} catch (e) {
				alert(e.stack); //AWD Debug
			}
		
		},
		ToggleCodeBehindMode: function(id, editorMode){
			AWD.RichText.RichActions.SaveHtmlToHidden(id);
			
			var objButtons = document.getElementById('buttons-' + id);
			var objSavedHtml = document.getElementById('hdn_' + id);
			var strHtml = objSavedHtml.value;
			var objAchor = document.getElementById(id + '_toggleLink');
			var strNewMode = "";
			var objRich = AWD.RichText.GetDesignDoc(id);
			
			if(objRich===null)
				return;			
			
			if(editorMode == "html"){
				strNewMode = "code";
				objAchor.innerHTML = "View Web Page";
				
				if (AWD.Common.HasDocAll()) {
					objRich.body.innerText = strHtml;
				}else{
					var htmlSrc = objRich.createTextNode(strHtml);
					objRich.body.innerHTML = "";
					objRich.body.appendChild(htmlSrc);
				}
				
			}else{
				strNewMode = "html";
				objAchor.innerHTML = "View Code Behind";
				
				var strFix = "";
				
				if (AWD.Common.HasDocAll()) {					
					strFix = objRich.body.innerText;
				} else {
					var htmlSrc = objRich.body.ownerDocument.createRange();
					htmlSrc.selectNodeContents(objRich.body);
					strFix = htmlSrc.toString();
				}
				
				strFix = escape(strFix);
				strFix = strFix.replace("%3CP%3E%0D%0A%3CHR%3E", "%3CHR%3E");
				strFix = strFix.replace("%3CHR%3E%0D%0A%3C/P%3E", "%3CHR%3E");
				objRich.body.innerHTML = unescape(strFix);
			}
			
			if(AWD.Common.TestExists(objButtons))
				objButtons.style.display = (strNewMode == "html") ? "block" : "none";
			
			editorMode = strNewMode;
			return editorMode;
		},
		CommandGlobalAction: function(id, option){
			AWD.RichText.RichActions.Command(id, AWD.RichText.SelectedAction, option);
		},
		Command: function(id, command, option){
			var objRich = AWD.RichText.GetDesignObj(id);

			try {
				if(AWD.RichText.SelectedRange !== null){
					if (AWD.Common.HasDocAll()){
						AWD.RichText.SelectedRange.select();
					}
				}
				
				objRich.focus();
				objRich.document.execCommand(command, false, option);
				objRich.focus();
				
				AWD.RichText.SelectedRange = null;
				
				AWD.RichText.RichActions.SaveHtmlToHidden(id);
			} catch (e) {
				alert(e); //AWD Debug
			}
		},
		FillSelectRange: function(id){
			AWD.RichText.SelectedRange = null; //reset
			var objRich = AWD.RichText.GetDesignObj(id);
			
			if (AWD.Common.HasDocAll()){
				var selection = objRich.selection;
				if (selection != null) AWD.RichText.SelectedRange = selection.createRange();
			}else{
				var selection = objRich.getSelection();
				AWD.RichText.SelectedRange = selection.getRangeAt(selection.rangeCount - 1).cloneRange();
			}
		},
		SetFont: function(id, cmd, selectname) {
			var idx = document.getElementById(selectname).selectedIndex;
			alert(idx);
			if (idx != 0) {
				var selected = document.getElementById(selectname).options[idx].value;
				AWD.RichText.RichActions.Command(id, cmd, selected);
				document.getElementById(selectname).selectedIndex = 0;
			}
		}	
	}
};
