'use client';
import { useState } from 'react';
import { Button } from '../buttons/button';

interface parameter_type{
    visibility:string,
    handleClick: () => void
}

export default function CreateDatabaseForm({visibility, handleClick}:parameter_type) {
  const [formData, setFormData] = useState({
    name: '',
    color: '',
    icon: '',
    file: null,
  });
//   const [visibility, setVisibility] = useState('hidden');

  const colors = ['#a855f7', '#22c55e', '#facc15', '#ef4444', '#3b82f6'];
  const icons = ['📚', '📊', '🧪', '⚙️', '💡'];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    alert('Database created!');
  };
  const contain_class = `contain_form_creatData ${visibility}`;

  return (
    <section className={contain_class}> 
        <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white shadow-xl rounded-xl p-8 space-y-6"
        >
        <h2 className="text-2xl font-bold text-center">Create a Database</h2>

        {/* Nom */}
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
            Database Name
            </label>
            <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                }
                className="inpt_size_and_style w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your database name"
                required
            />
        </div>

        {/* Couleur */}
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
            Pick a Color
            </label>
            <div className="flex space-x-4">
            {colors.map((color) => (
                <button
                    type="button"
                    key={color}
                    onClick={() => setFormData({ ...formData, color })}
                    className={`w-8 h-8 rounded-full border-2 transition ${
                        formData.color === color
                        ? 'border-black scale-110'
                        : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color }}
                />
            ))}
            </div>
        </div>

        {/* Icône */}
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
            Pick an Icon
            </label>
            <div className="flex space-x-4 text-2xl">
            {icons.map((icon) => (
                <button
                type="button"
                key={icon}
                onClick={() => setFormData({ ...formData, icon })}
                className={`p-2 border rounded-md ${
                    formData.icon === icon
                    ? 'border-blue-500 scale-110'
                    : 'border-gray-200'
                }`}
                >
                {icon}
                </button>
            ))}
            </div>
        </div>

        {/* Fichier */}
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
            Import File
            </label>
            <input
                type="file"
                onChange={(e) =>
                    setFormData({ ...formData, file: e.target.files[0] })
                }
                className="w-full"
                placeholder='Votre fichier'
            />
        </div>

        {/* Soumettre */}
        <div className="text-center">
            <div className="flex items-center justify-end">
                <Button onClick={handleClick} type='button' className="btn_form_new_tab">{'Cancel'}</Button>
                <Button type='submit' className="btn_blue btn_form_new_tab">{'Create'}</Button>
            </div>
        </div>
        </form>
    </section>
  );
}
