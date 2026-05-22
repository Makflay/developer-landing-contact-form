import { Request, Response } from "express";

export const handleContactForm = async (req: Request, res: Response) => {
  try {
    const { name, phone, email, comment } = req.body;

    if (!name || !phone || !email || !comment) {
      return res.status(400).json({
        succcess: false,
        message: "All fields are required",
      });
    }

    return res.status(200).json({
      success: true,
      messsage: "Form submitted successfully",
    });
  } catch (error) {
    console.error("Contact form error", error);

    return res.status(500).json({
      success: false,
      message: `Contact form error: ${error}`,
    });
  }
};
