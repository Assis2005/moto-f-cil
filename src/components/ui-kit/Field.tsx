import type { InputHTMLAttributes } from "react";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Field({ label, error, id, ...props }: FieldProps) {
  const inputId = id ?? props.name ?? label;
  return (
    <div>
      <label htmlFor={inputId} className="mb-1 block text-sm font-medium">
        {label}
      </label>
      <input id={inputId} className="field-input" {...props} />
      {error ? <p className="mt-1 text-xs text-danger">{error}</p> : null}
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  options: string[];
  error?: string;
  onChange: (value: string) => void;
}

export function SelectField({ label, name, value, options, error, onChange }: SelectFieldProps) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-medium">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="field-input"
      >
        <option value="">Selecione</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {error ? <p className="mt-1 text-xs text-danger">{error}</p> : null}
    </div>
  );
}

interface UploadFieldProps {
  label: string;
  name: string;
  fileName?: string;
  error?: string;
  onSelect: (fileName: string) => void;
}

export function UploadField({ label, name, fileName, error, onSelect }: UploadFieldProps) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-medium">
        {label}
      </label>
      <label
        htmlFor={name}
        className="glass-strong flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-3 text-sm"
      >
        <span className={fileName ? "text-ink" : "text-steel"}>
          {fileName ?? "Toque para enviar uma foto ou PDF"}
        </span>
        <span className="rounded-md bg-brand px-3 py-1 text-xs font-medium text-brand-foreground">
          Enviar
        </span>
      </label>
      <input
        id={name}
        name={name}
        type="file"
        accept="image/*,application/pdf"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onSelect(file.name);
        }}
      />
      {error ? <p className="mt-1 text-xs text-danger">{error}</p> : null}
    </div>
  );
}
