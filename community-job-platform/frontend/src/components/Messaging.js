import React, { useState, useEffect } from 'react';

function Messaging({ user, allUsers }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [recipient, setRecipient] = useState('');

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    setMessages(storedMessages);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !recipient) return;

    const message = {
      id: Date.now(),
      senderId: user.id,
      senderName: user.username,
      recipientId: recipient,
      recipientName: allUsers.find(u => u.id === recipient).username,
      content: newMessage,
      timestamp: new Date().toISOString()
    };

    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    localStorage.setItem('messages', JSON.stringify(updatedMessages));
    setNewMessage('');
  };

  const userMessages = messages.filter(
    msg => msg.senderId === user.id || msg.recipientId === user.id
  );

  return (
    <div className="messaging">
      <h2>メッセージ</h2>
      <div className="message-list">
        {userMessages.map(msg => (
          <div key={msg.id} className={`message ${msg.senderId === user.id ? 'sent' : 'received'}`}>
            <p>{msg.senderId === user.id ? msg.recipientName : msg.senderName}: {msg.content}</p>
            <small>{new Date(msg.timestamp).toLocaleString()}</small>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <select
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          required
        >
          <option value="">受信者を選択</option>
          {allUsers.filter(u => u.id !== user.id).map(u => (
            <option key={u.id} value={u.id}>{u.username}</option>
          ))}
        </select>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="メッセージを入力"
          required
        />
        <button type="submit">送信</button>
      </form>
    </div>
  );
}

export default Messaging;