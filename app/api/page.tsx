export default async function Api() {
  const menu = [
    {
      title: "Get Jobs",
      slug: "get-jobs",
    },
    {
      title: "Get Cities",
      slug: "get-cities",
    },
    {
      title: "Get Job Statuses",
      slug: "get-statuses",
    },
    {
      title: "Get Job Types",
      slug: "get-types",
    },
    {
      title: "Get Departments",
      slug: "get-departments",
    },
    {
      title: "Get Job by ID",
      slug: "get-job-by-id",
    },
  ];
  return (
    <>
      <aside className="p-6 rounded-md bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-white">
        <h1 className="text-2xl font-bold mb-6">API Specs</h1>

        <nav>
          <ul className="space-y-4">
            {menu.map((item) => (
              <li key={item.slug}>
                <a href={`#${item.slug}`}>{item.title}</a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="overflow-y-auto rounded-md bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-white">
        <div className="p-8">
          <section id="get-jobs" className="mb-10">
            <h2 className="text-xl font-bold mb-4">Get Jobs</h2>
            <ol className="list-decimal list-inside">
              <li>
                <strong>Verb:</strong> GET
              </li>
              <li>
                <strong>Endpoint:</strong> /api/v2/jobs
              </li>
              <li>
                <strong>Request:</strong>
                <ul className="list-disc ml-6 mt-2">
                  <li>
                    <strong>Query Parameters:</strong>
                  </li>
                  <ul className="ml-6">
                    <li>
                      <code>city</code>: String, filter jobs by city.
                    </li>
                    <li>
                      <code>department</code>: String, filter jobs by
                      department.
                    </li>
                    <li>
                      <code>status</code>: String, filter jobs by status.
                    </li>
                    <li>
                      <code>type</code>: String, filter jobs by type.
                    </li>
                    <li>
                      <code>from</code>: String, filter jobs by start date.
                    </li>
                    <li>
                      <code>to</code>: String, filter jobs by end date.
                    </li>
                  </ul>
                </ul>
              </li>
              <li>
                <strong>Response:</strong>
                <pre className="bg-gray-800 text-white dark:bg-slate-200 dark:text-gray-800 p-4 rounded mt-2 text-sm overflow-x-auto">
                  {`     {
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
     }`}
                </pre>
              </li>
            </ol>
          </section>

          <section id="get-cities" className="mb-10">
            <h2 className="text-xl font-bold mb-4">Get Cities</h2>
            <ol className="list-decimal list-inside">
              <li>
                <strong>Verb:</strong> GET
              </li>
              <li>
                <strong>Endpoint:</strong> /api/v2/jobs/cities
              </li>
              <li>
                <strong>Request:</strong> none
              </li>
              <li>
                <strong>Response:</strong>
                <pre className="bg-gray-800 text-white dark:bg-slate-200 dark:text-gray-800 p-4 rounded mt-2 text-sm overflow-x-auto">
                  {`[String]`}
                </pre>
              </li>
            </ol>
          </section>

          <section id="get-statuses" className="mb-10">
            <h2 className="text-xl font-bold mb-4">Get Job Statuses</h2>
            <ol className="list-decimal list-inside">
              <li>
                <strong>Verb:</strong> GET
              </li>
              <li>
                <strong>Endpoint:</strong> /api/v2/jobs/statuses
              </li>
              <li>
                <strong>Request:</strong> none
              </li>
              <li>
                <strong>Response:</strong>
                <pre className="bg-gray-800 text-white dark:bg-slate-200 dark:text-gray-800 p-4 rounded mt-2 text-sm overflow-x-auto">
                  {`[String]`}
                </pre>
              </li>
            </ol>
          </section>

          <section id="get-types" className="mb-10">
            <h2 className="text-xl font-bold mb-4">Get Job Types</h2>
            <ol className="list-decimal list-inside">
              <li>
                <strong>Verb:</strong> GET
              </li>
              <li>
                <strong>Endpoint:</strong> /api/v2/jobs/types
              </li>
              <li>
                <strong>Request:</strong> none
              </li>
              <li>
                <strong>Response:</strong>
                <pre className="bg-gray-800 text-white dark:bg-slate-200 dark:text-gray-800 p-4 rounded mt-2 text-sm overflow-x-auto">
                  {`[String]`}
                </pre>
              </li>
            </ol>
          </section>

          <section id="get-departments" className="mb-10">
            <h2 className="text-xl font-bold mb-4">Get Departments</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                <strong>Verb:</strong> GET
              </li>
              <li>
                <strong>Endpoint:</strong> /api/v2/jobs/departments
              </li>
              <li>
                <strong>Request:</strong> none
              </li>
              <li>
                <strong>Response:</strong>
                <pre className="bg-gray-800 text-white dark:bg-slate-200 dark:text-gray-800 p-4 rounded mt-2 text-sm overflow-x-auto">
                  {`[String]`}
                </pre>
              </li>
            </ol>
          </section>

          <section id="get-job-by-id">
            <h2 className="text-xl font-bold mb-4">Get Job by ID</h2>
            <ol className="list-decimal list-inside">
              <li>
                <strong>Verb:</strong> GET
              </li>
              <li>
                <strong>Endpoint:</strong> /api/v2/job/:id
              </li>
              <li>
                <strong>Path Parameters:</strong>
                <ul className="list-disc ml-6">
                  <li>
                    <code>id</code>: MongoDB ObjectId, the unique identifier of
                    the job.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Responses:</strong>
                <ul className="ml-6">
                  <li className="mb-4">
                    <code>200</code>: OK
                    <pre className="bg-gray-800 text-white dark:bg-slate-200 dark:text-gray-800 p-4 rounded mt-2 text-sm overflow-x-auto -ml-6">
                      {`     {
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
     }`}
                    </pre>
                  </li>
                  <li>
                    <code>404</code>: Error
                    <pre className="bg-gray-800 text-white dark:bg-slate-200 dark:text-gray-800 p-4 rounded mt-2 text-sm overflow-x-auto -ml-6">
                      {`[String]`}
                    </pre>
                  </li>
                </ul>
              </li>
            </ol>
          </section>
        </div>
      </main>
    </>
  );
}
