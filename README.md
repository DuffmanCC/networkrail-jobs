# Network Rail Jobs

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Network Rail Jobs API Specs

### Calls

#### Get Jobs

1. Verb: GET
2. Endpoint: /api/v2/jobs
3. Request:
   - Query Parameters:
     - `city`: String, filter jobs by city.
     - `department`: String, filter jobs by department.
     - `status`: String, filter jobs by status.
     - `type`: String, filter jobs by type.
     - `from`: String, filter jobs by start date.
     - `to`: String, filter jobs by end date.
4. Response:
   - 200
     ```
     {
         success: Boolean,
         jobsCount: Number,
         filterBy: Object,
         jobs: [
             {
                 location: {
                     city: String,
                     postcode: String,
                     lat: Number,
                     lng: Number
                 },
                 salary: {
                     min: Number | null,
                     max: Number | null
                 },
                 dates: {
                     start: String,
                     end: String
                 },
                 _id: MongoDB ObjectId,
                 jobId: String,
                 title: String,
                 description: String,
                 department: String,
                 status: String,
                 type: String,
                 applyLink: String,
                 __v: Number
             },
             ...
         ]
     }
     ```

#### Get Cities

1. Verb: GET
2. Endpoint: /api/v2/jobs/cities
3. Request: none
4. Response:
   - 200
     ```
     [String]
     ```

#### Get Job Statuses

1. Verb: GET
2. Endpoint: /api/v2/jobs/statuses
3. Request: none
4. Response:
   - 200
     ```
     [String]
     ```

#### Get Job Types

1. Verb: GET
2. Endpoint: /api/v2/jobs/types
3. Request: none
4. Response:
   - 200
     ```
     [String]
     ```

#### Get Departments

1. Verb: GET
2. Endpoint: /api/v2/jobs/departments
3. Request: none
4. Response:
   - 200
     ```
     [String]
     ```

#### Get Job by ID

1. Verb: GET
2. Endpoint: /api/v2/job/:id
   - Path Parameters:
     - `id`: MongoDB ObjectId, the unique identifier of the job.
3. Request: none
4. Responses:
   - 200
     ```
     {
         success: Boolean,
         job: {
             location: {
                 city: String,
                 postcode: String,
                 lat: Number,
                 lng: Number
             },
             salary: {
                 min: Number | null,
                 max: Number | null
             },
             dates: {
                 start: String,
                 end: String
             },
             _id: MongoDB ObjectId,
             jobId: String,
             title: String,
             description: String,
             department: String,
             status: String,
             type: String,
             applyLink: String,
             __v: Number
         }
     }
     ```
   - 404
     ```
     {
         error: String
     }
     ```
