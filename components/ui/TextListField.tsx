"use client";

import { useId } from "react";

interface TextListFieldProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  addLabel?: string;
}

export function TextListField({
  label,
  value,
  onChange,
  placeholder = "Add an item…",
  addLabel = "+ Add",
}: TextListFieldProps) {
  const id = useId();

  function updateItem(index: number, text: string) {
    const next = [...value];
    next[index] = text;
    onChange(next);
  }

  function addItem() {
    onChange([...value, ""]);
  }

  function removeItem(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
      >
        {label}
      </label>
      <ul className="space-y-2">
        {value.map((item, index) => (
          <li key={index} className="flex gap-2">
            <input
              id={index === 0 ? id : undefined}
              type="text"
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              placeholder={placeholder}
              className="flex-1 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 px-3 py-2 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="rounded-lg border border-zinc-300 dark:border-zinc-600 px-3 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none focus:ring-1 focus:ring-rose-500"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={addItem}
        className="rounded-lg border border-dashed border-rose-400 dark:border-rose-500 px-3 py-2 text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 focus:outline-none focus:ring-1 focus:ring-rose-500"
      >
        {addLabel}
      </button>
    </div>
  );
}
