"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Calculator } from "lucide-react";
import { evaluateMoneyExpression, formatMoney } from "@/lib/admin/finance-utils";

export default function MoneyExpressionInput({
  id,
  name,
  defaultValue = "",
  required = false,
  allowNegative = false,
  mustBePositive = !allowNegative,
  disabled = false,
  className = "",
  placeholder = "e.g. 400+300+1450",
  helperText = "You can calculate here: 400+300+1450, (1200+800)*2, or 1000/4.",
  ...props
}) {
  const initialValue = String(defaultValue ?? "");
  const [expression, setExpression] = useState(initialValue);
  const inputRef = useRef(null);
  const messageId = id ? `${id}-calculation` : undefined;
  const calculation = useMemo(
    () => evaluateMoneyExpression(expression, { allowNegative }),
    [expression, allowNegative]
  );
  const empty = expression.trim() === "";
  const positiveError = calculation.valid && mustBePositive && calculation.value <= 0;
  const valid = calculation.valid && !positiveError;
  const error = positiveError ? "Amount must be greater than zero." : calculation.error;

  useEffect(() => {
    setExpression(String(defaultValue ?? ""));
  }, [defaultValue]);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return undefined;
    const message = !empty && !valid ? error || "Enter a valid amount." : "";
    input.setCustomValidity(message);

    const form = input.form;
    const reset = () => setExpression(String(defaultValue ?? ""));
    form?.addEventListener("reset", reset);
    return () => form?.removeEventListener("reset", reset);
  }, [defaultValue, empty, error, valid]);

  const decimals = valid && !Number.isInteger(calculation.value) ? 2 : 0;

  return (
    <div>
      <div className="relative">
        <input
          {...props}
          ref={inputRef}
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          spellCheck={false}
          required={required}
          disabled={disabled}
          value={expression}
          onChange={(event) => setExpression(event.target.value)}
          placeholder={placeholder}
          aria-invalid={!empty && !valid}
          aria-describedby={messageId}
          className={`${className} pr-10`}
        />
        <Calculator className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-600" aria-hidden="true" />
      </div>
      <input type="hidden" name={name} value={valid ? String(calculation.value) : ""} disabled={disabled} />
      <div id={messageId} aria-live="polite" className="mt-1.5 min-h-4 text-[11px] leading-4">
        {!empty && valid ? (
          <span className="font-semibold text-emerald-400">Calculated total: {formatMoney(calculation.value, { decimals })}</span>
        ) : !empty ? (
          <span className="text-rose-400">{error}</span>
        ) : (
          <span className="text-neutral-600">{helperText}</span>
        )}
      </div>
    </div>
  );
}
