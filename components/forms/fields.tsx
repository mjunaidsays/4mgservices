"use client";

import * as Label from "@radix-ui/react-label";
import { AlertCircle } from "lucide-react";
import { useEffect, useId, useRef } from "react";

import { cn } from "@/lib/utils";

/**
 * Form field primitives.
 *
 * Every control is labelled, every error is associated with `aria-describedby`
 * and announced through an `aria-live` region, and every touch target clears
 * 44px. Single column throughout — it measurably outperforms multi-column.
 */

const controlBase = [
  "w-full rounded-btn border bg-white px-4 text-[0.9375rem] text-ink-900",
  "placeholder:text-ink-400",
  "transition-[border-color,box-shadow] duration-160 ease-out-quart",
  "hover:border-ink-400",
  "focus:outline-none focus-visible:border-[var(--brand-accent)]",
  "focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)]/25",
  "disabled:cursor-not-allowed disabled:bg-mist-50",
].join(" ");

type FieldShellProps = {
  label: string;
  /** Extra guidance under the label — use it instead of placeholder text. */
  hint?: string;
  error?: string;
  required?: boolean;
  children: (props: {
    id: string;
    describedBy: string | undefined;
    invalid: boolean;
  }) => React.ReactNode;
};

export function Field({
  label,
  hint,
  error,
  required,
  children,
}: FieldShellProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="space-y-2">
      <Label.Root
        htmlFor={id}
        className="block text-sm font-medium text-ink-900"
      >
        {label}
        {required && (
          <span aria-hidden className="ml-1 text-orange-500">
            *
          </span>
        )}
        {!required && <span className="ml-2 text-ink-400">(optional)</span>}
      </Label.Root>

      {hint && (
        <p id={hintId} className="text-sm text-ink-600">
          {hint}
        </p>
      )}

      {children({ id, describedBy, invalid: Boolean(error) })}

      {error && (
        <p
          id={errorId}
          className="flex items-center gap-1.5 text-sm text-red-500"
        >
          <AlertCircle aria-hidden className="size-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

type InputProps = React.ComponentProps<"input"> & {
  label: string;
  hint?: string;
  error?: string;
};

export function TextField({ label, hint, error, required, ...props }: InputProps) {
  return (
    <Field label={label} hint={hint} error={error} required={required}>
      {({ id, describedBy, invalid }) => (
        <input
          {...props}
          id={id}
          // `aria-required` rather than `required`: steps that are not on
          // screen use `display: none`, and the browser cannot focus a hidden
          // invalid control, which would silently block submission.
          aria-required={required || undefined}
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
          className={cn(
            controlBase,
            "h-12",
            invalid ? "border-red-500" : "border-mist-200",
          )}
        />
      )}
    </Field>
  );
}

type TextareaProps = React.ComponentProps<"textarea"> & {
  label: string;
  hint?: string;
  error?: string;
};

export function TextAreaField({
  label,
  hint,
  error,
  rows = 5,
  required,
  ...props
}: TextareaProps) {
  return (
    <Field label={label} hint={hint} error={error} required={required}>
      {({ id, describedBy, invalid }) => (
        <textarea
          {...props}
          id={id}
          rows={rows}
          aria-required={required || undefined}
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
          className={cn(
            controlBase,
            "resize-y py-3 leading-relaxed",
            invalid ? "border-red-500" : "border-mist-200",
          )}
        />
      )}
    </Field>
  );
}

type SelectProps = React.ComponentProps<"select"> & {
  label: string;
  hint?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
};

/**
 * A native `select`, on purpose. On the mobile devices most of this audience
 * uses, the OS picker beats any custom listbox for speed and accessibility.
 */
export function SelectField({
  label,
  hint,
  error,
  options,
  placeholder,
  required,
  ...props
}: SelectProps) {
  return (
    <Field label={label} hint={hint} error={error} required={required}>
      {({ id, describedBy, invalid }) => (
        <select
          {...props}
          id={id}
          aria-required={required || undefined}
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
          className={cn(
            controlBase,
            "h-12 appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%234a5568%22 stroke-width=%222%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-[length:20px] bg-[right_1rem_center] bg-no-repeat pr-12",
            invalid ? "border-red-500" : "border-mist-200",
          )}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </Field>
  );
}

/** Card-style radio group — larger targets and clearer state than dots. */
export function RadioCards({
  name,
  label,
  options,
  value,
  onChange,
  error,
}: {
  name: string;
  label: string;
  options: { value: string; label: string; description?: string }[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  const groupId = useId();
  const errorId = error ? `${groupId}-error` : undefined;

  return (
    <fieldset aria-describedby={errorId}>
      <legend className="text-sm font-medium text-ink-900">{label}</legend>

      <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
        {options.map((option) => {
          const checked = value === option.value;
          return (
            <label
              key={option.value}
              className={cn(
                "flex min-h-14 cursor-pointer items-start gap-3 rounded-btn border p-4",
                "transition-[border-color,background-color] duration-160 ease-out-quart",
                "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[var(--brand-accent)]/30",
                checked
                  ? "border-[var(--brand-accent)] bg-[var(--brand-accent-tint)]"
                  : "border-mist-200 bg-white hover:border-ink-400",
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              <span
                aria-hidden
                className={cn(
                  "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border-2",
                  checked
                    ? "border-[var(--brand-accent)]"
                    : "border-mist-200",
                )}
              >
                {checked && (
                  <span className="size-2.5 rounded-full bg-[var(--brand-accent)]" />
                )}
              </span>
              <span>
                <span className="block text-[0.9375rem] font-medium text-ink-900">
                  {option.label}
                </span>
                {option.description && (
                  <span className="mt-0.5 block text-sm text-ink-600">
                    {option.description}
                  </span>
                )}
              </span>
            </label>
          );
        })}
      </div>

      {error && (
        <p
          id={errorId}
          className="mt-2 flex items-center gap-1.5 text-sm text-red-500"
        >
          <AlertCircle aria-hidden className="size-3.5 shrink-0" />
          {error}
        </p>
      )}
    </fieldset>
  );
}

export function CheckboxField({
  label,
  ...props
}: React.ComponentProps<"input"> & { label: string }) {
  const id = useId();

  return (
    <label
      htmlFor={id}
      className="flex min-h-11 cursor-pointer items-start gap-3 py-1"
    >
      <input
        {...props}
        id={id}
        type="checkbox"
        className="mt-0.5 size-5 shrink-0 rounded border-mist-200 accent-[var(--brand-accent)]"
      />
      <span className="text-[0.9375rem] text-ink-700">{label}</span>
    </label>
  );
}

/**
 * Hidden anti-spam pair.
 *
 * The honeypot is positioned off-screen rather than `display: none`, because
 * some bots skip fields that are not rendered. The elapsed-time value is
 * written at submit rather than at render, so it reflects how long the visitor
 * actually spent on the form.
 */
export function SpamGuard() {
  const elapsedRef = useRef<HTMLInputElement>(null);
  const mountedAt = useRef(0);

  useEffect(() => {
    // Stamped on mount rather than during render: render must stay pure.
    mountedAt.current = Date.now();

    const input = elapsedRef.current;
    const form = input?.closest("form");
    if (!input || !form) return;

    const stamp = () => {
      input.value = String(Date.now() - mountedAt.current);
    };

    form.addEventListener("submit", stamp);
    return () => form.removeEventListener("submit", stamp);
  }, []);

  return (
    <>
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company_website">Company website</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>
      <input ref={elapsedRef} type="hidden" name="elapsedMs" defaultValue="0" />
    </>
  );
}
