import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChatbotUrl } from "../utils/constants";

type Message = {
  text: string;
  sender: "user" | "bot";
};

const ChatBot: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Détecte automatiquement si on est sur un smartphone
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const askQuestion = async () => {
    if (!question.trim()) return;
    setMessages((prev) => [...prev, { text: question, sender: "user" }]);

    try {
      const response = await axios.post(ChatbotUrl, { question });
      setMessages((prev) => [
        ...prev,
        { text: response.data.answer, sender: "bot" },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { text: "Erreur de connexion au chatbot.", sender: "bot" },
      ]);
    }

    setQuestion("");
  };

  return (
    <div>
      {/* Bouton flottant */}
      {!isOpen && (
        <button style={styles.fab} onClick={() => setIsOpen(true)}>
          💬
        </button>
      )}

      {/* Fenêtre du chatbot */}
      {isOpen && (
        <div
          style={{
            ...styles.chatWindow,
            ...(isMobile ? styles.chatWindowMobile : {}),
          }}
        >
          <div style={styles.header}>
            <span>Chatbot </span>
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
                    msg.sender === "user" ? "#d1e7dd" : "#e2e3e5",
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
              placeholder="Stellen Sie Ihre Frage..."
              style={styles.input}
            />
            <button onClick={askQuestion} style={styles.button}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ✅ Styles adaptatifs
const styles: { [key: string]: React.CSSProperties } = {
  fab: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "#e6edf5ff",
    color: "#fff",
    fontSize: "28px",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
    zIndex: 9999,
  },
  chatWindow: {
    position: "fixed",
    bottom: "80px",
    right: "20px",
    width: "350px",
    height: "450px",
    border: "1px solid #ccc",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    fontFamily: "Arial, sans-serif",
    zIndex: 9999,
  },
  // 👇 Style appliqué automatiquement sur smartphone
  chatWindowMobile: {
    width: "100vw",
    height: "100vh",
    bottom: "0",
    right: "0",
    borderRadius: "0",
    border: "none",
  },
  header: {
    backgroundColor: "#181a1dff",
    color: "#fff",
    padding: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: "bold",
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
    backgroundColor: "#f8f9fa",
  },
  message: {
    maxWidth: "80%",
    padding: "8px 12px",
    borderRadius: "8px",
    fontSize: "14px",
    wordBreak: "break-word",
  },
  inputArea: {
    display: "flex",
    gap: "8px",
    padding: "10px",
    borderTop: "1px solid #ddd",
    backgroundColor: "#fff",
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
    backgroundColor: "#1b1d1fff",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default ChatBot;
