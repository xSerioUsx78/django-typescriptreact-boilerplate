// showing backend errors dynamically with formik setFieldError
export const formikSetError = (
  response: any, setFieldError: (field: string, message: string | undefined) => void
) => {
  const { data } = response;
  for (const key in data) {
    setFieldError(key, data[key].join('\n'));
  };
};