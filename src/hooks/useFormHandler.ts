import { useState } from 'react';

export interface FormHandlerOptions<T> {
  validate?: (values: T) => Partial<Record<keyof T, string>>;
  onSubmit: (values: T) => Promise<void>;
  initialValues: T;
}

export function useFormHandler<T extends Record<string, unknown>>({
  validate,
  onSubmit,
  initialValues,
}: FormHandlerOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSuccess(false);
    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length > 0) return;
    }
    setLoading(true);
    try {
      await onSubmit(values);
      setSuccess(true);
      setValues(initialValues);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setSubmitError(err.message);
      } else {
        setSubmitError('Submission failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    values,
    setValues,
    errors,
    loading,
    success,
    submitError,
    handleChange,
    handleSubmit,
  };
} 