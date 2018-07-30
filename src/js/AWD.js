/*
File: AWD.js
Document: AWD JS Framework Core Items
Created By Adam Duncan
Date: 04/02/2017
*/

//declare type
var AWD = {};

if (typeof location.origin === 'undefined')
    location.origin = location.protocol + '//' + location.host;

AWD.BaseUrl = location.origin; //AWD.Uri.protocol + "//" + AWD.Uri.host + "/" + AWD.Uri.pathname.split('/')[1];

AWD.Common = {
    ApplicationMainId: null,
    isEmpty: function(str) {
        return (!str || 0 === str.length);
    },
	BodyObj: function(){
		if(AWD.Common.ApplicationMainId===null){
		   return document.body;
		}else{
		   return document.getElementById(AWD.Common.ApplicationMainId);
		}
	},
	TestExists: function(formObj){
		if((typeof formObj === typeof undefined) || ( typeof formObj === 'undefined' ) || ( !formObj ))
			return false;
		else
			return true;
	},
	isIE: function(){
		var ua = navigator.userAgent.toLowerCase();
		return ((ua.indexOf("msie") !== -1) && (ua.indexOf("opera") === -1) && (ua.indexOf("webtv") === -1)); 
	},
	isGecko: function(){
		var ua = navigator.userAgent.toLowerCase();
		return (ua.indexOf("gecko") !== -1);
	},
	isSafari: function(){
		var ua = navigator.userAgent.toLowerCase();
		return (ua.indexOf("safari") !== -1);
	},
	isKonqueror: function(){
		var ua = navigator.userAgent.toLowerCase();
		return (ua.indexOf("konqueror") !== -1);
	},
	HasDocAll: function(){
		if(document.all)
			return true;
		
		return false;
	},
	CleanWord: function(html){
	   html = html.replace( /<o:p>\s*<\/o:p>/g, "<br>") ;
	   html = html.replace( /<o:p>.*?<\/o:p>/g, "&nbsp;<br>") ;

	   // Remove all script tags and anything in between them.
	   html = html.replace( /<script[^>]*>[^>]+<\/script>/ig,"") ;
	   html = html.replace( /<\/script([^>]*)>/gi,"") ;

	   // Remove mso-xxx styles.
	   html = html.replace( /\s*mso-[^:]+:[^;"]+;?/gi, "" ) ;

	   // Remove margin styles - does not affect indented text
	   html = html.replace( /\s*MARGIN: 0cm 0cm 0pt\s*;/gi, "" ) ;
	   html = html.replace( /\s*MARGIN: 0cm 0cm 0pt\s*"/gi, "\"" ) ;

	   html = html.replace( /\s*TEXT-INDENT: 0cm\s*;/gi, "" ) ;
	   html = html.replace( /\s*TEXT-INDENT: 0cm\s*"/gi, "\"" ) ;

	   //html = html.replace( /\s*TEXT-ALIGN: [^\s;]+;?"/gi, "\"" ) ;

	   html = html.replace( /\s*PAGE-BREAK-BEFORE: [^\s;]+;?"/gi, "\"" ) ;

	   html = html.replace(/\s*FONT-VARIANT: [^\s;]+;?"/gi, "\"" ) ;

	   html = html.replace( /\s*tab-stops:[^;"]*;?/gi, "" ) ;
	   html = html.replace( /\s*tab-stops:[^"]*/gi, "" ) ;

	   // Remove FONT face attributes.
	   //html = html.replace( /\s*face="[^"]*"/gi, "" ) ;
	   //html = html.replace( /\s*face=[^ >]*/gi, "" ) ;
	   //html = html.replace( /\s*FONT-FAMILY:[^;"]*;?/gi, "" ) ;

	   // Remove Class attributes
	   //html = html.replace(/<(\w[^>]*) class=([^ |>]*)([^>]*)/gi, "<$1$3") ;

	   // Remove styles.
	   // html = html.replace( /<(\w[^>]*) style="([^\"]*)"([^>]*)/gi, "<$1$3" ) ;

	   // Remove empty styles.
	   html =  html.replace( /\s*style="\s*"/gi, '' ) ;

	   //html = html.replace( /<SPAN\s*[^>]*>\s*&nbsp;\s*<\/SPAN>/gi, '&nbsp;' ) ;

	   //html = html.replace( /<SPAN\s*[^>]*><\/SPAN>/gi, '' ) ;

	   // Remove Lang attributes
	   //html = html.replace(/<(\w[^>]*) lang=([^ |>]*)([^>]*)/gi, "<$1$3") ;

	   //html = html.replace( /<SPAN\s*>(.*?)<\/SPAN>/gi, '$1' ) ;

	   //html = html.replace( /<FONT\s*>(.*?)<\/FONT>/gi, '$1' ) ;

	   // Remove XML elements and declarations
	   html = html.replace(/<\\?\?xml[^>]*>/gi, "") ;

	   // Remove Tags with XML namespace declarations: <o:p></o:p>
	   html = html.replace( /<\/?\w+:[^>]*>/gi, "") ;

	   html = html.replace( /<H\d>\s*<\/H\d>/gi, '' ) ;


	   html = html.replace( /<H1([^>]*)>/gi, '<span style="font-size:22;font-weight:bold">' ) ;
	   html = html.replace( /<H2([^>]*)>/gi, '<span style="font-size:20;font-weight:bold">' ) ;
	   html = html.replace( /<H3([^>]*)>/gi, '<span style="font-size:18;font-weight:bold">' ) ;
	   html = html.replace( /<H4([^>]*)>/gi, '<span style="font-size:16;font-weight:bold">' ) ;
	   html = html.replace( /<H5([^>]*)>/gi, '<span style="font-size:14;font-weight:bold">' ) ;
	   html = html.replace( /<H6([^>]*)>/gi, '<span style="font-size:12;font-weight:bold">' ) ;

	   html = html.replace( /<\/H\d>/gi, '</span><br>' ) ;


	   html = html.replace( /<(U|I|STRIKE)>&nbsp;<\/\1>/g, '&nbsp;' ) ;

	   // Remove empty tags (three times, just to be sure).
	   //html = html.replace( /<([^\s>]+)[^>]*>\s*<\/\1>/g, '' ) ;

	   // Transform <P> to <span>
	   //var re = new RegExp("(<P)([^>]*>.*?)(<\/P>)","gi") ;   html = html.replace( re, "<span$2</span><br>" ) ;
	   return html ;
	},
	ConvertToXhtml: function(strHtml, lang, encoding){
		//http://php.net/manual/en/tidy.cleanrepair.php
		return strHtml;
	},
	ConvertIntToHex: function(num){
		if((num > 16) || (num < 0))
			return "0";
		
		return num.toString(16);
	}
};
