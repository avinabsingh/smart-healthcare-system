import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, ArrowLeft, Sparkles, AlertTriangle } from "lucide-react";

export default function Chatbot() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I'm your AI health assistant. I can help answer questions about symptoms, wellness, or medical terminology. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.text }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: data.reply || "I'm having trouble connecting to my knowledge base." }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Connection error. Please check if the server is running." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <header style={styles.header}>
        <button onClick={() => navigate(-1)} style={styles.backBtn}>
          <ArrowLeft size={20} /> <span>Back</span>
        </button>
        <div style={styles.titleGroup}>
          <div style={styles.botIconMain}><Bot size={28} color="#fff" /></div>
          <div>
            <h1 style={styles.title}>AI <span style={styles.accentText}>Assistant</span></h1>
            <div style={styles.onlineStatus}><div style={styles.dot} /> Always active</div>
          </div>
        </div>
      </header>

      <div style={styles.chatContainer}>
        <div style={styles.messagesArea}>
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  ...styles.messageWrapper,
                  justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                }}
              >
                {msg.sender === "bot" && (
                  <div style={{ ...styles.avatar, background: "#6c5ce7" }}><Bot size={16} color="#fff" /></div>
                )}
                
                <div style={{
                  ...styles.bubble,
                  ...(msg.sender === "user" ? styles.userBubble : styles.botBubble)
                }}>
                  {msg.text}
                </div>

                {msg.sender === "user" && (
                  <div style={{ ...styles.avatar, background: "#dfe6e9" }}><User size={16} color="#2d3436" /></div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          
          {loading && (
            <div style={styles.messageWrapper}>
              <div style={{ ...styles.avatar, background: "#6c5ce7" }}><Bot size={16} color="#fff" /></div>
              <div style={styles.typingIndicator}>
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div style={styles.inputSection}>
          <div style={styles.inputWrapper}>
            <input
              style={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Describe your symptoms or ask a health question..."
            />
            <button style={styles.sendBtn} onClick={sendMessage} disabled={!input.trim()}>
              <Send size={20} />
            </button>
          </div>
          <div style={styles.disclaimer}>
            <AlertTriangle size={12} />
            <span>AI guidance only. In case of emergency, contact local medical services immediately.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    height: "100vh",
    background: "#f8f9ff",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Inter', sans-serif",
  },
  header: {
    padding: "30px 80px",
    background: "#fff",
    borderBottom: "1px solid #f1f2f6",
    display: "flex",
    alignItems: "center",
    gap: "40px",
  },
  backBtn: { background: "none", border: "none", color: "#636e72", display: "flex", alignItems: "center", gap: "8px", fontWeight: "700", cursor: "pointer" },
  titleGroup: { display: "flex", alignItems: "center", gap: "15px" },
  botIconMain: { background: "#6c5ce7", padding: "10px", borderRadius: "14px", boxShadow: "0 8px 16px rgba(108, 92, 231, 0.2)" },
  title: { fontSize: "24px", fontWeight: "900", margin: 0, color: "#2d3436" },
  accentText: { color: "#6c5ce7" },
  onlineStatus: { display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#00b894", fontWeight: "700", marginTop: "2px" },
  dot: { width: "8px", height: "8px", borderRadius: "50%", background: "#00b894" },

  chatContainer: {
    flex: 1,
    maxWidth: "1000px",
    width: "100%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    padding: "20px",
  },
  messagesArea: {
    flex: 1,
    overflowY: "auto",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    scrollbarWidth: "none",
  },
  messageWrapper: { display: "flex", alignItems: "flex-end", gap: "12px" },
  avatar: { width: "32px", height: "32px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  bubble: { padding: "16px 20px", borderRadius: "22px", fontSize: "15px", lineHeight: "1.6", maxWidth: "70%", fontWeight: "500" },
  botBubble: { background: "#fff", color: "#2d3436", boxShadow: "0 4px 15px rgba(0,0,0,0.03)", borderBottomLeftRadius: "4px" },
  userBubble: { background: "#1a1a1a", color: "#fff", borderBottomRightRadius: "4px" },

  inputSection: { padding: "20px", background: "transparent" },
  inputWrapper: {
    background: "#fff",
    borderRadius: "24px",
    padding: "8px 8px 8px 24px",
    display: "flex",
    alignItems: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
    border: "1px solid #f1f2f6",
  },
  input: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: "16px",
    color: "#2d3436", // FIXED: Dark text color so it's visible
    padding: "12px 0",
    background: "transparent",
  },
  sendBtn: {
    background: "#6c5ce7",
    color: "#fff",
    border: "none",
    width: "48px",
    height: "48px",
    borderRadius: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "0.2s",
  },
  disclaimer: { textAlign: "center", fontSize: "12px", color: "#a4b0be", marginTop: "15px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" },
  
  typingIndicator: {
    background: "#fff",
    padding: "16px 20px",
    borderRadius: "22px",
    display: "flex",
    gap: "5px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
  }
};