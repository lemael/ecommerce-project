// src/components/ChatBot.tsx
import axios from "axios";
import React, { useState } from "react";
import { ChatbotUrl } from "../utils/constants";

type Message = {
  text: string;
  sender: "user" | "bot";
};

const ChatBot: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const askQuestion = async () => {
    if (!question.trim()) return;

    setMessages((prev) => [...prev, { text: question, sender: "user" }]);

    try {
      const response = await axios.post(ChatbotUrl, { question });

      setMessages((prev) => [
        ...prev,
        { text: response.data.answer, sender: "bot" },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: "Erreur de connexion au chatbot.", sender: "bot" },
      ]);
    }

    setQuestion("");
  };

  return (
    <div>
      {/* Bouton flottant en bas à droite */}
      {!isOpen && (
        <button style={styles.fab} onClick={() => setIsOpen(true)}>
          💬
        </button>
      )}

      {/* Fenêtre du chatbot */}
      {isOpen && (
        <div style={styles.chatWindow}>
          <div style={styles.header}>
            <span>🛒 Chatbot e-commerce</span>
            <button style={styles.closeButton} onClick={() => setIsOpen(false)}>
              ✖
            </button>
          </div>

          <div style={styles.chatBox}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  ...styles.message,
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  backgroundColor:
                    msg.sender === "user" ? "#d1e7dd" : "#f8d7da",
                }}
              >
                <strong>{msg.sender === "user" ? "Vous" : "Bot"}:</strong>{" "}
                {msg.text}
              </div>
            ))}
          </div>

          <div style={styles.inputArea}>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && askQuestion()}
              placeholder="Posez une question..."
              style={styles.input}
            />
            <button onClick={askQuestion} style={styles.button}>
              Envoyer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  fab: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "#28a745",
    color: "#fff",
    fontSize: "24px",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  },
  chatWindow: {
    position: "fixed",
    bottom: "80px",
    right: "20px",
    width: "350px",
    height: "450px",
    border: "1px solid #ccc",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeButton: {
    background: "transparent",
    border: "none",
    color: "#fff",
    fontSize: "18px",
    cursor: "pointer",
  },
  chatBox: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "10px",
    overflowY: "auto",
    backgroundColor: "#f9f9f9",
  },
  message: {
    maxWidth: "80%",
    padding: "8px 12px",
    borderRadius: "8px",
  },
  inputArea: {
    display: "flex",
    gap: "8px",
    padding: "10px",
    borderTop: "1px solid #ddd",
  },
  input: {
    flex: 1,
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
  },
};

export default ChatBot;
