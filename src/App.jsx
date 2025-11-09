.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.sidebar {
  width: 350px;
  background: white;
  border-right: 2px solid var(--green-200);
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 8px rgba(34, 197, 94, 0.1);
}

.sidebar-header {
  padding: 20px;
  border-bottom: 2px solid var(--green-100);
  background: linear-gradient(135deg, var(--green-50) 0%, white 100%);
}

.sidebar-header h2 {
  color: var(--green-800);
  margin-bottom: 15px;
  font-size: 24px;
}

.btn-new-ticket {
  width: 100%;
  padding: 12px 20px;
  background: linear-gradient(135deg, var(--green-600) 0%, var(--green-500) 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.2);
}

.btn-new-ticket:hover {
  background: linear-gradient(135deg, var(--green-700) 0%, var(--green-600) 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(34, 197, 94, 0.3);
}

.content-area {
  flex: 1;
  overflow: auto;
  background: var(--green-50);
}

.welcome-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 40px;
}

.welcome-content {
  text-align: center;
  max-width: 600px;
}

.welcome-content h1 {
  color: var(--green-800);
  font-size: 48px;
  margin-bottom: 20px;
  background: linear-gradient(135deg, var(--green-700) 0%, var(--green-500) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.welcome-content p {
  color: var(--green-700);
  font-size: 20px;
  margin-bottom: 40px;
}

.btn-primary {
  padding: 16px 32px;
  background: linear-gradient(135deg, var(--green-600) 0%, var(--green-500) 100%);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(34, 197, 94, 0.3);
}

.btn-primary:hover {
  background: linear-gradient(135deg, var(--green-700) 0%, var(--green-600) 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(34, 197, 94, 0.4);
}
