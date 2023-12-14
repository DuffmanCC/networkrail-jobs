import { JobMappedInterface } from "@/app/lib/types";
import { Model, Schema, model } from "mongoose";

let Job: Model<JobMappedInterface>;

try {
  Job = model<JobMappedInterface>("Job"); // Attempt to get the existing model
} catch {
  const jobSchema = new Schema<JobMappedInterface>({
    jobId: String,
    title: String,
    location: {
      city: String,
      postcode: String,
      lat: Number,
      lng: Number,
    },
    salary: {
      min: Number,
      max: Number,
    },
    description: String,
    department: String,
    dates: {
      start: Date,
      end: Date,
    },
    status: String,
    type: String,
    applyLink: String,
  });

  Job = model<JobMappedInterface>("Job", jobSchema); // Create the model
}

export { Job };
