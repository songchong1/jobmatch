"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[177],{177:(e,t,s)=>{s.r(t),s.d(t,{default:()=>i});var n=s(43),a=s(579);const i=function(e){let{user:t,allUsers:s}=e;const[i,r]=(0,n.useState)([]),[d,c]=(0,n.useState)(""),[l,o]=(0,n.useState)("");(0,n.useEffect)((()=>{const e=JSON.parse(localStorage.getItem("messages"))||[];r(e)}),[]);const m=i.filter((e=>e.senderId===t.id||e.recipientId===t.id));return(0,a.jsxs)("div",{className:"messaging",children:[(0,a.jsx)("h2",{children:"\u30e1\u30c3\u30bb\u30fc\u30b8"}),(0,a.jsx)("div",{className:"message-list",children:m.map((e=>(0,a.jsxs)("div",{className:"message ".concat(e.senderId===t.id?"sent":"received"),children:[(0,a.jsxs)("p",{children:[e.senderId===t.id?"To: ".concat(e.recipientName):"From: ".concat(e.senderName),": ",e.content]}),(0,a.jsx)("small",{children:new Date(e.timestamp).toLocaleString()})]},e.id)))}),(0,a.jsxs)("form",{onSubmit:e=>{if(e.preventDefault(),""===d.trim()||!l)return;const n={id:Date.now(),senderId:t.id,senderName:t.username,recipientId:parseInt(l),recipientName:s.find((e=>e.id===parseInt(l))).username,content:d,timestamp:(new Date).toISOString()},a=[...i,n];r(a),localStorage.setItem("messages",JSON.stringify(a)),c("")},children:[(0,a.jsxs)("select",{value:l,onChange:e=>o(e.target.value),required:!0,children:[(0,a.jsx)("option",{value:"",children:"\u53d7\u4fe1\u8005\u3092\u9078\u629e"}),s.filter((e=>e.id!==t.id)).map((e=>(0,a.jsx)("option",{value:e.id,children:e.username},e.id)))]}),(0,a.jsx)("input",{type:"text",value:d,onChange:e=>c(e.target.value),placeholder:"\u30e1\u30c3\u30bb\u30fc\u30b8\u3092\u5165\u529b",required:!0}),(0,a.jsx)("button",{type:"submit",children:"\u9001\u4fe1"})]})]})}}}]);
//# sourceMappingURL=177.7ca7f83e.chunk.js.map