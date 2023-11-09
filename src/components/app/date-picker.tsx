import {
  useFieldArray,
  type Control,
  type UseFormGetValues,
  type UseFormRegister,
  type UseFormSetValue,
} from "react-hook-form";

export default function Fields({
  control,
  register,
}: {
  control: Control;
  register: UseFormRegister<{
    guests: {
      dateOfArrive: number;
      dateOfExit: number;
    };
  }>;
  setValue: UseFormSetValue<{
    guests: {
      dateOfArrive: number;
      dateOfExit: number;
    };
  }>;
  getValues: UseFormGetValues<{
    guests: {
      dateOfArrive: number;
      dateOfExit: number;
    };
  }>;
}) {
  const { fields } = useFieldArray({
    control,
    name: "guests",
  });

  return (
    <>
      <ul>
        {fields.map((item, index) => {
          return (
            <li key={item.id}>
              <input {...register(`guests.`)} />

              <NestedArray nestIndex={index} {...{ control, register }} />
            </li>
          );
        })}
      </ul>
    </>
  );
}
