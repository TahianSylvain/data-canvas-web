'use client';

import { JSX, useState } from 'react';

type Field = {
  label: string;
  name: string;
  type: 'text' | 'color' | 'select' | 'icon';
  options?: string[] | { name: string; icon: JSX.Element }[]; // pour 'icon'
};

interface PopupFormProps {
  visible: boolean;
  title: string;
  fields: Field[];
  onSubmit: (data: Record<string, string>) => void;
  onCancel: () => void;
}

export default function PopupForm({ visible, title, fields, onSubmit, onCancel }: PopupFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSubmit(formData);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-md w-[90%] max-w-md">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block mb-1 font-medium">{field.label}</label>
              {field.type === 'text' && (
                <input
                  className="w-full border px-3 py-2 rounded"
                  type="text"
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                />
              )}
              {field.type === 'select' && (
                <div className="flex flex-wrap gap-2">
                  {field.options?.map((opt) => (
                    <button
                      key={opt}
                      className={`w-8 h-8 rounded-full border-2 ${formData[field.name] === opt ? 'border-black' : 'border-gray-300'}`}
                      style={{ backgroundColor: opt }}
                      onClick={() => handleChange(field.name, opt)}
                    />
                  ))}
                </div>
              )}
              {field.type === 'icon' && Array.isArray(field.options) && (
                <div className="flex gap-3 flex-wrap">
                  {(field.options as { name: string; icon: JSX.Element }[]).map((opt) => (
                    <button
                      key={opt.name}
                      onClick={() => handleChange(field.name, opt.name)}
                      className={`p-2 border rounded-lg hover:bg-gray-100 ${formData[field.name] === opt.name ? 'border-black' : 'border-gray-300'
                        }`}
                    >
                      {opt.icon}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
        </div>
      </div>
    </div>
  );
}

