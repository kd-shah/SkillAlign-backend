import { GoogleGenAI, Type } from "@google/genai";
import { Request, Response, NextFunction } from "express";
import multer from "multer";

const upload = multer();

const evaluate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { jobDescription } = req.body;
    const file = req.file; // file comes from multer

    if (!file) {
      return res.status(400).json({ error: "File is required" });
    }

    if (!jobDescription) {
      return res.status(400).json({ error: "File is required" });
    }
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const contents = [
      {
        text: `Analyze this document and provide general suggestions, improvements, suggestions, short comings for the job description: ${jobDescription}`,
      },
      {
        inlineData: {
          mimeType: "application/pdf",
          data: Buffer.from(file?.buffer).toString("base64"),
        },
      },
    ];

    const config = {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
            candidateName: { type: Type.STRING },
            overallMatchPercentage: { type: Type.NUMBER },
            summary: { type: Type.STRING },

            matchedSkills: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            missingSkills: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            weakSkills: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            suggestedImprovements: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            recommendedAdditions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            recommendedRemovals: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            resumeFeedback: {
              type: Type.OBJECT,
              properties: {
                clarity: { type: Type.STRING },
                structure: { type: Type.STRING },
                formatting: { type: Type.STRING },
                tone: { type: Type.STRING },
              },
              propertyOrdering: ["clarity", "structure", "formatting", "tone"],
            },
          
         
        },
        required: ["overallMatchPercentage", "summary", "matchedSkills"],
        propertyOrdering: [
          "candidateName",
          "overallMatchPercentage",
          "summary",
          "matchedSkills",
          "missingSkills",
          "weakSkills",
          "suggestedImprovements",
          "recommendedAdditions",
          "recommendedRemovals",
          "resumeFeedback",
        ],
      },
    };



    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: config,
    });
    res.status(200).json({ message: response.text });
  } catch (error) {
    next(error);
  }
};

export default { evaluate };
