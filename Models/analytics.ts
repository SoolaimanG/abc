import { AnalyticsProps } from "@/Types/types";
import { Schema, model, models } from "mongoose";

const Analytics = new Schema<AnalyticsProps>({
  username: String,
  views: Number,
  haveLinkInBio: Boolean,
  buttons: Array,
});

export const AnalyticsModel = models.analytics || model("analytics", Analytics);
