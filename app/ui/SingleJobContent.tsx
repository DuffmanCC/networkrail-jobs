import { JobContentSchema } from "../lib/types";

interface Props {
  jobContent: JobContentSchema;
}

export default function SingleJobContent({ jobContent }: Props) {
  return (
    <>
      {jobContent.description && (
        <div className="text-base font-light leading-relaxed text-gray-600 px-6 flex flex-col gap-4">
          <div className="">
            <h2 className="text-xl mb-2 font-bold">Description</h2>
            <p>{jobContent.description}</p>
          </div>

          <div>
            <h2 className="text-xl mb-2 font-bold">How to apply</h2>
            <p>{jobContent.howToApply}</p>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">About the role</h2>

            <ul className="pl-4 gap-4 flex flex-col list-disc">
              <li>
                <h3 className="text-lg mb-1 font-bold text-brand-green">
                  Essential
                </h3>
                <ul className="pl-4 list-[circle]">
                  {jobContent.aboutTheRole.essential.map((el, index) => (
                    <li key={index}>{el}</li>
                  ))}
                </ul>
              </li>

              <li>
                <h3 className="text-lg mb-1 font-bold text-brand-green">
                  Desirable
                </h3>
                <ul className="pl-4 list-[circle]">
                  {jobContent.aboutTheRole.desirable.map((el, index) => (
                    <li key={index}>{el}</li>
                  ))}
                </ul>
              </li>

              <li>
                <h3 className="text-lg mb- font-bold text-brand-green">
                  Key Accountabilities
                </h3>
                <ul className="pl-4 list-[circle]">
                  {jobContent.aboutTheRole.keyAccountabilities.map(
                    (el, index) => (
                      <li key={index}>{el}</li>
                    )
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
