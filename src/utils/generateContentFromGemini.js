import { genAI } from "../api/geminiApi";

export const generateContentFromGemini = async (prompt, setMessages, setIsLoading) => {
  try {
    setIsLoading(true);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 프롬프트 강화
    const enhancedPrompt = `Provide a structured response in the following format:
    
                            💡 TITLE
                            A concise and relevant title.

                            📃 CONTENT
                            A clear and informative response.

                            If the information is unknown, respond with: "I don't know."

                            ---
                            User Input:
                            ${prompt}`;

    setMessages(prev => [...prev, { role: 'user', content: prompt }]);
    setMessages(prev => [...prev, { role: 'ai', content: '' }]);

    const result = await model.generateContent(enhancedPrompt);
    const response = await result.response;
    const text = response.text();

    setMessages(prev => {
      const newMessages = [...prev];
      newMessages[newMessages.length - 1].content = text;
      return newMessages;
    });
  } catch (error) {
    console.error('Error:', error);
    setMessages(prev => [...prev, {
      role: 'error',
      content: 'Sorry, something went wrong. Please try again.'
    }]);
  } finally {
    setIsLoading(false);
  }
};
