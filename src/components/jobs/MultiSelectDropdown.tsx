import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'

interface Option {
  value: string
  label: string
}

interface MultiSelectDropdownProps {
  label: string
  options: Option[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  showAllOption?: boolean
}

export function MultiSelectDropdown({
  label,
  options,
  value,
  onChange,
  placeholder = 'All',
  showAllOption = true,
}: MultiSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedOption = options.find((opt) => opt.value === value)
  const displayText = selectedOption?.label || placeholder

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-sm text-gray-700 hover:border-gray-300 transition-colors min-w-[140px]"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="text-gray-400 text-xs uppercase tracking-wide">{label}:</span>
        <span className="flex-1 text-left truncate">{displayText}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 top-full left-0 mt-1 w-full min-w-[200px] bg-white border border-gray-200 shadow-lg max-h-60 overflow-auto">
          {/* All option */}
          {showAllOption && (
            <button
              type="button"
              onClick={() => {
                onChange('')
                setIsOpen(false)
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-gray-50"
            >
              {!value && <Check className="w-4 h-4 text-navy" />}
              {value && <span className="w-4" />}
              <span>{placeholder}</span>
            </button>
          )}

          {/* Options */}
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-gray-50"
            >
              {value === option.value && <Check className="w-4 h-4 text-navy" />}
              {value !== option.value && <span className="w-4" />}
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
