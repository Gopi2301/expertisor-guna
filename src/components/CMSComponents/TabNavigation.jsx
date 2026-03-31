import React from 'react';

/**
 * Tab Navigation Component
 * Modern tab switcher for CMS editor
 */
const TabNavigation = ({ tabs, activeTab, onChange }) => {
    return (
        <div className="border-b border-neutral-800">
            <div className="flex gap-1 px-6">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onChange(tab.id)}
                        className={`
                            relative px-6 py-3 font-medium text-sm transition-all
                            ${activeTab === tab.id
                                ? 'text-white'
                                : 'text-neutral-500 hover:text-neutral-300'
                            }
                        `}
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            {tab.icon && <tab.icon className="w-4 h-4" />}
                            {tab.label}
                        </span>

                        {/* Active indicator */}
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400"></div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TabNavigation;
