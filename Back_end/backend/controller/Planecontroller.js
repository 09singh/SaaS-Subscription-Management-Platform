import Plan from "../shema/admain/Plan.js";

// Get all plans
export const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find();

    res.status(200).json({
      success: true,
      plans,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create plan
export const createPlan = async (req, res) => {
  try {
    const { name, price, description, features } = req.body;

    const existingPlan = await Plan.findOne({ name });

    if (existingPlan) {
      return res.status(400).json({
        success: false,
        message: "Plan already exists",
      });
    }

    const plan = await Plan.create({
      name,
      price,
      description,
      features,
    });

    res.status(201).json({
      success: true,
      message: "Plan created successfully",
      plan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update plan
export const updatePlan = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedPlan = await Plan.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedPlan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Plan updated successfully",
      updatedPlan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete plan
export const deletePlan = async (req, res) => {
  try {
    const { id } = req.params;

    const plan = await Plan.findById(id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found",
      });
    }

    await plan.deleteOne();

    res.status(200).json({
      success: true,
      message: "Plan deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};