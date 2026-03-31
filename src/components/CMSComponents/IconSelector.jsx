import React, { useState, useMemo } from 'react';
import { Search, X, Check } from 'lucide-react';
import { iconCategories, searchIcons, getIconById } from '../../constants/iconLibrary';

/**
 * Icon Selector Component
 * 
 * Features:
 * - Icon gallery with categories
 * - Search functionality
 * - Color customization
 * - Preview display
 */
const IconSelector = ({
    selectedIconId = 'sparkles',
    selectedColor = '#FFF200',
    onChange
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('popular');
    const [isOpen, setIsOpen] = useState(false);

    const colors = [
        { name: 'Yellow', value: '#FFF200' },
        { name: 'Blue', value: '#60A5FA' },
        { name: 'Green', value: '#34D399' },
        { name: 'Red', value: '#F87171' },
        { name: 'Purple', value: '#A78BFA' },
        { name: 'Orange', value: '#FB923C' },
        { name: 'Pink', value: '#F472B6' },
        { name: 'White', value: '#FFFFFF' }
    ];

    // Get filtered icons
    const filteredIcons = useMemo(() => {
        if (searchQuery) {
            return searchIcons(searchQuery);
        }
        const category = iconCategories.find(cat => cat.id === activeCategory);
        return category ? category.icons : [];
    }, [searchQuery, activeCategory]);

    // Get selected icon
    const selectedIcon = getIconById(selectedIconId);
    const IconComponent = selectedIcon?.component;

    // Handle icon selection
    const handleIconSelect = (iconId) => {
        if (onChange) {
            onChange({ iconId, color: selectedColor });
        }
        setIsOpen(false);
        setSearchQuery('');
    };

    // Handle color change
    const handleColorChange = (color) => {
        if (onChange) {
            onChange({ iconId: selectedIconId, color });
        }
    };

    return (
        <div className="space-y-4">
            {/* Current Selection Preview */}
            <div className="bg-neutral-900 p-4 rounded-lg border border-neutral-800">
                <label className="block text-sm text-neutral-400 mb-3">Selected Icon</label>
                <div className="flex items-center gap-4">
                    {/* Icon Preview */}
                    <div
                        className="w-16 h-16 rounded-lg bg-neutral-800 flex items-center justify-center"
                        style={{ color: selectedColor }}
                    >
                        {IconComponent && <IconComponent className="w-8 h-8" />}
                    </div>

                    {/* Icon Info */}
                    <div className="flex-1">
                        <p className="text-sm text-white font-medium">{selectedIcon?.name || 'No icon selected'}</p>
                        <p className="text-xs text-neutral-500 mt-1">ID: {selectedIconId}</p>
                    </div>

                    {/* Change Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors text-sm"
                    >
                        {isOpen ? 'Close' : 'Change Icon'}
                    </button>
                </div>
            </div>

            {/* Color Picker */}
            <div className="bg-neutral-900 p-4 rounded-lg border border-neutral-800">
                <label className="block text-sm text-neutral-400 mb-3">Icon Color</label>
                <div className="flex flex-wrap gap-2">
                    {colors.map(color => (
                        <button
                            key={color.value}
                            onClick={() => handleColorChange(color.value)}
                            className={`w-10 h-10 rounded-lg transition-all ${selectedColor === color.value
                                    ? 'ring-2 ring-white ring-offset-2 ring-offset-neutral-900 scale-110'
                                    : 'hover:scale-105'
                                }`}
                            style={{ backgroundColor: color.value }}
                            title={color.name}
                        >
                            {selectedColor === color.value && (
                                <Check className="w-5 h-5 text-black mx-auto" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Icon Gallery (Collapsible) */}
            {isOpen && (
                <div className="bg-neutral-900 rounded-lg border border-neutral-800 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* Search Bar */}
                    <div className="p-4 border-b border-neutral-800">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search icons..."
                                className="w-full pl-10 pr-10 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-yellow-400"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Category Tabs (only show if not searching) */}
                    {!searchQuery && (
                        <div className="flex gap-2 p-4 border-b border-neutral-800 overflow-x-auto">
                            {iconCategories.map(category => (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeCategory === category.id
                                            ? 'bg-yellow-400 text-black'
                                            : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                                        }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Icon Grid */}
                    <div className="p-4 max-h-96 overflow-y-auto">
                        {filteredIcons.length > 0 ? (
                            <div className="grid grid-cols-6 gap-2">
                                {filteredIcons.map(icon => {
                                    const Icon = icon.component;
                                    const isSelected = icon.id === selectedIconId;

                                    return (
                                        <button
                                            key={icon.id}
                                            onClick={() => handleIconSelect(icon.id)}
                                            className={`aspect-square rounded-lg flex flex-col items-center justify-center gap-1 transition-all ${isSelected
                                                    ? 'bg-yellow-400 text-black ring-2 ring-yellow-400'
                                                    : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white'
                                                }`}
                                            title={icon.name}
                                        >
                                            <Icon className="w-6 h-6" />
                                            <span className="text-[10px] font-medium truncate w-full px-1 text-center">
                                                {icon.name}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-neutral-500 text-sm">No icons found</p>
                                <p className="text-neutral-600 text-xs mt-1">Try a different search term</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default IconSelector;
