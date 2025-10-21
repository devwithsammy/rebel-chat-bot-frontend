const HUGGING_FACE_KEY = process.env.NEXT_PUBLIC_HUGGINGFACE_KEY;
const OPENROUTER_KEY = process.env.NEXT_PUBLIC_OPENROUTER_KEY;

export async function getHuggingFaceResponse(prompt: string): Promise<string> {
  if (!HUGGING_FACE_KEY) {
    throw new Error("Hugging Face API key is not defined");
  }
  const response = await fetch(
    "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",

    {
      method: "POST",

      headers: {
        Authorization: `Brearer ${HUGGING_FACE_KEY}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_length: 1000,
          temperature: 0.7,
          do_sample: true,
        },
      }),
    }
  );

  const result = await response?.json();
  console.log(result, "RESPONSE FROM API");
  return result[0]?.generated_text || "Sorry, I didn't understand that.";
}
export async function getOpenRouterResponse(prompt: string): Promise<string> {
  if (!OPENROUTER_KEY) {
    throw new Error("Open router key is not defined");
  }
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_KEY}`,
        //   "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
        //   "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //   "model": "deepseek/deepseek-r1:free",
        model: "deepseek/deepseek-chat-v3.1:free",
        messages: [
          {
            role: "user",
            content: `${prompt}`,
          },
        ],
      }),
    }
  );

  const result = await response?.json();
  console.log(result, "RESPONSE FROM API");
  return result .choices[0]?.message?.content || "Sorry, I didn't understand that.";
}
