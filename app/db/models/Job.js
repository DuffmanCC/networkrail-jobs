"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Job = void 0;
var mongoose_1 = require("mongoose");
var Job;
try {
    exports.Job = Job = (0, mongoose_1.model)("Job"); // Attempt to get the existing model
}
catch (_a) {
    var jobSchema = new mongoose_1.Schema({
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
    exports.Job = Job = (0, mongoose_1.model)("Job", jobSchema); // Create the model
}
