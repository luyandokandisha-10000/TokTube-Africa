// auth.js – Simple client‑side authentication module for TokTube
// Uses storage.js helpers for user persistence and current session tracking.
// Passwords are hashed with SHA‑256 before storage (client‑side only).

const auth = (() => {
  // Helper to hash a password string using SHA‑256 and return hex string
  async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    // Convert ArrayBuffer to hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async function signup(username, password) {
    if (!username || !password) throw new Error('Username and password required');
    const existing = storage.getUser(username);
    if (existing) throw new Error('User already exists');
    const pwdHash = await hashPassword(password);
    const user = { username, passwordHash: pwdHash };
    storage.addUser(user);
    storage.setCurrentUser(username);
    return user;
  }

  async function login(username, password) {
    const user = storage.getUser(username);
    if (!user) throw new Error('User not found');
    const pwdHash = await hashPassword(password);
    if (pwdHash !== user.passwordHash) throw new Error('Invalid password');
    storage.setCurrentUser(username);
    return user;
  }

  function logout() {
    storage.setCurrentUser(null);
  }

  function isAuthenticated() {
    return !!storage.getCurrentUser();
  }

  function getCurrentUser() {
    return storage.getCurrentUser();
  }

  return { signup, login, logout, isAuthenticated, getCurrentUser };
})();

if (typeof module !== 'undefined') module.exports = auth;
