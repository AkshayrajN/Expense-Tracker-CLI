

const sessionStore = new Map();

export function createSession(userId) {
    const sessionId = `${userId}-${Date.now()}`;
    const sessionData = { sessionId, createdAt: Date.now() };


    sessionStore.set(sessionId, sessionData);

   
    setTimeout(() => sessionStore.delete(sessionId), 5 * 60 * 1000);

    return sessionData;
}

