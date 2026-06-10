import User from "../shema/model.js";

export const getCompanies = async (req, res) => {
  try {
    const companies = await User.find(
      { role: "company" },
      {
        password: 0, // password hide
      }
    );

    res.status(200).json({
      success: true,
      companies,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};